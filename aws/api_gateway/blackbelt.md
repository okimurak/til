## API Gateway

## API提供の課題

- インフラの管理
  - 可用性
  - スケーラビリティ

- APIの管理

- 認証と認可

- 流量制御と保護
  - スロットリング
  - DDOSからの防衛

## AWSサービスとして

- リージョン単位で起動
  - 起動でスケール
  - 使用量に応じた課金

- httpsのみ
  - httpを使う場合はCloudFrontを置く。レイテンシ発生するけど

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
  - VPC内のAWS PrivateLink(VPCエンドポイント)経由のみ


### 新規作成

- 既存APIのClone
- Swagger(2.0,3.0)
  - JSON, YAML両方可能

### メソッドの流れ

- メソッドリクエスト
- 統合リクエスト
- 統合レスポンス
  - バックエンドからのデータ変換
- メソッドレスポンス
  - HTTPのステータスコード、レスポンスヘッダの設定

## WebSocket
2回アクセスして接続
 - wss
 - https

- ルートリクエスト
- バックエンドへの接続設定

## 認証、認可
- IAM
  - AWS 署名 v4による認証
- Lambdaオーソライザー
  - Lamabdaに認証を委譲
  - Lambdaを実装する必要
  
- Cognitoオーソライザー

## 統合タイプ

- 29秒がタイムアウトリミット

- Lambda関数
- HTTP
  - publicで到達可能なエンドポイント
- Mock
- AWS Service
- VPC Link

## リクエストレスポンス変換

- VTL(Velocity template Language)を使ってマッピングテンプレートに設定する

## モデル

- バックエンドに投げることなくリクエストの検証ができる

## APIのキーと使用量プラン

- 使用量プラン
  - ステージに関連付ける
  - スロットリング
    - クライアント側
    - サーバ側
- APIキー
  - Key & Value
  - 使用量プランとの紐付けのため(**認証目的で使わないこと**)

## ログ

CLoudWatch Logsへ

- 実行ログ
- アクセスログ

Metricsは1分に1回

## カスタムドメイン

Route53でのDNSレコードの登録とSSL証明書が必要(例えばACM(Certificate Manager))

## キャッシュ

LRUによる容量管理。容量 x 時間単位で課金

## リソースポリシー

そのAPIに対する許可/拒否を設定できる

## カナリアリリース

デプロイ時にCanaryを作成し、メインのステージと流量の割合を指定できる

## WAF

WebACLを指定可能(L7レベルの保護になる)

## X-Ray

リクエストのトレースと分析、デバッグが可能

## クライアント証明書
API Gatewayからの証明書を発行できる
バックエンド開発者はその証明書に応じて、認可を実装してもらうことができる

## 料金
REST ... APIコール数, キャッシュメモリ量
WebSocket APi ... メッセージ要求数, 接続時間

## Reference
- [20190514 AWS Black Belt Online Seminar Amazon API Gateway](https://www.slideshare.net/AmazonWebServicesJapan/20190514-aws-black-belt-online-seminar-amazon-api-gateway)
