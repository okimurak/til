# VPC

AWS上でプライベートネットワーク空間を構築

論理的なネットワーク分離が可能

ネットワークのコントロール可能

複数のコネクティビティオプションが選択可能

 - Internet 経由
 - VPN/専用線(Direct Connect)

## NetworkACL
- サブネットレベルで効果
- ブラックリスト型
- ステートレスなので戻りのトラフィックもルールーを記載する
- すべてのルールを適用される

## Security Group
- サーバレベルで効果
- ホワイトリスト型
- ステートフルなので戻りは考慮しなくていい
- 設定した番号の順序通りに適用される

## DHCP

ONにする。OFFにするとハマる

## Amazon DNSサーバー

以下でアクセス可能
- VPCのネットワーク範囲(CIDR)のアドレスに+2したIP
- `169.254.169.253`

## Amazon Time Sync Service
NTPサーバ。プライベートネットワークでも利用できる。`169.254.169.123`に

## オンプレとの接続

- VPN接続

- 専用線接続 ... DirectConnectで
  - Direct Connect GatewayでHubみたいにできる

## VPC Sharing

複数のアカウントでVPCを共有できる

作成したアカウントが、他のアカウントを招待するイメージ

IPアドレス資源の保護

### 向かない例

- 高い隔離が必要
- 巨大で分散
- 制約
  - VPCオーナーは別アカウントで実行しているリソースは消せない
  - デフォルトVPC、サブネット、SGはシェアできない
  - Organization 必要

## PrivateLink

パブリックIPを使うこと無く、またインターネット全体を横断するトラフィックを必要すること無く、VPCからAWSのサービスにプライベートにアクセス可能

## VPC FLow Log

- ネットワークトラフィックをキャプチャして、CloudWatch LogsへPublishする機能
- ネットワークインターフェースを送信元、送信先とするトラフィックが対象
- SGとネットワークACLのルールでAccepted / Reject されたトラフィックログを取得できる
- キャプチャウィンドウと言われる10分間ログを取得する
- 追加料金なし

## GuardDuty
EC2 or IAMに関する脅威を検出

- 機械学習による異常検知
- 30日無料
- CloudWatch Logs、CloudTrail, VPC Flow Logと連携可能

## VPCのリミット
上限緩和申請必要なやつ

リソース|数
-|-
リージョンあたりのVPC数|5
VPCあたりのサブネット数|200
Elastic IP数|5
ルートテーブルあたりのルートの数|100
VPCあたりのSG数|500
SGあたりのルール数(In/Out)|50
NIFあたりのSG|5
VPCあたりのアクティブなVPCピア雪像k|125
VPCあたり(仮想プライベートゲートウェイ)のVPN接続数|10

## Reference
- [【AWS Black Belt Online Seminar】Amazon VPC - YouTube](https://www.youtube.com/watch?v=aHEVvsk6pkI&list=PLzWGOASvSx6FIwIC2X1nObr1KcMCBBlqY&index=24&t=0s)
- [20190313 AWS Black Belt Online Seminar Amazon VPC Basic](https://www.slideshare.net/AmazonWebServicesJapan/20190313-aws-black-belt-online-seminar-amazon-vpc-basic)
- [【AWS Black Belt Online Seminar】 Amazon VPC Advanced - YouTube](https://www.youtube.com/watch?v=WCq_2-zkV44&list=PLzWGOASvSx6FIwIC2X1nObr1KcMCBBlqY&index=19&t=3s)
- [20190417 AWS Black Belt Online Seminar Amazon VPC Advanced](https://www.slideshare.net/AmazonWebServicesJapan/20190417-aws-black-belt-online-seminar-amazon-vpc-advanced)