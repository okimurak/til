# MySQLのパラメータ

## 閲覧方法

```
show variables like "hogehoge"
```

### binlog_cache_size

バイナリログへの変更を保持するキャッシュサイズ

### bulk_insert_buffer_size

MyISAMにて使用する一括挿入するための特殊なキャッシュで1スレッドあたりのバイト単位キャッシュツリーサイズを制限

### character_set_client

クライアントから発行されたSQL文の文字コード。  
基本はクライアントで明示的に設定するんだけども、それ以外もある（らしい）ためデフォルトで設定しておく

### character_set_connection

クライアントから受け取った数字から文字列へのへ変換用に使用される文字コード

### character_set_database

DBの文字コード。テーブルに書き込まれるのはこの設定

### character_set_results

クライアントに送信するクエリ結果の文字コード

### character_set_server

Db作成時のデフォルト文字コード

### collation_connection

character_set_connectionに対する、照合順序

### collation_server

サーバの照合順序

### innodb_autoinc_lock_mode

自動インクリメント値を生成する際に使用されるロックモード  
0：従来, 1：連続（デフォルト）, 2：インタリーブ

- [MySQL :: MySQL 5.6 リファレンスマニュアル :: 14.6.5 InnoDB での AUTO_INCREMENT 処理](https://dev.mysql.com/doc/refman/5.6/ja/innodb-auto-increment-handling.html)

### innodb_buffer_pool_size

InnoDBがテーブルとインデックスのデータをキャッシュするメモリ領域である、バッファプールのサイズ  
大きすぎると物理マシンのメモリーと競合するので注意

### innodb_lock_wait_timeout

行ロックのトランザクション待機時間。デフォルトは50秒

### innodb_rollback_on_timeout

トランザクションタイムアウト時のロールバックをするかどうか 1 / 0

### max_allowed_packet

1つのパケットの最大サイズ

### max_heap_table_size

ユーザが作成した際の最大テーブルサイズ

### query_cache_limit

クエリのキャッシュ制限

### query_cache_size

クエリのキャッシュサイズ。デフォルトでは無効化

### range_optimizer_max_mem_size

範囲検索（optimizerというらしい）のメモリ制限。5.7から追加。0にすればなくなる

- [MySQL :: MySQL 5.7 Reference Manual :: 8.2.1.2 Range Optimization](https://dev.mysql.com/doc/refman/5.7/en/range-optimization.html#range-optimization-memory-use)

### slow_query_log

スローログを出すかどうか。 1 / 0

### sort_buffer_size

ソート（order byとか)の実行時のバッファサイズ

### tmp_table_size

一時テーブルの最大サイズ。MEMORYテーブル作ると適応されない

### tx_isolation

トランザクションの分離レベル。5.7では、`transaction_isolation`が追加されているけど、ここへエイリアスしているらしい

[MySQL :: MySQL 5.7 Reference Manual :: 5.1.7 Server System Variables](https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_transaction_isolation)

### max_execution_time

最大実行時間。これを超えるとMySQLが勝手にセッションをCLoseする


## 参考

- [MySQL :: MySQL 5.6 リファレンスマニュアル :: 5.1.4 サーバーシステム変数](https://dev.mysql.com/doc/refman/5.6/ja/server-system-variables.html)