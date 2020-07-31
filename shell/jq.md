# jq

JSON を扱うための CLI ツール

## Official

- [jq](https://stedolan.github.io/jq/)

## Replace

- 文字一致

```shell
jq "(<対象のオブジェクトパス> | select(<対象の項目> == \"<置換前の値>\"| <対象の項目>) |= \"<置換後値>\""
```

- 正規表現使う
  - select 内で、`test`を使う

```shell
jq "(<対象のオブジェクトパス> | select(<対象の項目> | test(\"<正規表現>\")) | <対象の項目>) |= \"<置換後値>\""
```

## Add object in array

- 例えば "hogehoge" を追加するとき

```shell
jq "(<対象のオブジェクトパス（配列）> |= .+ [\"hogehoge\"])"
```

- key value 形式の "hogehoge" : "fugafuga"

```shell
jq "(<対象のオブジェクトパス（配列）> |= .+ [{\"hogehoge\": \"fugafuga\" }])"
```

## fromjson

JSON 形式を読み込む。末尾に`?` を付与すると、それ以外の形式はスルーできる。plain text と JSON が混ざった文字列に便利

`-R` (RAWオプション・RAW形式 = 文字列で読み込む)

```shell
jq -R "fromjson?" .
```
