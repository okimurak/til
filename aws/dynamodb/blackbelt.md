# DynamoDB

AWS managed の NoSQL データベースサービス

高可用性 - 3x レプリケーション

## 基礎

### Table 構成

```text
 Table
   ├ Item
   |  ├ Atrtribute
   |  |   ├ Patition Key ... 必須。主キー的な
   |  |   └ Sort Key ... オプション。2つのAttributeを使って複合KeyとしてQueryで探索するためのキー
   |  └ ...
   └ ...
```

### 属性

- String
- Number
- Binary
- Boolean
- Null
- 多値データ型
  - Set of String
  - Set of Number
  - Set of Binary
- ドキュメントデータ型
  - List
  - Map

JSON フォーマットを 1 アイテムとして保存可能(400KB が上限)

### Item 操作

- 読み込み
  - GetItem
  - TransactGetItems
  - BatchGet
  - Query
  - Scan
- 書き込み

  - PutItem
  - Update
  - TansactWriteItems
  - BatchWriteItem
  - Delete

- Get, Put, Update, Delete は Patation Key と Sort Key を指定して対象 Item を決定
- Query は Partition Key のみ指定し、Sort Key は条件指定による範囲探索
- 書き込みは条件付き書き込み設定も可能
  - この Arribute があれば書き込みとか可能

### Local Secondary Index

Sort Key 以外に絞り込み検索を行う Key を持つことができる

PK の変更はできない

### Grobal Secondary Index

Patition Key 属性の代わりになる

PK を他の Attirbute にすることも可能

### DynamoDB Transactions

複数 Item, 複数 Table に対する書き込み、読み込み操作で ACID トトランザクションが可能。トランザクション分離レベルでは serializable でロックは取らない

トランザクション進行中に、Item がトランザクション外で変更されたときは、今のトランザクションがキャンセル、例外が発生した Item または Item に関する詳細がスローされる

GlobalTable では、デフォルト無効、有効後もトランザクションはリージョン単位

## キャパシティ

- バーストキャパシティ
  - クレジット
- Auto Scaling
- パーティーション内のスループット

  - テーブルスループットはパーティーションに均等して付与される
    - 偏りがある場合もある
      - Adaptive capacity ... 偏りがあるパーティーションに対して集中的にキャパシティを割り当てる

- on Demand モード
  - ある一瞬だけスパイクして DB にアクセスする場合に有効

## ストリーム

- テーブルの変更に対して順序づけられた情報。
- 使用するには、ストリームを有効化し、アプリケーションが DB とは別個のエンドポイント (`streams.dynamody.<region>.amazaonaws.com`) にアクセスして使用
- ストリームレコードは「シャード」という単位で整理される。シャード内のストリームレコードは 24 時間で自動的に削除される
- Kinesis Adapter がお勧め。 Kinesis Data Streams の API と似たものになっているため
- ストリームが流れたことをトリガーにして (DynamoDB Triggers) Lambda を発火できる

- [DynamoDB ストリーム を使用したテーブルアクティビティのキャプチャ - Amazon DynamoDB](https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/Streams.html)
- [Amazon DynamoDB ストリームを使用して、順序付けされたデータをアプリケーション間でレプリケーションする方法 | Amazon Web Services ブログ](https://aws.amazon.com/jp/blogs/news/how-to-perform-ordered-data-replication-between-applications-by-using-amazon-dynamodb-streams/)

## グローバルテーブル

複数リージョンレプリケーション (クロスリージョンレプリケーション) ができる、テーブルを作成できる

地理的に離れた、環境で分散させたい場合に使える

- [グローバルテーブル: DynamoDB を使用した複数リージョンレプリケーション - Amazon DynamoDB](https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/GlobalTables.html)

## バックアップ

- オンデマンドバックアップ
  - 完全なバックアップを作成できる。コンソールか、API かｒ
- ポイントインタイムリカバリ

  - 自動バックアップする機能
  - 保持期間は 35 日間で、変更不可

- [DynamoDB のオンデマンドバックアップおよび復元 - Amazon DynamoDB](https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/BackupRestore.html)

## NoSQL のモデリング

- ユースケースの理解
- アクセスパターンの理解
- データモデリング
  - NoSQL デザインパターン
- Review -> Repeat -> Review

- Quick Labo でハンズオン可能

### NoSQL のデザインパターン

正規化しすぎると、性能が落ちるので、非正規化が必要

### 1:1 リレーション or キーバリュー型

- Patition key を使ってテーブル or GSI
- GetItem か BatchGetItem API を利用

### 1:N リレーション or 親子関係

- Patition key と Sort key を使ってテーブル、GSI
- Query API を使ってアクセス

### N:M リレーション

- Table と GSI を使用して、Patition Key と Sort Key の要素をスイッチして設計

### GSI OVERLOADING(GSI の多重定義)

- GSI の制限：デフォルトでは 20 まで上限緩和も可能

- テーブルあたりの GSI の作成数に関するコスト増加や GSI が検索要件に応じて増えてしまうことを回避
- 一つの GSI で複数のコンテキストを検索できる

## 料金

- プロビジョンドスループットで決まる時間料金
  - 25 キャパシティユニット
- ストレージ利用料(月額)

## Reference

- [Amazon DynamoDB](https://d1.awsstatic.com/webinars/jp/pdf/services/20170809_AWS-BlackBelt-DynamoDB.pdf)
- [Amazon DynamoDB Deep Dive | AWS Summit Tokyo 2019 - YouTube](https://www.youtube.com/watch?v=16RYHfe89WY)
- [【AWS Black Belt Online Seminar】Amazon DynamoDB Advanced Design Pattern - YouTube](https://www.youtube.com/watch?v=Wd5gbLQ2a1E)
- [DynamoDB を使用した設計とアーキテクチャの設計に関するベストプラクティス - Amazon DynamoDB](https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/best-practices.html)
- [DynamoDB グローバルセカンダリインデックスを使用してクエリのパフォーマンスを向上させ、コストを削減する方法 | Amazon Web Services ブログ](https://aws.amazon.com/jp/blogs/news/how-to-use-dynamodb-global-secondary-indexes-to-improve-query-performance-and-reduce-costs/)
