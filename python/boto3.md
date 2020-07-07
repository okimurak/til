# boto3

AWSのSDKライブラリ

- [Official](https://aws.amazon.com/jp/sdk-for-python/)
- [Document](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)


## Credentialについて

boto.clientを作成時、下記優先度で読み込まれる

1. `boto.client()`の引数
2. `boto.session()`の引数
3. 環境変数
4. `~/.aws/credentials`
5. `~/.aws/config`
6. Assume Role provider (Assume RoleするRole名指定必要かも)
7. Boto2 設定ファイル (`/etc/boto.cfg`, `~/.boto`以下)
8. EC2のインスタンスメタデータ(インスタンスプロファイル)

ECSはcredentialは記載がないが、3の環境変数か6のAssume role時に読み込まれると思われる
[該当コード](https://github.com/boto/botocore/blob/develop/botocore/credentials.py#L70-L89)

- [Credentials — Boto 3 Docs 1.12.3 documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html)

## Error Handling

`botocore.exceptions`が例外の基底クラスなので、そこから派生するクラスはキャッチできる

- [Error handling — Boto3 Docs 1.14.17 documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/error-handling.html#botocore-exceptions)

ただし、それ以外の動的例外もあり、その場合は parse が必要

- [Error handling — Boto3 Docs 1.14.17 documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/error-handling.html#parsing-error-responses-and-catching-exceptions-from-aws-services)