# Variable

## Default values

```bash
# TEST_VAL = null => $HOME が出力
echo ${TEST_VAL:-$HOME}
/home/yappo

TEST_VAL=test/hoge/fuga
# TEST_VAL != null => TEST_VAL が出力
echo ${TEST_VAL:-$HOME} 
test/hoge/fuga
```

## sed

変数を sed で操作する場合、下記のように使える。

```bash
hogehoge="hoge"; echo "$hogehoge" | sed -e "s/hoge/fuga/"
```

上記を下記のようにリファクタリングできる。

```bash
hogehoge="hoge"; echo "${hogehoge//hoge/fuga}"
```

## Reference

- [SC2001 · koalaman/shellcheck Wiki](https://github.com/koalaman/shellcheck/wiki/SC2001)
- [シェルの変数展開 - Qiita](https://qiita.com/bsdhack/items/597eb7daee4a8b3276ba)
