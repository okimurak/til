output "hogehoge_resource_arn" {
  description = "The ARN of hogehoge_resource"
  value       = element(concat(hogehoge_resource_arn.fugafuga.*.arn, list("")), 0)
  ## value = element(aws_acm_certificate.this.*.arn, 0) はうまくいかない
  ## 空と空配列を concatで結合させることで回避できた
  ## Terraform v0.12以降では list() を使うといいかも
}
