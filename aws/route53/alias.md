# エイリアスレコード

Route 53 独自の拡張機能。AWS リソースにトラフィックをルーティングできる。

## 対象サービス

- ELB
- S3
- CloudFront
- Elastic Beanstalk
- API Gateway
- AWS Grobal Accelerator

## ELB の場合

- ELB の DNS 名を指定する
- A レコードで作成する

## S3 の場合

- リージョンの Web エンドポイントのドメイン名を指定する。
- A レコードで作成する

## 参考

- [エイリアスレコードの値 - Amazon ルート 53](https://docs.aws.amazon.com/ja_jp/Route53/latest/DeveloperGuide/resource-record-sets-values-alias.html)
