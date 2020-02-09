# MySQLの性能調査

## コネクション

### 現在の接続数

    mysql> show global status like 'Threads_connected';
    +-------------------+-------+
    | Variable_name     | Value |
    +-------------------+-------+
    | Threads_connected | 17    |
    +-------------------+-------+
    1 row in set (0.01 sec)

### 今までの最大接続数

    mysql> show global status like 'Max_used_connections';
    +----------------------+-------+
    | Variable_name        | Value |
    +----------------------+-------+
    | Max_used_connections | 68    |
    +----------------------+-------+
    1 row in set (0.00 sec)

### 今までの累積接続数

    mysql> show global status like 'Connections';
    +---------------+--------+
    | Variable_name | Value  |
    +---------------+--------+
    | Connections   | 752493 |
    +---------------+--------+
    1 row in set (0.01 sec)

## スレッドの状態

一気にまとめてみれる

    mysql> show global status like 'Thread_%';
    +-------------------+-------+
    | Variable_name     | Value |
    +-------------------+-------+
    | Threads_cached    | 1     |  # キャッシュされたスレッド
    | Threads_connected | 17    |  # 現在の接続数
    | Threads_created   | 84707 |  # 生成されたスレッド
    | Threads_running   | 1     |  # 実行中のスレッド
    +-------------------+-------+
    4 rows in set (0.00 sec)

## プロセス

    mysql> show full processlist;
    +--------+----------+-------------------+----------+---------+------+-------+-----------------------+
    | Id | User | Host | db | Command | Time | State | Info |
    +--------+----------+-------------------+----------+---------+------+-------+-----------------------+
    | 528370 | rdsadmin | localhost:59464 | NULL | Sleep | 6 | | NULL |
    | 751770 | hogehoge | xxx.xxx.yyy.33:48292 | hogehoge | Sleep | 2516 | | NULL |
    | 752174 | hogehoge | xxx.xxx.yyy.33:57596 | hogehoge | Sleep | 2543 | | NULL |
    | 752195 | hogehoge | xxx.xxx.zzz.78:56108 | hogehoge | Sleep | 3230 | | NULL |
    | 752328 | hogehoge | xxx.xxx.yyy.33:61220 | hogehoge | Sleep | 3228 | | NULL |
    | 752357 | hogehoge | xxx.xxx.zzz.78:59414 | hogehoge | Sleep | 2520 | | NULL |
    | 752369 | hogehoge | xxx.xxx.yyy.33:61878 | hogehoge | Sleep | 2543 | | NULL |
    | 752387 | hogehoge | xxx.xxx.yyy.33:62242 | hogehoge | Sleep | 2520 | | NULL |
    | 752395 | hogehoge | xxx.xxx.zzz.78:60100 | hogehoge | Sleep | 1127 | | NULL |
    | 752399 | hogehoge | xxx.xxx.zzz.78:60188 | hogehoge | Sleep | 2516 | | NULL |
    | 752407 | hogehoge | xxx.xxx.yyy.33:62578 | hogehoge | Sleep | 2327 | | NULL |
    | 752431 | hogehoge | xxx.xxx.zzz.78:61024 | hogehoge | Sleep | 1727 | | NULL |
    | 752432 | hogehoge | xxx.xxx.yyy.33:63166 | hogehoge | Sleep | 1726 | | NULL |
    | 752455 | hogehoge | xxx.xxx.yyy.33:63746 | hogehoge | Sleep | 1128 | | NULL |
    | 752479 | hogehoge | xxx.xxx.yyy.33:64330 | hogehoge | Sleep | 528 | | NULL |
    | 752480 | hogehoge | xxx.xxx.zzz.78:62150 | hogehoge | Sleep | 527 | | NULL |
    | 752481 | hogehoge | xxx.xxx.zzz.78:62152 | NULL | Query | 0 | init | show full processlist |
    +--------+----------+-------------------+----------+---------+------+-------+-----------------------+
    17 rows in set (0.01 sec)

## ツール

- [mytop]([https://gigazine.net/news/20070730_mytop_innotop/](https://gigazine.net/news/20070730_mytop_innotop/))