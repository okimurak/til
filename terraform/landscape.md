# Terraform Landscape

Plan を読みやすくするためのツール

[coinbase/terraform-landscape: Improve Terraform's plan output to be easier to read and understand](https://github.com/coinbase/terraform-landscape)

## Where to use

例えば、 Planで差分がないにもかかわらず、差分とみなされる場合に詳細をこのツールを使ってみる

## How to use

```bash
terraform plan | landscape
```

## Reference

- [terraform planで意図せず差分が検出される件と向き合ってみた - テックメモ](http://ginyon.hatenablog.com/entry/2018/11/22/192702)