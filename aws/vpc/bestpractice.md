# Deepdive

## VPC 内からの VPC 外のサービスにアクセス

- S3, DynamoDB ... VPC Endpoint (Gateway 型)
- ELR ... VPC Endpoint(Interface 型)
- Cognito ... NAT Gateway
- インターネット ... NAT Gateway

## オンプレから VPC 外のサービスにアクセス

オンプレ - DirectConnect - VGW 以降の経路の話

- S3, DynamoDB ... Proxy on EC2 経由 - VPC Endpoint (Gateway 型)
- VPC Endpoint(Interface 型)に対応しているやつ ... VPC Endpoint(Interface 型)にそのまま
- VPC 未対応サービス ... VPC Endpoint(Interface 型) -Private Link - NLB - Proxy on EC2 経由 - NAT Gateway
- VPC 未対応サービス, 別リージョン ... Public VIF で接続

## Route53

オンプレ- AWS 間の、Route53 に対して DNS 解決をしたい

- 以前は Simple AD
- 今は、Route 53 Resolver Endpoint を使う
  - Inbound Endpoint
    - オンプレの DNS リゾルバからはココに飛ばすように設定しておく
  - Outbound Endpoint
    - Oudbound ルールにオンプレ側のアドレスを行うこと

## Reference

- [「ネットワークデザインパターン Deep Dive」 | AWS Summit Tokyo 2019 - YouTube](https://www.youtube.com/watch?v=6I7jQOLOiWY)
