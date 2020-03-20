# Route 53

## FQDN
最後は`.`で終わる。(rootという意味になる)

## DNS
- ネームサーバ ... `.`を起点に、すべてのFQDNを探索できる。
- フルサービスリゾルバー
  - TTLの間、キャッシュを保持する
  - ISPが提供していることが多い
- スタブリゾルバー
  - OSに組み込まれたDNSクライアントの実装
  - キャッシュを保持するかどうか
- フォワーダー
  - 再起問い合わせ

- 問い合わせ
  - 再帰的問い合わせ ... 問い合わせ先に反復問い合わせを依頼する
  - 反復問い合わせ ... 自らがネームサーバーを辿る際に行う問い合わせ
    - フルサービスリゾルバが反復問い合わせを受け取った場合は自分の情報を回答する

## Resolver
VPCに標準で備わるDNSサーバ。（フォワーダー＋フルサービスリゾルバ）

## 転送ルール
どのDNSクエリをRoute53リゾルバーで別のDNSリゾルバーに転送するか、自身で応答するかを決める

- 転送
  - 指定したドメイン名のDNSクエリをネットワークのネームサーバに転送
- システム
  - リゾルバーが転送ルールで定義されている動作を、選択的に上書きする
- 再帰的
  - ルールの存在しないドメイン名の再起リゾルバーとして機能。既定で削除不可

- [ネットワークへのアウトバウンド DNS クエリの転送 - Amazon Route 53](https://docs.aws.amazon.com/ja_jp/Route53/latest/DeveloperGuide/resolver-forwarding-outbound-queries.html)

## Resolever for Hybrid Clouds
オンプレからVPC環境への名前解決も提供する拡張機能

- オンプレ - VPC
- オンプレ - インターネット
- VPC - オンプレ
- オンプレとインターネットで同じドメイン名を利用している際、双方のゾーンを併用

## 料金

- Resolver
  - DNSクエリは無料
  - VPC外からのDNSクエリは受け付けない
- Resolver for Hybrid Clouds
  - エンドポイントは$0.125/月のElastic Network Interfaces(ENIs)
  - 条件付き転送規定（転送ルール）またはエンドポイントで処理されるDNSクエリは10億回までは$0.4, 100万回毎に$0.2

## 設定と仕様

- エンドポイントにはENIを使っているため、セキュリティグループの設定が必須
  - インバウンドとアウトバウンドを設定すること
    - TCP53も開けとく。理由はDNSはUDP 53を使うけど、失敗した後にTCP53にフォールバックするため

## テスト

- エンドポイントに疎通確認
  - `dig`, `nslookup`
    - `dig`がおすすめ（`nslookup`では細かいパラメータが指定できない）
    - 再帰的問い合わせと反復問い合わせを切り分ける
  - 全体を俯瞰するには `Squish.net DNS traversal checker`, `dnscheck.jp`
- 複数のフルサービスリゾルバから確認する
  - パブリックDNSを活用する
  - [Public DNS Server List](https://public-dns.info/)

```
dig @<ip> <domain name> <Query Type> <Option>
```

- digコマンドのレスポンスに含まれる、ステータスとフラグが重要

- [初心者のためのDNSの設定とよくあるトラブル事例](https://dnsops.jp/event/20140626/dns-beginners-guide2014-mizuno.pdf)

## Hosted Zone
ネームサーバをフルマネージドで提供するサービス

### ドメイン名

- 分野別トップレベルドメイン(gTLD) : generic TLD)
- 国コードトップレベルドメイン(ccTLD : country code TLD)

### ドメインの登録

- レジストラント ... ドメイン名を登録して使用するユーザ
- レジストラ ... レジストリと契約して、ドメイン名登録窓口となる事業者
- レジストリ ... TLDを管理する主体。TLDのネームサーバとwhoisを提供

### WHOIS database

ドメイン名の登録情報を参照可能なデータベース

`whois`コマンドで確認できる

### トラブル

- ドメインハイジャック
  - 登録情報の書き換え、ネームサーバの侵害などによる乗っ取り
- スラミング
  - ドメイン名移転スキームの悪用による所有権乗っ取り
- ドロップキャッシング
  - 更新漏れ、廃止したドメインを第三者が取得して利用

### 対策

- レジストラ/ レジストリからの連絡を見逃さない
- レジストリロック、レジストラロックの活用
- 多要素認証など、レジストラが提供するコントロールパネルを使う


### ネームサーバの Delegation

- 親ゾーンから小ゾーンのネームサーバをFQDNで示すことで委譲
  - 子のレコードにはIPアドレスのレコード(Glueレコード)を追加しておく

### RR(リソースレコード)とRRSet

- 5つのレコードを持つ(NAME, TTL, CLASS, TYPE, RDATA)
  - NAME, CLASS, TYPEがキー
  - キーが同じである集合をRRSetという
  - CLASS
    - IN
  - RR TYPE
    - SOA ... 管理主体の宣言(権威) ゾーンには必ず必要。DNSサーバ構築には必須
    - NS ... 親、子ゾーンのネームサーバのFQDNを指し示す
    - A/AAAA ... AがIPv4, AAAAがIPv6でFQDNに対応するIPを返す
    - CNAME ... 指定する名前に置き換えてリゾルブを継続する。別名をつける手段に使われることが多い
      - 他のレコードタイプが指定されているときにはCNAMEを定義できない
      - Zone Apex(サブドメイン名を含まないドメイン名)にはCNAMEを定義できない
        - SOA/NSレコードが必要なため -> Route53のエイリアスレコード使えば回避できる
    - PTR ... IPからFQDNを逆引きする。IPを億テッド毎に区切って逆に並べて、`in-addr.arpa`を付与したキーに問い合わせを行う
      - いくつかのサービスにはこれが必要(メールサーバ)
  - NX DOMAIN ... レコードがないというレコード（ネガティブキャッシュ）

### Host Zone
ネームサーバ

4レコードがトップレベルドメインとして作成されるが、これらは変更しないこと

### Public Hosted Zone Private Hosted Zone
- Public Hosted Zone ... インターネットからのDNSドメイン管理コンテナ
- Private Hosted Zone ... VPCに閉じたプライベートネットワークのDNSドメイン管理コンテナ

### エイリアスレコード

問い合わせ元にCNAMEを応答せず、最終的に必要するレコードデータのみを応答する

### トラフィックルーティング

- DNSの応答をカスタマイズスルことで適したリソースにルーティング
  - シンプル
    - 静的なマッピングで決定
      - 複数の値を1レコードに指定すると、ランダムな順序で応答(DNSラウンドロビン)
  - 加重
    - 指定した比率で、複数のリソースにトラフィックをルーティング
      - A/Bテスト
      - Blue / Greenデプロイ、カナリアデプロイ
      - 性能の偏りがある場合の負荷平準化
  - フェイルオーバー
    - ヘルスチェックの結果に基づいて利用可能なリソースのみ応答する
  - 複数値回答
    - 正常なリソースから8つを応答。IPアドレスに基づくチェックも可能
  - レイテンシー
    - 最も少ないレイテンシーの応答を返す
  - 位置情報
    - クライアントの位置情報に基づいて応答
  - 物理近接性(地理的近接性)
    - トラフィックフローが必要
      - GUIで設定できる

### 移行
- 下記が良いドキュメント
  - [019-DNSサーバーの引っ越し - 株式会社日本レジストリサービス](https://jprs.jp/related-info/guide/019.pdf)
- 代表的なタスク
  - Route 53 Hosted Zoneを構成
    - ゾーンファイル(RFC 1034,1035形式)をインポートできる
    - $GENERATEなど一部はサポートしていないのでCLIなどを使う
  - ネームサーバに関連するTTLを短縮
    - 切り替え時間に要する時間を短縮できる
  - 親子ゾーンの Delegation 設定を変更
  - 旧ネームサーバの廃止

# Reference
- [AWS Black Belt Tech シリーズ 2016 - Amazon Route 53](https://www.slideshare.net/AmazonWebServicesJapan/aws-black-belt-tech-2016-amazon-route-53)
- [【AWS Black Belt Online Seminar】Amazon Route 53 Resolver - YouTube](https://www.youtube.com/watch?v=bax2ZksBzck)
- [20191016 AWS Black Belt Online Seminar Amazon Route 53 Resolver](https://www.slideshare.net/AmazonWebServicesJapan/20191016-aws-black-belt-online-seminar-amazon-route-53-resolver)
- [【AWS Black Belt Online Seminar】Amazon Route 53 Hosted Zone - YouTube](https://www.youtube.com/watch?v=jFQswFqA9mA)
- [20191105 AWS Black Belt Online Seminar Amazon Route 53 Hosted Zone](https://www.slideshare.net/AmazonWebServicesJapan/20191105-aws-black-belt-online-seminar-amazon-route-53-hosted-zone-193836805)
