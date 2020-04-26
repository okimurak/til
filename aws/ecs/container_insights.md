# Container Insights
タスクやコンテナレベルでメトリクスやログを取得して CloudWatchで確認できる。
自動でダッシュボードが作られる（タスク単位、サービス単位、コンテナ単位）

## CloudWatch Insight
取得したメトリクスやログに対して、クエリ投げられる

サンプルクエリもあるよ

## X-Rayトレースの表示
サイドカーとして、X-Rayデーモンを実行するコンテナを配置する

## 利用開始方法
設定有効化

- 既存クラスタはCLIから (1.16.200以降)
- 新規作成はチェックする

### オプトイン
Account Settingsから設定する。対象のアカウントやユーザやロールを指定できる

## パフォーマンスログ
カスタムメトリクスとして、クラスタ、サービス、タスク、コンテナ単位で CloudWatchLogs に出力される

出力先
  - `/aws/ecs/containerinsights/<Cluster name>/performance`
  - `/aws/containerinsights/<Cluster name>/performance`

## 料金
独自の費用は発生しないがCloudWatchの費用がかかる

- カスタムメトリクス
- CloudWatchLogs費用

# Reference
- [【AWS Black Belt Online Seminar】Amazon CloudWatch Container Insights で始めるコンテナモニタリング入門 - YouTube](https://www.youtube.com/watch?v=-w1nb99hxz8&feature=youtu.be)
- [20191127 AWS Black Belt Online Seminar Amazon CloudWatch Container In…](https://www.slideshare.net/AmazonWebServicesJapan/20191127-aws-black-belt-online-seminar-amazon-cloudwatch-container-insights)