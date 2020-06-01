# API Gateway

REST や WebSocket API を作成して、AWS や AWS に保存しているデータや他の WEB サービスにアクセスすることができるサービス。
サーバレスインフラストラクチャの一部（フロントアプリ側）になる。認証も可能。

## API 提供の課題

- インフラの管理

  - 可用性
  - スケーラビリティ

- API の管理

- 認証と認可

- 流量制御と保護
  - スロットリング
  - DDOS からの防衛

## AWS サービスとして

- リージョン単位で起動

  - 起動でスケール
  - 使用量に応じた課金

- https のみ

  - http を使う場合は CloudFront を置く。レイテンシ発生するけど

- REST
  - ステートレス
- WebSocket
  - ステートフル
  - 一つのコネクションで継続的なデータ送受信が可能

### EndpointType

- エッジ最適化
- リージョン
  - レイテンシ削減
- プライベート
  - VPC 内の AWS PrivateLink(VPC エンドポイント)経由のみ

### 新規作成

- 既存 API の Clone
- Swagger(2.0,3.0)
  - JSON, YAML 両方可能

### メソッドの流れ

- メソッドリクエスト
- 統合リクエスト
- 統合レスポンス
  - バックエンドからのデータ変換
- メソッドレスポンス
  - HTTP のステータスコード、レスポンスヘッダの設定

## WebSocket

2 回アクセスして接続

- wss
- https

- ルートリクエスト
- バックエンドへの接続設定

## 認証、認可

### 認証

- IAM
  - AWS 署名 v4 による認証
    - [Signing Requests - Amazon API Gateway API Reference](https://docs.aws.amazon.com/apigateway/api-reference/signing-requests/)
    - [完全な 署名バージョン 4 署名プロセスの例 (Python) - AWS 全般のリファレンス](https://docs.aws.amazon.com/ja_jp/general/latest/gr/sigv4-signed-request-examples.html)
- Lambda オーソライザー

  - Lambda に認証を委譲
    - 実装する必要。（逆にいうと、自由にカスタムできる）

- Cognito オーソライザー
  - モバイル向け
  - Cognito のユーザプールを作成
    - Google アカウントなどのフェデレーションとかにも使える
    - ただし、Cognito へ認証する部分は実装必要
    - [Amazon Cognito ユーザープール をオーソライザーとして使用して REST API へのアクセスを制御する - Amazon API Gateway](https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/apigateway-integrate-with-cognito.html)
    - 構築例
      - [Amazon Cognito の認証情報を取得してみる～ API Gateway ＋ Lambda 編～ | MISO](https://www.tdi.co.jp/miso/amazon-cognito-api-gateway)
      - [世界に先駆けて AWS サーバレスアーキテクチャでユーザ認証と API 認可の実装をしてみた - Qiita](https://qiita.com/teradonburi/items/ef535d19c28a009552ec)
      - [APIGateway の IAM 認証付きの API を Javascript から叩く - Qiita](https://qiita.com/Fujimon_fn/items/5197e2e3db6de9a68401)

## 統合タイプ

- 29 秒がタイムアウトリミット

- Lambda 関数
- HTTP
  - public で到達可能なエンドポイント
- Mock
- AWS Service
- VPC Link

## リクエストレスポンス変換

- VTL(Velocity template Language)を使ってマッピングテンプレートに設定する

## モデル

- バックエンドに投げることなくリクエストの検証ができる

## API のキーと使用量プラン

### 使用量プラン

ステージに関連付ける

- スロットリング

  - レートとバーストを設定する
    - 秒間に受けられるリクエスト数
  - クライアント側
  - サーバ側

- クォータ制限
  - 指定した時間間隔の制限
    - 日(DAY)、週'Week)、月(Month)から選択できる

- [Amazon API Gateway のクォータと重要な注意点 - Amazon API Gateway](https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/limits.html)

### API キー

- Key & Value
- 使用量プランと紐付ける **認証目的で使わないこと**

## ログ

CLoudWatch Logs へ

- 実行ログ
- アクセスログ

Metrics は 1 分に 1 回

## カスタムドメイン

Route53 での DNS レコードの登録と SSL 証明書が必要(例えば ACM(Certificate Manager))

## キャッシュ

LRU による容量管理。容量 x 時間単位で課金

## リソースポリシー

その API に対する許可/拒否を設定できる

- AWS アカウント
- IP
- VPC, VPC エンドポイント

- [API Gateway リソースポリシーを使用して API へのアクセスを制御する - Amazon API Gateway](https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/apigateway-resource-policies.html)

- ARN は以下のようになっている

  ```text
  arn:aws:execute-api:region:account-id:api-id/stage-name/HTTP-VERB/resource-path-specifier
  ```

  - [API を呼び出すためのアクセスの制御 - Amazon API Gateway](https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html#api-gateway-iam-policy-resource-format-for-executing-api)

## カナリアリリース

デプロイ時に Canary を作成し、メインのステージと流量の割合を指定できる

## WAF

WebACL を指定可能(L7 レベルの保護になる)

## X-Ray

リクエストのトレースと分析、デバッグが可能

## クライアント証明書

API Gateway からの証明書を発行できる
バックエンド開発者はその証明書に応じて、認可を実装してもらうことができる

## 料金

- REST ... API コール数, キャッシュメモリ量
  - API コール数 100 万件、メッセージ 100 万、接続時間 750000 分は無料（月に）
  - 遊ぶくらいなら無料で使えてイイね
- WebSocket APi ... メッセージ要求数, 接続時間

[料金](<[https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/api-gateway-pricing.html](https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/api-gateway-pricing.html)>)

## Reference

- [20190514 AWS Black Belt Online Seminar Amazon API Gateway](https://www.slideshare.net/AmazonWebServicesJapan/20190514-aws-black-belt-online-seminar-amazon-api-gateway)
- [Amazon API Gateway とは?](<[http://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/welcome.html](http://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/welcome.html)>)
