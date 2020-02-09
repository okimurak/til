# Railsのエラーメッセーのジ日本語化


- Gem `rails-i18n` をインストール

- `config/application.rb`に以下を追記

    config.i18n.default_locale = :ja

- 辞書ファイルをダウンロード

    wget https://raw.github.com/svenfuchs/rails-i18n/master/rails/locale/ja.yml -P config/locales/

- ここまでで、モデルの属性以外は日本語化しているはず

- カスタマイズ用の`ja.yml`を`/config/locales/model/ja.yml`とかに書く

```
ja:
  activerecord:
    models:
      memo: メモ
    attributes:
      event:
        memo: メモ
        title: タイトル
        pikachu: ピカチュウ
```

- ロードする設定を書く

    config.i18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.{rb,yml}').to_s]

参考

- [Railsのバリデーションエラーのメッセージの日本語化 \- Qiita](https://qiita.com/Ushinji/items/242bfba84df7a5a67d5b)