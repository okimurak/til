# AWS WAF
## WAF
ウェブアプリケーションの通信内容を検査して不正なアクセスを遮断するルールセットを持つセキュリティ対策  
XSS、CSRF、SQLインジェクションに対応している

## できること
- 悪意のあるリクエストをブロック
- カスタムルールに基づいたWebトラフィックのフィルタ
- モニタリング

## 利用できるサービス
- CloudFront
- Applicatoin Load Balancer
- API Gateway
- Kinesis Firehose ... ログ
- CLoudWatch ... ログ
- CloudFormatoin

古いのはWAF Classicと呼称されるらしいです（ALBみたい）

## 構成要素
### Web ACL
ルールを追加定義する。ステートメントに検査条件を定義て、アクションによってリクエストの処理方法を指定する

Web Cappacity Unitがルールの制定する上限。またルールの優先度を指定可能

### ステートメント
以下を定義可能

- リクエスト元の国
- 送信元IPアドレスの一致(CIDRで設定)
- サイズ
- SQL injection
- XSS injection
- 文字列の一致
  - Header, HTTP method Query String, URI Bodyがマッチしているか
  - Contains Exact Begins with Ends with Contains wordという条件で判別できる
- 正規表現パターン

また、テキストを変換できる
- lowercase
- HTML decode
- 空白の正規化
- Simplify command line
  - OSのコマンドを挿入した際に。異常なフォーマットを使用して偽装されるのを防ぐ
- URL decode

### レートベースのルール
5分間あたりの同一IPアドレスからのリクエスト数が設定したしきい値を超えたら Block / Countする

リクエストレートリミットを設定する

### WAF Capacity Unit (WCU)
Web ACLのWCU上限は1500

設定するルールによって消費されるWCUは異なる

### ルールグループ
複数のルールを組み合わせたルールグループを定義することが可能

オーバーライドも可能

### Metrics

ルールがそのままメトリクスになる

## AWS Managed Rules for AWS WAF (AMR)
AWSが管理しているルール

## API
JSON形式でルールを指定するように変わった。IAMみたい

## AWS WAF Full Logs
Kinesis Fata Firehoseを介して、JSON形式でログを送出できる
  - S3
  - Redshift
  - ElasticSearch
  - 3rd paty

## カスタムエラーページ

CloudFrontの"Custom Error Response"から設定可能

## パートナーマネージドルール
AWS MarcketPlaceでパートナー提供のマネージドルールグループをサブスクライブすることで、AWS WAFから利用できる
Trend Mifroとかある

## 導入ステップ

Count Modeでテストを実施してからBlockモードへ変更する

## 料金

- Web ACl $5/月
- ルール ... 1ルール $1/月
- リクエスト $0.6/月/1,000,000リクエスト

## Reference
- [【AWS Black Belt Online Seminar】AWS WAF アップデート - YouTube](https://www.youtube.com/watch?v=4KbCJAjiA3A)
- [20200324 AWS Black Belt Online Seminar AWS WAFアップデート](https://www.slideshare.net/AmazonWebServicesJapan/20200324-aws-black-belt-online-seminar-aws-waf)