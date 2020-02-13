# Sloq Query

### Configure

- slow_query_logをONにする

```
# コンソールから
set global sloq_query_log_file = '/path/to/output/logfile.log';
set global long_query_time = 5;  # 秒単位
set global slow_query_log = ON;
```

ちなみに、`set global log_output = 'TABLE';`とすると、テーブル出力される


```
# my.cnfから
[mysqld]
sloq_query_log = ON
long_query_time = 5
slow_query_log_file = /path/to/output/logfile.log
```


```
# 基本のSQL (slowlogテーブルを参照する)
select * from mysql.slow_log;

|start_time|user_host|query_time|lock_time|rows_sent|rows_examined|db|last_insert_id|insert_id|server_id|sql_text|
```

## 便利なSQL
```
SELECT P.id
      , P.host, P.user, P.db
      , T.trx_started, T.trx_state, T.trx_wait_started
      , P.command, P.time, P.state, P.info AS query
      , BT.trx_mysql_thread_id AS blocking_thread_id
      , BT.trx_started AS blocking_trx_started
      , BT.trx_query AS blocking_query
      , BL.lock_table, BL.lock_mode
  FROM information_schema.INNODB_TRX T
  JOIN information_schema.PROCESSLIST P
    ON P.id = T.trx_mysql_thread_id
  LEFT JOIN information_schema.INNODB_LOCK_WAITS LW
    ON LW.requesting_trx_id = T.trx_id
  LEFT JOIN information_schema.INNODB_TRX BT
    ON BT.trx_id = LW.blocking_trx_id
  LEFT JOIN information_schema.INNODB_LOCKS BL
    ON BL.lock_id = LW.blocking_lock_id
ORDER BY T.trx_started, T.trx_mysql_thread_id, BT.trx_started, BT.trx_mysql_thread_id
```

# 参考
### SQL
- [Finding long-running queries in MySQL](https://gist.github.com/mezis/8558795)
  - 改行されるので、置換しているぽい
