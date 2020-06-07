# AWS Web Application Firewall (WAF)

## WAF

ウェブアプリケーションの通信内容を検査して不正なアクセスを遮断するルールセットを持つセキュリティ対策  
XSS、CSRF、SQL インジェクションに対応している

## できること

- 悪意のあるリクエストをブロック
- カスタムルールに基づいた Web トラフィックのフィルタ
- モニタリング

## 利用できるサービス

- CloudFront
- Applicatoin Load Balancer
- API Gateway
- Kinesis Firehose ... ログ
- CLoudWatch ... ログ
- CloudFormatoin

古いのは WAF Classic と呼称されるらしいです（ALB みたい）

## 構成要素

### Web ACL

ルールを追加定義する。ステートメントに検査条件を定義て、アクションによってリクエストの処理方法を指定する

Web Cappacity Unit がルールの制定する上限。またルールの優先度を指定可能

### ステートメント

以下を定義可能

- リクエスト元の国
- 送信元 IP アドレスの一致(CIDR で設定)
- サイズ
- SQL injection
- XSS injection
- 文字列の一致
  - Header, HTTP method Query String, URI Body がマッチしているか
  - Contains Exact Begins with Ends with Contains word という条件で判別できる
- 正規表現パターン

また、テキストを変換できる

- lowercase
- HTML decode
- 空白の正規化
- Simplify command line
  - OS のコマンドを挿入した際に。異常なフォーマットを使用して偽装されるのを防ぐ
- URL decode

### レートベースのルール

5 分間あたりの同一 IP アドレスからのリクエスト数が設定したしきい値を超えたら Block / Count する

リクエストレートリミットを設定する

### WAF Capacity Unit (WCU)

Web ACL の WCU 上限は 1500

設定するルールによって消費される WCU は異なる

### ルールグループ

複数のルールを組み合わせたルールグループを定義することが可能

オーバーライドも可能

### Metrics

ルールがそのままメトリクスになる

## AWS Managed Rules for AWS WAF (AMR)

AWS が管理しているルール

## API

JSON 形式でルールを指定するように変わった。IAM みたい

## AWS WAF Full Logs

Kinesis Fata Firehose を介して、JSON 形式でログを送出できる

- S3
- Redshift
- ElasticSearch
- 3rd paty

## カスタムエラーページ

CloudFront の"Custom Error Response"から設定可能

## パートナーマネージドルール

AWS MarcketPlace でパートナー提供のマネージドルールグループをサブスクライブすることで、AWS WAF から利用できる
Trend Mifro とかある

## 導入ステップ

Count Mode でテストを実施してから Block モードへ変更する

## 料金

- Web ACl \$5/月
- ルール ... 1 ルール \$1/月
- リクエスト \$0.6/月/1,000,000 リクエスト

## Reference

- [【AWS Black Belt Online Seminar】AWS WAF アップデート - YouTube](https://www.youtube.com/watch?v=4KbCJAjiA3A)
- [20200324 AWS Black Belt Online Seminar AWS WAF アップデート](https://www.slideshare.net/AmazonWebServicesJapan/20200324-aws-black-belt-online-seminar-aws-waf)
