# Redshift

クラウド上の データウェアハウス(分析可能なリポジトリ)およびデータレイク

- [データウェアハウスとは? - アマゾン ウェブ サービス (AWS)](https://aws.amazon.com/jp/data-warehouse/)

PostgreSQL 互換の SQL

## 構成

- MMP(Massive Parallel Proccessing)
  - リーダーノードがタスクを受け取り、コンピュートノードに分散してタスクを実行する
  - ノードを追加してパフォーマンス控除う
- シェアードナッシング
  - ディスクをノードで共有しない
- スライス
  - コンピュートノードのメモリとディスクを分割した処理単位
  - インスタンスタイプによってスライスが異なる（2,16）

### ノードタイプ

SSD ベースの DC と HHD ベースの DS から選択

- データは圧縮されて格納
- 最大 2Pbyte まで拡張可能

DC1 は古いタイプなのでこれから立ち上げる人は DC2

### RA3 インスタンス

次世代の Redshift アーキテクチャを用いたインスタンスタイプ

- シェアードナッシングとシェアードストレージの利点をいいとこ取り
- ストレージは S3 とキャシュのローカルストレージ
- 料金
  - RA3.16xlarge \$15/ノード/時間 ... 高い
  - ストレージ料金 \$0.026GB/月
- DC2/DS2 とはアプリケーションレベルで互換性がある

- 移行方法

  - スナップショットからの復元
    - 新規クラスターとして RA3 起動
    - 移行
    - 旧クラスターを削除
  - Classic Resize

- AQUA
  - ストレージとコンピュートノードの間に追加されるノード
  - 更に高速化される

### IO

- DWH に適した、列指向型(カラムナ)でテーブルを格納
  - 列の型を適切に選択してサイズを節約
    - BIGINT(8byte))より INT(4byte),SMALLINT(2byte)
    - FLOAT(8byte)より REAL(4byte)
    - 日付は TIME 型
- 圧縮して保存
  - カラムナのため、類似データが多い事により圧縮率が高い
  - 列ごとにエンコード（圧縮アルゴリズム）を選択可能
    - `CREATE TABLE`で指定できる
    - 動的には変更不可
  - COPY や ANALYZE コマンドによって推奨エンコードを得られる
- ゾーンマップ

  - リーダノードにデータが格納されているメモリ一の最小最大が保存されている
  - ブロック単位でデータを格納しているため
  - 不要なブロックを読み飛ばせる

- GEO データ型への対応

### ショートクエリアクセラレーション(SQA)

クエリを機械学習によって実行時間を予測し、実行時間が短いクエリを専用のキューにルーティングして実行されるため高速

### リザルトキャッシュ

クエリはリーダーノードに保存しておき、キャッシュに存在するクエリが来た場合はキャッシュを返して高速化

### エンコードの種類

`ANELYZE COMPRESSION`で推奨を確認できる

<<<<<<< HEAD
Encoding|対応型|
-|-|-
RAW||ALL|圧縮なし
BYTEDICT|BOOL以外|列値で辞書を作成。値の種類が少ない場合に有効
DELT/DELTA32K|数値|連続する数値を差分で表現して圧縮
LZO|varchar向け|長い文字列の圧縮
MOSTLY(8|16|32)|数値|数値型に対し実際の数値範囲が小さいときに有効
<<<<<<< HEAD
<<<<<<< HEAD
RUNLENGTH|数値, 文字列, 日付|列がソートされている等、同じ値が繰り返される場合
TEXT255 32K|VARCHAR|同じ単語が頻出する場合
Zstandard|数値, 文字列, 日付|長さが様々な文字列を保存する場合に使う
=======
RUNLENGTH|ALL|列がソートされている等、同じ値が繰り返される場合
TEXT255 32K|文字列|同じ単語が頻出する場合
Zstandard|数値、文字列、日付|長さが様々な文字列を保存する場合に使う
>>>>>>> 1a82ba5... Add ELB and Redshift
=======
RUNLENGTH|数値, 文字列, 日付|列がソートされている等、同じ値が繰り返される場合
TEXT255 32K|VARCHAR|同じ単語が頻出する場合
Zstandard|数値, 文字列, 日付|長さが様々な文字列を保存する場合に使う
>>>>>>> 12bd2e8... Fix compression for Refshift
AZ64|数値,日付|デフォルトになった
=======
| Encoding      | 対応型             |
| ------------- | ------------------ |
| RAW           |                    | ALL | 圧縮なし |
| BYTEDICT      | BOOL 以外          | 列値で辞書を作成。値の種類が少ない場合に有効 |
| DELT/DELTA32K | 数値               | 連続する数値を差分で表現して圧縮 |
| LZO           | varchar 向け       | 長い文字列の圧縮 |
| MOSTLY(8      | 16                 | 32) | 数値 | 数値型に対し実際の数値範囲が小さいときに有効 |
| RUNLENGTH     | 数値, 文字列, 日付 | 列がソートされている等、同じ値が繰り返される場合 |
| TEXT255 32K   | VARCHAR            | 同じ単語が頻出する場合 |
| Zstandard     | 数値, 文字列, 日付 | 長さが様々な文字列を保存する場合に使う |
| AZ64          | 数値,日付          | デフォルトになった |
>>>>>>> 7a7b8c7... feat: add blackbelt for Redshift and referctor webiner

[圧縮エンコード - Amazon Redshift](https://docs.aws.amazon.com/ja_jp/redshift/latest/dg/c_Compression_encodings.html)

### ディスクアクセスを最小に

- SORTKEY

  - `CREATE TABLE`時に指定、複数列指定可能
  - 頻繁に特定カラムに対して範囲、等式検索を使う場合に有効
  - 頻繁に JOIN を行う場合はソートマージジョインが選択される

- Interleaved Sort Key
  - 8 つまで Sort Key 列を指定でき、それぞれ同等に扱われる
  - `CREATE TABLE ~ .... INTERLEAVEd SORTKEY(deptid, locid ...);`
  - どのキーが WHERE 句で指定されるか絞りきれない場合
  - 複数キーの AND 条件で検索されるケース

### ディストリビューション

`CREATE TABLE ... DISTSTYLE {EVEN | KEY | ALL}`

- EVEN .. 均一分散。非正規化表に有効
- KEY(DISTKEY ... 同じキーを同じ場所に。カーディナリティに依存するので偏る可能性も
- ALL ... 全ノードにデータをコピー

### コロケーション

ジョイン対象となるレコードを同一ノードに集める

- 方法(2 通り)
  - ジョインに使用するカラムを DISTKEY として作成
  - 分散方式 ALL でテーブルを作成

## 運用

### データ登録の流れ

- S3 に登録するデータを置く
  - ファイルサイズ大きい場合は圧縮して、マルチパートアップロード
  - ファイル分割も有効
    - ファイル名を前方一致でわかるようにしておく
- `COPY`コマンドでロード
- `ANALYZE` & `Vacuum`を実行
  - `ANALYZE` ... クエリプラン決定の元データとして利用される。最新に保つことで最適なパフォーマンス維持
    - スケジュール実行される
    - `auto_analyze`を変更することで、自動実行 OFF もできる
  - `VACUUM` ... コンパクション&ソートを行い、データをきれいにする
    - 削除は論理削除なため、ディスクにデータが残っている->コンパクションを実行して片付ける必要がある
    - `Vacuume DELETE`は自動化されたみたい
- バックアップ(SnapShot)を実行
  - S3 にバックアップ
    - 自動、手動どちらも有る
- SQL を投入
  - Actual タブからクエリ状況を確認できる

### 制約

存在しないので、ユーザ側の工夫でユニーク性を担保する

一応作成はできる

## メンテナンスウィンドウ

- RDS や Aurora 同様、2 週間のどこかの期間でメンテナンスウィンドウを設定する

  - 14 日間のメンテナンを延期できるようににあった

- メンテナンストラック
  - Trailing トラックを設定することで最新一つのバージョンを適用できる
  - 検証環境だけを最新バージョン、本番環境を 1 つ前といった状況を作ることができる

## Workload Management

用途ごとにクエリ並列度の上限を設けた複数のキューを定義することができる

- Redshift クラスタでは単一のキューで構成
- メモリのアロケーションも指定可能

## パフォーマンス・チューニングテクニック

以下を参照
[AWS Solutions Architect ブログ: Amazon Redshift のパフォーマンスチューニングテクニック Top 10](https://aws.typepad.com/sajp/2015/12/top-10-performance-tuning-techniques-for-amazon-redshift.html)

## ユースケース

- 巨大データやセット(数百 GB~PB)
- 1 つ 1 つの SQL は複雑だけど、同時実行 SQL は少ない
- データ更新は一括導入

- データウェアハウス
- ユーザがクエリを作成する BI ツール

## 生かせないユースケース

- SQL の並列実行数が多い
  - RDS を検討
- 短いレイテンシが必要
  - ElastiCache や RDS を検討
- ランダムかつパラレルな更新アクセス
  - RDS や DynamoDB を検討
- 巨大データは格納するが集計しない
  - DynamoDB またはインスタンスサイズの大きい RDS を検討

### Concurrency Scaling

負荷が高まると、裏で Redshift クラスターを追加する。

- 設定を無効化にすることも可能
- 料金は、1 日あたり 1 時間無料で、秒ごとに課金
- 実行後、裏では一定時間実行されている
  - がクエリが来なければ課金されない

### Redsshift Spectram

2017 年にリリース。S3 上のデータに対して SQL を投げられる。こちらがデータレイクみたい

AWS Glue というデータカタログを使って、S3 アクセスを透過的に行うことができる

オープンファイルフォーマットに対応

- Parquet
- ORC
- JSON
- Grok
- Avro
- CSV
- ネスト化されたデータのサポート
  - Array, Map, Struct

スキャンしたデータ量のみ課金

ユースケースとしては過去データを S3 に置くとか

### Elastic Resize

数分でノードを増減できるようになる

- 最初は S3 にバックアップ(数分~数十分)
- その後数分でノードが増える(この間読み取り専用)
- その後、増えたノードに S3 からデータ転送

本のサイズから 1/2 から 2 倍

今までのリサイズ(Clasic resize)との使い分けは

- 一時的にサイズを上げたい場合は Elastic Resize
- インスタンスタイプを変更したい場合は、Classic resize

## アドバイザー

使用状況のメトリックを分析して、改善のリコメンドを通知する

## 拡張した VPC のルーティング

S3 - Redshift を VPC の閉域網に接続するルーティング

## マテリアライズドビュー

頻繁に筆耕するクエリパターンをビューとして定義して高速化

まだプレビュー版

## データエクスポート

Redshift のでテーブルを Parquet 型でエクスポート。`UNLOAD`コマンドを使う(PARTITION も勝手に行う)

- CSV ファイルも外部表経由で Parquet 型にエクスポートできるように

## フェデレーテッドクエリ

RDS/Aurora PotgreSQl に対して、直接クエリ可能に

データウェアハウス、データレイク、オペレーショナルデータベースのデータを統合して分析

まだプレビュー版

## 料金

- インスタンス料金

  - ノード数 x 時間あたりの価格
  - リーダーノードは対象外

- S3 データレイククエリ
  - 1TB あたり\$5

## Reference

- [Amazon Redshift](https://d1.awsstatic.com/webinars/jp/pdf/services/20160720-AWS-BlackBelt-Redshift-public-v02.pdf)
- [【AWS Black Belt Online Seminar】Amazon Redshift Update - YouTube](https://www.youtube.com/watch?v=eqf5bhVwIe4)
- [20190122 AWS Black Belt Online Seminar Amazon Redshift Update](https://www.slideshare.net/AmazonWebServicesJapan/20190122-aws-black-belt-online-seminar-amazon-redshift-update)
- [【AWS Black Belt Online Seminar】Next Generation Redshift - YouTube](https://www.youtube.com/watch?v=CkSBRQYkHXM&feature=youtu.be)
- [20200218 AWS Black Belt Online Seminar Next Generation Redshift](https://www.slideshare.net/AmazonWebServicesJapan/20200218-aws-black-belt-online-seminar-next-generation-redshift)
- [【AWS Black Belt Online Seminar】Amazon Redshift - YouTube](https://www.youtube.com/watch?v=Myzy68VEXjM&feature=youtu.be)
- [20200318 AWS Black Belt Online Seminar Amazon Redshift](https://www.slideshare.net/AmazonWebServicesJapan/20200318-aws-black-belt-online-seminar-amazon-redshift)
