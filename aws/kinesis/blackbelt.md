# Kinesis

ストリームデータを収集／処理するためのフルマネージドサービス郡

## 利用シナリオ
- データの収集とETL([Extract/Transform/Load](https://ja.wikipedia.org/wiki/Extract/Transform/Load))
- 継続的なメトリクス計算
- リアルタイム分析と応答s

## Kinesis Data Streams
ストリームデータを処理するためのアプリケーションを独自構築

### アーキテクチャ
- マルチAZの永続ストレージに強い整合性でデータを複製して、順序付きイベントストリームとして複数のアプリケーションに渡せる
  - S3
  - CloudWatch Alerm
  - EC2
  - Athena
  - EMR
  - DynamoDB

- データの種類や用途に応じて「ストリーム」作成
  - 1つ以上のシャードにて構成
    - 一意に識別されたデータレコードのシーケンス。ストリーム内のシャードの数を調整してスループットをコントロールする
  - 保存されるデータ単位を「データレコード」保持期間は24時間、最長7日間
    - 1データレコードの最大サイズは1MB
    - データ入力時に指定するパーティーションキーをハッシュして、どのシャードにするかを決めることで分散する
    - シーケンス番号がアサインされる。これで順序性が保たれる
  - キャパシティ
    - 送信側は1シャードあたり、1MBi/s or 1000 PUT レコード/s
    - 受信側は1シャードあたり、2MBi/s or 5回の読み取りトランザクション/s
    - ストリーム内のシャード数を増減sルウ琴で、スループットをコントロールする

[Amazon Kinesis Data Streams の用語と概念 - Amazon Kinesis Data Streams](https://docs.aws.amazon.com/ja_jp/streams/latest/dev/key-concepts.html)

### プロデューサー・コンシューマ

- プロデューサー
  - データ送信側
  - AWS SDK
  - Fluentd
    - pluginがある
  - CloudWatchEvents/Logs
  - Kinesis Agent
    - OSS のスタンドアロンjadaアプリ
    - 送信前のフォーマット変換、ログパースといった前処理や、送信前のバッファリングが可能
  - Kinesis Producer Library(KPL)
  - Iot
  - Kinesis Log4j Appender

- コンシューマ
  - Kinesis Firehose
  - Get API
  - Kinesis Analytics
  - Lamnda
  - EMR
  - Apache Storm

- 拡張ファンアウト
  - コンシューマにシャードあたり最大2MB/sのより森スループットを提供して向上させる機能。別料金

### 料金

- シャード時間 ... $0.0195
- PUT ペイロードユニット(1000000PUTs毎に) ... $0,0215
- 延長データ保持期間,シャード時間毎 ... $0.026
- 拡張ファンアウトでのデータ取り出し ... $0.0169 / GB
- 拡張ファンアウト、コンシューマのシャード時間毎 ... $0.0195

## Kinesis Firehose
ストリームデータをS3, Redshift, Elasticsearchへ配信

- 配信先に応じて配信ストリームを作成
- シャードの作成やパーティションキーの指定不要
- 1データレコードの最大サイズは1MB
- 制限なしにスケールするように
- プロデューサーが Kinesis Firehose のエンドポイントを指定する
- Kinesis Data Streamsから直接Firehoseへ送ることができる

### 料金

- 最初の500TB/月 ... $0.036
- 次の1.5PB/月  ... $0.031
- 次の3PB/月 ... $0.025
- 以降5PB/月 ... 相談

## Kinesis Analytics
ストリームデータを標準的なSQLクエリでリアルタイムに分析

- 分析単位の「アプリケーション」を作成し、入力／出力となる「ストリーミング ソース／デスティネーション」設定
- ストリーミング ソース／デスティネーションをアプリケーション内部の「入力／出力ストリーム」にマッピング
  - ストリーミング ソース／デスティネーションはKinesis Data StreamかKinesis Firehose
- SQLクエリ実行の前処理として、Lambdaの指定可能
  - データレコード情報の補間、フォーマット変換処理など
    - 前処理の結果は3種類のステータス
      - OK
      - Dropped
      - ProcessingFailed
    - ブループリントもいくつか提供している
    - [Preprocessing Data Using a Lambda Function - Amazon Kinesis Data Analytics for SQL Applications Developer Guide](https://docs.aws.amazon.com/kinesisanalytics/latest/dev/lambda-preprocessing.html)
- アプリケーション内部の入力ストリームを分析、結果を出力ストリームへ出力するSQLを記述

### 料金

KPUの平均量 / 時間 ... $0.110

- KPU(Kinesis Processing Unit)
  - 4GBのメモリ, 1vCPUのコンピューティング、対応するNWリソースで構成されるストリーム処理能力の単位
  - クエリの複雑性やメモリと計算能力の要求が応答によって異なるため、KPUが自動的かつ伸縮自在にスケールされるため

## Kinesis video Streams
分析、機械学習のためにビデオストリームをキャプチャ、処理、保存する

## Reference
- [AWS Black Belt Online Seminar 2017 Amazon Kinesis](https://www.slideshare.net/AmazonWebServicesJapan/aws-black-belt-online-seminar-2017-amazon-kinesis)