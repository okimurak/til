## find

ファイル検索する便利コマンド

## 特定のディレクトリを除外する

`-prune`を使う  
(`! -name "hogehoge"` でもいいけど)


```
find <path> -path "<除外するパス名>" -prune

# 使用例

find . -path ".git" -prune
```

## 条件をつなげる

AND条件はそのまま列挙すればよく、OR条件だけは、`-o`でつなげる

```
find . -path "hogehoge" -o -path "fugaduga"
```