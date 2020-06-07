# VPC (Virtual Private Cloud)

AWS 上でプライベートネットワーク空間を構築

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

ON にする。OFF にするとハマる

## Amazon DNS サーバー

以下でアクセス可能

- VPC のネットワーク範囲(CIDR)のアドレスに+2 した IP
- `169.254.169.253`

## Amazon Time Sync Service

NTP サーバ。プライベートネットワークでも利用できる。`169.254.169.123`に

## オンプレとの接続

- VPN 接続

- 専用線接続 ... DirectConnect で
  - Direct Connect Gateway で Hub みたいにできる

## VPC Sharing

複数のアカウントで VPC を共有できる

作成したアカウントが、他のアカウントを招待するイメージ

IP アドレス資源の保護

### 向かない例

- 高い隔離が必要
- 巨大で分散
- 制約
  - VPC オーナーは別アカウントで実行しているリソースは消せない
  - デフォルト VPC、サブネット、SG はシェアできない
  - Organization 必要

## Private Link

パブリック IP を使うこと無く、またインターネット全体を横断するトラフィックを必要すること無く、VPC から AWS のサービスにプライベートにアクセス可能

## VPC FLow Log

- ネットワークトラフィックをキャプチャして、CloudWatch Logs へ Publish する機能
- ネットワークインターフェースを送信元、送信先とするトラフィックが対象
- SG とネットワーク ACL のルールで Accepted / Reject されたトラフィックログを取得できる
- キャプチャウィンドウと言われる 10 分間ログを取得する
- 追加料金なし

## Guard Duty

EC2 or IAM に関する脅威を検出

- 機械学習による異常検知
- 30 日無料
- CloudWatch Logs、CloudTrail, VPC Flow Log と連携可能

## VPC のリミット

上限緩和申請必要なやつ

| リソース                                              | 数  |
| ----------------------------------------------------- | --- |
| リージョンあたりの VPC 数                             | 5   |
| VPC あたりのサブネット数                              | 200 |
| Elastic IP 数                                         | 5   |
| ルートテーブルあたりのルートの数                      | 100 |
| VPC あたりの SG 数                                    | 500 |
| SG あたりのルール数(In/Out)                           | 50  |
| NIF あたりの SG                                       | 5   |
| VPC あたりのアクティブな VPC ピア雪像 k               | 125 |
| VPC あたり(仮想プライベートゲートウェイ)の VPN 接続数 | 10  |

## Reference

- [【AWS Black Belt Online Seminar】Amazon VPC - YouTube](https://www.youtube.com/watch?v=aHEVvsk6pkI&list=PLzWGOASvSx6FIwIC2X1nObr1KcMCBBlqY&index=24&t=0s)
- [20190313 AWS Black Belt Online Seminar Amazon VPC Basic](https://www.slideshare.net/AmazonWebServicesJapan/20190313-aws-black-belt-online-seminar-amazon-vpc-basic)
- [【AWS Black Belt Online Seminar】 Amazon VPC Advanced - YouTube](https://www.youtube.com/watch?v=WCq_2-zkV44&list=PLzWGOASvSx6FIwIC2X1nObr1KcMCBBlqY&index=19&t=3s)
- [20190417 AWS Black Belt Online Seminar Amazon VPC Advanced](https://www.slideshare.net/AmazonWebServicesJapan/20190417-aws-black-belt-online-seminar-amazon-vpc-advanced)
