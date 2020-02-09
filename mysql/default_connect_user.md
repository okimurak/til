# MySQLのデフォルトユーザ情報を追加する

MySQLに接続するデフォルトユーザの情報を接続元に保存する(ユーザディレクトリに.cnfで保存される)

    mysql_config_editor set --user <username> --password
    passwordを入力