# AWS Distro Open Telemetry

## Open Telemetry

以下 3 つのテレメトリデータを取得できる。

- Log (not GA)
- Metic
- Tracing

### Concept

[OTel Concepts](https://opentelemetry.io/docs/concepts/otel-concepts/) も参照のこと。

以下の要素がある。

- Span : 操作や仕事の単位を表す。つまり何をしたかどうかという。トレースの**構成要素** となり、Span = Trace ではない。(ただ、Trace ID は要素に含む)
- Trace : アプリケーションやユーザによるリクエスト時に起きたことのビッグピクチャー（青写真）を表す。実際に監視するユーザーが意識するのはココ。
  - Tracer Provider : Tracer の Factory. 初期化処理と思えば良い
  - Tracer : span を作る。このオブジェクトも初期化につくあられる。
  - Trace Exporter : Trace の consumer. 出力担当
  - Trace Context : Trace spans に関するメタデータ。サービスとプロセスの境界を超えた span 間の相関関係を提供する。
    - Context : 送受信サービス情報 1 つのスパンと全体のトレースに関連付ける情報を含んだオブジェクト。
    - Propagation : サービス、プロセス間で Context が移動するメカニズム。Span Context をシリアライズ、デシリアライズして、あるサービスから別のサービスに propergation される関連トレース情報
- Metric : サービスやランタイムの計測情報
- Logs : タイムスタンプのテキスト。イベントデータとかメトリックやトレースじゃないデータはすべてログ。
- Baggage : スパン間で渡されるコンテキスト情報のこと。A サービスにしかない情報を B サービスに渡したいときに使う。トレースコンテキスト内の key-value 値で、トレース内で作成されたすべての span で共有できる。Span attribute ではない

### Automatic Instrumentation

実装しなくても、簡単に OTel の機能を使えるライブラリ。最小限で使いたいとか、アプリケーションコードを変更したくないときに使える。

2022/05/27 現在、[Java](https://github.com/open-telemetry/opentelemetry-java-instrumentation) と [Python](https://opentelemetry.io/docs/instrumentation/python/automatic/) から提供されている。

### Collector

3 つの要素で構成。Fluent 系みたい。[Data Collection](https://opentelemetry.io/docs/concepts/data-collection/) も参照のこと。

- receivers : データを受信する。pull 型 push 型どちらも。
- processors : 受信したデータを加工する。
- exporterss : 受信したデータをどこかへ送信する。pull, push 型どちらでも。

基本的な設定は [Collector - Configuration](https://opentelemetry.io/docs/collector/configuration/) に。

ADOT の設定は

- ECS : [Understanding your Configurations](https://aws-otel.github.io/docs/getting-started/ecs-configurations/ecs-config-section)
- CloudWatch : [Using CloudWatch Metrics with AWS Distro for OpenTelemetry](https://aws-otel.github.io/docs/getting-started/cloudwatch-metrics)
- Prometheus : [Prometheus Remote Write Exporter Advanced Configurations for AMP](https://aws-otel.github.io/docs/getting-started/advanced-prometheus-remote-write-configurations)

## サービスアイコンを検出する

detector を設定する必要がある。

```yaml
processors:
  batch/traces:
    timeout: 1s
    send_batch_size: 50
  resourcedetection:
    detectors:
      - env
      - system
      - ecs
      - ec2
```

## カスタムファイルを読み込みたい

環境変数 AOT_CONFIG_CONTENT を使うと楽。
例えば SSM Parameter Store から読み込むとかできる。
(この場合、容量に注意)

## XRay トレースへのクエリ

XRay と Otel のトレース ID の仕様が違うので、変換している。

クエリ例(参考 : [フィルタ式を使用したコンソールでのトレースの検索 - AWS X-Ray](https://docs.aws.amazon.com/ja_jp/xray/latest/devguide/xray-console-filters.html))

```text
annotation.otel_resource_aws_ecs_task_arn = "arn:aws:ecs:ap-northeast-1:XXXXXXXXXXXXX:task/ADOT-Cluster/17c16bff68384ea48086451a48a28470"
```

## CloudWatch のメトリクスを送信

```yaml
  resource:
    attributes:
      - key: ClusterName
        from_attribute: aws.ecs.cluster.name
        action: insert
      - key: aws.ecs.cluster.name
        action: delete
      - key: ServiceName
        from_attribute: aws.ecs.service.name
        action: insert
      - key: aws.ecs.service.name
        action: delete
      - key: TaskId
        from_attribute: aws.ecs.task.id
        action: insert
      - key: aws.ecs.task.id
        action: delete
      - key: TaskDefinitionFamily
        from_attribute: aws.ecs.task.family
        action: insert
      - key: aws.ecs.task.family
        action: delete
      - key: ContainerName
        from_attribute: container.name
        action: insert
      - key: container.name
        action: delete   

exporters:
  awsxray:
    indexed_attributes: ["otel.resource.service.name", "otel.resource.aws.ecs.task.arn"]
  awsemf:
    namespace: ECS/ADOTContainerInsights
    log_group_name:  '/aws/ecs/containerinsights/{ClusterName}/performance'
    log_stream_name: '{TaskId}'
    resource_to_telemetry_conversion:
      enabled: true
    dimension_rollup_option: NoDimensionRollup
    metric_declarations:
      - dimensions: [[ClusterName, ServiceName, TaskId], [ClusterName, TaskId], [TaskId]]
        metric_name_selectors: 
          - TaskMemoryUtilized 
          - TaskMemoryReserved 
          - TaskCpuUtilized
          - TaskCpuReserved
          - TaskNetworkRxBytes
          - TaskNetworkTxBytes
          - TaskStorageReadBytes
          - TaskStorageWriteBytes
      - dimensions: [[ClusterName], [ClusterName, TaskDefinitionFamily, TaskId, ContainerName]]
        metric_name_selectors: [container.*]
```

dimensions を複数設定しており、そのとおりに出力される。

## 設定ファイルについて

どうやら、FluentBit などと一緒で filter で分割したメトリクスの attributes はそれぞれでしか使えない

```yaml
  resource/infra:
    attributes:
      - key: ClusterName
        from_attribute: aws.ecs.cluster.name

...

  awsemf/infra:
    namespace: ECS/ADOTContainerInsights
    log_group_name:  '/aws/ecs/containerinsights/{ClusterName}/performance' # ここは infra で attributes として追加しているから使えるが

...

  awsemf/app:
    namespace: ECS/ADOT/AppPrometheus
    log_group_name:  '/aws/ecs/containerinsights/{ClusterName}/prometheus' # ここは app で attributes として追加「していない」から使えない (undefined)
```


## Reference

- [Introduction | AWS Distro for OpenTelemetry](https://aws-otel.github.io/docs/introduction)
