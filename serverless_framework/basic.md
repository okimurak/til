## 基本

### デプロイ

```bash
serverless deploy --stage <ステージ>
```

`--stage`が必須なことに注意(何もない場合は`prod`を指定)

### ローカル実行

```bash
serverless invoke local -f hogehogeFunctionName -p <Input Path>
```

`-p`には AWS Lambda の場合は、Event 用の JSON を指定する
