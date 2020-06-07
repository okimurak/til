# Storage Gateway

オンプレから、AWS のストレージサービスにつなげることができる。

- S3 (Glacier)
- EBS

## 種類

- ファイルゲートウェイ ... S3 に SMB や NFS で接続できるよ。キャッシュは 16TB まで
- ボリュームゲートウェイ ... EBS スナップショット に iSCSI で接続できるよ
- テープゲートウェイ

## 作成方法

- GW となるホストプラットフォームを選択する
  - Vmware ESXi
  - Microsoft Hyper-V 2008 R2
  - Microsoft Hyper-V 2012/2016
  - Amazon EC2
  - Hardware Appliance

## 暗号化

デフォルトでは S3 で管理された暗号化キー(SSE-S3)を使うが、KMS のカスタマーマスターキーを設定することもできる

## ログ

CloudTrail で見ることができる

## 料金

- ファイルゲートウェイ、ボリュームゲートウェイ
  - 書き込みだけかかる。ほかは各ストレージの料金
- テープゲートウェイ
  - 仮想テープストレージは 1GB あたり 0.025USD
  - リクエストは 1GB あたり、0.01USD
- データ転送料金
  - オンプレは 1GB 以上で、0.114USD/GB かかる（結構高いね）

## Reference

- [特徴 - AWS Storage Gateway | AWS](https://aws.amazon.com/jp/storagegateway/features/)
- [AWS Storage Gateway とは - AWS Storage Gateway](https://docs.aws.amazon.com/ja_jp/storagegateway/latest/userguide/WhatIsStorageGateway.html)
- [Deep Dive: Hybrid Cloud Storage with AWS Storage Gateway - AWS Online Tech Talks - YouTube](https://www.youtube.com/watch?v=ZwIHHEpHltU)
