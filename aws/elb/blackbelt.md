# Elastic Load Balancing (ELB)

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

- ALB, CLB については、設定できる

### Target

- インスタンス ID
- Lambda 関数(ALB のみ)
- IP アドレス(CLB 以外)
  - オンプレにバランスも可能（Direct Connect 必要だけども）

### ELB へのアクセス

DNS 名推奨

### スケーラビリティ

2 段階の分散

- ELB の分散
  - 複数 AZ の場合クロスゾーン負荷分散が有効かどうか
    - NLB はデフォルト向こうのため注意
  - 急激に負荷が増えた場合、スケールするのに時間がかかるため、エラー発生する可能性がある(ALB, CLB))
    - Pre-Warming の申請をサポートケースで
      - Business/Enterprise サポートが必要
- バックエンドへの負荷分散
- ALB ... ラウンドロビン
- NLB ... フローハッシュアルゴリズム

### ログ

5 分感覚で取得可能。S3 に履ける

### コネクション

無通信が続くと自動で説 z 団

- NLB は 350 秒固定
- ALB/CLB は自由に設定可能(デフォルト 350, 1-4000)

### Connection Draining

CLB だけ。登録解除または異常なインスタンスに対して行われた実行中のリクエストを完了することが可能。  
ALB はこの機能ではなく、単純にターゲットグループからターゲットを登録解除すると、同様の挙動になる。ターゲットは未完了のリクエストが完了するまで、draining 状態になる。

### スティッキーセッション

リクエストにある特定の Coockie から同じユーザから来たと判別して特定の EC2 インスタンスに送信する。デフォルト無効。

### SSL/TLS

- 事前にセキュリティポリシーが定義されている
  - セキュリティポリシーのカスタマイズできるのは CLB のみ
- TLS サーバ証明書 ... ACM を使えば簡単。DV。自動更新。

## ALB

### ルール

リクエストがどのように転送されるかという条件とアクションを定義できる

また、複数指定できる

### ルールの条件パターン

- パスベース
- ホストベース
- HTTP ヘッダー
- HTTP メソッド
- クエリ文字列パラメータ
- 送信元 IP アドレス CIDR

### ルールのアクション

- 転送アクション
- リダイレクト
- 固定レスポンスアクション
- Cognito 認証アクション
  - Amazon Cognito にリダイレクト
- OIDC 認証アクション
  - Amazon, Google, Facebook とか

### ALB 利用時のクライアント IP アクセスログ取得

- 通常は ELB のアドレスを出力しているので
  - XForwarded-For を出力する

## NLB

- 高可用性、高スループット、低レイテンシ
  - ウォームアップなしで OK
- Source IP/Port がターゲットまで保持
- 固定 IP
  - AZ 毎に一つ。すでに持っている EIP も利用可能

## CLB

使うときは以下のケース。だけど、ALB か NLB への移行推奨

- EC2-Classic のサポート
- TCPSSL リスナーのサポート
- カスタムセキュリティポリシー

### Auto Scaling との連携

### 動的ポートマッピング

ECS のタスクが動的に増えても OK

NLB を使う場合は、セキュリティグループは ECS に設定するが、ECS 側で設定されるポートの範囲を意識する必要がある

- `/proc/sys/net/ipv4/ip_local_port_range`で設定する

### AWS WAF

ALB のみ連携可能

- リクエストレートによるアクセス権限
- 特定の IP アドレス、地域からブロック
- クロスサイトスクリプティング、SQL インジェクションからの保護
- HTTP ヘッダー、本文、URI 文字列に対するサイズ成約、正規表現でのマッピング

### Global Accelerator との連携

ALB, NLB が使える。エンドポイントに ALB, NLB を指定できる

## 料金

- ALB
  - 1 時間毎に課金
    - 1 つに付き 1 時間毎に 0.0243
    - 1 LCU 1 時間毎に\$0.008
- NLB
  - 1 時間毎に課金
    - 1 つに付き 1 時間毎に 0.0243
    - 1 LCU 1 時間毎に\$0.006
      - ALB と LCU の定義が異なる
- CLB
  - \$0.027/時
  - \$0.008GB

### ALB の 1LCU の単位

- 新規接続 25/sec
- Actice 接続数 3000/min
- 帯域 2.22Mbps (1GB/hour)
- Rule の評価数 1000/sec

### NLB の 1LCU の単位

- 新規 TCP or フロー数 800/sec
- Actice 接続 or フロー数 10000/min
- 帯域 2.22Mbps (1GB/hour)

## ターミネーションポリシー

古いインスタンスの IP を削除する

## Reference

- [【AWS Black Belt Online Seminar】Elastic Load Balancing (ELB) - YouTube](https://www.youtube.com/watch?v=4laAoK-zXko&feature=youtu.be)
- [20191029 AWS Black Belt Online Seminar Elastic Load Balancing (ELB)](https://www.slideshare.net/AmazonWebServicesJapan/20191029-aws-black-belt-online-seminar-elastic-load-balancing-elb)
