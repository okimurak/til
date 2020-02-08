# awsのcredentialを確認する

aws configure list
    
    ### 実行結果
    Name                    Value             Type    Location
          ----                    -----             ----    --------
       profile                <not set>             None    None
    access_key     ****************467A              env
    secret_key     ****************nzkd              env
        region                <not set>             None    None


## Type

- envなら環境変数
- configなら.awsconfig
- iam-roleなら、インスタンスプロファイル（こっち推奨らしい）

## 参考

[AWS CLIで使える認証情報とオプションの設定方法まとめ | Developers.IO](https://dev.classmethod.jp/cloud/aws/how-to-configure-aws-cli/)