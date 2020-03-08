# ELastic Load Balancing (ELB)

## 特徴

- スケーラブル
- 従量課金
- マネージド
- ほかサービスと連携が多い
- プロトコル
  - L7 (HTTP, HTTPS)
  - L4 (1-65535)

- リスナー
  - どんなプロトコルで受けるか
- ターゲット
  - 負荷分散する対象

## 種類

- Application Load Balancer
  - L7 HTTP, HTTPS, HTTPS/2
- Network Load Balancer
  - L4 TCP, UDP, TLS
- Classic Load Balancer
  - HTTP, HTPS, TCP
  - EC2-Classic, VPC

## 使い方
### Security Group

- ALB, CLBについては、設定できる

### Target

- インスタンスID
- Lambda関数(ALBのみ)
- IPアドレス(CLB以外)
  - オンプレにバランスも可能（Direct Connect必要だけども）

### ELBへのアクセス

DNS名推奨

### スケーラビリティ

2段階の分散
  - ELBの分散
     - 複数AZの場合クロスゾーン負荷分散が有効かどうか
       - NLBはデフォルト向こうのため注意
     - 急激に負荷が増えた場合、スケールするのに時間がかかるため、エラー発生する可能性がある(ALB, CLB))
       - Pre-Warmingの申請をサポートケースで
         - Business/Enterpriseサポートが必要
  - バックエンドへの負荷分散
   - ALB ... ラウンドロビン
   - NLB ... フローハッシュアルゴリズム

### ログ

5分感覚で取得可能。S3に履ける

### コネクション

無通信が続くと自動で説z団
- NLBは350秒固定
- ALB/CLBは自由に設定可能(デフォルト350, 1-4000)


### スティッキーセッション

同じユーザから来たリクエストをすべて同じEC2インスタンスに送信する。デフォルト無効

### SSL/TLS

  - 事前にセキュリティポリシーが定義されている
    - セキュリティポリシーのカスタマイズできるのはCLBのみ
  - TLSサーバ証明書 ... ACMを使えば簡単。DV。自動更新。

## ALB

### ルール

リクエストがどのように転送されるかという条件とアクションを定義できる

また、複数指定できる

### ルールの条件パターン
- パスベース
- ホストベース
- HTTPヘッダー
- HTTPメソッド
- クエリ文字列パラメータ
- 送信元IPアドレスCIDR

### ルールのアクション

- 転送アクション
- リダイレクト
- 固定レスポンスアクション
- Cognito認証アクション
  - Amazon Cognitoにリダイレクト
- OIDC認証アクション
  - Amazon, Google, Facebookとか

### ALB利用時のクライアントIPアクセスログ取得

- 通常はELBのアドレスを出力しているので
  - XForwarded-Forを出力する

## NLB
- 高可用性、高スループット、低レイテンシ
  - ウォームアップなしでOK
- Source IP/Portがターゲットまで保持
- 固定IP
  - AZ毎に一つ。すでに持っているEIPも利用可能

## CLB
使うときは以下のケース。だけど、ALBかNLBへの移行推奨

- EC2-Classicのサポート
- TCPSSLリスナーのサポート
- カスタムセキュリティポリシー

### Auto Scalingとの連携

### 動的ポートマッピング

ECSのタスクが動的に増えてもOK

NLBを使う場合は、セキュリティグループはECSに設定するが、ECS側で設定されるポートの範囲を意識する必要がある
  - `/proc/sys/net/ipv4/ip_local_port_range`で設定する

### AWS WAF
ALBのみ連携可能

- リクエストレートによるアクセス権限
- 特定のIPアドレス、地域からブロック
- クロスサイトスクリプティング、SQLインジェクションからの保護
- HTTPヘッダー、本文、URI文字列に対するサイズ成約、正規表現でのマッピング

### Global Accelerator との連携

ALB, NLBが使える。エンドポイントにALB, NLBを指定できる

## 料金

- ALB
  - 1時間毎に課金
     - 1つに付き1時間毎に0.0243
     - 1 LCU 1時間毎に$0.008
- NLB
  - 1時間毎に課金
     - 1つに付き1時間毎に0.0243
     - 1 LCU 1時間毎に$0.006
       - ALBとLCUの定義が異なる
- CLB
  - $0.027/時
  - $0.008GB

### ALBの1LCUの単位

- 新規接続 25/sec
- Actice接続数 3000/min
- 帯域 2.22Mbps (1GB/hour)
- Ruleの評価数 1000/sec

### NLBの1LCUの単位

- 新規TCP or フロー数 800/sec
- Actice接続 or フロー数 10000/min
- 帯域 2.22Mbps (1GB/hour)

## ターミネーションポリシー
古いインスタンスのIPを削除する

## Reference
- [【AWS Black Belt Online Seminar】Elastic Load Balancing (ELB) - YouTube](https://www.youtube.com/watch?v=4laAoK-zXko&feature=youtu.be)
- [20191029 AWS Black Belt Online Seminar Elastic Load Balancing (ELB)](https://www.slideshare.net/AmazonWebServicesJapan/20191029-aws-black-belt-online-seminar-elastic-load-balancing-elb)