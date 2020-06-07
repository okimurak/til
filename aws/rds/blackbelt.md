# Relational Database Service (RDS)

トランザクションが必要な業務データベースに使う

## 制限

- Oracle の場合
  - 11g, 12c のみ
  - キャパシティの上限
  - OS, FileSystem へのアクセス不可, AWS CLI やプロシージャで代替
  - ALTER SYSTEM, ALTER DATABASE 不可
  - IP 固定不可
  - RAC, ASM, DataGuard, RMAN は使えない
  - 個別パッチは適用不可

許容できない場合は、on EC2 かオンプレミスで構築

## Read Replica

- 5 台まで (Aurora は 15 台まで)増設可能
- マルチ AZ との併用、クロスリージョンも OK
- RR は DB インスタンスにも昇格可能

- DMS によって Oracle SQL Server も実現可能

## Scale Up

インスタンスタイプ変更はコンソール or API から可能。再起動必要。(Multi AZ で軽減可)

## ストレージタイプ

- SSD
- プロビジョン度 IOPS
- Magnestic(HDD)
  - 下位互換としてサポート

## Backup

- 自動バックアップ、Transaction Log, 自動スナップショットを S3 に保存

  - 自動スナップショットはインスタンス削除時に削除される

- スナップショット

  - 25 日分
  - 手動スナップショットは任意の時間に可能

- リストア

  - Point-in-Time リカバリ
    - 5 分以上前の状態の DB インスタンスを作成可能

- Endpoint のリネームも可能

  - DNS のフラッシュに依存する(10 分ほど時間かかる)
  - 名前の重複ができない
  - クライアント側の DNS キャッシュｎ TTL にも依存(30s 未満推奨)
  - CLoudwatch のメトリクス名、Events の Identifier

- Percona Xtrabackup を使って MySQL 平衡が可能(S3 経由)

## 設定変更

- Parameter group
- Option group

## メンテナンスウィンドウ

メンテナンス（OS などのアップデート）に必要な時間を確保できる。
バックアップウィンドウの後に設定すると良い、無効化はマイナーバージョン以外不可

イベント通知を監視に組み込んでいくことをお勧め
マルチ AZ 配置にしておくとダウンタイム軽減

## Metrics

- 60s ごと

- 拡張メトリクス
  - OS メトリクス
  - 取得間隔の修正(1~60s で取得)

## Event Subscription

CloudWatchEvent 経由で SNS に通知

## Log

API かコンソールから表示、ダウンロード

## Crypt

暗号化方式は DB エンジンによって異なる

TDE による暗号化は Oracle , SQL Server (Enterprise Edition) のみ

## Engine

- Mysql 5.5 ~ 5.7
  - キャッシュウォーミング
- Oracle 11g, 12c
  - Licence で SE1, SE2
  - Golden Gate 使える
- SQL Server 2008 ~ 2017
- Postgress 9.3 ~ 11.3
  - 拡張モジュールが使える
- MariaDB

## 料金

1 時間単位の課金, データ転送量

## 停止時間

7 日まで停止可能、7 日後に起動される。シングル AZ のみ

## Aurora

# RDS Aurora

## 制限
- Oracleの場合
  - 11g, 12cのみ
  - キャパシティの上限
  - OS, FileSystem へのアクセス不可, AWS CLIやプロシージャで代替
  - ALTER SYSTEM, ALTER DATABASE不可
  - IP固定不可
  - RAC, ASM, DataGuard, RMANは使えない
  - 個別パッチは適用不可

許容できない場合は、on EC2かオンプレミスで構築

## Read Replica

- 5台まで (Auroraは15台まで)増設可能
- マルチAZとの併用、クロスリージョンもOK
- RRはDBインスタンスにも昇格可能

- DMSによってOracle SQL Serverも実現可能

## Scale Up

インスタンスタイプ変更はコンソール or APIから可能。再起動必要。(Multi AZで軽減可)

## ストレージタイプ

- SSD
- プロビジョン度IOPS
- Magnestic(HDD)
  - 下位互換としてサポート

## Backup

- 自動バックアップ、Transaction Log, 自動スナップショットをS3に保存
  - 自動スナップショットはインスタンス削除時に削除される

- スナップショット
  - 25日分
  - 手動スナップショットは任意の時間に可能

- リストア
  - Point-in-Timeリカバリ
    - 5分以上前の状態のDBインスタンスを作成可能

- Endpointのリネームも可能
  - DNSのフラッシュに依存する(10分ほど時間かかる)
  - 名前の重複ができない
  - クライアント側のDNSキャッシュｎTTLにも依存(30s未満推奨)
  - CLoudwatchのメトリクス名、EventsのIdentifier

ーPercona Xtrabackupを使ってMySQL平衡が可能(S3経由)

## 設定変更

- Parameter group
- Option group

## メンテナンスウィンドウ

メンテナンス（OSなどのアップデート）に必要な時間を確保できる。
バックアップウィンドウの後に設定すると良い、無効化はマイナーバージョン以外不可

イベント通知を監視に組み込んでいくことをお勧め
マルチAZ配置にしておくとダウンタイム軽減

## Metrics

- 60sごと

- 拡張メトリクス
  - OSメトリクス
  - 取得間隔の修正(1~60sで取得)

## Event Suvacription

CloudWatchEvent経由でSNSに通知

## Log
APIかコンソールから表示、ダウンロード

## Crypt

暗号化方式はDBエンジンによって異なる

TDEによる暗号化は Oracle , SQL Server (Enterprise Edition) のみ

## Engine

- Mysql 5.5 ~ 5.7
  - キャッシュウォーミング
- Oracle 11g, 12c
  - LicenceでSE1, SE2
  - Golden Gate使える
- SQL Server 2008 ~ 2017
- Postgress 9.3 ~ 11.3
  - 拡張モジュールが使える
- MariaDB

## 料金
1時間単位の課金, データ転送量

## 停止時間
7日まで停止可能、7日後に起動される。シングルAZのみ

## Aurora

以下相当

- MySQL
- PostGreSQL
  +α で色々機能を追加している

- Lamnda からストアドプロシージャとかトリガー実行できる
- Protection Group(10GB)毎にストレージノードを 6 本
  - 全部がフルデータを持ってるわけではない
- 2 つのコピーに障害起きても、読み書き OK
- 3 つのコミーに障害発生しても読み込みは OK
- クォーラムモデル ... レプリケーション管理のためのクォーラムモデル、コピーがいくつあれば読み込みと書き込みが可能かどうかをマッピングされている
- メンバーシップチェンジにクォーラムセットと、エポックを使う

  - 特定のノードが疑わしい状態になると、それの代わりのノードを含むクォーラムセットを作る
  - 特定のノードが死んだら、代わりのクォーラムセットに置き換える

- レプリケーションの遅延
  - binlog 使ってないので 10-20ms 遅延
    - レプリカが Master から更新通知だけ受け取る必要があるため
    - データは他のところで共有しているので。。。
- フェイルオーバー
  - 45 から 60 秒
  - MARIADB ドライバーを使えばもっと早い
- バックアップ

  - S3 に
  - PITR で 5 秒 Backup Retention Period までの任意の位置に秒単位で復元可能

- 独自の SQL

  - ALTER SYSTEM CRASH ... クラッシュされたときの挙動をシミュレート
  - ALLTER SYSTEM SIMULATE ... レプリケーションをシミュレート

- カスタムエンドポイントを作れる

  - Reader をグルーピングできるようになった
    - Reader エンドポイントはラウンドロビンでアクセスするので、きっちり役割を分ける場合には使わないこと

- グローバル Database

  - リージョンをまたいだレプリケーションとフェールオーバーが可能
  - Read Only
  - クロスリージョンレプリケーションなら、Write もできる

- Aurora Serverless

  - 負荷の少ないアプリケーション
  - プロキシエンドポイントのみ作成されている
  - タイムアウト 1 分で設定すること

- Backtrack

  - PTTR だと時間かかってた
  - DB 全体を巻き戻しなら数分で戻せる
  - 100 万レコードに付き、\$0.014

- Database cloning
  - データベースのコピーを作成
    - データのコピーじゃないのですぐ終わるらしい
    - なのでインスタンスの料金だけ

### オープンソース

- MySQL
- PostgreSQL
- MariaDB

### その他

- SQL Server
- Oracle

## 参考

- [20180425 AWS Black Belt Online Seminar Amazon Relational Database Service](https://www.slideshare.net/AmazonWebServicesJapan/20180425-aws-black-belt-online-seminar-amazon-relational-database-service-amazon-rds-96509889)
- [【AWS Black Belt Online Seminar】Amazon Relational Database Service (Amazon RDS) - YouTube](https://www.youtube.com/watch?v=nDme-ET-_EY&feature=youtu.be)
- [20190424 AWS Black Belt Online Seminar Amazon Aurora MySQL](https://www.slideshare.net/AmazonWebServicesJapan/20190424-aws-black-belt-online-seminar-amazon-aurora-mysql)
- [【AWS Black Belt Online Seminar】Amazon Aurora MySQL - YouTube](https://www.youtube.com/watch?v=VerVNchaqVY)
