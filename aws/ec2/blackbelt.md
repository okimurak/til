# Elastic Compute Cloud (EC2)

## CPU

Intel Xeon, AMD, AWS Graviton <- is 何

## インスタンスタイプ

```text
インスタンスファミリー
  v
   インスタンス世代
   v
  c5d.xlarge
    ^
    追加機能
      ^^^^^^
      インスタンスサイズ
  ^^^^^^^^^^
インスタンスタイプ
```

### インスタンスファミリー

メモリ、IO、CPU クロックなどでインスタンスファミリーを分けている

### インスタンス世代

世代が新しいほうが高性能で、コストパフォーマンスも高い

### インスタンス追加機能

- d ... 内蔵ストレージ
- n ... ネットワークを強化(100Gbps)
- a ... AMD の CPU を搭載
- その他(e,s) ... 従来より CPU とかメモリ搭載量が異なるなど....

### Bare Metal

- ハードウェアへのダイレクトアクセスを提供する EC2 インスタンス  
  仮想化では利用できないハードウェアの利用ができる（パフォーマンスカウンター、エミュレータ）
- 独自に Hyper Visor を導入したり

### バースト可能インスタンス

負荷に応じてバースト。CPU クレジットを消費する（Unlimited の場合、なくなったら課金）

## Elastic Network Interfaces (ENI)

インスタンスによって割当可能な数が異なる

## ストレージ

- インスタンスストアは Stop / Terminate するとクリア
- EBS は永続。S3 にエクスポート可能。ただし、EBS の課金発生
  - EBS 最適化オプションがある（起動時に指定する）

## AMI

EC2 インスタンスを起動するために必要な OS イメージ

カスタム AMI を作成可能

別アカウントとの共有や、別リージョンへのコピーも OK

- アーキテクチャ
  - x86
  - Arm
- ビット数
  - 32
  - 64
- 仮想化方式
  - 準仮想化(Paravirtual : PV) ... 非推奨
  - 完全仮想化(Hardware-assisted VM : HVM)
- ブートストレージ
  - EBS Backed
  - Instance Store-Backed(S3 Backed)

## Delicated Hosts

- 物理サーバを持ち込むことができる

## プレイスメントグループ

物理的な配置戦略を決める

- クラスター
  - 密な場所に配置してネットワーク効率を高める
  - 単一アベイラビリティゾーンに閉じる
  - 複数のプレイスメントグループには属せない
- スプレッド
  - 別々のハードウェアに分散配置して、物理サーバ障害時に複数インスタンスの影響を軽減
  - 同一 AZ に HA クラスターを構築する場合
  - AZをまたいでの定義可能。1AZあたりサイヂア7つまで、インスタンスを実行できるよ

### Partition Placement Group

論理的なパーティションに配置し、パーティションが異なるインスタンスは同一のハードウェアを共有しないように分散する

Cassandra などクラスタリングされた分散処理の配置戦略のユースケース

## アクセラレータ

特定のワークロードを高速化できる

- Elastic Graphics ... GPU。t2などの安価なインスタンスに使うといいかも
- Elastic Inference ... Deep Learning

## ライフサイクル

- Running
  - 実行中。課金対象
- Stopped
  - 停止中。課金されない。Runnningに遷移可
- Terminated
  - 削除。課金されないし、Runnningにもならない

### ハイバネーション

メモリの状態をディスクに書き出してインスタンスを停止可能

- インスタンスサイズの変更は不可
- EBS ルートボリュームの暗号化前提
- 特定のインスタンスタイプのうち、メモリサイズ150GBが対象
  - ベアメタルインスタンスは非対応

- Linux1, 2, Windowsが使える(ようになってた) 

- [Linux インスタンスの休止 - Amazon Elastic Compute Cloud](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/Hibernate.html)
- [Windows インスタンスの休止 - Amazon Elastic Compute Cloud](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/WindowsGuide/Hibernate.html)

## CloudWatch

- メトリクス監視

- ログ監視
  - EC2インスタンスに CloudWatchLogsAgent 必要

### スケジュールイベント

- リタイア
  - ハードウェアが回復不可能な障害検出された場合
  - Ec2 Eventsメニューで表示可能
  - リタイア日までに Stop -> Start を実行する

### Auto recovery

- インスタンスの異常を検知して復旧
- 特定のインスタンスだけ対応

## ツール

### Userdata

起動時にスクリプト実行を行う機能

- シェルスクリプト
- cloud-initディレクティブ
- 用途
  - AMIではカバーできない起動時の設定変更
  - 起動時に実行するスクリプト, chef, puppetへパラメータとして値を渡す

### Launch Template

起動時に設定する項目をテンプレート化できる

### インスタンスメタデータ

curl で取得できる

```bash
curl http://169.254.169.254/latest/meta-data
```

### EC2 Fleet (フリート)

1回のリクエストで、大量のオンデマンドおよびスポットインスタンスを起動できる

起動時に、1時間当たりの支払い上限料金を定義する

[EC2 フリートの起動 - Amazon Elastic Compute Cloud](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/ec2-fleet.html)

## 料金

- データ転送量
- インスタンスタイプ別利用料
- EBS利用料
- AMI/スナップショットの保管料金(S3)

EC2, EBSボリュームは 1秒単位の課金 (表記は1時間単位のまま)

商用OSのAMIは時間単位になる

### 購入オプション

- オンデマンドインスタンス
  - 初期費用なしで従量課金
- リザーブドインスタンス
  - 1年か3年のキャパシティ予約により、最大75%OFF
  - スケジュールドリザーブドインスタンス
    - 日次、週次、月次で指定した時間帯のみのキャパシティ予約で 5-10%引き (1年間)
- スポットインスタンス
  - 未使用キャパシティを時価で提供。最大90%の割引で利用できる
  - ただし他の人に取られる可能性
- 専用インスタンス
  - インスタンス実行用物理ホスト単位
- ハードウェア専有インスタンス
  - シングルテナント


## Auto Scaling

スペックが足りなかったり、逆にスペックが必要だったりする時に自動で、スケールする

### 動作原理

希望容量と現実の起動台数との差を監視して、常に希望容量に合致するようにリソースを増減する

- 希望容量が固定
  - 現実の起動台数が減ると、検知して自動で 1 台追加する
- 手動スケーリング
  - 希望容量を手動で変更すると、変更に応じて台数を増減する
- 自動スケーリング
  - スケーリングポリシーに応じて希望容量が動的に変化する

### インスタンスの分散

AZ 内で最も少ない場所にインスタンスが配置される

### 均一性

名前をつけて、特別視しない。名前をつけるのはバットプラクティス

## Auto Scaling の種類

- EC2 Auto Scaling
  - EC2 の管理
  - フリート ... アプリケーションを実行する複数の EC2 インスタンスのこと
- Application Auto Scaling
  - その他のリソースはこっち
  - ECS
  - スポットフリート
  - EMR
  - DynamoDB
  - Aurora レプリカ
  - SageMaker エンドポイントバリアント、カスタムリソース
- AWS Auto Scaling
  - 予測できるらしいけど、まだ EC2 のみ

## スケーリングの整理

### 簡易スケーリング

EC2 Auto Scaling

1 つのメトリクスに対して、1 種類のスケーリングの調整値を指定可能

- 例：CPUUtilization が 50%以下になったらスケールとか

今は非推奨で、ステップスケーリング

### ステップスケーリング

EC2 Auto Scaling, Application Auto Scaling

1 つのメトリクスに対して、複数のスケーリング調整値を指定可能

細かい設定可能

- ウォームアップ期間
  - 新しいインスタンスがサービス開始できるようになるまで何秒を要するかを設定する値
  - この期間のインスタンスも起動中とカウントされる
  - デフォルトは 300 秒

### ターゲット追跡スケーリング

EC2 Auto Scaling, Application Auto Scaling

1 つのメトリクスに対して、単に目標値を指定するのみで良い

スケールイン、スケールアウトのアラームが自動で作成される

- TargetTracking-xxx-AlarmLow-UUID ... ゆっくり(15 分)
- TargetTracking-xxx-AlarmHight-UUID ... 敏感(3 分)
- アラームがなったときにスケールするわけではない（バタバタと変化が激しい場合はスケールしない可能性もある）

### 予測スケーリング

EC2 Auto Scaling(2019/10 現在)

2 週間のメトリクスを分析して、次の 2 日の今後の需要を予測

- CPUUtilization, NetworkIn, NetworkOut,及び任意のメトリクス
- 24 時間毎に次の 48 時間の予測値を作成してキャパシティの増減をスケジュール
- 基準時刻は毎時 0 分

  - 「インスタンスの事前起動設定」によってスケール動作を前もって実行させることが可能
    - デフォルトが 5 分前。調整可能

- ベストプラクティス
  - いきなり使い始めず、「予測のみ」モードで予測値を評価すること
  - ASG の作成後、24 時間待つ。予測の開始には最低 24 時間分のデータポイントが必要

### スケジュールスケーリング

EC2 Auto Scaling, Application Auto Scaling

Cron 的にスケールできる

MinCapacity, MaxXapacity のいずれか、あるいは両方を指定

- 設定時刻時点の容量が MinCapacity に満たない -> MinCapacity までスケールアウト
- 設定時刻時点の容量が MaxCapacity に満たない -> MaxCapacity までスケールイン
- EC2 のみ、DesiredCapacity(希望キャパシティ)も指定可能

### スケーリングオプションの選択指針

- 予測スケーリング + ターゲット追跡スケーリングも有効にする
- EC2 以外は、ステップスケーリングおよび、スケジュールスケーリングを使う
  - 個別パターンをした唐津みあが手設定していく

### EC2 Auto Scaling の新機能

ミックスインインスタンスグループ（インスタンスタイプを複数指定できるようになった）

- 起動テンプレート用いる必要がある
  - フリートの構築
    - 「購入オプション」と「インスタンスを組み合わせる」を選択して、インスタンスタイプを複数選択する(2 種類以上)
- インスタンスの分散のチェックを外す
  - オプションのオンデマンドベース ... 絶対オンデマンドインスタンスでいく台数
  - ベースを超えるオンデマンド割合 ... グループの全体 - オンデマンドインスタンスの残り台数に対して、オンデマンドとスポットの割合を選択
  - グループサイズ ... グループの全体

### AWS Auto Scaling

グループメトリクスコレクションを有効にする（有料だけど）

- Auto Scalling グループの台数とかのメトリクスが取れるようになる

### こんなときどうする

- スポットインスタンスを使いたい
  -> ミックスインインスタンスグループを使う
- 起動テンプレートと起動設定どちらがいい
  -> 起動テンプレートを推奨。起動設定の人は起動テンプレートに移行推奨
- 速やかにスケールアウトしてくれない
  - 詳細モニタリングを有効にする
    - 1 分粒度にする（有料）5 分ではすぐできない
- 正常に動作しないインスタンスを自動で置き換え
  - EC2 ヘルスチェックを使う
  - ELB 配下にある場合、ELB ヘルスチェックも有効に
    - ELB ヘルスチェックに応答しない場合もスケールできる
- スケールイン・スケールアウトを繰り返す
  - ヘルスチェックの猶予期間の設定を見直す
  - デプロイが整った前提のパスが指定されていることがあるため
  - デフォルトは 5 分
- 次にどのインスタンスがスケールイン対象になるか
  - デフォルトの終了ポリシー
    1. インスタンスが最も多い AZ を選択
    2. （AZ に候補が複数いるならば）最も古い起動設定起動テンプレートから起動されたインスタンスを選択
    3. （複数候補が残っている）インスタンス時間に近いものを選択
    4. （まだ複数残っている）ランダム
  - カスタマイズも可能
- 特定のインスタンスをスケール員から保護

  - インスタンスの保護
    - 以下からは保護できない
      - 手動削除
      - ヘルスチェック
      - スポットインスタンスの中断

- [よくある質問 - Amazon EC2 Auto Scaling | AWS](https://aws.amazon.com/jp/ec2/autoscaling/faqs/)
- [よくある質問 - AWS Auto Scaling | AWS](https://aws.amazon.com/jp/autoscaling/faqs/)

## Reference

- [【AWS Black Belt Online Seminar】Amazon EC2 - YouTube](https://www.youtube.com/watch?v=P5zX4DdlYOE&feature=youtu.be)
- [20190305 AWS Black Belt Online Seminar Amazon EC2](https://www.slideshare.net/AmazonWebServicesJapan/20190305-aws-black-belt-online-seminar-amazon-ec2)
- [【AWS Black Belt Online Seminar】Amazon EC2 Auto Scaling and AWS Auto Scaling - YouTube](https://www.youtube.com/watch?v=o01IOnVvRxM&t=11s)
- [20191002 AWS Black Belt Online Seminar Amazon EC2 Auto Scaling and AW…](https://www.slideshare.net/AmazonWebServicesJapan/20191002-aws-black-belt-online-seminar-amazon-ec2-auto-scaling-and-aws-auto-scaling-178995835)
