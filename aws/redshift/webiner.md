# Redshift

クラウド上の データウェアハウス(分析可能なリポジトリ)およびデータレイク
-  [データウェアハウスとは? - アマゾン ウェブ サービス (AWS)](https://aws.amazon.com/jp/data-warehouse/)


PostgreSQL互換のSQL

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

SSDベースのDCとHHDベースのDSから選択
 - データは圧縮されて格納
 - 最大2Pbyteまで拡張可能

DC1は古いタイプなのでこれから立ち上げる人はDC2

### RA3インスタンス

次世代のRedshiftアーキテクチャを用いたインスタンスタイプ
- シェアードナッシングとシェアードストレージの利点をいいとこ取り
- ストレージはS3とキャシュのローカルストレージ
- 料金
  - RA3.16xlarge $15/ノード/時間 ... 高い
  - ストレージ料金 $0.026GB/月
- DC2/DS2とはアプリケーションレベルで互換性がある

- 移行方法
  - スナップショットからの復元
    - 新規クラスターとしてRA3起動
    - 移行
    - 旧クラスターを削除
  - Classic Resize

- AQUA
  - ストレージとコンピュートノードの間に追加されるノード
  - 更に高速化される

### IO
- DWHに適した、列指向型(カラムナ)でテーブルを格納
  - 列の型を適切に選択してサイズを節約
    - BIGINT(8byte))よりINT(4byte),SMALLINT(2byte)
    - FLOAT(8byte)よりREAL(4byte)
    - 日付はTIME型
- 圧縮して保存
  - カラムナのため、類似データが多い事により圧縮率が高い
  - 列ごとにエンコード（圧縮アルゴリズム）を選択可能
    - `CREATE TABLE`で指定できる
    - 動的には変更不可
  - COPYやANALYZEコマンドによって推奨エンコードを得られる
- ゾーンマップ
  - リーダノードにデータが格納されているメモリ一の最小最大が保存されている
  - ブロック単位でデータを格納しているため
  - 不要なブロックを読み飛ばせる

- GEOデータ型への対応

### ショートクエリアクセラレーション(SQA)

クエリを機械学習によって実行時間を予測し、実行時間が短いクエリを専用のキューにルーティングして実行されるため高速

### リザルトキャッシュ

クエリはリーダーノードに保存しておき、キャッシュに存在するクエリが来た場合はキャッシュを返して高速化

### エンコードの種類

`ANELYZE COMPRESSION`で推奨を確認できる

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

[圧縮エンコード - Amazon Redshift](https://docs.aws.amazon.com/ja_jp/redshift/latest/dg/c_Compression_encodings.html)

### ディスクアクセスを最小に

- SORTKEY
  - `CREATE TABLE`時に指定、複数列指定可能
  - 頻繁に特定カラムに対して範囲、等式検索を使う場合に有効
  - 頻繁にJOINを行う場合はソートマージジョインが選択される

- Interleaved Sort Key
  - 8つまでSort Key列を指定でき、それぞれ同等に扱われる
  - `CREATE TABLE ~ .... INTERLEAVEd SORTKEY(deptid, locid ...);`
  - どのキーがWHERE句で指定されるか絞りきれない場合
  - 複数キーのAND条件で検索されるケース

### ディストリビューション

`CREATE TABLE ... DISTSTYLE {EVEN | KEY | ALL}`

- EVEN .. 均一分散。非正規化表に有効
- KEY(DISTKEY ... 同じキーを同じ場所に。カーディナリティに依存するので偏る可能性も
- ALL ... 全ノードにデータをコピー

### コロケーション

ジョイン対象となるレコードを同一ノードに集める

- 方法(2通り)
  - ジョインに使用するカラムをDISTKEYとして作成
  - 分散方式ALLでテーブルを作成

## 運用

### データ登録の流れ

- S3に登録するデータを置く
  - ファイルサイズ大きい場合は圧縮して、マルチパートアップロード
  - ファイル分割も有効
    - ファイル名を前方一致でわかるようにしておく
- `COPY`コマンドでロード
- `ANALYZE` & `Vacuum`を実行
  - `ANALYZE` ... クエリプラン決定の元データとして利用される。最新に保つことで最適なパフォーマンス維持
    - スケジュール実行される
    - `auto_analyze`を変更することで、自動実行OFFもできる
  - `VACUUM` ... コンパクション&ソートを行い、データをきれいにする
    - 削除は論理削除なため、ディスクにデータが残っている->コンパクションを実行して片付ける必要がある
    - `Vacuume DELETE`は自動化されたみたい
- バックアップ(SnapShot)を実行
  - S3にバックアップ
    - 自動、手動どちらも有る
- SQLを投入
  - Actualタブからクエリ状況を確認できる

### 制約
存在しないので、ユーザ側の工夫でユニーク性を担保する

一応作成はできる

## メンテナンスウィンドウ

- RDSやAurora同様、2週間のどこかの期間でメンテナンスウィンドウを設定する
  - 14日間のメンテナンを延期できるようににあった

- メンテナンストラック
  - Trailingトラックを設定することで最新一つのバージョンを適用できる
  - 検証環境だけを最新バージョン、本番環境を1つ前といった状況を作ることができる

## Workload Management

用途ごとにクエリ並列度の上限を設けた複数のキューを定義することができる
- Redshiftクラスタでは単一のキューで構成
- メモリのアロケーションも指定可能

## パフォーマンス・チューニングテクニック

以下を参照
[AWS Solutions Architect ブログ: Amazon Redshiftのパフォーマンスチューニングテクニック Top 10](https://aws.typepad.com/sajp/2015/12/top-10-performance-tuning-techniques-for-amazon-redshift.html)

## ユースケース

- 巨大データやセット(数百GB~PB)
- 1つ1つのSQLは複雑だけど、同時実行SQLは少ない
- データ更新は一括導入

- データウェアハウス
- ユーザがクエリを作成するBIツール

## 生かせないユースケース

- SQLの並列実行数が多い
  - RDSを検討
- 短いレイテンシが必要
  - ElastiCacheやRDSを検討
- ランダムかつパラレルな更新アクセス
  - RDSやDynamoDBを検討
- 巨大データは格納するが集計しない
  - DynamoDBまたはインスタンスサイズの大きいRDSを検討

### Concurrency Scaling

負荷が高まると、裏でRedshiftクラスターを追加する。

- 設定を無効化にすることも可能
- 料金は、1日あたり1時間無料で、秒ごとに課金
- 実行後、裏では一定時間実行されている
  - がクエリが来なければ課金されない

### Redsshift Spectram

2017年にリリース。S3上のデータに対してSQLを投げられる。こちらがデータレイクみたい

AWS Glueというデータカタログを使って、S3アクセスを透過的に行うことができる

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

ユースケースとしては過去データをS3に置くとか

### Elastic Resize

数分でノードを増減できるようになる

- 最初はS3にバックアップ(数分~数十分)
- その後数分でノードが増える(この間読み取り専用)
- その後、増えたノードにS3からデータ転送

本のサイズから1/2から2倍

今までのリサイズ(Clasic resize)との使い分けは
- 一時的にサイズを上げたい場合はElastic Resize
- インスタンスタイプを変更したい場合は、Classic resize

## アドバイザー

使用状況のメトリックを分析して、改善のリコメンドを通知する

## 拡張したVPCのルーティング

S3 - RedshiftをVPCの閉域網に接続するルーティング

## マテリアライズドビュー

頻繁に筆耕するクエリパターンをビューとして定義して高速化

まだプレビュー版

## データエクスポート

RedshiftのでテーブルをParquet型でエクスポート。`UNLOAD`コマンドを使う(PARTITIONも勝手に行う)

- CSVファイルも外部表経由でParquet型にエクスポートできるように

## フェデレーテッドクエリ

RDS/Aurora PotgreSQlに対して、直接クエリ可能に

データウェアハウス、データレイク、オペレーショナルデータベースのデータを統合して分析

まだプレビュー版

## 料金

- インスタンス料金
  - ノード数 x 時間あたりの価格
  - リーダーノードは対象外

- S3データレイククエリ
  - 1TBあたり$5

## Reference 
- [Amazon Redshift](https://d1.awsstatic.com/webinars/jp/pdf/services/20160720-AWS-BlackBelt-Redshift-public-v02.pdf)
- [【AWS Black Belt Online Seminar】Amazon Redshift Update - YouTube](https://www.youtube.com/watch?v=eqf5bhVwIe4)
- [20190122 AWS Black Belt Online Seminar Amazon Redshift Update](https://www.slideshare.net/AmazonWebServicesJapan/20190122-aws-black-belt-online-seminar-amazon-redshift-update)
- [【AWS Black Belt Online Seminar】Next Generation Redshift - YouTube](https://www.youtube.com/watch?v=CkSBRQYkHXM&feature=youtu.be)
- [20200218 AWS Black Belt Online Seminar Next Generation Redshift](https://www.slideshare.net/AmazonWebServicesJapan/20200218-aws-black-belt-online-seminar-next-generation-redshift)