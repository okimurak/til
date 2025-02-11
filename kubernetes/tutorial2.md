# Udemy 講座メモ

2020/06 に以下講座を受けたときの Notion メモを移行、加筆

[Docker + Kubernetes で構築する Webアプリケーション 実践講座 | Udemy](https://www.udemy.com/course/web-application-with-docker-kubernetes/?couponCode=KEEPLEARNING)

## 環境

以下環境だったみたい

- WSL2(Ubunstu 20.04 LTS) on Windows 10
- minikube
- podman

## minikube
ローカルで簡単に動かすためのツール

- DNS
- NodePorts
- ConfigMap Secrets
- DashBord
- Container runtime (Docker, rkt, CRI-O, containerd)
- CNI (Container Network Interface)の有効化
- Ingress

https://kubernetes.io/ja/docs/setup/learning-environment/minikube/

### 操作

```bash
# 実行
minikube start --vm-driver=none
# 停止
minikube stop
# 状態確認
minikube status

# アドオン追加
minikube addons enable ${ADDON_NAME}

# アドオン削除
minikube addons enable ${ADDON_NAME}

# アドオン一覧確認
minikube addons list
```

### API サーバが動かないので driver=podmanを試す

WSL2 上の apiserver 参照先がおかしいらしく、API サーバーが動かない
https://github.com/kubernetes/minikube/issues/5392#issuecomment-623221946

`cat ~/.kube/config`で参照先が見られる。実際の minikubeのネットワークは

`docker inspect minikube | jq '.[].NetworkSettings.Ports'`

こちらの issue と参考記事を参照して podman 入れる. Dockerfile も使えるらしいので

https://github.com/kubernetes/minikube/issues/5392#issuecomment-633289182
https://www.redhat.com/sysadmin/podman-windows-wsl2


```bash
yappo@DESKTOP-OU9DEJ8:repository  $ minikube start --driver=podman
😄  minikube v1.11.0 on Ubuntu 20.04
✨  Using the podman (experimental) driver based on user configuration

❗  'podman' driver reported an issue: "sudo -k -n podman version --format {{.Version}}" exit status 1: sudo: a password is required
💡  Suggestion: Add your user to the 'sudoers' file: 'yappo ALL=(ALL) NOPASSWD: /usr/bin/podman'
```

はい。。。メッセージの通り `sudo visudo`の出番で sudoers file に以下を追記

```bash
# Podman
yappo ALL=(ALL) NOPASSWD: /usr/bin/podman
```

```bash
yappo@DESKTOP-OU9DEJ8:repository  $ minikube start --driver=podman
😄  minikube v1.11.0 on Ubuntu 20.04
✨  Using the podman (experimental) driver based on user configuration
👍  Starting control plane node minikube in cluster minikube
🔥  Creating podman container (CPUs=2, Memory=2200MB) ...
🐳  Preparing Kubernetes v1.18.3 on Docker 19.03.2 ...
🔎  Verifying Kubernetes components...
🌟  Enabled addons: default-storageclass, storage-provisioner
🏄  Done! kubectl is now configured to use "minikube"

❗  /usr/local/bin/kubectl is version 1.16.6-beta.0, which may be incompatible with Kubernetes 1.18.3.
💡  You can also use 'minikube kubectl -- get pods' to invoke a matching version

yappo@DESKTOP-OU9DEJ8:repository  $ minikube status
minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured
```

OK

## Kubernetes

- ワークロード
	- pod ... 最小単位。コンテナの集合
	- ReplicaSet ... Podの集合。Podをスケールできる
	- Deployment ... ReplicaStの集合。世代管理もできる
	- StatefulSet ... Podの集合。Podwoスケールスル際の名前が一定
- サービス
  - Service ... 外部公開。名前解決。L4LB
  - Ingress ... 外部公開、L7LB
- 設定情報
 - ConfigMap ... 設定情報
  - Secret ... 機密情報 base64 でエンコードされるとか
- Storage
  - PersistentVolume ... 永続データの実体。ストレージへの接続情報、抽象化を行う
  - PersistentVolumeClaim ... 永続データの要求する抽象化されたリソース。

- Node ... 実サーバに一致
- リソースは各ワーカーノードに分散配置される

- ネットワーク
  - クラスターネットワーク ... workerNodeがぶら下がってる 基本的にはこのPodは外には出られない
  - 外部ネットワーク ... masterNodeがぶら下がってる
- クラスターネットワークのコンテナにアクセスする方法は
  - マスターノード経由 kubectl
  - 踏み台コンテナ経由 kubectlに踏み台にログインして、そこからpodに
  - サービス経由

- リソースの作成
  手動作成もあるけど、基本的にはマニフェスト書こうね

- secret

- 作成
  - --from-literal=${KEY}=${VALUE} ... key-valueペアを指定して作成
  - --from-file=[${KEY}=]${PATH} ... ファイルを指定して登録

```bash
kubectr create secret generic ${NAME} ${OPTION}
```

### マニフェスト

基本構成は3つに分かれる。詳しくは図を参照

- apiVersionは kindが Pod の場合はひとまずv1
- metadata.name ... kubernetesで一意になるように。なにもない場合は`default`になるらしい
- metadate.label ... 自由にどうぞ
- spec.containers.name ... コンテナ名
- spec.containers.image ... イメージ名。バージョンも指定する
- command と args
  - command ... dockerの ENTRYPOINT
  - args ... docker の CMD

- apiVersionの探し方
  - APIドキュメント(https://kubernetes.io/ja/docs/reference/)から探そう
    - 各リソースの先頭に書いてあるらしい
    - apiVersionは、正しくは ${Group}/${Version}と書くんだけど、coreは省略できる
- 省略形が多々ある
  - https://kubernetes.io/docs/reference/kubectl/overview/#resource-types

### Podの中で操作する

コンテナへ入る。`docker exec` と一緒

```bash
kubectl exec -id ${POD} sh
```

### ファイル転送

`docker cp` と一緒

```bash
kubectl cp <src> <podname>:<dest>
kubectl cp <podname>:<src> <dest>
```

```bash
# ※一応 copyはできている
yappo@DESKTOP-OU9DEJ8:sec6-2  $ kubectl cp debug:/var/tmp/sample2.txt sample2.txt
tar: Removing leading `/' from member names


# ※こっちだと出ない
yappo@DESKTOP-OU9DEJ8:sec6-2  $ kubectl cp debug:var/tmp/sample2.txt sample.txt
```

https://qiita.com/toshihirock/items/78b36dea04cba0c21e7b

working dir の関係らしい

### 状態・ログ

```bash
kubectl describe [TYPE/NAME]
kubectl logs [TYPE/NAME] [--tail=n]
```

- TYPE/NAME ... リソース種別とリソース名

```bash
### describe
yappo@DESKTOP-OU9DEJ8:sec6-3  $ kubectl describe pod/debug
Name:         debug
Namespace:    default
Priority:     0
Node:         minikube/10.88.0.4
Start Time:   Sun, 21 Jun 2020 12:12:41 +0900
Labels:       <none>
Annotations:  kubectl.kubernetes.io/last-applied-configuration:
                {"apiVersion":"v1","kind":"Pod","metadata":{"annotations":{},"name":"debug","namespace":"default"},"spec":{"containers":[{"args":["while t...
Status:       Running
IP:           172.17.0.4
IPs:
  IP:  172.17.0.4
Containers:
  debug:
    Container ID:  docker://23c8595cc5bc8051ad29432e411d477003d1655d910dc55f391ed8160e4ebbf0
    Image:         centos:7
    Image ID:      docker-pullable://centos@sha256:e9ce0b76f29f942502facd849f3e468232492b259b9d9f076f71b392293f1582
    Port:          <none>
    Host Port:     <none>
    Command:
      sh
      -c
    Args:
      while true
      do
        sleep ${DELAY}
      done
      
    State:          Running
      Started:      Sun, 21 Jun 2020 12:12:43 +0900
    Ready:          True
    Restart Count:  0
    Environment:
      DELAY:  86400
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-nz8hl (ro)
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  default-token-nz8hl:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-nz8hl
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type    Reason     Age        From               Message
  ----    ------     ----       ----               -------
  Normal  Scheduled  <unknown>  default-scheduler  Successfully assigned default/debug to minikube
  Normal  Pulled     48s        kubelet, minikube  Container image "centos:7" already present on machine
  Normal  Created    47s        kubelet, minikube  Created container debug
  Normal  Started    47s        kubelet, minikube  Started container debug

yappo@DESKTOP-OU9DEJ8:sec6-3  $ kubectl describe pod/nginx
Name:         nginx
Namespace:    default
Priority:     0
Node:         minikube/10.88.0.4
Start Time:   Sun, 21 Jun 2020 12:12:41 +0900
Labels:       env=study
Annotations:  kubectl.kubernetes.io/last-applied-configuration:
                {"apiVersion":"v1","kind":"Pod","metadata":{"annotations":{},"labels":{"env":"study"},"name":"nginx","namespace":"default"},"spec":{"conta...
Status:       Running
IP:           172.17.0.5
IPs:
  IP:  172.17.0.5
Containers:
  nginx:
    Container ID:   docker://c1632e814f6ffd7352b43bc442478e36d3494c3039c18ea47ab98ec3217c0698
    Image:          nginx:1.17.2-alpine
    Image ID:       docker-pullable://nginx@sha256:482ead44b2203fa32b3390abdaf97cbdc8ad15c07fb03a3e68d7c35a19ad7595
    Port:           <none>
    Host Port:      <none>
    State:          Running
      Started:      Sun, 21 Jun 2020 12:12:43 +0900
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-nz8hl (ro)
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  default-token-nz8hl:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-nz8hl
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type    Reason     Age        From               Message
  ----    ------     ----       ----               -------
  Normal  Scheduled  <unknown>  default-scheduler  Successfully assigned default/nginx to minikube
  Normal  Pulled     2m         kubelet, minikube  Container image "nginx:1.17.2-alpine" already present on machine
  Normal  Created    2m         kubelet, minikube  Created container nginx
  Normal  Started    119s       kubelet, minikube  Started container nginx


### Log
yappo@DESKTOP-OU9DEJ8:sec6-3  $ kubectl logs pod/nginx
172.17.0.4 - - [21/Jun/2020:03:15:57 +0000] "GET / HTTP/1.1" 200 612 "-" "curl/7.29.0" "-"
```

## Pod

### spec.containers

最小単位。Docker コンテナの集合。ECSでいうタスク的な

- `imagePull Policy` ... どう pull するか (Always|Never|IfNotPresent(Default))
- volumeMount ... マウントさせるボリュームを指定する。`spec.volumees.name` に一致させる

### spec.volumes
- `hostPath` ... ホストのどのディレクトリにマウントさせるか (Directory|DirectoryOrCreate|File|FileOrCreate) ファイルもできるんだ。。。
- `nfs` ... NFSを使いたい場合
- `configMap` ... configMapを指定できる
- `secret` ... secretリソースを指定できる
- `emptyDir` ... 空ディレクトリを指定する

## replica

### spec.replicers

レプリカの数を指定。この値でスケールイン・アウトができる

### spec.selector

podのmetadata.labelsに一致させる

### spec.template

複製するpodのマニフェストを指定

## Deployment

replicaの世代管理できる

### spec.revisionHistoryLimit
世代保存数。デフォルト10

### spec.strategy
基本はローリングアップデートのみ

```yml
spec:
  ...
  strategy:
    rollingUpdate:
      maxSurge: 1 # レプリカ数を超えて良いpod数
      maxUnavailable: 1 # 一度に消失して良いpod数
    type: RollingUpdate # 1.1時点ではコレのみ
```

### ロールバック

```bash
kubectl rollout history TYPE/NAME # rolloutの状態を見る

kubectl rollout undo TYPE/NAME --to-revision=N
# to-revision=N ... 指定したリビジョンに戻す。デフォルト0（直前の履歴）
```

## Service

外部公開、名前解決、L4ロードバランサー


```yml

spec:
  type: ClusterIP  # サービスの種類 (ClusterIP(default)|NodePort|LoadBalancer|ExternalName)
  ports:
  - port: 80       # サービス受付ポート
    targetport: 80 # コンテナ転送先ポート
    nodePort: 8080 # ノード受付ポート 30000以上を指定する
  selector:        # 転送先のpodのlabelを指定する
    app: sample
    env: study
```

### spec.type

ClusterIPのときはクラスタネットワーク内のIPアドレスを指定できる
  - None : HeadlessService
  - "" : 自動採番
  - <IP> : 指定したIP

### HeadlessService

動いているPodのIPアドレス一覧を返してくれる. DNSラウンドロビンみたいな動きをする


## ConfigMap

設定情報を集約する

```yaml
data: 
  - KEY: VALUE
```

### podへの接続 (環境変数)

valueFromを使う

```yaml
   valueFrom:
     configmapKeyRef:
       name: sample-config <-取り込むリソース名
       key: type     <- キー名
```

### podへの接続 (ファイル)

```yaml
   volumeMounts:
     - name: config-storage
       mountpath: type 
   volumes:
   - name: config-storage
     configMap:
       name: sample-config
       items:
        - key: sample.cfg
          path: sample.cfg
```


## Secret

ConfigMapと一緒。specではなく、data に Key Value で設定する

```yml
data:
  KEY: VALUE # VALUEが base64でエンコードされている
```

```bash
kubectl create secret generic NAME
# 以下はオプション
# --from-literal=message="Hello World !" \
# --from-file=./keyfile
echo -n "TEXT" | base64


kubectl get secret/sample-secret -o yaml
```

取得方法は ConfigMapと同じ

```yml
   valueFrom:  # 作成したSecretを指定する
    secretKeyRef:
      name: sample-secret
      key: message
```

```yml
  containers:
    ...
    volumeMounts:
    - name: secret-storage
      mountPath: /home/nginx
  volumes:
  - name: secret-storage
    secret:
      secretName: sample-srecret
      items:
      - key: keyfile
        path: keyfile
```

## PersistentVolume(PV)
永続データの実体。
ストレージへの接続情報やストレージを抽象化する

```yaml
spec:
  storageClassname: host # ストレージの種類
  accessModes: ["ReadWriteMany"] # 読み書きを定義(ReadWriteOnce:単一ノードから読み書き|ReadOnlyMany:複数ノードから読み取りのみ|ReadWriteMany:複数ノードから読み書き)
  capacity: # ストレージ容量の定義
    storage: 1Gi
  persistentVolumeReclaimPolicy: Retain # 削除時の動作を定義(Retailn:PVC消えてもPVも残す|Delete:PVCが消えたらPVも消す|Recycle*(1.15時点では非推奨)対象ボリューム無いデータを削除して再利用)
  hostPath: # 保存先を定義 NFSもある
    path: "/data/storage" 
    type: Directory
```

## PersistentColumeClaim(PVC)
永続データの要求

```yaml
spec:
  storageClassName: slow
  accessModes: ["ReadWriteMany"]
  resouces:
    requests:
      storage: 1Gi
```

### 参照

```bash
yappo@DESKTOP-OU9DEJ8:sec7-7  $ kubectl get pvc,pv
NAME                                 STATUS   VOLUME      CAPACITY   ACCESS MODES   STORAGECLASS   AGE
persistentvolumeclaim/volume-claim   Bound    volume-01   1Gi        RWO            slow           20s

NAME                         CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM                  STORAGECLASS   REASON   AGE
persistentvolume/volume-01   1Gi        RWO            Retain           Bound    default/volume-claim   slow                    38s
```

## StatefulSet

Podの集合。Podをスケールする際の名前が一定

```yaml
apiVersion: apps/v1
kind: StatefulSet
 ...
spec:
 ...
 updateStrategy:
  type: RollingUpdate
 serviceName: frontend # HeadLessServiceを指定する
 template:
  ...
  volmeClaimTemplates: # PersistentVolumeClaimのテンプレートを定義
   ...
```

StatefulSet を使うと、IPわからなくてもpodへアクセスできるようになる

```bash
yappo@DESKTOP-OU9DEJ8:sec7-8  $ kubectl get all
NAME          READY   STATUS    RESTARTS   AGE
pod/nginx-0   1/1     Running   0          22s

NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   15d
service/sample-svc   ClusterIP   None         <none>        80/TCP    22s

NAME                     READY   AGE
statefulset.apps/nginx   1/1     22s

# pod/nginx-0, serviceがsample-svcなので、API的に以下のURLでアクセスできるようになる
curl http://nginx-0.sample-svc/
```

## Ingress

外部公開、L7ロードバランサー

```yml
apiVersoin: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: frontend
spec:
  rules:
  - http:
      paths:
      - path: / # URL
        backend:
          serviceName: web-svc
          servicePort: 80
```
