# Fargate

## Why is container? 

- Packaging
- 配布
- Imutable Infrastracture

### コントロールプレーン 

コンテナを管理する場所
-> ECS, EKS

### データプレーン

実際にコンテナが稼働すルバ所
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

## Reference
- [【AWS Black Belt Online Seminar】Amazon EKS / AWS Fargate - YouTube](https://www.youtube.com/watch?v=VDPI91bHN-Q&list=PLzWGOASvSx6FIwIC2X1nObr1KcMCBBlqY&index=48&t=0s)
- [20180724 AWS Black Belt Online Seminar Amazon Elastic Container Servi…](https://www.slideshare.net/AmazonWebServicesJapan/20180724-aws-black-belt-online-seminar-amazon-elastic-container-service-for-kubernetes-amazon-eks-aws-fargate)