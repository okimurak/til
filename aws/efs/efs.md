# EFS

EC2同士で共有できるNFSファイルシステム。しかもスケーラブル

対応しているのはEC2だけ。なので、ECSではFargateでは無理

### NFS Version
ネットワークファイルシステムバージョン 4 (NFSv4.1 および NFSv4.0) プロトコルをサポートしている。
なので、OSが古いバージョンだと、NFS4に対応していないので、接続できない

## 参考

- [Amazon EFS（EC2 用フルマネージド型ファイルシステム）\| AWS](https://aws.amazon.com/jp/efs/)