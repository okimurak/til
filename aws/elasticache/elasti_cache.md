# ElastiCache

### インメモリデータストアって何？

インメモリキャッシュで格納するデータストアのこと。通常のDBではディスク格納に特化しているため、アクセスが遅いが、インメモリキャッシュはメモリにデータを格納する。（ACID特性のうち、永続性だけが担保されていないため、スナップショット保存など、別の機構を使って担保しているみたい）
非リレーショナルなデータストアで低レイテンシーを求められるシステムに使われる。

[インメモリデータベースとは何ですか?](https://aws.amazon.com/jp/nosql/in-memory/)

### Redis（Remote Dictionary Server）

ネットワーク接続されたインメモリキャッシュのこと。OSS

公式：[https://redis.io/](https://redis.io/)

KVS（Key value Storage)で格納して、多くのデータセット（List, Set, Hash）に対応している

また、レプリケーションや永続化の方法も有る（公式では、レプリを推奨している）

### Memcached

シンプルなインメモリキャッシュのこと

公式：[https://github.com/memcached/memcached](https://github.com/memcached/memcached)

### Redis VS Memcached

機能：Redis > Memcached

メモリ保存効率：Redis < MemCached (場合による）

デフォルトポートは6379

今使うならRedisのほうが良さそう

### 参考

[Amazon ElastiCache（インメモリキャッシングシステム）| AWS](https://aws.amazon.com/jp/elasticache/)

[Redis作者自身によるRedisとMemcachedの比較 | Yakst](https://yakst.com/ja/posts/3243)