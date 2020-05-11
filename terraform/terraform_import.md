# Import

```shell
terraform import <resource name> <resource id> # tfstateにImport

terraform state rm <resource id>
```

`<resource id>` は 物によって全く違うので、各 provider の `resource`を参照する

## Reference

- [Command: import - Terraform by HashiCorp](https://www.terraform.io/docs/commands/import.html)
- [Command: state rm - Terraform by HashiCorp](https://www.terraform.io/docs/commands/state/rm.html)
