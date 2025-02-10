# AWS CLI の Credential

```bash
aws configure list

### 実行結果
Name                    Value             Type    Location
----                    -----             ----    --------
profile                <not set>             None    None
access_key     ****************467A              env
secret_key     ****************nzkd              env
region                <not set>             None    None
```

## Type

- envなら環境変数
- config なら `.aws/config`
- iam-roleなら、インスタンスプロファイル

## Priority

1. CLI オプション (--region, --profile, --output など)
2. 環境変数
3. ロールの継承(assume-role)
4. Web ID によるロールの継承(assume-role-with-web-identity)
5. IDc (SSO とか)
6. 認証情報ファイル(`~/.aws/credentials`, `C:\Users\USERNAME\.aws\credentials`)
7. カスタムプロセス(別のサードパーティの方法で認証情報を生成する。リスクあるので注意)
8. 設定ファイル
9. コンテナ認証情報(タスク IAM ロール, AWS_CONTAINER_CREDENTIALS_FULL_URI より取得)
10. インスタンスプロファイル (EC2 メタデータより取得)

## 参考

- [AWS CLI での設定と認証情報ファイル設定 - AWS Command Line Interface](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-configure-files.html)
- [AWS CLIで使える認証情報とオプションの設定方法まとめ | Developers.IO](https://dev.classmethod.jp/cloud/aws/how-to-configure-aws-cli/)
- [AWS CLI の認証とアクセス認証情報 - 設定と認証情報の優先順位](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-chap-authentication.html#cli-chap-authentication-precedence)
