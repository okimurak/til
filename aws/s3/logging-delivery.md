# ログの保存について

S3 には 他のバケットのログを格納したり、ELB のログを保存することができる

## 設定方法

基本的には ACL を `log-delivery` として付与する
また、設定は コンソールか、SDK、REST API 経由で設定する（CLI は無理）

### ELB から保存する場合の S3 バケットへの設定方法

以下の バケットポリシーを設定する。

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<elb-account-id>:root"
      },
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::<bucket-name>/*"
    }
  ]
}
```

※ <>の部分は置き換える。`<elb-account-id>` は以下を参照

- [Application Load Balancer のアクセスログ - Elastic Load Balancing](https://docs.aws.amazon.com/ja_jp/elasticloadbalancing/latest/application/load-balancer-access-logs.html#enable-access-logging)

## 参考

- [アクセスコントロールリスト (ACL) の概要 - Amazon Simple Storage Service](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/acl-overview.html#canned-acl)
- [プログラムでのログ記録の有効化 - Amazon Simple Storage Service](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/enable-logging-programming.html#grant-log-delivery-permissions-general)
