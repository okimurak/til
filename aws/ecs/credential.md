# Credential

## ECSon EC2
EC2のcredential情報を参照する

## Taskの場合

Task実行ロールにCredentialが付与される。このときcredentialのタイプは `container-role`になる。

- [タスク用の IAM ロール - Amazon Elastic Container Service](https://docs.aws.amazon.com/ja_jp/AmazonECS/latest/developerguide/task-iam-roles.html)
- [ECS/Fargate 上のコンテナで使われている AWS Credentials を調べる - Qiita](https://qiita.com/moaikids/items/6481e1027facb5f096bc)