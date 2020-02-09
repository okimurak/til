# phpinfo

PHPの設定(読み込んでいる環境変数も)をの情報を表示する。


## 使い方

コマンドラインを使う
```
php -i
```

または、`phpinfo()`を記載した`.php`を配置する(危険なので本番にはデプロイしない)

```
<?php
phpinfo();
?>
```

## extantionを表示する

```
php --ri <extantion名>
```