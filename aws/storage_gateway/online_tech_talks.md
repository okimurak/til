# Storage Gateway

オンプレから、AWSのストレージサービスにつなげることができる。

- S3 (Glacier)
- EBS

## 種類

- ファイルゲートウェイ ... S3 SMBやNFSで接続できるよ。キャッシュは16TBまで
- ボリュームゲートウェイ ... EBSスナップショット iSCSIで接続できるよ
- テープゲートウェイ

## 作成方法
- GWとなるホストプラットフォームを選択する
  - Vmware ESXi
  - Microsoft Hyper-V 2008 R2
  - Microsoft Hyper-V 2012/2016
  - Amazon EC2
  - Hardware Appliance

## 料金
- ファイルゲートウェイ、ボリュームゲートウェイ
  - 書き込みだけかかる。ほかは各ストレージの料金
- テープゲートウェイ
  - 仮想テープストレージは 1GBあたり0.025USD
  - リクエストは1GBあたり、0.01USD

## 暗号化
デフォルトではS3で管理された暗号化キー(SSE-S3)を使うが、KMSのカスタマーマスターキーを設定することもできる

## ログ
CloudTrailで見ることができる

## 料金
- データ転送料金
  - オンプレは 1GB以上で、0.114USD/GBかかる（結構高いね）

## Reference
- [特徴 - AWS Storage Gateway | AWS](https://aws.amazon.com/jp/storagegateway/features/)
- [AWS Storage Gateway とは - AWS Storage Gateway](https://docs.aws.amazon.com/ja_jp/storagegateway/latest/userguide/WhatIsStorageGateway.html)
- [Deep Dive: Hybrid Cloud Storage with AWS Storage Gateway - AWS Online Tech Talks - YouTube](https://www.youtube.com/watch?v=ZwIHHEpHltU)