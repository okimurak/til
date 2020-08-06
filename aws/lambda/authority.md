# 権限について

Lambda には IAM ロールベースの権限と、リソースベースの権限 2 種類ある

基本的には、IAM ロールからリソースベースの権限を生成している

ただし、API(add-permission)別途リソースベースの権限を Lambda に追加できる。

```bash
aws lambda add-permission \
    --function-name "helloworld" \
    --statement-id "helloworld" \
    --principal "logs.region.amazonaws.com" \
    --action "lambda:InvokeFunction" \
    --source-arn "arn:aws:logs:region:123456789123:log-group:TestLambda:*" \
    --source-account "123456789012"
```

## 参考

- [AWS Lambda のリソースベースのポリシーを使用する - AWS Lambda](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/access-control-resource-based.html)
