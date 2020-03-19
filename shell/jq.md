# jq
JSONを扱うためのCLIツール
## Official
- [jq](https://stedolan.github.io/jq/)

## Replace

- 文字一致
```shell
jq "(<対象のオブジェクトパス> | select(<対象の項目> == \"<置換前の値>\"| <対象の項目>) |= \"<置換後値>\""
```

- 正規表現使う
  - select内で、`test`を使う
```shell
jq "(<対象のオブジェクトパス> | select(<対象の項目> | test(\"<正規表現>\")) | <対象の項目>) |= \"<置換後値>\""
```