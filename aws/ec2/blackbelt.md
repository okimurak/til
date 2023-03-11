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

ざっくり以下 5 つに分けられる。

- 汎用
- コンピューティングの最適化
- メモリ最適化
- ストレージの最適化
- 高速コンピューティング : 機械学習用、GPU はここ


### インスタンスファミリー

メモリ、I/O、CPU クロックなどでインスタンスファミリーを分けている

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
  - AZ をまたいでの定義可能。1AZ あたりサイヂア 7 つまで、インスタンスを実行できるよ

### Partition Placement Group

論理的なパーティションに配置し、パーティションが異なるインスタンスは同一のハードウェアを共有しないように分散する

Cassandra などクラスタリングされた分散処理の配置戦略のユースケース

## アクセラレータ

特定のワークロードを高速化できる

- Elastic Graphics ... GPU。t2 などの安価なインスタンスに使うといいかも
- Elastic Inference ... Deep Learning

## ライフサイクル

- Running
  - 実行中。課金対象
- Stopped
  - 停止中。課金されない。Runnning に遷移可
- Terminated
  - 削除。課金されないし、Runnning にもならない

### ハイバネーション

メモリの状態をディスクに書き出してインスタンスを停止可能

- インスタンスサイズの変更は不可
- EBS ルートボリュームの暗号化前提
- 特定のインスタンスタイプのうち、メモリサイズ 150GB が対象

  - ベアメタルインスタンスは非対応

- Linux1, 2, Windows が使える(ようになってた)

- [Linux インスタンスの休止 - Amazon Elastic Compute Cloud](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/Hibernate.html)
- [Windows インスタンスの休止 - Amazon Elastic Compute Cloud](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/WindowsGuide/Hibernate.html)

## CloudWatch

- メトリクス監視

- ログ監視
  - EC2 インスタンスに CloudWatchLogsAgent 必要

### スケジュールイベント

- リタイア
  - ハードウェアが回復不可能な障害検出された場合
  - Ec2 Events メニューで表示可能
  - リタイア日までに Stop -> Start を実行する

### Auto recovery

- インスタンスの異常を検知して復旧
- 特定のインスタンスだけ対応

## ツール

### Userdata

起動時にスクリプト実行を行う機能

- シェルスクリプト
- cloud-init ディレクティブ
- 用途
  - AMI ではカバーできない起動時の設定変更
  - 起動時に実行するスクリプト, chef, puppet へパラメータとして値を渡す

### Launch Template

起動時に設定する項目をテンプレート化できる

### インスタンスメタデータ

curl で取得できる

```bash
curl http://169.254.169.254/latest/meta-data
```

### EC2 Fleet (フリート)

1 回のリクエストで、大量のオンデマンドおよびスポットインスタンスを起動できる

起動時に、1 時間当たりの支払い上限料金を定義する

[EC2 フリートの起動 - Amazon Elastic Compute Cloud](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/ec2-fleet.html)

## 料金

- データ転送量
- インスタンスタイプ別利用料
- EBS 利用料
- AMI/スナップショットの保管料金(S3)

EC2, EBS ボリュームは 1 秒単位の課金 (表記は 1 時間単位のまま)

商用 OS の AMI は時間単位になる

### 購入オプション

- オンデマンドインスタンス
  - 初期費用なしで従量課金
- リザーブドインスタンス
  - 1 年か 3 年のキャパシティ予約により、最大 75％OFF
  - スケジュールドリザーブドインスタンス
    - 日次、週次、月次で指定した時間帯のみのキャパシティ予約で 5-10％引き (1 年間)
- スポットインスタンス
  - 未使用キャパシティを時価で提供。最大 90％の割引で利用できる
  - ただし他の人に取られる可能性
- 専用インスタンス
  - インスタンス実行用物理ホスト単位
- ハードウェア専有インスタンス
  - シングルテナント

## Linux

### EC2Rescue for Linux

一般的な問題およびログの収集ができる。syslog およびパッケージマネージャーログの収集、リソース使用状況データの収集、問題のある既知のカーネルパラメーターと一般的な OpenSSH の問題の診断および修復など。Systems Manager Automation runbook の AWSSupport-TroubleshootSSH ランブックを使って、EC2Rescue for Linux のインストールおよび Linux マシンへの SSH 接続を診断・修正ができる。

[使用アイテム Linux 用 EC2Rescue - Amazon Elastic Compute Cloud](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/Linux-Server-EC2Rescue.html)


## Windows

### アップグレード

OS をアップグレードするために、インプレースアップグレードと並列アップグレードがある。

- インプレースアップグレードは個人の設定ファイルは保持する。
- 並列アップグレードは元のインスタンスの設定、構成、データを取り込んで新しい OS に移行する。アップグレードが完了するまでは元の EC2 インスタンスを一時的なものとして使用される。

[Amazon EC2 Windows インスタンスのより新しいバージョンの Windows Server へのアップグレード - Amazon Elastic Compute Cloud](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/WindowsGuide/serverupgrade.html)


### EC2Rescue for Windows Server

Windows インスタンスの問題診断とログ取得ができる。Systems Manager Automation runbook の AWSSupport-ExecuteEC2Rescue ランブックを使うこともできる。

[使用アイテム EC2Rescue for Windows Server - Amazon Elastic Compute Cloud](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/WindowsGuide/Windows-Server-EC2Rescue.html)
## Reference

- [【AWS Black Belt Online Seminar】Amazon EC2 - YouTube](https://www.youtube.com/watch?v=P5zX4DdlYOE&feature=youtu.be)
- [20190305 AWS Black Belt Online Seminar Amazon EC2](https://www.slideshare.net/AmazonWebServicesJapan/20190305-aws-black-belt-online-seminar-amazon-ec2)
