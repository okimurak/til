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

- オンデマンド
  - ある一瞬だけスパイクして DB にアクセスする場合に有効

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
