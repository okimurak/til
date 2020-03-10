## countでリソースを作るつくらないを指定する

`count = 0` とすることでリソースを作らない挙動にできる

ただし、 moduleの引数として`count`を使うと予約語のため指定できない

### element

`element`は空配列だと参照できない（当たり前）
`count`を0にすると、当然resourceつくられないので、空になる。

```
Error: Reference to undeclared resource

  on ../modules/is_exist_sample_module/output.tf line 3, in output "hogehoge_resource_arn":
    |----------------
    | hogehoge_resource_arn.fugafuga is empty tuple

Call to function "element" failed: cannot use element function with an empty
list.

cannot parse plan result
```

回避策として`concat`を使う

## Reference
- [terraform-aws-modules/terraform-aws-acm: Terraform module which creates and validates ACM certificate](https://github.com/terraform-aws-modules/terraform-aws-acm)
- [Count - Terraform by HashiCorp](https://www.terraform.io/intro/examples/count.html)
- [concat - Functions - Configuration Language - Terraform by HashiCorp](https://www.terraform.io/docs/configuration/functions/concat.html)
- [element - Functions - Configuration Language - Terraform by HashiCorp](https://www.terraform.io/docs/configuration/functions/element.html)
