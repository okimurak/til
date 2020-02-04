## 設定ファイル


MySQLの接続コマンドで、パスワードを直書きすると、以下警告が出る

```
Warning: Using a password on the command line interface can be insecure
```

消すためには設定ファイルから読み込むようにする

```
## dbaccess.cnf
[client]
user = <DBユーザ名>
password = <DBパスワード>
host = <宛先ホスト>
```

```
## 実行時
mysql --defaults-extra-file=dbaccess.cnf
```