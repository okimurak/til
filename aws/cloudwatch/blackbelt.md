# Black Belt

リソース、アプリケーション、オンプレミスのモニタリングサービス

## Metrics
- メトリクス
  - 時系列のデータポイントのセットと定義

- 名前空間
  - メトリクスのコンテナ
  - 異なる名前空間は切り離される

- ディメンション
  - メトリクスを一意に識別する名前(InstanceID)/メトリクス


- pxx(p40とか)はパーセンタイルのこと

### Metric Math
関数を使用して、新しいメトリクスを作成

### スナップショット裏府
CloudWatchのGetMetricWigetImage APIを使うことでPNG画像を取得可能  
チケットアプリやメールへの添付に使える

### Custom Metric
CLI経由で登録できる

### Support Procotol
StatsD, collectd, procstatに対応

## CloudWatchAlarms

- INSUFFICIENT_DATA .. データ不足のため、状態を判別できない状態

### データの欠落
4種類の挙動を設定できる

### Action

- SNS
- EC2
  - リブート、Auto Recovery

- EC2 Auto Scaling

### Billing Alarm
必須。

## CloudWatchLogs

### MetricsFilter
正規表現が使えない

### サブスクリプションフィルタ
フィルタパターンに応じて、他のストリームへ転送できる

- Lambda
- Kinesis Data Firehose
  - Apache Hiveフォーマットにかける
  - 継続的な配信にはこっち

### Export
一時的なデータの保存に便利

## CloudWatchLogs Insight
専用のクエリ言語を使ってログフィールドの検出を提供

- @message
- @timestamp
- @logStream

ただし、VPC, Route53, Lambdaは更にフィールドを提供している

```
field ログフィールドを指定
filter フィルター
stats 統計関数を用いて計算
sort 並び替え.Descで逆順
limit ログイベント数の上限
parse データを抽出
```

## CloudWatch Dashboards


### Wiget
- 折れ線
- スタックエリア
- 数値
- Text
  - Markdownで書ける
- Logs InsightsのQuery結果

### API/CLi

get-dashboardで取得し、put-dashboardでコピーできる

### Automated dashboard
ベストプラクティスに基づいたダッシュボードを自動生成

## CloudWatchEvent

Timebaseが定期実行の形式

### イベントバス
他のAWSアカウントと送受信するAWSアカウントを指定可能

### AWS Healthとの連携

