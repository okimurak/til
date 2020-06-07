# Elastic File System (EFS)

## 概要

NW ファイルストレージサービス

NFS v4.0 / 4.1 (CIFS/SMB は対象外, Win 無理)

DB のストレージのように、レイテンシーを求められるならば、EBS のほうがいい

複数 AZ に複製に保存して保存されるため高耐久、高可用性

Fargate では無理

## 基礎知識

- 各 AZ にあるマウントターゲットが NFS の接続先
- EC2 から同じ AZ に作成されているマウントターゲットに接続
- マウントターゲットの DNS 名と IP アドレスは固定なので DNS 名を指定すればいい
- マウントターゲットにはセキュリティグループ、ネットワーク ACL を設定できる

### パフォーマンスモード

- 汎用モード ... 基本はこちら
- 最大 I/O モード
  - CloudWatch の PercentIOLimit から判断
    - 汎用モードの I/O 限界にどの程度達しているか

### NFS クライアント

v4 でも一部対応していない機能がある
EFS マウントヘルパー利用を推奨

```shell
sudo yum -y install amazon-efs-utils  ... install
sudo mount -t efs fs-12345677 -o tls /mnt/efs
```

ファイルのロックが可能(v4 のアドバイザリーロックに準拠)

## 制限

同一 VPC からのみアクセス可能(Direct Connect 経由は OK)

EFS のバックアップ機能、バージョニング機能は未提供なので、EBS や EBS スナップショットなどにバックアップする必要あり

## 推奨マウントオプション

- NFS4.1
- Read Write buffer = 1MB
- Mesure Timeout = hard
- TImeout = 60s
- Measure Time out = 2
- async mode

- 上記の推奨設定を EFS マウントヘルパーで設定できる(TLS1.2 で通信の暗号化もしてくれる）

## 移行

EFS File Sync がいいらしい
cp や rsync に比べて最大で 5 倍高速
EC2 か、VM ESXi でエージェントを実行

## Security

- NW Traffic
  - Security Group
  - ACL
- POSIX 権限により、アクセス制御
- IAM で管理者

## Performance

- IO 処理、ファイル操作にはレイテンシーのオーバーヘッドがある
- バーストモデルがある
  - ベースラインスループットによって蓄積化消費化が決まる

## 低頻度アクセスストレージ

128KB かつ 30 日以上アクセスも変更されていないファイルを対象として移動できる。コストが 85%下がる

ライフサイクル設定で設定できる

## 料金

- Tokyo Region 0.36 USD (GB / 月)

## 参考

- [20180704(20190520 Renewed) AWS Black Belt Online Seminar Amazon Elastic File System](https://www.slideshare.net/AmazonWebServicesJapan/2018070420190520-renewed-aws-black-belt-online-seminar-amazon-elastic-file-system-amazon-efs)

- [Amazon EFS（EC2 用フルマネージド型ファイルシステム）\| AWS](https://aws.amazon.com/jp/efs/)
