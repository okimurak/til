# terrafomer

リソースごとに tfstate を import して、tf ファイルに落とし込む、GCP 製のツール

## Requirement

- aws-cli
- go
- terraform

## Installation

```bash
git clone https://github.com/GoogleCloudPlatform/terraformer
cd terraformer
go mod download
go build -v
```

## Use

```bash
terraformer import aws --resources=iam,s3 --regions=ap-northeast-1
```

## Official

[GoogleCloudPlatform/terraformer: CLI tool to generate terraform files from existing infrastructure (reverse Terraform). Infrastructure to Code](https://github.com/GoogleCloudPlatform/terraformer)

## Similar Tool

- [terraforming](https://github.com/dtan4/terraforming)
  Ruby 製のツール。リソースごとに出力するんだけど、`--merge`オプションを使って、リソースをひとまとめに出力できる。Docker イメージがある。10 ヶ月更新がないのが気になる。以下記事も参考に

  - [本番環境リソース以外を Terraform で IaC して別アカウントに移す方法 - Qiita](https://qiita.com/fukubaka0825/items/524cf17d096d2653eefe)

- [terracognita](https://github.com/cycloidio/terracognita/)
  go 製のツール。こちらもリソースをひとまとめに出力できる。Docker イメージがある。
