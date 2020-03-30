## Variable

## sed

変数で、sedは下記のように使える

```
hogehoge="hoge"; echo "$hogehoge" | sed -e "s/hoge/fuga/"
```

これを下記のようにリファクタリングできる

```
hogehoge="hoge"; echo "${hogehoge//hoge/fuga}"
```

## Reference

- [SC2001 · koalaman/shellcheck Wiki](https://github.com/koalaman/shellcheck/wiki/SC2001)