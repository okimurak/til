# Kubernetes とはなにか？

コンテナを中心とした管理基盤のことで、コンピューティング、ネットワーキング、ストレージインフラストラクチャのオーケストレーションを行う。

## コンポーネント

- クラスター … kubernetes が管理するコンテナ化されたアプリケーションを実行する、ノードと呼ばれるマシンの集合。少なくとも 1 つのワーカーノードと少なくとも 1 つのマスタノードがある
- ノード … マシンの集合で、1 つの VM or 物理的なマシン。複数の Pod を持つ
- Pod … アプリケーションのコンポーネント。共有ストレージやネットワーキング（クラスターに固有の IP アドレス）コンテナのイメージバージョンや使用するポートなど、コンテナを動かすための情報を含む。ワーカーノードは Pod をホストする
- マスタノード … クラスター内のワーカーノードと Pod を管理する。複数のマスタノードを使用すると、クラスターにフェイスオーバーと高可用性を提供する

### マスタコンポーネント

クラスターのコントロールプレーンを提供する。クラスターに関する全体的な決定（スケジューリングとか）や、クラスターイベントの検出及び応答を行う。シンプルにするため、セットアップスクリプトは通常すべてのマスタコンポーネントを同じマシンで起動して、そのマシンではユーザコンテナを実行しない

- `kube-apiserver` … Kubernetes API を外部に提供するマスタ上のコンポーネント。コントロールプレーンのフロントエンドになる

- `etcd` … 一貫性、高可用性を持った key-value ストアで、KUbernetes のすべてのクラスター情報の保存場所。データストアとして使う場合、必ずデータのバックアッププランを作成する

- `kube-sheduler` … 新しく作られた Pod にノードが割り当てられているか監視、割り当てられていなかった場合にその Pod を実行するノードを選択する。

- `kube-controller-manager` … マスタ上に存在して、controllers を実行するコンポーネント。論理的には各コントローラーは個別のプロセスだが、1 つの実行ファイルにまとめてコンパイルされて単一のプロセスとして動作

  - ノードコントローラー … ノードがダウンした倍の通知対応を担当
  - レプリケーションコントローラー … システム内の全レプリケーションコントローラーオブジェクトについて、Pod の数を正しく保つ役割を持つ
  - エンドポイントコントローラー　… エンドポイントオブジェクトを注入する（Service と Pod を紐付ける）
  - サービスアカウントとトークンコントローラー … 新規の名前空間に対して、デフォルトアカウントと API アクセストークンを作成する

- `cluod-controller-manager` … 基盤であるクラウドプロバイダーと対話するコントローラーを実行する。次のコントローラはクラウドプロバイダーへの依存関係がある
  - ノードコントローラー … ノードが応答を停止した後、クラウドで削除されたかどうかを判断するため、クラウドプロバイダーをチェックする
  - ルーティングコントローラー … 基盤であるクラウドインフラでルーティングを設定する
  - サービスコントローラー … クラウドプロバイダーのロードバランサーの作成、更新、削除を行う
  - ボリュームコントローラー … ボリュームの作成、アタッチ、マウントをしたり、クラウドプロバイダーとやり取りして、ボリュームを調整する

[Kubernetes のコンポーネント - Kubernetes](https://kubernetes.io/ja/docs/concepts/overview/components/)

### ノードコンポーネント

すべてのノードで実行され、稼働中の Pod 管理や KUbernetes の実行環境を提供する

- `kubelet` … クラスター内の各ノードで実行されるエージェント。各コンテナが Pod で実行されていることを保証する。`PodSpec` のセットを取得し、それらの `PodSpec` に記述されているコンテナが正常に実行されている状態に保つ

- `kube-proxy` クラスター内の各ノードで動作しているネットワークプロキシ。ノードのネットワークルールをメンテナンスする。これらのルールによって、クラスター内部 or 外部のネットワークセッションから Pod のネットワーク通信が可能になる

- コンテナランタイム … コンテナの実行を担当するソフトウェア。Docker, containerd, cri-o rktlet 及び、すべての [Kubernetes CRI (Container Runtime Interface)](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-node/container-runtime-interface.mdhttps://github.com/kubernetes/community/blob/master/contributors/devel/sig-node/container-runtime-interface.md)を実装している

### アドオン

クラスター機能を実装するために、Kubernetes リソースを使って提供している

- DNS … 必須ではないが、すべてのクラスターがクラスター DNS を持つべき。環境内の他の DNS サーバに加えて、Kubernetes サービスの DNS レコードを提供する DNS サーバー
- Web UI (Dashbord) … クラスター用の汎用 Web ベース UI。クラスターやクラスター内で実行されているアプリケーションについて、管理及びトラブルシューティングを行うことができる。
- コンテナリソース監視 … コンテナに関する一般的なメトリックを中央データベースに記録し、閲覧するための UI を提供する
- クラスターレベルログ … コンテナのログを検索参照 IF を備えた中央ログストアに保存する

## デプロイメント

次を行ってアプリケーション（コンテナ）のデプロイをする。デプロイをすると、Pod が作られる（その中でコンテナが動く）

- アプリケーションのインスタンスを実行できるノードを検索（使えるノードは 1 つ）
- アプリケーションを検索したノード上で実行するようにスケジューリング
- 新しいノードでインスタンスを再スケジュールできるようにクラスタを構成（可用性の担保ってことかしら）

起動したアプリケーションは、隔離されているため、kubectrl を使い API で通信する必要がある。なので `proxy` 経由で通信する

## デプロイしたアプリケーションの探索

Pod 名の取得は

```bash
export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
```

API をリクエスト

```bash
curl http://localhost:8001/api/v1/namespaces/default/pods/$POD_NAME/proxy/
```

## Service

Pod の論理セットと、それらにアクセスするためのポリシーを定義する抽象概念。テキスト（YAML:推奨、JSON）を使って定義される。Service がないと、IP を外部へ公開できない。`ServiceSpac` で `type` を指定することで、様々な方法でサービスを公開できる。公開方法は [Using Source IP tutoroal](https://kubernetes.io/docs/tutorials/services/source-ip/) を参照。[サービスとアプリケーションの接続](https://kubernetes.io/ja/docs/concepts/services-networking/connect-applications-service/)も参照

- ClusterIP（デフォルト値） … クラスター内の内部 IP で公開。なので、クラスター内部からのみ到達可
- NodePort … NAT を使用して、クラスター内の選択された各ノードの同じポートに公開する。`<NodeIP>:<NodePort>` を使って、クラスターの外部から Service にアクセスできるようにする。ClusterIP のスーパーセットになる
- LoadBalancer … 現在のクラウドに外部ロードバランサを作成して、Service に固定の外部 IP を割り当てる。NodePort のスーパーセットになる。
- ExternalName …. 指定した名前の CNAME レコードを返すことによって、Service を公開する。`kube-dns` v1.7 以上が必要

Service はラベルとセレクタを使用して一連の Pod を照合する。ラベルはオブジェクト煮付けられた Key/ Value のペアであり、色んな方法で使用する。いつでも変更できるよ。

Node Port の取得は

```bash
export NODE_PORT=$(kubectl get <Service Name> -o go-template='{{(index .spec.ports 0).nodePort}}')
```

## レプリカセット

デプロイしたアプリケーションに作られる論理的単位。名称は必ず `<Deployment Name>-<Ramdom-String>` となる模様

## ローリングアップデート

新しいインスタンスを段階的にアップデートすることで、ダウンタイムなしで、Deployment をアップデートできる。新しい Pod は、利用可能なリソースを持つノードにスケジュールされる。ちなみに Kubernetes ではアップデートもバージョン管理されている

## kubectl

kubernetes とのインタフェースツール `kubectl <command>`

### command

チュートリアルで使ったコマンドをざっと

- `version` … バージョン
- `create deoloyment <アプリ名> --image=<イメージのパス>` … アプリのデプロイ
- `proxy` … ターミナルと、Kubernetes クラスタを接続するための Proxy を起動
- `get` … リソース一覧を表示

  - `get nodes` … 今管理されているノードを取得
  - `get deployments` デプロイメントを取得
  - `get pods` … Pod の一覧を取得
  - `get services` … Service の一覧を取得
  - `get rs` … レプリカセットの一覧を取得

- `describe` … 単一リソースに関する詳細情報を表示

  - `describe pods` … pod 毎のリソース情報を取得

  ```bash
  $ kubectl describe pods
  Name:         kubernetes-bootcamp-765bf4c7b4-9m4c7
  Namespace:    default
  Priority:     0
  Node:         minikube/172.17.0.40
  Start Time:   Sun, 03 May 2020 07:47:53 +0000
  Labels:       pod-template-hash=765bf4c7b4
              run=kubernetes-bootcamp
  Annotations:  <none>
  Status:       Running
  IP:           172.18.0.4
  IPs:
  IP:           172.18.0.4
  Controlled By:  ReplicaSet/kubernetes-bootcamp-765bf4c7b4
  Containers:
  kubernetes-bootcamp:
    Container ID:   docker://28c62618e3c59ab81c2ba12da9bc391ac41fcc74bd0e9467a72d65e2269f0f87
    Image:          gcr.io/google-samples/kubernetes-bootcamp:v1
    Image ID:       docker-pullable://jocatalin/kubernetes-bootcamp@sha256:0d6b8ee63bb57c5f5b6156f446b3bc3b3c143d233037f3a2f00e279c8fcc64af
    Port:           8080/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Sun, 03 May 2020 07:47:56 +0000
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-hqwql (ro)
  Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
  Volumes:
  default-token-hqwql:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-hqwql
    Optional:    false
  QoS Class:       BestEffort
  Node-Selectors:  <none>
  Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
  Events:
  Type     Reason            Age                  From               Message
  ----     ------            ----                 ----               -------
  Warning  FailedScheduling  113s (x2 over 113s)  default-scheduler  0/1 nodes are available: 1 node(s) had taints that the pod didn't tolerate.
  Normal   Scheduled         107s                 default-scheduler  Successfully assigned default/kubernetes-bootcamp-765bf4c7b4-9m4c7 to minikube
  Normal   Pulled            105s                 kubelet, minikube  Container image "gcr.io/google-samples/kubernetes-bootcamp:v1" already present on machine
  Normal   Created           105s                 kubelet, minikube  Created container kubernetes-bootcamp
  Normal   Started           104s                 kubelet, minikube  Started container kubernetes-bootcamp
  ```

  - `describe <Service Name>` ... サービスの詳細情報を表示する

  ```bash
  $ kubectl describe services/kubernetes-bootcamp
  Name:                     kubernetes-bootcamp
  Namespace:                default
  Labels:                   run=kubernetes-bootcamp
  Annotations:              <none>
  Selector:                 run=kubernetes-bootcamp
  Type:                     NodePort
  IP:                       10.98.19.7
  Port:                     <unset>  8080/TCP
  TargetPort:               8080/TCP
  NodePort:                 <unset>  31125/TCP
  Endpoints:                172.18.0.4:8080
  Session Affinity:         None
  External Traffic Policy:  Cluster
  Events:                   <none>
  ```

- `logs` … 単一 Pod 上の単一コンテナ内のログを表示

  - `logs <Pod Name>` … Pod 内のログを表示（標準出力)

  ```bash
  $ kubectl logs $POD_NAME
  Kubernetes Bootcamp App Started At: 2020-05-03T07:47:56.391Z | Running On:  kubernetes-bootcamp-765bf4c7b4-9m4c7 Running On: kubernetes-bootcamp-765bf4c7b4-9m4c7 | Total Requests: 1 | App Uptime: 355.864 seconds | Log Time: 2020-05-03T07:53:52.255Z
  ```

- `exec`… 単一 Pod 上の単一コンテナ内でコマンドを実行
  - `exec <Pod Name> <Command>` … Pod に対して、コマンドを実行
    - `exec -ti <Pod Name> bash` … Pod に対して、`bash` を起動する
- `expose` … Service を作成して、外部へ公開する

  ```bash
  $ kubectl get services
  NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
  kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   54s
  $ kubectl expose deployment/kubernetes-bootcamp --type="NodePort" --port 8080
  service/kubernetes-bootcamp exposed
  $ kubectl get services
  NAME                  TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)          AGE
  kubernetes            ClusterIP   10.96.0.1    <none>        443/TCP          4m56s
  kubernetes-bootcamp   NodePort    10.98.19.7   <none>        8080:31125/TCP   10s
  ```

  - `label <Resource> <Resource name> <Label(Key=Value)`
  - `delete <Resource>` … リソースを削除する
  - `scale <Deoloyment> --replicas=<num>` … デプロイメントをスケールさせる
  - `set image <Deoloyment Name> <Deployment Name>=<ImageName>` ... デプロイのイメージを置き換える。ローリングアップデートされる。

    ```bash
    $ kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v2
    deployment.apps/kubernetes-bootcamp image updated
    ```

  - `rollout`
    - `status <Deployment Name>` … ローリングアップデートの状態を確認する
    - `undo <Deployment Name>` ... 直前のバージョンにロールバックする

#### Option

- `-l` … ラベルを指定
- `-o` … 出力形式を変更する
  - `wide` … 一行で表示する

## ConfigMaps

Pod のコンテナやシステムコンポーネントにバインドするための、Kubernetes の設定。`kubectl` v1.14 以上が必要
機密性の低い、構成情報を保存して共有するのに便利（機密性が高いのは Secret を使いましょう）

`create configmap` コマンドを使う。`--from-file` オプションでファイルから入力も可能（複数も可能、ディレクトリも OK）

```bash
kubectl create configmap name --from-file path/to/file.properties --from-file path/to/file2.properties
kubectl create configmap name --from-file path/to/directory
```

- [Kubernetes API Reference Docs](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.16/#configmap-v1-core)
- [ConfigMap  |  Kubernetes Engine ドキュメント  |  Google Cloud](https://cloud.google.com/kubernetes-engine/docs/concepts/configmap?hl=ja)
- [Configure a Pod to Use a ConfigMap - Kubernetes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/)

## Reference

[チュートリアル - Kubernetes](https://kubernetes.io/ja/docs/tutorials/)
