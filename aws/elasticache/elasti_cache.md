# ElastiCache

## インメモリデータストアって何？

インメモリキャッシュで格納するデータストアのこと。通常の DB ではディスク格納に特化しているため、アクセスが遅いが、インメモリキャッシュはメモリにデータを格納する（ACID 特性のうち、永続性だけが担保されていないため、スナップショット保存など、別の機構を使って担保しているみたい）。
非リレーショナルなデータストアで低レイテンシーを求められるシステムに使われる。

[インメモリデータベースとは何ですか?](https://aws.amazon.com/jp/nosql/in-memory/)

## Redis（Remote Dictionary Server）

ネットワーク接続されたインメモリキャッシュのこと。OSS

公式：[https://redis.io/](https://redis.io/)

KVS（Key value Storage)で格納して、多くのデータセット（List, Set, Hash）に対応している

また、レプリケーションや永続化の方法もある（公式では、レプリを推奨している）

デフォルトポートは 6379

Redis の性能を向上させるにはノードタイプを変更する。

### AOF(Append-Only file)

キャッシュデータを変更するすべてのコマンドを Append-Only File に書き込める。再起動すると AOF が再生されるので再起動前の状態を復元できる。Redis の機能

有効化には appendonly パラメータを yes にして、パラメータグループを作成 => パラメータグループを Redis クラスターに割り当てる。
（ただしハード障害は無理、AOF はノードに保存するため。ドキュメントではマルチ AZ + レプリケーションにしてと書いてある。この場合も AOF は使えない）。

[ElastiCache for Redis でファイルのみを追加する (AOF) - Amazon ElastiCache for Redis](https://docs.aws.amazon.com/ja_jp/AmazonElastiCache/latest/red-ug/RedisAOF.html)

### 用途

- リアルタイムに計算するなど、複雑な処理を行いたい場合
- マルチ AZ やレプリケーション、リードレプリカの追加を行いたい場合
## MemCache

シンプルなインメモリキャッシュのこと

公式：[https://github.com/memcached/memcached](https://github.com/memcached/memcached)

デフォルトポートは 6379

### 自動検出

ElastiCache 内のノードがスケールイン、スケールアウトするのを、ElastiCache のクライアント(PHP と .NET 向け)が自動で検出し、ノードを識別する機能。MemCache のみ対応。

[クラスター内のノードを自動的に識別する](https://docs.aws.amazon.com/ja_jp/AmazonElastiCache/latest/mem-ug/AutoDiscovery.html)

[自動検出機能を持つ ElastiCache クライアント](https://docs.aws.amazon.com/ja_jp/AmazonElastiCache/latest/mem-ug/Clients.html)

### 用途

セッションデータ管理など単純な処理や、並列処理をする場合

## 遅延書き込み

必要なときのみキャッシュにデータを読み込むキャッシュ戦略。

### メリット

- 殆どのデータがリクエストされないので、データがキャッシュ出いっぱいになることは回避できる。
- ノード障害で新しい空のノードに置換されてもアプリケーションは機能し続ける。
### デメリット

- キャッシュに対する最初のデータリクエスト、データベースへのデータクエリ、キャッシュにデータを書き込むという 3 回書き込みが発生するので、データの取得に相当の遅延が発生する可能性がある。
- データが古いかもしれない。書き込みスルーや TTL の追加を使用する。

MemCache : [キャッシュ戦略 - 遅延読み込み](https://docs.aws.amazon.com/ja_jp/AmazonElastiCache/latest/mem-ug/Strategies.html#Strategies.LazyLoading)

Redis : [キャッシュ戦略 - 遅延読み込み](https://docs.aws.amazon.com/ja_jp/AmazonElastiCache/latest/red-ug/Strategies.html#Strategies.LazyLoading)

## 書き込みスルー

データベースに書き込まれると、常にデータを追加するか更新する。

### メリット

 - キャッシュ内のデータが常に最新
 - キャッシュへの書き込み、データベースへの書き込みの 2 回の書き込みをプロセスに追加できる。一般的にユーザーは更新時のレイテンシに対しては寛容で、更新時は時間がかかると思っている。

### デメリット

- 欠落データ。ノード障害やスケールアウトによって新規ノードをスピンアップすると発生する。最小限に抑えるには遅延書き込みを組み合わせる。
- キャッシュの変動。ほとんどのデータは読み込まれないので無駄。 TTL を追加するといい。

MemCache : [キャッシュ戦略 - 書き込みスルー](https://docs.aws.amazon.com/ja_jp/AmazonElastiCache/latest/mem-ug/Strategies.html#Strategies.WriteThrough)
Redis : [キャッシュ戦略 - 書き込みスルー](https://docs.aws.amazon.com/ja_jp/AmazonElastiCache/latest/red-ug/Strategies.html#Strategies.WriteThrough)



### 参考

- [Amazon ElastiCache（インメモリキャッシングシステム）| AWS](https://aws.amazon.com/jp/elasticache/)
- [Redis作者自身によるRedisとMemcachedの比較 | Yakst](https://yakst.com/ja/posts/3243)
