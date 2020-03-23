# Deepdive

## VPC内からのVPC外のサービスにアクセス

- S3, DynamoDB ... VPC Endpoint (Gateway型)
- ELR ... VPC Endpoint(Interface型)
- Cognito ... NAT Gateway
- インターネット ... NAT Gateway

## オンプレからVPC外のサービスにアクセス
オンプレ - DirectConnect - VGW以降の経路の話

- S3, DynamoDB ... Proxy on EC2経由 - VPC Endpoint (Gateway型)
- VPC Endpoint(Interface型)に対応しているやつ ... VPC Endpoint(Interface型)にそのまま
- VPC未対応サービス ... VPC Endpoint(Interface型) -Private Link - NLB - Proxy on EC2経由 - NAT Gateway
- VPC未対応サービス, 別リージョン ... Public VIFで接続

# Route53

オンプレ- AWS間の、Route53に対してDNS解決をしたい

- 以前はSimple AD
- 今は、Route 53 Resolver Endpointを使う
  - Inbound Endpoint
    - オンプレのDNSリゾルバからはココに飛ばすように設定しておく
  - Outbound Endpoint
    - Oudboundルールに書く
    - 

# Reference