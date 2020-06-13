# Elastic Load Balancing (ELB)

## 特徴

- スケーラブル
  - NLB 以外の ELB がスケールする場合は、IP アドレスも変わるので、必ず ELB の DNS 名で
- 従量課金
- マネージド
- 他サービスと連携が多い
  - Auto Scaling, Route 53, Cloud Formation, ... etc
- プロトコル

  - L7 (HTTP, HTTPS)
  - L4 TCP(1-65535), SSL

- リスナー
  - どんなプロトコルで受けるか
- ターゲット
  - 負荷分散する対象

## 種類

- Application Load Balancer (ALB)
  - L7 HTTP, HTTPS, HTTPS/2
- Network Load Balancer (NLB)
  - L4 TCP, UDP, TLS
- Classic Load Balancer (CLB)
  - HTTP, HTTPS, TCP
  - EC2-Classic, VPC

## 使い方

AZ ごと(推奨)にパブリックサブネット内に配置する

### Security Group

- ALB, CLB については、設定できる (NLB は不可)
- ACMP Echo REquest / Reply を許可すれば、ELB にも ping に応答可能（一時検証しか使わなそう）
- バックエンドのインスタンスは ELB からのみの通信を許可することを推奨

### Target

- インスタンス ID
- Lambda 関数(ALB のみ)
- IP アドレス(CLB 以外)
  - オンプレにバランスも可能（Direct Connect 必要だけども）

### ELB へのアクセス

- DNS 名推奨 (スケールしたときに IP アドレス変わるため)
- Route 53 を使用する場合は、Route 53 エイリアスレコードか CNAME で登録可能
  - それ以外の DNS 使う場合は、CNAME で登録
  - Zone Apex の場合は、エイリアスレコードのみ

### スケーラビリティ

2 段階の分散

#### ELB の負荷分散

- ラウンドロビンで AZ 内の ELB(ロードバランサーノード)に振り分け
- バックエンドへの負荷分散

  - ALB
    - ラウンドロビン
    - Weighted Target Groups (重み付けターゲットグループ)
    - Least Outstanding Requests (LOR:最小未処理リクエスト） (2019/11 から)
  - NLB ... フローハッシュアルゴリズム
  - CLB
    - TCP : ラウンドロビン
    - HTTP/HTTPS : Least Outstanding Requests(LOR)

- 複数 AZ の場合 **クロスゾーン負荷分散** が有効かどうか
  - NLB はデフォルト無効のため注意
- 複数のポートにも負荷分散可能
  - コンテナ使う場合 (on EC2 とか)
- IP アドレスをターゲットに設定できる

- [Application Load Balancer のターゲットグループ - Elastic Load Balancing](https://docs.aws.amazon.com/ja_jp/elasticloadbalancing/latest/application/load-balancer-target-groups.html#modify-routing-algorithm)

#### ELB 自体のスケーリング

- 急激に負荷が増えた場合、スケールするのに時間がかかるため、エラー(503)発生する可能性がある(ALB, CLB)
  - Pre-Warming の申請をサポートケースで
    - Business/Enterprise サポートが必要
    - 自前で負荷を段階的にかけてスケールさせておく
  - NLB は突発的な数百万リクエスト/秒のトラフィックもさばけるよ

### モニタリング

正常なターゲットのみトラフィックをルーティングする

正常判定が厳しすぎると、インスタンスが使えるようになるまでに時間がかかり、逆に異常の判定が厳しすぎても、過負荷時に処理できるインスタンスを減らしてしまう

- プロトコル
- ポート
- パス
- タイムアウト時間
- 非正常のしきい値
- 感覚
- 成功コード(Matcher)

- ELB のメトリクスを 60 秒間隔で監視可能
  - HealthyHostCount 　(正常)
  - UnhealthyHostCount (非正常)
    - 平均で取ることをオススメ

### ログ

最短 5 分間隔で取得可能。S3 吐ける。ELB の種類によってフォーマット違う

### コネクション

無通信が続くと自動で切断

- NLB は 350 秒固定
- ALB/CLB は自由に設定可能(デフォルト 60, 1-4000)

### Connection Draining

デフォルトで有効。CLB だけ、登録解除または異常なインスタンスに対して行われた実行中のリクエストを完了することが可能。  
ALB はこの機能ではなく、単純にターゲットグループからターゲットを登録解除すると、同様の挙動になる。ターゲットは未完了のリクエストが完了するまで、draining 状態になる。

### スティッキーセッション

同じユーザから来たリクエストを、すべて同じ EC2 インスタンスに送信する。ALB, CLB のみ。Cookie を使う。

#### 有効期限

- ロードバランサーが生成した Cookie を使用した場合
  - セッション開始からの有効期限を指定して、ELB で制御
  - 無期限も可能（ブラウザ閉じるまで、となる）
- アプリケーションが生成した Cookie を使用した場合
  - アプリケーションが作成した Cookie に合わせて設定する
  - Cookie 名もアプリケーションが作成したもの

EC2 インスタンスのスケールイン・アウトを考慮すると、セッション情報は DB サーバやキャッシュサーバに持たせるのがいい。そうするとスティッキーセッションは不要

### SSL/TLS Termination

ELB 側で SSL/TLS 認証ができる。バックエンドの EC2 をインスタンスで SSL 処理をしなくて良くなるため、負荷をオフロードできる

- 事前にセキュリティポリシーが定義されている
  - TLSv1.0, v1.1, v1.2 をサポート
  - セキュリティポリシーのカスタマイズできるのは CLB のみ
- TLS サーバ証明書 ... ACM を使えば簡単。ACM で発行するとドメイン認証タイプ(DV)。自動更新。

### SNI での複数 TLS 証明書のスマートセレクション

複数の TLS 証明書を 1 つの ALB/NLB の Listener に設定可能。最大 25 まで

## ALB

暖機申請が必要

### ルール

リクエストがどのように転送されるかという条件とアクションを定義できる。また、複数指定できる

### ターゲットグループ

ターゲットをまとめた集合。グループにインスタンスなどを登録する。

### ルーティング

ルールは上から順番に処理することができる

#### ルールの条件

- パスベース
  - (http://example.com/<u>products</u>)
- ホストベース
  - ホスト名 (http://<u>products</u>.example.com)
- HTTP ヘッダー
- HTTP メソッド
- クエリ文字列パラメータ
- 送信元 IP アドレス CIDR

#### ルールのアクション

- 転送アクション
- リダイレクト
- 固定レスポンスアクション
- Cognito 認証アクション
  - Amazon Cognito にリダイレクト
- OIDC 認証アクション

  - Amazon, Google, Facebook とか

### ALB 利用時のクライアント IP アクセスログ取得

- HTTP/HTTPS リスナーを使用する場合、通常は ELB のアドレスを出力していて、ELB のアクセスログには、ELB インスタンスの IP が記録される
  - クライアント IP を出す場合は`X-Forwarded-For` を出力する
  - NLB はデフォルトで出力している対応不要

## NLB

- L4 ロードバランサー
- 高可用性、高スループット、低レイテンシ
  - ウォームアップなしで OK
- Source IP/Port がターゲットまで保持
  - 行きも帰りも NLB を通っている。DSR ではない
- 固定 IP
  - AZ 毎に一つ。すでに持っている EIP も利用可能
  - Firewall の制約で、ELB の IP アドレス固定が必要な場合
- VPC エンドポイント(AWS PrivateLink)サポート
- セキュリティグループの設定がない
- TCP 通信の場合は、VPC Flow Log で代替
- 古い世代のインスタンスタイプは利用不可(2013 年以前の)

## CLB

使うときは以下のケース。だけど、ALB か NLB への移行推奨

- EC2-Classic のサポート
- TCP, SSL リスナーのサポート
- アプリケーションが生成した、Cookie を使ったスティッキーセッション
- カスタムセキュリティポリシー

### Auto Scaling との連携

Auto Scaling グループに ELB の追加・削除可能

インスタンス削減時は、Connection Draining が利用可能

- ターミネーションポリシー
  - 古いインスタンスの IP を削除する。EC2 側で設定しないと、疎通不可になる

### 動的ポートマッピング

ECS のタスクが動的に増えても OK

NLB を使う場合は、セキュリティグループを設定できないので、ECS 側 に設定するが、ECS 側で設定されるポートの範囲を意識する必要がある

- `/proc/sys/net/ipv4/ip_local_port_range`で設定する

### AWS WAF

ALB のみ連携可能

- リクエストレートによるアクセス権限
- 特定の IP アドレス、地域からブロック
- クロスサイトスクリプティング、SQL インジェクションからの保護
- HTTP ヘッダー、本文、URI 文字列に対するサイズ成約、正規表現でのマッピング

### Global Accelerator との連携

ALB, NLB が使える。エンドポイントに ALB, NLB を指定できる

### Lambda

ターゲットに Lambda を指定できる

Lambda は、リクエストを JSON 軽視位で渡すことができる

## 料金

- ALB
  - 1 時間毎に課金
    - 1 つに付き 1 時間毎に 0.0243 USD
    - 1 LCU 1 時間毎に 0.008 USD
- NLB
  - 1 時間毎に課金
    - 1 つに付き 1 時間毎に 0.0243 USD
    - 1 LCU 1 時間毎に 0.006 USD
      - ALB と LCU の定義が異なる
- CLB
  - 0.027 USD/時
  - 0.008 USD / GB

### ALB の 1LCU の単位

- 新規接続 25/sec
- Active 接続数 3000/min
- 帯域 2.22Mbps (1GB/hour)
- Rule の評価数 1000/sec

### NLB の 1LCU の単位

- 新規 TCP or フロー数 800/sec
- Actice 接続 or フロー数 10000/min
- 帯域 2.22Mbps (1GB/hour)

## Reference

- [【AWS Black Belt Online Seminar】Elastic Load Balancing (ELB) - YouTube](https://www.youtube.com/watch?v=4laAoK-zXko&feature=youtu.be)
- [20191029 AWS Black Belt Online Seminar Elastic Load Balancing (ELB)](https://www.slideshare.net/AmazonWebServicesJapan/20191029-aws-black-belt-online-seminar-elastic-load-balancing-elb)
