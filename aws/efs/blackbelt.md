# EFS

## 概要
NWファイルストレージサービス

NFS v4.0 / 4.1 (CIFS/SMBは対象外, Win無理)

DBのストレージのように、レイテンシーを求められるならば、EBSのほうがいい

複数AZに複製に保存して保存されるため高耐久、高可用性

Fargateでは無理

## 基礎知識

- 各AZにあるマウントターゲットがNFSの接続先
- EC2から同じAZに作成されているマウントターゲットに接続
- マウントターゲットのDNS名とIPアドレスは固定なのでDNS名を指定すればいい
- マウントターゲットにはセキュリティグループ、ネットワークACLを設定できる

### パフォーマンスモード
- 汎用モード ... 基本はこちら
- 最大I/Oモード
  - CloudWatchのPercentIOLimitから判断
    - 汎用モードのI/O限界にどの程度達しているか

### NFSクライアント

v4でも一部対応していない機能がある
EFSマウントヘルパー利用を推奨

```
sudo yum -y install amazon-efs-utils  ... install
sudo mount -t efs fs-12345677 -o tls /mnt/efs
```

ファイルのロックが可能(v4のアドバイザリーロックに準拠)

## 制限
同一VPCからのみアクセス可能(Direct Connect経由はOK)

EFSのバックアップ機能、バージョニング機能は未提供なので、EBSやEBS スナップショットなどにバックアップする必要あり

## 推奨マウントオプション

- NFS4.1
- Read Write buffer = 1MB
- Mesure Timeout = hard
- TImeout = 60s
- Measure Time out = 2
- async mode

- 上記の推奨設定をEFSマウントヘルパーで設定できる(TLS1.2で通信の暗号化もしてくれる）

## 移行

EFS File Syncがいいらしい
cpやrsyncに比べて最大で5倍高速
EC2か、VM ESXiでエージェントを実行

## Security

- NW Traffic
  - Security Group
  - ACL
- POSIX権限により、アクセス制御
- IAMで管理者

## Performance

- IO処理、ファイル操作にはレイテンシーのオーバーヘッドがある
- バーストモデルがある
  - ベースラインスループットによって蓄積化消費化が決まる

## 低頻度アクセスストレージ

128KBかつ30日以上アクセスも変更されていないファイルを対象として移動できる。コストが85%下がる

ライフサイクル設定で設定できる

## 料金

- Tokyo Region 0.36 GB / 月

## 参考

- [20180704(20190520 Renewed) AWS Black Belt Online Seminar Amazon Elast…](https://www.slideshare.net/AmazonWebServicesJapan/2018070420190520-renewed-aws-black-belt-online-seminar-amazon-elastic-file-system-amazon-efs)

- [Amazon EFS（EC2 用フルマネージド型ファイルシステム）\| AWS](https://aws.amazon.com/jp/efs/)
