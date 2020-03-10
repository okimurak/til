## countでリソースを作るつくらないを指定する

`count = 0` とすることでリソースを作らない挙動にできる

ただし、 moduleの引数として`count`を使うと予約語のため指定できない

## Reference
- [terraform-aws-modules/terraform-aws-acm: Terraform module which creates and validates ACM certificate](https://github.com/terraform-aws-modules/terraform-aws-acm)
- [Count - Terraform by HashiCorp](https://www.terraform.io/intro/examples/count.html)
- [concat - Functions - Configuration Language - Terraform by HashiCorp](https://www.terraform.io/docs/configuration/functions/concat.html)
- [element - Functions - Configuration Language - Terraform by HashiCorp](https://www.terraform.io/docs/configuration/functions/element.html)
