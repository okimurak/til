# awk

## 改行を削除する場合

[printf](https://www.tohoho-web.com/ex/awk.html#printf) を使う。

```bash
cat hogehoge.txt | awk '{printf $0}'
```

ORS 変数を 0 にする。デフォルト値は改行コード。

```bash
cat hogehoge.txt | awk 'BEGIN{ORS = ""}{print $0}'
```
