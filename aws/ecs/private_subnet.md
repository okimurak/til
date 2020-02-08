# プライベートサブネットからECRへの接続経路

プライベートサブネットから、ECRへの接続経路は下記方法がある

- NAT GW - インターネットGW経由
- PrivateLink Endpoint
- VPC Endpoint

### 参考

- [Amazon ECR インターフェイス VPC エンドポイント \(AWS PrivateLink\) \- Amazon ECR](https://docs.aws.amazon.com/ja_jp/AmazonECR/latest/userguide/vpc-endpoints.html)

- [DockerイメージをECRからプライベートな接続で取得するにはPrivate Linkを使うべし - Qiita](https://qiita.com/blackriver/items/9389f36420ebaa0390bd)