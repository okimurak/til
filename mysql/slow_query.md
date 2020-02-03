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

# 参考
### SQL
- [Finding long-running queries in MySQL](https://gist.github.com/mezis/8558795)
  - 改行されるので、置換しているぽい