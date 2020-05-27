# apply

```bash
terraform apply
```

- `target=<resourse_id>` ... 特定のリソースだけ

https://www.terraform.io/docs/commands/plan.html#resource-targeting

> If the given address does not have a resource spec, and instead just specifies a module path, the target applies to all resources in the specified module and all of the descendent modules of the specified module.

とあるので、親リソースを指定すれば、子孫リソースも対象に入る。（module 化したときはよくある）
