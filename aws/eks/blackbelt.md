# Elastic Kubernetes Service (EKS)

## Why is container

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

## Kubernetes

- Barg をオープンソース化したやつ
- コンテナ管理プラットフォーム
- モダンなアプリケーション開発のための基本要素を提供

もし Kubernetes を AWS だけで実現しようとすると

- kubemaster の中に複数のコンポーネントが管理されてる

  - etcd ... 分散のためのクリティカルなデータを保存する
  - ここまでがコントロールプレーン

- データプレーンは EC2 となる

## EKS の構成

- kubectl を EKS のエンドポイントに接続するだけになる

## API

- aws eck create-cluster で cluster を作る
  - master Node
  - etcd
  - が作られる

## Worker Node

AWS が AMI や CloudFormation Template として提供しているので、それを使って自分で準備する。

### Fargate

2019/12 からサポートされた

- [AWS Fargate 上の Amazon EKS を一般公開 | Amazon Web Services ブログ](https://aws.amazon.com/jp/blogs/news/amazon-eks-on-aws-fargate-now-generally-available/)

## Networking

- CNI ... pod に VPC の IP を割り当てることができる
- VPC CNI Plugin
  - k8s と AWS VPC 間をブリッジ
  - Pod IP <- ENI secondary IP

下記がわかりやすいかも

- https://youtu.be/VDPI91bHN-Q?list=PLzWGOASvSx6FIwIC2X1nObr1KcMCBBlqY&t=2916

## Load balancing

- CoreoS ALB Ingress Controller
  - Fargate の場合はこっち
- ALB
- NLB

## IAM authentication

- heptio を使っているらしい
- RBAC で IAM の認可を行う

## Logging

CloudWatch Log と連携
後はデーモンとして Fluentd を動かす

## Reference

- [【AWS Black Belt Online Seminar】Amazon EKS / AWS Fargate - YouTube](https://www.youtube.com/watch?v=VDPI91bHN-Q&list=PLzWGOASvSx6FIwIC2X1nObr1KcMCBBlqY&index=48&t=0s)
- [20180724 AWS Black Belt Online Seminar Amazon Elastic Container Servi…](https://www.slideshare.net/AmazonWebServicesJapan/20180724-aws-black-belt-online-seminar-amazon-elastic-container-service-for-kubernetes-amazon-eks-aws-fargate)
