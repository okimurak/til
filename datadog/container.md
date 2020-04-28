# datadog Agent
対象のメトリクスを収集して、Datadogへ送信するためのエージェントツール

## Fargateインテグレーションのセットアップ
[Integration Setup for ECS Fargate](https://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate/?tab=redisawscli)

docker labelを付与する必要がある

```json
  "dockerLabels": {
    "com.datadoghq.ad.instances": "[{\"host\": \"%%host%%\", \"port\": <Port Number>}]",
    "com.datadoghq.ad.check_names": "[\"<Name>\"]",
    "com.datadoghq.ad.init_configs": "[{}]"
  }
```

### 環境変数
- DD_API_KEY ... APIキー
- DD_AC_EXCLUDE ... メトリクスを取らないコンテナ名や、イメージ名を指定できる。
  - 例えば Fargate だと、`fg-agent` という内部コンテナがたくさんいて、それらも取得してしまうらしい
  - [Add internal Fargate container to ignore list · Issue #2722 · DataDog/datadog-agent](https://github.com/DataDog/datadog-agent/issues/2722)
- ECS_FARGATE ... Fargateの場合は True にする
  - これを設定した時点で、fg-agent　取らない様にできればいいのに。。

## タグの割り当て
[Assigning Tags](https://docs.datadoghq.com/tagging/assigning_tags/?tab=agentv6v7)

### 環境変数
- DD_DOCKER_LABELS_AS_TAGS ... docker label をタグとして抽出する
- DD_CHECKS_TAG_CARDINALITY ... タグをメトリクスに追加する
