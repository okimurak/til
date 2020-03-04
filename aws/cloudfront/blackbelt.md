# CloudFront

## Edge Services
いっぱいある

- Route53
- Global Accelerator
- CloudFront

## Edge Location

- 176 エッジロケーション
- 11 リージョナルエッジキャッシュ
- TCP-BBRを導入したみたい

## CDN

地理的に分散したエッジサーバからコンテンツをキャッシュしたり、代理配信するサービス

## 割当

CloudFront DNSがエッジサーバを返して、エッジサーバの情報を得る

また、リージョナルキャッシュを噛まして、更にオリジントラフィックを減らして効率化

## コンテンツ配信の流れ

1. S3, ALB EC2, オンプレに有るHTTPSサーバなどのオリジンサーバを設定
2. ファイルをオリジンサーバにアップロード
3. CloudFront ディストリビューションを作成
4. CloudFrontがドメイン名を割り当て
5. ディストリビューションの構成をすべてのエッジロケーションに送信

## ディストリビューション

- ドメインごとに割り当てられるCloudFrontの設定
- コンソールかAPIで作成可能
- 40Gbpsか100000RPS、超える場合は上限緩和申請
- HTTP/1.0, HTTP/1.1, HTTP/2, WebSocket対応
  - Originはインターネット経由必須
- IPv6対応
- デフォルトでは `xxxx.cloudfront.net`がディストリビューションのドメイン名
  - CNAMEエイリアスを利用して代替ドメイン名の指定可能
    - 有効なSSL/TLS証明書の対象であることが必要
  - CNAMEエイリアスのワイルドカード指定もサポート
  - Route 53と組み合わせたZone Apexも利用可能

### gzip圧縮

コンテンツをgzip圧縮して高速配信できる

### キャッシュコントロール

- 単一ファイルサイズのキャッシングは20GBまで
- URLパス毎に期間指定可能
- フォワードオプション機能による動的ページ配信
  - Header, Cookie, Query Strings

### キャッシュコントロールヘッダー

- キャッシュコントロールが可能
- ヘッダーを付与しない場合でも上書き可能
- キャッシュ動作(behavior)毎に設定することでURLパス毎にキャッシュ時間を変えることができる(最大24時間)

### キャッシュ無効化
コンテンツごとに無効化(Invalidation)できる。最大3000個まで1分程度で、ワイルドカード指定もサポート

### 動的コンテンツ

- オリジンサーバに対して、Header, Cookie, Query Strings情報をフォワードすることで動的ページにも配信することができる
  - Header
    - 必要最低限のヘッダーを指定する
  - Cookie
  - Query Strings
    - パラメータの順序、大文字小文字を常に統一

### カスタムエラーページ

S3と組み合わせて、4XXや5XX発生したときにS3からコンテンツを返すことができる

- 読み取りタイムアウト
- キープアライブタイムアウト

### オリジンフェイルオーバー
- オリジングループを作成して、フェイルオーバーできる
  - プライマリオリジン、セカンダリオリジンを指定する


### SSL証明書

- デフォルトはcloudfront.netの証明書
- 独自SSL証明書
  - X.509 PEM
  - ACM
  - SNI(Server Name Indication) SSL証明書
    - CloudFrontの専用IPを負担しなくていい
    - 一部のブラウザはSNI拡張をサポートしていない
  - 専用IP アドレスSSL証明書
    - 上限緩和申請が必要
    - 追加課金

- クライアントとCloudFront間の事前定義されたSSL/TLSプロトコルとCipherをサポート
- CloudFrontとオリジンの通信方式も選択可能
  - カスタムオリジンのみ

### オリジンカスタムヘッダー
エッジからオリジンサーバへの通信でカスタムHTTPヘッダーを追加できる

### 地域制限 (Whitelist / Blacklist)

地域情報をもとにエッジでアクセス判定
制限されている場合は403

### 署名付き URL/Cookie

プライベートなコンテンツを配信可能

認証していない場合は403を返す

単一コンテンツの場合は、署名付きURL、複数コンテンツの場合はCookieを推奨

### オリジンサーバの保護

- S3の場合
  - OAI
- カスタムオリジン
  - オリジンカスタムヘッダーを利用
    - ALBのホストヘッダーのルーティングルールでチェック可能
  - CloudFrontが利用するIPアドレスのみの許可とする

### WAF　連携

WebACLをCloudFrontディストリビューションに適用できる

XSS, GEO制限など。ブロック時は403を返す

### Report & Loging

CLoudfrontの傾向分析として利用できるパラメータ
  - Cache Statics
    - 全リクエストとかヒット率とかHttpステータス
  - Popular Objects
    - リクエストの多いTop 50
  - Top Referrers
    - ディストリビューション毎のリクエストの多いTop 25
  - Usage
    - ディストリビューション、アクセス元リージョンごとの
      - リクエスト数
  - Viewrs
    - デバイス、ブラウザ、OSなど

アクセスログも取得可能、S3に出力できるがラグが有る（26種類）
-> AthenaやQuickSightに利用できる(傾向分析)

### Alart

CloudWatch(バージニアリージョン)に通知

### DNS名前解決の高速化

Route53と連携してCNAMEではなく、Aレコード + エイリアスにするクエリ回数削減

### オリジンキャッシュ自動キャッシュの無効化

S3のアップロードに連動したLambdaからInvalidationを発行して設定する

## Lambda@Edge

ざっくりはClout Front + Lambda

バージニアでマスタを作成する。
作成されたメトリクスは各エッジリージョン毎に作成されることに注意

### イベント

以下で設定可能
- ビューワリクエスト
- オリジンリクエスト
- オリジンレスポンス
- ビューワレスポンス

### ユースケース

- キャッシュヒット率の向上
  - キャッシュコントロールヘッダの変更
  - クエリ文字列、ユーザエージェントの正規化
  - ヘッダーCookie クエリ文字列にもどついて複数のオリジンへ動的ルーティング

- コンテンツ生成
  - 画像リサイズ 、HTMlページ生成
  - A/Bテスト

- セキュリティ
  - 認証
  - HSTS/CSPセキュリティヘッダ付与

## 料金

- データアウト転送
- リクエスト
- 専用IP独自SSL証明書
- オリジンへのデータ転送アウト
- CloudFrontへのデータ転送アウト .... $0
- 無効リクエスト
  - 1000ファイルまで追加料金無し

### 料金クラス
料金クラスを指定することで、安価なエッジロケーション飲みを利用した配信可能
-> 要は安いクラスは使えないエッジロケーションもあるので、配信速度の影響はある

## Reference

- [[AWS Black Belt Online Seminar] Amazon CloudFrontの概要 - YouTube](https://www.youtube.com/watch?v=mmRKzzOvJJY)
- [20190730 AWS Black Belt Online Seminar Amazon CloudFrontの概要](https://www.slideshare.net/AmazonWebServicesJapan/20190730-aws-black-belt-online-seminar-amazon-cloudfront)