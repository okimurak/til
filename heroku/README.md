# Heroku

PAASを提供するクラウドサービス。よくアプリケーションのデプロイ先に使われる  
DBはPostgres一択になる  
**無料枠ではアプリケーションを5つまで**しかデプロイできない

[Official](https://jp.heroku.com/)

## Command

### ログイン

    heroku login --interactive

### アプリケーションの作成

nameはなくても作成できるが、ランダム文字列になるので指定したほうがいい

    heroku create (name)

生成されるURLは`https://<アプリ名>.herokuapp.com/`

### アプリケーションの名前変更

    heroku rename (name)


### コマンド実行

    heroku run <command>

### addonのインストール

    heroku addons:create <addon name>

- [Heroku add\-on \| Heroku](https://jp.heroku.com/elements/addons)