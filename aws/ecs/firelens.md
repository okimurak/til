# Firelens

ECS のサイドカーとして標準出力をログ管理をするソフトウェア(fluentd, Fluentbit)に送信するためのログドライバー

送信した後別のサービスに送信するバイパスになる

## 送信先

- fluentd
- CloudWatch
- kinesis firehose
- datadog
- New Relic
- sumo logic

(他にもあるかも)

## 設定方法

タスク定義にサイドカーとして設定する。(dependsOn をつけておいたほうが無難)

### fluent-bit

```json
{
  "containerDefinitions": [
    {
      "cpu": 0,
      "essential": true,
      "image": "XXXXXXXXXX.dkr.ecr.ap-northeast-1.amazonaws.com/sample-app:latest",
      "logConfiguration": {
        "logDriver": "awsfirelens",
        "options": {
          "Name": "cloudwatch",
          "region": "ap-northeast-1",
          "log_group_name": "/ecs/firelens-example",
          "log_stream_prefix": "batch"
        }
      },
      "mountPoints": [],
      "name": "sample-app",
      "portMappings": [],
      "volumesFrom": []
    },
    {
      "name": "log-router",
      "image": "906394416424.dkr.ecr.ap-northeast-1.amazonaws.com/aws-for-fluent-bit:latest",
      "essential": true,
      "firelensConfiguration": {
        "type": "fluent-bit",
        "options": {
          "config-file-type": "file",
          "config-file-value": "/fluentd/etc/fluentd-custom.conf"
        }
      },
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "sample-app",
          "awslogs-region": "ap-northeast-1",
          "awslogs-stream-prefix": "firelens"
        }
      },
      "memoryReservation": 50
    }
  ],
  "cpu": "256",
  "executionRoleArn": "arn:aws:iam::XXXXX:role/ecsTaskExecutionRole",
  "family": "firelens-sample",
  "memory": "512",
  "networkMode": "awsvpc",
  "placementConstraints": [],
  "requiresCompatibilities": ["FARGATE"],
  "taskRoleArn": "arn:aws:iam::XXXXX:role/ecsTaskRole",
  "volumes": []
}
```

### fluentd

[fluent-plugins-nursery/fluent-plugin-cloudwatch-logs](https://github.com/fluent-plugins-nursery/fluent-plugin-cloudwatch-logs)が必要になる。自作の際には必ず組み込む

```json
{
  "containerDefinitions": [
    {
      "cpu": 0,
      "dependsOn": [
        {
          "containerName": "log-router",
          "condition": "START"
        }
      ],
      "essential": true,
      "image": "XXXXXXXXXX.dkr.ecr.ap-northeast-1.amazonaws.com/sample-app:latest",
      "logConfiguration": {
        "logDriver": "awsfirelens",
        "options": {
          "@type": "cloudwatch_logs",
          "region": "ap-northeast-1",
          "log_group_name": "/ecs/firelens-example",
          "log_stream_name": "app",
          "auto_create_stream": "true"
        }
      },
      "mountPoints": [],
      "name": "firelens-sample",
      "portMappings": [],
      "volumesFrom": []
    },
    {
      "name": "log-router",
      "image": "XXXXXXXXXX.dkr.ecr.ap-northeast-1.amazonaws.com/custom-fluentd-image:latest",
      "essential": true,
      "firelensConfiguration": {
        "type": "fluentd",
        "options": {
          "config-file-type": "file",
          "config-file-value": "/fluentd/etc/fluentd-custom.conf"
        }
      },
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/firelens-example",
          "awslogs-region": "ap-northeast-1",
          "awslogs-stream-prefix": "fluentd"
        }
      },
      "memoryReservation": 50
    }
  ],
  "cpu": "256",
  "executionRoleArn": "arn:aws:iam::XXXXX:role/ecsTaskExecutionRole",
  "family": "firelens-sample",
  "memory": "512",
  "networkMode": "awsvpc",
  "placementConstraints": [],
  "requiresCompatibilities": ["FARGATE"],
  "taskRoleArn": "arn:aws:iam::XXXXX:role/ecsTaskRole",
  "volumes": []
}
```

タスク実行時、勝手に下記 conf を生成するみたい

```text
<source>
  @type unix
   path "/var/run/fluent.sock"
</source>
<source>
  @type forward
   bind "127.0.0.1"
  port 24224
</source>
<filter **>
  @type record_transformer
  <record>
    ecs_cluster arn:aws:ecs:ap-northeast-1:XXXXXXXXXXX:cluster/firelens_sample
    ecs_task_arn arn:aws:ecs:ap-northeast-1:XXXXXXXXXXX:task/firelens_sample/0bb8f14815514c6fb3d42685d23efd6e
    ecs_task_definition firelens-sample:20
  </record>
</filter>

<このブロックにカスタム configure の設定>

<match firelens-sample-firelens**>
  @type cloudwatch_logs
   log_group_name "/ecs/firelens-example"
   log_stream_name "app"
   region "ap-northeast-1"
</match>
```

### fluentd, fluent-bit の設定ファイル埋込

s3 か file を選択できる。s3 の場合は、S3 へのアクセス権限を付与する必要があり、file の場合はイメージに仕込んでおく必要がある

```json
      ...
      "firelensConfiguration": {
        "type": "fluent-bit",
        "options": {
          "config-file-type": "file",
          "config-file-value": "/fluentd/etc/fluentd-custom.conf"
        }
      },
      ...
```

## 出力例

### fluentbit

一番シンプルな設定で以下のような感じ。`ecs_cluster`, `ecs_task_arn`, `ecs_task_definition` は タスク定義の`firelensConfiguration`の `options` に `enable-ecs-log-metadata` を true にすると出る情報。なおデフォルト true

```json
{
  "container_id": "611e002a37a10066be0bc0320a85df7a448f090765cf50f6c298fb3817919591",
  "container_name": "/ecs-firelens-sample-11-firelens-sample-fca984cafab0fcd04b00",
  "ecs_cluster": "arn:aws:ecs:ap-northeast-1:XXXXXXXXXXX:cluster/firelens_sample",
  "ecs_task_arn": "arn:aws:ecs:ap-northeast-1:XXXXXXXXXXX:task/firelens_sample/dd406780f4394eb887a3edc656680e9a",
  "ecs_task_definition": "firelens-sample:11",
  "log": "Hello Shell World!",
  "source": "stdout"
}
```

### fluentd

何も conf を設定しないと下記のようになる。設定なしだと全く変わらない。ただし、プラグインと設定を自作できるのでこちらのほうが自由度は高いと思う

```json
{
  "source": "stdout",
  "log": "Hello Shell World!",
  "container_id": "1e4b30145b09b37b5a3c5f4f95aeb414a29b4ec428153e62abd8a9be2d0f07a6",
  "container_name": "/ecs-firelens-sample-24-firelens-sample-c4fdbf95fcf9fcb31b00",
  "ecs_cluster": "arn:aws:ecs:ap-northeast-1:XXXXXXXXXXX:cluster/firelens_sample",
  "ecs_task_arn": "arn:aws:ecs:ap-northeast-1:XXXXXXXXXXX:task/firelens_sample/c6eceb11b2da47bc98a63bfdbbadec66",
  "ecs_task_definition": "firelens-sample:24"
}
```

## 参考

- [Firelens の発表 – コンテナログの新たな管理方法 | Amazon Web Services ブログ](https://aws.amazon.com/jp/blogs/news/announcing-firelens-a-new-way-to-manage-container-logs/)
- [aws-samples/amazon-ecs-firelens-examples: Sample logging architectures for FireLens on Amazon ECS and AWS Fargate.](https://github.com/aws-samples/amazon-ecs-firelens-examples)
  - 実装例が載っている
