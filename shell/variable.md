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
- [シェルの変数展開 - Qiita](https://qiita.com/bsdhack/items/597eb7daee4a8b3276ba)