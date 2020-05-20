# Function

## lookup

map 配列の検索ができる関数

[lookup - Functions - Configuration Language - Terraform](https://www.terraform.io/docs/configuration/functions/lookup.html)

### Usage

```terraform
lookup(map, key, default)
```

例えば、key を\${terraform.workspace}に指定すれば、WorkSpace ごとの設定変更を簡単に実現できる

### Example

以下のような variable を作ってあげる（map で作る)

```terraform
test = map(object(string))
```

下記のように 入力させて

```terraform
test = {
  hogehoge {
    message = "HOGEHOGE"
  },
  fugafuga {
    message = "FUGAFUGA"
  }
}
```

呼び出し部分では、lookup を使って以下のように呼び出す

```terraform
message = lookup(
  var.test,
  "fugafuga",
  "hogehoge"
)
```
