# Redshift

## RA インスタンス

永続ストレージとしての S3、キャッシュとしてのローカル SSD の 2 種類

## クエリの実行順

- リーダーノードがクエリを受け付け
- リーダーノードがコンピュートノードへ配信
- コンピュートノード上で処理を並列実行して、リーダーノードに返す
- リーダーノードが実行結果をクライアントに返す

## データロード

S3 を経由してロード(COPY)・アンロード

## 列指向ストレージ

データは列ごとに格納

- 行指向ストレージでは全ての行にアクセスする必要がある

  - 不必要な I/O が発生

- 列だと必要な列ブロックだけスキャンすればいい

## 圧縮

- 一度のディスクアクセスで読み込めるデータ量が多くなる
- 圧縮エンコード（アルゴリズム）は 13 個用意
  - `ANALYZE COMPRESSION` コマンドを使うことで、既存テーブルの各列に最適な圧縮を確認できる
  - 未指定の場合は、列の前提条件によって自動割り当てされる
- エンコードタイプの変更は、テーブル再作成＆ `INSERT-SELECT` で対応

## ブロックサイズ

1MB で固定

## ゾーンマップ(ブロックフィルタリング)

- 各ブロックのメタデータをリーダーノードのインメモリに格納
  - クエリの内容に応じて、不必要なブロックは読み飛ばすことで、アクセス効率が良くなる

## ソートキー

ゾーンマップを買うようするために、テーブルごとにどの列をソートするかをソートキーを指定

- 頻繁に WHERE 句で使われる列が良い
- 日付や ID が多い

## データ分散

データ量や食えるの内容に応じて、分散形式を選択する

テーブル作成時に、`DIUSTSTYLE` で指定する

- KEY
  - 同じキーは同じスライス
- ALL
  - 全てのデータを全てのノードへ
  - データが小さいマスタテーブルとか
- EVEN
  - ラウンドロビンで均等に
- AUTO
  - テーブルサイズに応じて ALL から EVEN に自動変換
  - デフォルトはこれ

## キャッシュ

クエリ結果をリーダーノードにキャッシング

## マテリアライズドビュー

- 頻繁に実行するクエリパターンを高速化するために
  - あらかじめ結合、フィルタ、集計、射影しておく

## 運用

- メンテナンスウィンドウの設定可能
- スケジューリング
  - クラスターサイズの変更
  - クラスターの伊地知停止、再開

## フルマネージド

### ワークロード管理(WLM)

- ワークロードの種類に基づいて、キューを複数個作成できる
- 各キューにはクラスタが使用できるメモリの一部を割り当て
- クエリの割り当てルールによって、各クエリが各キューに割り当てられる
- 自動 WLM を設定すると、クエリへのメモリ割り当てを最適化するために、並列スロット数を自動的に決定できる。こちらを推奨している。
- 手動 WLM を設定すると、例えば実行時間が長いクエリと短いクエリ用に異なるキューを作成して、ユーザーグループまたはクエリグループに従って使い分けられる。

### ショートクエリアクセラレーション(SQA)

実行時間の短いクエリのスループットを高速化

- 機械学習によって、クエリの実行時間を予測
- ショートクエリと判断されたクエリは高速キューにルーティング
- リソースは動的に確保される
- (デフォルトで有効)

### リコメンデーション (Redshift Adviser)

クラスターパフォーマンスや使用状況のメトリックを分析して、リコメンデーションを提供（クエリとか）

### クエリエディタ

コンソールから、クエリを実行可能

Saved queries 機能を使えば頻度の高いクエリも保存できる

## コンピュートノード

増やせば、性能向上が見込める

### Elastic Resize

- コンピュートとストレージをオンデマンドでスケールできる
- スケジュウーリングも可能
- 繁忙期にクエリを高速処理したいとか

古いのは Classic Resize というのが

### Concurrency Scaling

ピーク時に自動拡張する（クラスターが増える）

### Redshift Spectrum

S3 にオープンフォーマットで保存することで、そのファイル(データレイク)に Redshift がアクセスできる

- Redshift と S3 の内容を結合するとかも可能

### RA3 と Redshift Spectrum の違い

- S3 ストレージは Spectrum ではユーザ管理で、他 AWS サービスからもアクセス可能
- データ更新は、Spectrum では追記のみ(DML UPDATE)は非対応

### データレイクエクスポート

- Apache Parquet 形式でエクスポート可能
  - 分析ワークロード向けのオープンな列指向ファイルフォーマット

## 料金

- Redshift インスタンスの起動時間+ ストレージ使用量
  - コンピュートノード数 x 1 時間あたりの価格
  - リザーブドも対応
- Concurrency Scaling
  - 追加クラスターでクエリが実行された時間（秒）
  - 1 日あたり 1 時間の無料クレジットが付与(最大 30 時間)
- Redshift Spectrum
  - S3 データレイクへのクエリ容量で課金
    - S3 上の圧縮済みデータ 1TB スキャンあたり 5USD

## セキュリティ

- エンドトゥーエンドでデータ暗号化
- VPC 内に建てられる
- CloudTrail 統合

### アクセスコントロール

- テーブル、データベース、スキーマー、関数、プロシージャ、言語、列に対して設定可能
- テーブル、ビューに対しては列ごとにアクセスコントロール設定可能


## トラブルシューティング

クエリがハングする場合、MTU のサイズを小さくするか、カーソルを使う。

[クエリがハングして、クラスターに達しない場合がある - Amazon Redshift](https://docs.aws.amazon.com/ja_jp/redshift/latest/mgmt/connecting-drop-issues.html)


## Reference

- [【AWS Black Belt Online Seminar】Amazon Redshift - YouTube](https://www.youtube.com/watch?v=Myzy68VEXjM&feature=youtu.be)
- [20200318 AWS Black Belt Online Seminar Amazon Redshift](https://www.slideshare.net/AmazonWebServicesJapan/20200318-aws-black-belt-online-seminar-amazon-redshift)
