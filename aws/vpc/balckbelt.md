# VPC (Virtual Private Cloud)

AWS 上でプライベートネットワーク空間を構築

論理的なネットワーク分離が可能

ネットワークのコントロール可能

複数のコネクティビティオプションが選択可能

- Internet 経由
- VPN/専用線(Direct Connect)

## Network ACL

- サブネットレベルで効果
- ブラックリスト型
- ステートレスなので戻りのトラフィックもルールを記載する
- すべてのルールを適用される

## Security Group

- サーバレベルで効果
- ホワイトリスト型
- ステートフルなので戻りは考慮しなくていい
- 設定した番号の順序通りに適用される

## DHCP

サブネット内の ENI に自動で割り当て。OFF にするとハマるので、ON(デフォルト)にする

## Amazon DNS サーバー

以下でアクセス可能

- VPC のネットワーク範囲(CIDR)のアドレスに+2 した IP
- `169.254.169.253`
- VPC で回設定を有効化する

  - Enable DNS resolution ... VPC の DNS 機能が使える
  - Enable DNS hostname ... DNS 名画割当になる

- Route 53 Resolver for Hybrid Cloud を使うと、オンプレからでも VPC 内の DNS 名 を引ける

## Amazon Time Sync Service

NTP サーバ。プライベートネットワークでも利用できる。うるう秒も対策済。`169.254.169.123`を参照する。

## オンプレとの接続

- VPN 接続 ... バーチャルプライベートゲートウェイを使ったサイト間ゲートウェイ

- 専用線接続 ... Direct Connect で
  - Direct Connect Gateway で Hub みたいにできる

### オンプレからのルート設定

各サブネットに以下のルートテーブル設定が必要

- 宛先：オンプレの IP(ネットワーク IP)
- ターゲット：VGW の ID

- ルートテーブルでルート伝達（プロパゲート）を有効にすると、VGW で受信したルート情報をルートテーブルに自動的に伝達される
  - オンプレのルートが頻繁に更新されるなら設定する

## Transit Gateway

100 以上 VPC とオンプレミスとの相互接続を簡単に（ルータっぽく動く）

## Private Link

パブリック IP を使うこと無く、またインターネット全体を横断するトラフィックを必要すること無く、VPC から AWS のサービスにプライベートにアクセス可能

- ゲートウェイ型
  - S3 と DynamoDB
- インターフェース型
  - 他のサービス

オンプレからも利用できる。DNS 引けない場合は、Route 53 Resolver for Hybrid Cloud を使う

## NAT ゲートウェイ

- プライベートサブネットのリソースがインターネットや AWS クラウドに通信するために必要
- 45Gbps まで拡張
- AZ ごとに設置するのがベストプラクティス
- そこそこお値段かかる
  - 代替案としては NAT インスタンスというパターンもあるけど、自分たちで管理必要だよ

## VPC Peering

2 つの VPC 間でトラフィックのルーティングが可能。クロスアカウントや、リージョンも跨げる。単一障害点や帯域幅のボトルネックは存在しない

- MTU は 1500byte
- 直接 Peering している VPC のみ通信可能(2 ホップ以上は不可)

## VPC Sharing

複数のアカウントで VPC を共有できる。作成したアカウントが、他のアカウントを招待するイメージ

### 利点

- IP アドレス資源の保護
- VPC Peering や Transit Gateway 不要

### 向かない例

- 高い隔離が必要
  - 影響を限定する場合
- 巨大で分散した組織
  - 個々のチームで管理するとか
- 制約
  - VPC オーナーは別アカウントで実行しているリソースは消せない
  - デフォルト VPC、サブネット、SG はシェアできない
  - Organization 必要

### Cloud Formation

JSON/YAML で定義できる

デザイナーという機能があり、GUI で設計できる

## VPC FLow Log

- ネットワークトラフィックをキャプチャして、CloudWatch Logs へ Publish する機能
- ネットワークインターフェースを送信元、送信先とするトラフィックが対象
- SG とネットワーク ACL のルールで Accepted / Reject されたトラフィックログを取得できる
- キャプチャウィンドウと言われる 10 分間ログを取得する
- RDS, Redshift, ElasticCache WorkSpaces のネットワークインターフェーストラフィックも取得可
- 追加料金なし

## Guard Duty

- 機械学習による異常検知
- EC2 or IAM に関する脅威を検出
- データソースは DNS Logs、CloudTrail, VPC Flow Log
- 30 日無料

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
