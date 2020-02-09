# MySQLのダンプ方法

## ダンプのアウトプット

    mysqldump -u testuser -p -h 127.0.0.1 testdb -p123456 -d > ddl.sql

### テーブル定義のみ
-d, –no-data

テーブル定義のみ。後ろにテーブル名を書けば、指定のテーブルだけにもできる

    # pocketテーブルから
    mysqldump -u testuser -p -h 127.0.0.1 testdb -p123456 -d  pocket > ddl.sql

## ダンプのインポート

    mysql -h 127.0.0.1 -P 3306 -u testuser -p123456 testdb < ddl.sql 

## 参考

- [【MySQL】mysqldumpでテーブル構造だけ/データだけdumpする](http://gontora.hatenadiary.com/entry/2015/12/03/193254#%E3%83%86%E3%83%BC%E3%83%96%E3%83%AB%E6%A7%8B%E9%80%A0%E3%82%B9%E3%82%AD%E3%83%BC%E3%83%9E%E3%81%AE%E3%81%BFdump%E3%81%99%E3%82%8B)