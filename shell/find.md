# find

ファイル検索する便利コマンド

## 特定のディレクトリを除外する

`-prune`を使う  
(`! -name "hogehoge"` でもいいけど)

```bash
find <path> -path "<除外するパス名>" -prune

# 使用例

find . -path ".git" -prune
```

## 条件をつなげる

AND 条件はそのまま列挙すればよく、OR 条件だけは、`-o`でつなげる

```bash
find . -path "hogehoge" -o -path "fugaduga"
```

## 正規表現を使いたい

面倒だが、オプションをつける

```bash
find . -type f -regextype posix-basic -regex ".*.jar"
```

## 特定のファイルを含むディレクトリを消したい

音楽ファイル削除に使った。`awk` と併用して、シェル芸をする

```bash
# カンマなどなければ、tr の箇所は、xargs -0 の部分は不要
find . -type d -mindepth 2 | awk '{cmd = sprintf("test -e \"%s\"/*.m4a 2>/dev/null", $0);r = system(cmd);if(r == 1) print $0}' | tr '\n' '\0' | xargs -0 -I{} rm -rf {}
find . -type d -empty -delete
```

## 参考

- [正規表現に合致するファイル名をfindする方法 - grep Tips *](https://www.greptips.com/posts/301/)
