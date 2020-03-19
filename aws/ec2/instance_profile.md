# インスタンスプロファイル

EC2の起動時に設定できるロールの設定のこと  
今まではEC2用のユーザを作って、設定する必要があったが、これをする必要がなくなった  
これはEC2の起動中にもアタッチできる


EC2にインスタンスプロファイルを設定すると、`aws configure list`を実行すると`Type`が`iam-role`になる

```shell
aws configure list
### 実行結果
Name                    Value             Type    Location
      ----                    -----             ----    --------
   profile                <not set>             None    None
access_key     ****************467A              env
secret_key     ****************nzkd              env
    region                <not set>             None    None
```

## 参考

- [Amazon EC2 インスタンスで実行されるアプリケーションに IAM ロールを使用してアクセス許可を付与する](https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html)

- [インスタンスメタデータからセキュリティ認証情報を取得する](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#instance-metadata-security-credentials)