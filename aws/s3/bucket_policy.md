# バケットポリシーを設定する

S3のアクセスポリシーをjson形式で指定できる

## IP制限

S3へのIPアドレス制限をしたい場合には、下記のポリシーを設定する

```
### ブラックリスト
{
    "Version": "2012-10-17",
    "Id": "S3PolicyAllowIPRestriction",
    "Statement": [
        {
            "Sid": "Stmt1459131295593",
            "Effect": "Deny",
            "Principal": "*",
            "Action": "s3:*",
            "Resource": "arn:aws:s3:::some-bucket/*",
            "Condition": {
                "NotIpAddress": {
                    "aws:SourceIp": "IPAdress"
                },
            }
        }
    ]
}

### ホワイトリスト
{
    "Version": "2012-10-17",
    "Id": "S3PolicyAllowIPRestriction",
    "Statement": [
        {
            "Sid": "Stmt1459131295593",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:*",
            "Resource": "arn:aws:s3:::some-bucket/*",
            "Condition": {
                "IpAddress": {
                    "aws:SourceIp": "IPAdress"
                },
            }
        }
    ]
}
```

### 参考

[S3を静的webホスティングで限定公開する。](https://qiita.com/yutako0217/items/2ab6423f524b283f46f2)