# Elastic Container Service (ECS) Fargate

## 料金

- CPU とメモリの組み合わせを秒単位で課金

## Constructs

- Task Definition
  - コンテナイメージ、リソース(CPU,Memory)定義
- Task
  - 実行されるコンテナタスク
- Service
  - Long run
  - Schedule(サービス数を維持)
  - ELB との連携

## Network

- Task に ENI が付与される(Task ENI)
  - Image の Pull、ログ送出のために必要
    - Internet GW 経由か、VPC エンドポイント経由

## Permission

- Cluster Permission
- Applicetaion Permission
- Housekeeping Permission
  - コントロールプレーンに許可したいパーミッション
    - ECR Image Pull
    - CloudWatch Logs Push
    - ENI Creation

## Storage

- コンテナのストレージは 10GB

## Fargate vs EC2

- EC2 のほうがいい場合
  - Windows Continers
  - GPU Support
  - docker exec のデバッグ
  - Spot, Ri ベースの価格モデル適用

## Fargate vs Lambda

- Lambda の方がいい場合
  - イベントドリブン
  - ミリ秒単位のコンピュート
  - ランタイム管理をしたくない
  - 分散バッチコンピューティング

## Auto Scalling

- なにかのメトリクスに応じてコンテナの数をスケールさせたい
  -> Targate tracking と Fargate の連携がおすすめ

## Reference

- [【AWS Black Belt Online Seminar】AWS Fargate - YouTube](https://www.youtube.com/watch?v=rwwOoFBq2AU&feature=youtu.be)
- [20190925 AWS Black Belt Online Seminar AWS Fargate](https://www.slideshare.net/AmazonWebServicesJapan/20190925-aws-black-belt-online-seminar-aws-fargate)
