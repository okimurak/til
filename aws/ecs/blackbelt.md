# Fargate
## Why is container? 
- Packaging
- 配布
- Imutable Infrastracture

### コントロールプレーン 
コンテナを管理する場所 -> ECS, EKS

### データプレーン
実際にコンテナが稼働する場所
 - コントロールプレーンからの支持に従って起動
 - 各種状態をコントロールプレーンにフィードバック
-> Fargate, EC2

## 料金
- CPUとメモリの組み合わせを秒単位で課金

## Constructs
- Task Definition
  - コンテナイメージ、リソース(CPU,Memory)定義
- Task
  - 実行されるコンテナタスク
- Service
  - Long run
  - Schedule(サービス数を維持)
  - ELBとの連携

## Network
- TaskにENIが付与される(Task ENI)
  - Image の Pull、ログ送出のために必要
    - Internet GW経由か、VPCエンドポイント経由

## Permission
- Cluster Permission
- Applicetaion Permission
- Housekeeping Permission
  - コントロールプレーンに許可したいパーミッション
    - ECR Image Pull
    - CloudWatch Logs Push
    - ENI Creation

## Storage
- コンテナのストレージは10GB

## Fargate vs EC2
- EC2のほうがいい場合
  - Windows Continers
  - GPU Support
  - docker execのデバッグ
  - Spot, Riベースの価格モデル適用

## Fargate vs Lambda
- Lambdaの方がいい場合
  - イベントドリブン
  - ミリ秒単位のコンピュート
  - ランタイム管理をしたくない
  - 分散バッチコンピューティング

## Auto Scalling
- なにかのメトリクスに応じてコンテナの数をスケールさせたい
-> Targate trackingとFargateの連携がおすすめ

# EKS
## kubernetes
- Bargをオープンソース化したやつ
- コンテナ管理プラットフォーム
- モダンなアプリケーション開発のための基本要素を提供

もしkubernetesをAWSだけで実現しようとすると
- kubemasterの中に複数のコンポーネントが管理されてる
  - etcd ... 分散のためのクリティカルなデータを保存する
  - ここまでがコントロールプレーン

- データプレーンはEC2となる

## EKSの構成
- kubectlをEKSのエンドポイントに接続するだけになる

## API
- aws eck create-clusterでclusterを作る
  - master Node
  - etcd
  - が作られる

## Worker Node
AWSがAMIやCloudFormation Templateとして提供しているので、それを使って自分で準備する。

### Fargate
2019/12からサポートされた
- [AWS Fargate 上の Amazon EKS を一般公開 | Amazon Web Services ブログ](https://aws.amazon.com/jp/blogs/news/amazon-eks-on-aws-fargate-now-generally-available/)


## Networking
- CNI ... podにVPCのIPを割り当てることができる
- VPC CNI Plugin
  - k8sとAWS VPC間をブリッジ
  - Pod IP <- ENI secondary IP

下記がわかりやすいかも
- https://youtu.be/VDPI91bHN-Q?list=PLzWGOASvSx6FIwIC2X1nObr1KcMCBBlqY&t=2916

## Load balancing
- CoreoS ALB Ingress Controller
  - Fargateの場合はこっち
- ALB
- NLB

## IAM authentication
- heptioを使っているらしい
- RBACでIAMの認可を行う

## Logging
CloudWatch Logと連携
後はデーモンとしてFluentdを動かす

# EC2
Amazon ECS コンテナ絵０ジェントを実行して、クラスターに登録されている EC2インスタンスを操作する
EC2は Amazon ECS-optimized AMIを使って作る

## ECS-optimized AMI
コンテナインスタンスに求められる要件/推奨事項に従って事前構成された AMI
- Docker demon
- ECS コンテナエージェント

## ECSコンテナエージェント
ECSコントロールプレーンと通信し、コンテナインスタンスの管理やタスクの起動停止を行う
ECS--optimized AMI を元に起動していない場合、自身でインストールする必要がある
エージェント自体もコンテナで実行される

## コンテナインスタンスのドレイン
クラスタからコンテナインスタンスを削除すること

コンテナインスタンスを DRAINING に設定
  - 新規タスクは配置されない
  - PENDING状態のサービスタスクは即時停止
  - RUNNING 状態のサービスタスクはデプロイ設定に応じて置換

## EC2起動タイプの課題
- EC2インスタンスの運用業務
  - OSのパッチ当てとかエージェントのアップデート


## タスク定義
イミュータブルのため、後から変更できない。新しいリビジョンを作成する必要がある

- 必須
  - family ... タスク定義のリビジョン
  - containerDefiniton
    - name
    - image
    - memory ... ハードリミット
    - memoryReservation ... ソフト制限
    - logConfiguration
      - logDriver
      - options, secretOptions
    - environment
      - 環境変数として設定する。平文
    - secrets
      - 機密情報を環境変数に設定
      - Amazon Serets Manager シークレット
      - Amazon Systems Manager パラメータストアの パラメータ
      - それぞれタスク実行ロールに適切なIAMアクセス許可設定が必要
    - depentdsOn ... 実行順制御
      - condition (START|COMPLETE|SCUCESS|HEALTHY)
        - START ... 依存先が起動開始したら起動し始める
        - COMPLETE ... 終了後に起動開始
  - taskRoleArn ... コンテナが利用できるIAM ロール
  - executionRoleArn ... ECSコンテナエージェントが利用するIAMRole ECRからのpullやCloudWatchLogsへの書き込みなど
  - networkMode

## タスク定義更新方法
- 新しいタスク定義のリビジョンを作成
- サービスを更新する

## awslogs ログドライバー
コンテナアプリのログはSTDOUT/STDERR で CloudWatchLogs に出力される

## コンテナの機密情報の取り扱い
secrets, logConfiguration->secretOptions ではいずれかに格納されたデータ参照可能

- Amazon Serets Manager シークレット
  - EC2起動タイプでは、JSONキーやバージョンを指定可能 (Fargateでは未サポート)
- Amazon Systems Manager パラメータストアの パラメータ
  - 同じリージョンなら名前だけ。別リージョンなら完全なARNが必要

## ECS と IAMの連携整理
- クラスターパーミッション
  - クラスタのタスク起動、参照を制御
- コンテナインスタンスロール
  - コンテナインスタンスの ECS API へのアクセス許可
- アプリケーション：タスクロール
  - コンテナがAWSリソースに安全にアクセスすることを許可
- ハウスキーピング
  - タスク実行ロール
    - コンテナレジストリのイメージ取得
  - ECSのサービスにリンクされたロール
    - Elastic network inferface の作成
    - ELBへのターゲット登録解除

## ネットワークモード
Windowsは指定できない

- none ... 外部と指定しない
- bridge ... EC2起動タイプのデフォルト。Dockerの組み込み仮想ネットワーク
- host ... Dockerの仮想ネットワークをバイパスして、コンテナポートがホストEC2インスタンスのNICにマッピング
- awsvpc
  - タスクごとに ENIを自動割当
  - EC2にアタッチして実現しているので、EC2インスタンスのENIアタッチ上限に引っかかるかも
  - ENI トランキングを使う(ECSのアカウント設定から設定)

## データボリューム

- Dockerボリューム
  - タスク間の共有や明示的なライフサイクル管理
  - EC2起動タイプのみ

- バインドマウント
  - ホストマシン上のファイル/ディレクトリをコンテナにマウント

- EFS
  - NFSでアクセス（パフォーマンスも検討してね）
  - EC2起動の場合は、ECSコンテナエージェント1.35以上
  - Fargate1.4 以上

## 今後のロードマップ

- [aws/containers-roadmap: This is the public roadmap for AWS container services (ECS, ECR, Fargate, and EKS).](https://github.com/aws/containers-roadmap)

## Reference
- [【AWS Black Belt Online Seminar】Amazon EKS / AWS Fargate - YouTube](https://www.youtube.com/watch?v=VDPI91bHN-Q&list=PLzWGOASvSx6FIwIC2X1nObr1KcMCBBlqY&index=48&t=0s)
- [20180724 AWS Black Belt Online Seminar Amazon Elastic Container Servi…](https://www.slideshare.net/AmazonWebServicesJapan/20180724-aws-black-belt-online-seminar-amazon-elastic-container-service-for-kubernetes-amazon-eks-aws-fargate)
- [【AWS Black Belt Online Seminar】Amazon Elastic Container Service (Amazon ECS) - YouTube](https://www.youtube.com/watch?v=tmMLLjQrrRA&feature=youtu.be)
- [20200422 AWS Black Belt Online Seminar Amazon Elastic Container Servi…](https://www.slideshare.net/AmazonWebServicesJapan/20200422-aws-black-belt-online-seminar-amazon-elastic-container-service-amazon-ecs)