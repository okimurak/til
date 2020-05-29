# IAM Role setting for Serverless Framework

## 大前提

公式が`Administrator Access`を推奨しており、良くないため、IAM で多少リソースを絞りましょうっていう話

## 最低限必要なアクション

ServerlessFramework では内部的に、CloudFormation を使っている

```
                "cloudformation:CancelUpdateStack",
                "cloudformation:ContinueUpdateRollback",
                "cloudformation:CreateChangeSet",
                "cloudformation:CreateStack",
                "cloudformation:CreateUploadBucket",
                "cloudformation:DeleteStack",
                "cloudformation:Describe*",
                "cloudformation:EstimateTemplateCost",
                "cloudformation:ExecuteChangeSet",
                "cloudformation:Get*",
                "cloudformation:List*",
                "cloudformation:UpdateStack",
                "cloudformation:UpdateTerminationProtection",
                "cloudformation:ValidateTemplate",
                "events:DeleteRule",
                "events:DescribeRule",
                "events:ListRuleNamesByTarget",
                "events:ListRules",
                "events:ListTargetsByRule",
                "events:PutRule",
                "events:PutTargets",
                "events:RemoveTargets",
                "lambda:*",
                "logs:CreateLogGroup",
                "logs:DeleteLogGroup",
                "logs:DescribeLogGroups",
                "logs:DescribeLogStreams",
                "logs:FilterLogEvents",
                "logs:GetLogEvents",
                "logs:PutSubscriptionFilter",
                "states:CreateStateMachine",
                "states:DeleteStateMachine"
```

残り許可するのは Lambda と連携する AWS のマネージドサービスがどれかという問題

- S3
- DynamoDB
- EC2 (ENI 使う場合とか)
- Kinesis
- SNS
- IAM (他でコード管理しているなら、あまり追加したくない)
- API Gateway
- SQS
- SSM
  - Secure Stringならば KMS も

```
"ssm:GetParameter"
"kms:GetPublicKey"
"kms:Decrypt"
```

## Reference

- [Serverless インストールから Lambda へのデプロイ](<(https://qiita.com/jumjamjohn/items/abbc060fd2c1c6791ef3)>)
- [ServerlessBot IAMCredentials.json(公式ブログの GithubGist)](https://gist.github.com/ServerlessBot/7618156b8671840a539f405dea2704c8)
- [Serverless Framework: Minimal IAM role Permissions](https://medium.com/@dav009/serverless-framework-minimal-iam-role-permissions-ba34bec0154e)
