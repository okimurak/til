# count でリソースを作るつくらないを指定する

`count = 0` とすることでリソースを作らない挙動にできる

ただし、 module の引数として`count`を使うと予約語のため指定できない

## フラグを使いたい

例えば、`is_create` みたいな variable を使って、リソースの作成制御をする場合は下記のように書く

```teraform
resource  "hogehoge_resource" "hogehoge" {
  count = var.is_create ? 1 : 0

  fugafuga = var.fugafuga
}
```

## element

`element`は空配列だと参照できない（当たり前）
`count`を 0 にすると、当然 resource つくられないので、空になる。

```bash
Error: Reference to undeclared resource

  on ../modules/is_exist_sample_module/output.tf line 3, in output "hogehoge_resource_arn":
    |----------------
    | hogehoge_resource_arn.fugafuga is empty tuple

Call to function "element" failed: cannot use element function with an empty
list.

cannot parse plan result
```

回避策として `concat` を使う

## Reference

- [terraform-aws-modules/terraform-aws-acm: Terraform module which creates and validates ACM certificate](https://github.com/terraform-aws-modules/terraform-aws-acm)
- [Count - Terraform by HashiCorp](https://www.terraform.io/intro/examples/count.html)
- [concat - Functions - Configuration Language - Terraform by HashiCorp](https://www.terraform.io/docs/configuration/functions/concat.html)
- [element - Functions - Configuration Language - Terraform by HashiCorp](https://www.terraform.io/docs/configuration/functions/element.html)
