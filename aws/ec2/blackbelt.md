##

## CPU
Intel Xeon, AMD, AWS Graviton <- is 何

## インスタンスタイプ

```
インスタンスファミリー
  ^
   インスタンス世代
   ^
  c5d.xlarge
    ^
    追加機能
      ^^^^^^
      インスタンスサイズ
  ^^^^^^^^^^
インスタンスタイプ
```

### インスタンスファミリー
メモリ、IO、CPUクロックなどでインスタンスファミリーを分けている

### インスタンス世代
世代が新しいほうが高性能で、コストパフォーマンスも高い

### インスタンス追加機能

- d ... 内蔵ストレージ
- n ... ネットワークを強化(100Gbps)
- a ... AMDのCPUを搭載
- その他(e,s) ... 従来よりCPUとかメモリ搭載量が異なるなど....

### Bare Metal

- ハードウェアへのダイレクトアクセスを提供するEC2インスタンス  
  仮想化では利用できないハードウェアの利用ができる（パフォーマンスカウンター、エミュレータ）
- 独自にHyper Visorを導入したり

### バースト可能インスタンス
負荷に応じてバースト。CPUクレジットを消費する（Unlimitedの場合、なくなったら課金）

## Elastic Network Interfaces (ENI)
インスタンスによって割当可能な数が異なる

## ストレージ

- インスタンスストアはStop / t4erminateするとクリア
- EBSは永続。S3にエクスポート可能。ただし、EBSの課金発生
  - EBS最適化オプションがある（起動時に指定する）

## Delicated Hosts
- 物理サーバを持ち込むことができる

## プレイスメントグループ

- クラスター
  - ネットワーク効率を高める。単一アベイラビリティゾーンに閉じる
- スプレッド
  - 同一AZにHAクラスターを構築する場合

## Partition Placement Grou

Cassandraなどクラスタリングされた分散処理の配置戦略

## アクセラレータ
特定のワークロードを高速化できる

- Elastic Graphics ... GPU
- Elastic Inference ...  Deep Learning

## ハイバネーション
メモリの状態をディスクに書き換えてインスタンスを停止可能  

- インスタンスサイズの変更は不可
- EBSルートボリュームの暗号化前提

## インスタンスメタデータ
curlで取得できる

```
curl http://169.254.169.254/latest/meta-data
```

## Auto Scaling

スペックが足りなかったり、逆にスペックが必要だったりする時に自動で、スケールする

### 動作原理

希望容量と現実の起動台数との差を監視して、常に希望容量に合致するようにリソースを増減する

- 希望容量が固定
  - 現実の起動台数が減ると、検知して自動で1台追加する
- 手動スケーリング
  - 希望容量を手動で変更すると、応じて台数を増減する
- 自動スケーリング
  - スケーリングポリシーに応じて希望容量が動的に変化する

### インスタンスの分散

AZ内で最も少ない場所にインスタンスが配置される

### 均一性

名前をつけて、特別視しない。名前をつけるのはバットプラクティス

## Auto Scalingの種類

- EC2 Auto Scaling
  - EC2の管理
  - フリーと .... アプリケーションを実行する複数のEC2インスタンスのこと
- Application Auto Scaling
  - その他のリソースはこっち
  - ECS
  - スポットフリート
  - EMR
  - DynamoDB
  - Auroraレプリカ
  - SageMaker エンドポイントバリアント、カスタムリソース
- AWS Auto Scaling
  - 予測できるらしいけど、まだEC2のみ


## スケーリングの整理

### 簡易スケーリング

EC2 Auto Scaling

1つのメトリクスに対して、1種類のスケーリングの調整値を指定可能
 - 例：CPUUtilizationが50%以下になったらスケールとか

今は非推奨で、ステップスケーリング


### ステップスケーリング

EC2 Auto Scaling, Application Auto Scaling

1つのメトリクスに対して、複数のスケーリング調整値を指定可能

細かい設定可能

- ウォームアップ期間
  - 新しいインスタンスがサービス開始できるようになるまで何秒を要するかを設定する値
  - この期間のインスタンスも起動中とカウントされる
  - デフォルトは300秒

### ターゲット追跡スケーリング

EC2 Auto Scaling, Application Auto Scaling

1つのメトリクスに対して、単に目標値を指定するのみで良い

スケールイン、スケールアウトのアラームが自動で作成される
  - TargetTracking-xxx-AlarmLow-UUID ... ゆっくり(15分)
  - TargetTracking-xxx-AlarmHight-UUID ... 敏感(3分)
  - アラームがなったときにスケールするわけではない（バタバタと変化が激しい場合はスケールしない可能性もある）

### 予測スケーリング

EC2 Auto Scaling(2019/10現在)

2週間のメトリクスを分析して、次の2日の今後の需要を予測
  - CPUUtilization, NetworkIn, NetworkOut,及び任意のメトリクス
  - 24時間毎に次の48時間の予測値を作成してキャパシティの増減をスケジュール
  - 基準時刻は毎時0分
    - 「インスタンスの事前起動設定」によってスケール動作を前もって実行させることが可能
      - デフォルトが5分前。調整可能

- ベストプラクティス
  - いきなり使い始めず、「予測のみ」モードで予測値を評価すること
  - ASGの作成後、24時間待つ。予測の開始には最低24時間分のデータポイントが必要

### スケジュールスケーリング

EC2 Auto Scaling, Application Auto Scaling

Cron的にスケールできる

MinCapacity, MaxXapacityのいずれか、あるいは両方を指定
  - 設定時刻時点の容量がMinCapacityに満たない -> MinCapacityまでスケールアウト
  - 設定時刻時点の容量がMaxCapacityに満たない -> MaxCapacityまでスケールイン
  - EC2のみ、DesiredCapacity(希望キャパシティ)も指定可能

### スケーリングオプションの選択指針

- 予測スケーリング + ターゲット追跡スケーリングも有効にする
- EC2以外は、ステップスケーリングおよび、スケジュールスケーリングを使う
  - 個別パターンをした唐津みあが手設定していく

### EC2 Auto Scalingの新機能

ミックスインインスタンスグループ（インスタンスタイプを複数指定できるようになった）
  - 起動テンプレート用いる必要がある
    - フリートの構築
      - 購入オプションとインスタンスを組み合わせるを選択して、インスタンスタイプを複数選択する(2種類以上)
  - インスタンスの分散のチェックを外す
    - オプションのオンデマンドベース ... 絶対オンデマンドインスタンスでいく台数
    - ベースを超えるオンデマンド割合 ... グループの全体 - オンデマンドインスタンスの残り台数に対して、オンデマンドとスポットの割合を選択
    - グループサイズ ... グループの全体

### AWS Auto Scaling

グループメトリクスコレクションを有効にする（有料だけど）
  - Auto Scallingグループの台数とかのメトリクスが取れるようになる

### こんなときどうする

- スポットインスタンスを使いたい
  -> ミックスインインスタンスグループを使う
- 起動テンプレートと起動設定どちらがいい
  -> 起動テンプレートを推奨。起動設定の人は起動テンプレートに移行推奨
- 速やかにスケールアウトしてくれない
  - 詳細モニタリングを有効にする
    - 1分粒度にする（有料）5分ではすぐできない
- 正常に動作しないインスタンスを自動で置き換え
  - EC2ヘルスチェックを使う
  - ELB配下にある場合、ELBヘルスチェックも有効に
    - ELBヘルスチェックに応答しない場合もスケールできる
- スケールイン・スケールアウトを繰り返す
  - ヘルスチェックの猶予期間の設定を見直す
  - デプロイが整った前提のパスが指定されていることがあるため
  - デフォルトは5分
- 次にどのインスタンスがスケールイン対象になるか
  - デフォルトの終了ポリシー
    1. インスタンスが最も多いAZを選択
    2. （AZに候補が複数いるならば）最も古い起動設定起動テンプレートから起動されたインスタンスを選択
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
```
