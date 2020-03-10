output "hogehoge_resource_arn" {
  description = "The ARN of hogehoge_resource"
  value       = element(concat(aws_acm_certificate.this.*.arn, [""]), 0)
  ## value = element(aws_acm_certificate.this.*.arn, 0) はうまくいかない
  ## 空と空配列を concatで結合させることで回避できた
}