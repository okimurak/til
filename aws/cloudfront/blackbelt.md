# CloudFront

## Edge Services

いっぱいある

- Route53
- Global Accelerator
- CloudFront

## Edge Location

- 176 エッジロケーション
- 11 リージョナルエッジキャッシュ
- TCP-BBR を導入したみたい

## CDN

地理的に分散したエッジサーバからコンテンツをキャッシュしたり、代理配信するサービス

## 割当

CloudFront DNS がエッジサーバを返して、エッジサーバの情報を得る

また、リージョナルキャッシュを噛まして、更にオリジントラフィックを減らして効率化

## コンテンツ配信の流れ

1. S3, ALB EC2, オンプレに有る HTTPS サーバなどのオリジンサーバを設定
2. ファイルをオリジンサーバにアップロード
3. CloudFront ディストリビューションを作成
4. CloudFront がドメイン名を割り当て
5. ディストリビューションの構成をすべてのエッジロケーションに送信

## ディストリビューション

- ドメインごとに割り当てられる CloudFront の設定
- コンソールか API で作成可能
- 40Gbps か 100000RPS、超える場合は上限緩和申請
- HTTP/1.0, HTTP/1.1, HTTP/2, WebSocket 対応
  - Origin はインターネット経由必須
- IPv6 対応
- デフォルトでは `xxxx.cloudfront.net`がディストリビューションのドメイン名
  - CNAME エイリアスを利用して代替ドメイン名の指定可能
    - 有効な SSL/TLS 証明書の対象であることが必要
  - CNAME エイリアスのワイルドカード指定もサポート
  - Route 53 と組み合わせた Zone Apex も利用可能

### gzip 圧縮

コンテンツを gzip 圧縮して高速配信できる

### キャッシュコントロール

- 単一ファイルサイズのキャッシングは 20GB まで
- URL パス毎に期間指定可能
- フォワードオプション機能による動的ページ配信
  - Header, Cookie, Query Strings

### キャッシュコントロールヘッダー

- キャッシュコントロールが可能
- ヘッダーを付与しない場合でも上書き可能
- キャッシュ動作(behavior)毎に設定することで URL パス毎にキャッシュ時間を変えることができる(最大 24 時間)

### キャッシュ無効化

コンテンツごとに無効化(Invalidation)できる。最大 3000 個まで 1 分程度で、ワイルドカード指定もサポート

### 動的コンテンツ

- オリジンサーバに対して、Header, Cookie, Query Strings 情報をフォワードすることで動的ページにも配信することができる
  - Header
    - 必要最低限のヘッダーを指定する
  - Cookie
  - Query Strings
    - パラメータの順序、大文字小文字を常に統一

### カスタムエラーページ

S3 と組み合わせて、4XX や 5XX 発生したときに S3 からコンテンツを返すことができる

- 読み取りタイムアウト
- キープアライブタイムアウト

### オリジンフェイルオーバー

- オリジングループを作成して、フェイルオーバーできる
  - プライマリオリジン、セカンダリオリジンを指定する

### SSL 証明書

- デフォルトは `cloudfront.net` の証明書
- 独自 SSL 証明書

  - X.509 PEM
  - ACM
  - SNI(Server Name Indication) SSL 証明書
    - CloudFront の専用 IP を負担しなくていい
    - 一部のブラウザは SNI 拡張をサポートしていない
  - 専用 IP アドレス SSL 証明書
    - 上限緩和申請が必要
    - 追加課金

- クライアントと CloudFront 間の事前定義された SSL/TLS プロトコルと Cipher をサポート
- CloudFront とオリジンの通信方式も選択可能
  - カスタムオリジンのみ

### オリジンカスタムヘッダー

エッジからオリジンサーバへの通信でカスタム HTTP ヘッダーを追加できる

### 地域制限 (Whitelist / Blacklist)

地域情報をもとにエッジでアクセス判定
制限されている場合は 403

### 署名付き URL/Cookie

プライベートなコンテンツを配信可能

認証していない場合は 403 を返す

単一コンテンツの場合は、署名付き URL、複数コンテンツの場合は Cookie を推奨

### オリジンサーバの保護

- S3 の場合
  - OAI
- カスタムオリジン
  - オリジンカスタムヘッダーを利用
    - ALB のホストヘッダーのルーティングルールでチェック可能
  - CloudFront が利用する IP アドレスのみの許可とする

### WAF 連携

WebACL を CloudFront ディストリビューションに適用できる

XSS, GEO 制限など。ブロック時は 403 を返す

### Report & Loging

CLoudfront の傾向分析として利用できるパラメータ

- Cache Statics
  - 全リクエストとかヒット率とか Http ステータス
- Popular Objects
  - リクエストの多い Top 50
- Top Referrers
  - ディストリビューション毎のリクエストの多い Top 25
- Usage
  - ディストリビューション、アクセス元リージョンごとの
    - リクエスト数
- Viewrs
  - デバイス、ブラウザ、OS など

アクセスログも取得可能、S3 に出力できるがラグが有る（26 種類）
-> Athena や QuickSight に利用できる(傾向分析)

### Alart

CloudWatch(バージニアリージョン)に通知

### DNS 名前解決の高速化

Route53 と連携して CNAME ではなく、A レコード + エイリアスにするクエリ回数削減

### オリジンキャッシュ自動キャッシュの無効化

S3 のアップロードに連動した Lambda から Invalidation を発行して設定する

## Lambda@Edge

ざっくりは Clout Front + Lambda

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
  - ヘッダー Cookie クエリ文字列にもどついて複数のオリジンへ動的ルーティング

- コンテンツ生成

  - 画像リサイズ 、HTMl ページ生成
  - A/B テスト

- セキュリティ
  - 認証
  - HSTS/CSP セキュリティヘッダ付与

## 料金

- データアウト転送
- リクエスト
- 専用 IP 独自 SSL 証明書
- オリジンへのデータ転送アウト
- CloudFront へのデータ転送アウト
  - 0 USD
- 無効リクエスト
  - 1000 ファイルまで追加料金無し

### 料金クラス

料金クラスを指定することで、安価なエッジロケーションのみを利用した配信が可能
-> 安いクラスは使えないエッジロケーションもあるので、配信速度の影響があるため

## Reference

- [[AWS Black Belt Online Seminar] Amazon CloudFront の概要 - YouTube](https://www.youtube.com/watch?v=mmRKzzOvJJY)
- [20190730 AWS Black Belt Online Seminar Amazon CloudFront の概要](https://www.slideshare.net/AmazonWebServicesJapan/20190730-aws-black-belt-online-seminar-amazon-cloudfront)
