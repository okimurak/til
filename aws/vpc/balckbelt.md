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
- VPC で以下設定を有効化する
  - Enable DNS resolution ... VPC の DNS 機能が使える
  - Enable DNS hostname ... DNS 名が割当になる

- Route 53 Resolver for Hybrid Cloud を使うと、オンプレからでも VPC 内の DNS 名を引ける

## Amazon Time Sync Service

NTP サーバ。プライベートネットワークでも利用できる。うるう秒も対策済。`169.254.169.123` を参照する。

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

## マネージドプレフィックスリスト

1 つ以上の CIDR ブロックのセット。IPVv4, IPv6 は 1 つのセットに混ぜることができない。

- カスタマーマネージドプレフィックスリスト : 自分で CIDR のセットを作れる。
- AWS マネージドプレフィックスリスト : AWS のリソースを参照するために使う。CloudFront, DynamoDB, S3, VPC Lattice, Ground Station が使える。

プレフィックスリストは、Organizations の場合、RAM(Resource Access Manager) を使うことで共有できる。

## Egress-Only インターネットゲートウェイ

IPv6 のみで使える。IPv6 はデフォルトでパブリックなので、インターネット上のリソースにインスタンスとの通信を開始させないときに使う。


## Transit Gateway

100 以上 VPC とオンプレミスとの相互接続を簡単に（ルータっぽく動く）

## Private Link

パブリック IP を使うこと無く、またインターネット全体を横断するトラフィックを必要すること無く、VPC から AWS のサービスへプライベートにアクセス可能

- ゲートウェイ型
  - S3 と DynamoDB
- インタフェース型
  - 他のサービス

オンプレからも利用できる。DNS 引けない場合は、Route 53 Resolver for Hybrid Cloud を使う

## NAT ゲートウェイ

- プライベートサブネットのリソースがインターネットや AWS クラウドに通信するために必要
- 45Gbps まで拡張
- AZ ごとに設置するのがベストプラクティス
- そこそこお値段かかる
  - 代替案としては NAT インスタンスというパターンもあるけど、自分たちで管理必要だよ

## NAT インスタンス

自分で管理が必要な NAT サーバー。コストは NAT ゲートウェイに比べて安く、NAT ゲートウェイより自由度はある（ポート転送や踏み台サーバにできたり）。
フェイルオーバーにはスクリプトを使う必要がある。

[NAT ゲートウェイと NAT インスタンスの比較 - Amazon Virtual Private Cloud](https://docs.aws.amazon.com/ja_jp/vpc/latest/userguide/vpc-nat-comparison.html)

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
- ネットワークインタフェースを送信元、送信先とするトラフィックが対象
- SG とネットワーク ACL のルールで Accepted / Reject されたトラフィックログを取得できる
- キャプチャウィンドウと言われる 10 分間ログを取得する
- RDS, Redshift, ElasticCache WorkSpaces のネットワークインタフェーストラフィックも取得可
- 追加料金なし

## Guard Duty

- 機械学習による異常検知
- EC2 or IAM に関する脅威を検出
- データソースは DNS Logs、CloudTrail, VPC Flow Log
- 30 日無料

## VPC のリミット

上限緩和申請必要な項目

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


## その他

### IPv4 アドレスが枯渇したら

セカンダリ CIDR ブロックを追加するか、 VPC を作り直して移行する。

[Amazon VPC の IPv4 アドレス範囲を変更](https://aws.amazon.com/jp/premiumsupport/knowledge-center/vpc-ip-address-range/)

### IPv6 の設定方法

設定には以下が必要
- IPv6 CIDR ブロックを VPC とサブネットに関連付け
- IPv6 トラフィックがルーティングされるようにルートテーブルを更新。パブリックサブネットの場合は、サブネットから IGW に全部ルーティングするルートを作成。プライベートサブネットの場合は、サブネットから Egress only インターネットゲートウェイにインターネット経由の IPv6 トラフィックを全部ルーティングするルートを作成
- IPv6 のルールを含めるように。セキュリティグループを更新する。カスタムネットワーク ACL を作成している場合は、これも変更する。
- インスタンスタイプを IPv6 をサポートしているものに変える。
- サブネットの IPv6 CIDR の範囲からインスタンスに IPv6 アドレスを割り当てる。
- IPv6 を使用するように設定されていない AMI からインスタンスを起動した場合は、手動でインスタンスを設定する。

### プライベートサブネットに外から接続したい。

AWS Site-to-Site VPN を使う。

[プライベートサブネットのみおよび AWS Site-to-Site VPN アクセスを持つ VPC - Amazon Virtual Private Cloud](https://docs.aws.amazon.com/ja_jp/vpc/latest/userguide/VPC_Scenario4.html)

## Reference

- [【AWS Black Belt Online Seminar】Amazon VPC - YouTube](https://www.youtube.com/watch?v=aHEVvsk6pkI&list=PLzWGOASvSx6FIwIC2X1nObr1KcMCBBlqY&index=24&t=0s)
- [20190313 AWS Black Belt Online Seminar Amazon VPC Basic](https://www.slideshare.net/AmazonWebServicesJapan/20190313-aws-black-belt-online-seminar-amazon-vpc-basic)
- [【AWS Black Belt Online Seminar】 Amazon VPC Advanced - YouTube](https://www.youtube.com/watch?v=WCq_2-zkV44&list=PLzWGOASvSx6FIwIC2X1nObr1KcMCBBlqY&index=19&t=3s)
- [20190417 AWS Black Belt Online Seminar Amazon VPC Advanced](https://www.slideshare.net/AmazonWebServicesJapan/20190417-aws-black-belt-online-seminar-amazon-vpc-advanced)
