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

## for_each

`0.12.6` からできるようになった
オブジェクトの 配列 or 連想配列をイテレーターで値を取得する

[Resources - Configuration Language - Terraform by HashiCorp](https://www.terraform.io/docs/configuration/resources.html#for_each-multiple-resource-instances-defined-by-a-map-or-set-of-strings)

### Example

例を見たほうが早い

```terraform
variable "keyname_valuename" {
  type = map(string)
  default = {
    key_1 = "value_1"
    key_2 = "value_2"
    key_3 = "value_3"
  }
}

resource "hogehoge_resource" "hogehoge_context" { # hogehoge_contextが3つ作られる
  for_each = var.keyname_valuename
  key      = each.key
  value    = each.value
}
```
