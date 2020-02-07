## チェックサム

md5sumコマンドを使う

```
md5sum -b <ファイル名>
```


## ディレクトリ配下の全てのファイル内容のチェックサム

各ファイルのチェックサム一覧をチェックサムすればOK  
ただし、ソートしないと、`find`コマンドは順序を保証しないので必ず行う。

```
$ (find . -type f -exec md5sum -b {} \; && find .) | env LC_ALL=C sort | md5sum -b
```

## 参考
- [md5sum でディレクトリ単位のチェックサム計算等 - clock-up-blog](https://blog.clock-up.jp/entry/2015/02/17/md5-directory)