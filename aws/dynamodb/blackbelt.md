# DynamoDB
AWS managedのNoSQLデータベースサービス

高可用性 - 3xレプリケーション

## 基礎

### Table 構成

```
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

JSONフォーマットを1アイテムとして保存可能(400KBが上限)

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

- Get, Put, Update, Deleteは Patation KeyとSort Keyを指定して対象Itemを決定
- QueryはPartition Keyのみ指定し、Sort Keyは条件指定による範囲探索
- 書き込みは条件付き書き込み設定も可能
  - このArributeがあれば書き込みとか可能

### Local Secondary Index

Sort Key以外に絞り込み検索を行うKeyを持つことができる

PKの変更はできない

### Grobal Secondary Index

Patition Key属性の代わりになる

PKを他のAttirbute にすることも可能


### DynamoDB Transactions

複数Item, 複数Tableに対する書き込み、読み込み操作でACIDトトランザクションが可能。トランザクション分離レベルではserializableでロックは取らない

トランザクション進行中に、Itemがトランザクション外で変更されたときは、今のトランザクションがキャンセル、例外が発生したItemまたはItemン関する詳細がスローされる

GlobalTableでは、デフォルト無効、有効後もトランザクションはリージョン単位

## キャパシティ

- バーストキャパシティ
  - クレジット
- Auto Scaling
- パーティーション内のスループット
  - テーブルスループットはパーティーションに均等して付与される
    - 偏りがある場合もある
      - Adaptive capacity ... 偏りがあるパーティーションに対して集中的にキャパシティを割り当てる

- オンデマンド
  - ある一瞬だけスパイクしてDBにアクセスする場合に有効

## NoSQLのモデリング

- ユースケースの理解
- アクセスパターンの理解
- データモデリング
  - NoSQLデザインパターン
- Review -> Repeat -> Review

- Quick Laboでハンズオン可能

### NoSQLのデザインパターン

正規化しすぎると、性能が落ちるので、非正規化が必要


### 1:1リレーション or キーバリュー型
- Patition key を使ってテーブル or GSI
- GetItemかBatchGetItem APIを利用

### 1:Nリレーション or 親子関係
- Patition key と  Sort keyを使ってテーブル、GSI
- Query APIを使ってアクセス

### N:Mリレーション
- TableとGSIを使用して、Patition KeyとSort Keyの要素をスイッチして設計

### GSI OVERLOADING(GSIの多重定義)
- GSIの制限：デフォルトでは20まで上限緩和も可能

- テーブルあたりのGSIの作成数に関するコスト増加やGSIが検索要件に応じて増えてしまうことを回避
- 一つのGSIで複数のコンテキストを検索できる

## 料金

- プロビジョンドスループットで決まる時間料金
  - 25キャパシティユニット
- ストレージ利用料(月額)

## Reference
- [Amazon DynamoDB](https://d1.awsstatic.com/webinars/jp/pdf/services/20170809_AWS-BlackBelt-DynamoDB.pdf)
- [Amazon DynamoDB Deep Dive | AWS Summit Tokyo 2019 - YouTube](https://www.youtube.com/watch?v=16RYHfe89WY)
- [【AWS Black Belt Online Seminar】Amazon DynamoDB Advanced Design Pattern - YouTube](https://www.youtube.com/watch?v=Wd5gbLQ2a1E)
- [DynamoDB を使用した設計とアーキテクチャの設計に関するベストプラクティス - Amazon DynamoDB](https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/best-practices.html)
- [DynamoDB グローバルセカンダリインデックスを使用してクエリのパフォーマンスを向上させ、コストを削減する方法 | Amazon Web Services ブログ](https://aws.amazon.com/jp/blogs/news/how-to-use-dynamodb-global-secondary-indexes-to-improve-query-performance-and-reduce-costs/)