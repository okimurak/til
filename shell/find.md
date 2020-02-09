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

## 正規表現を使いたい

面倒だが、オプションをつける

    find . -type f -regextype posix-basic -regex ".*.jar"

## 参考

- [正規表現に合致するファイル名をfindする方法 - grep Tips *](https://www.greptips.com/posts/301/)