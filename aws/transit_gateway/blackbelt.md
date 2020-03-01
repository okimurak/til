# Transit Gateway

- リージョンごとのゲートウェイサービス
- VPC, VPN, Direct Connectを接続可能
- ルーティングドメインを可能
- パートナーアプライアンスをミドルボックスとしてサポート

## AWS HyperPlane

- VPCを水平方向に拡張しているステートマネジメント
- NLB, NAT Gateway EFSをサポートしている

## アタッチメント
- AZの一つのサブネットのみアタッチ

## AZ間経路

- 同一AZのENI経由
  - レイテンシ対策のためらしい
  - 送信先に同一のAZが存在しない場合は、他のAZのENIに出力されて通信できる

## ユースケース

### 自由に通信できるRoute Domain
- Default route domainでいける
  - VPC追加したときもルーティングテーブルに自動で追加される

### VPC間の通信を制限するRoute Domain
- ルーティングテーブルを分割することで各VPC間のRoute tableを制限できる

### インターネットに抜けるOutbound Route Domain
- Static Routeを追加する
  - Outbound用のVPCにTransit Gatewayへの Routeを追加すること

### VPC間のトラフィックをインライン監査するRoute Domains

- IDSとかNext Generation FWなどに通してからVPCに

### Transit Gateway + Direct Connect /VPN
- Transit 仮想インターフェースを利用することに注意
- VPNを複数に分散可能
  - 接続ごとの最大帯域幅は1.25Gbps
    - 帯域が欲しい場合は束ねてね

### 多拠点を収容するVPN Hub
- 今まではAWS VPNを使って実現していた(上限10)
  - 接続するVPN分インスタンスを立ち上げる必要があった
- これをTransit Gatewayで収容できる(5000まで,VPCやDirect Connect含む = アタッチ数)

## アタッチメントの設計

- 専用のサブネットを作るのを勧めている
  - 他のインスタンスなどと同居すると、TGWからの経路の影響を受ける(IPレンジは小さくていい)

## DNSクエリ

- マルチVPCでDNSクエリ投げる構成の場合は、Route53 resolver Endpointを作成する必要あり

## 使わなくて良いパターン

- VPC Peering + Direct Connect GWだけでVPC間の通信制限はできる
  - VPC Peeringは1ホップしかできないけど

- Transit Gatewayは高め
  - $100/月くらい

## Reference

- [【AWS Black Belt Online Seminar】AWS Transit Gateway - YouTube](https://www.youtube.com/watch?v=Yhe2jYzFmfs)
- [20191113 AWS Black Belt Online Seminar AWS Transit Gateway](https://www.slideshare.net/AmazonWebServicesJapan/20191113-aws-black-belt-online-seminar-aws-transit-gateway)
- [Transit Gateway Deep Dive アーキテクチャガイド](https://pages.awscloud.com/rs/112-TZM-766/images/B1-05.pdf)