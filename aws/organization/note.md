# Organizations

## アカウント

削除するには、"アカウントがスタンドアローンアカウントとして動作するために必要な情報" を持っている場合に限って削除できる。つまり、必須の連絡先情報、支払情報を入力する必要がある。

## ロール

Organizations から作成したメンバーアカウントには OrganizationAccountAccessRole が自動で作られる。招待したアカウントの場合は作られない。このロールに AssumeRole することで、メンバーアカウントに IAM プリンシパルを作る必要がなくなる。

## ポリシー

- 承認ポリシー
  - SCP
- 管理ポリシー
  - AWS 人工知能サービスのオプトアウトポリシー
  - バックアップポリシー : 組織のアカウント全体の AWS リソースのバックアッププランを一元管理、適用できる。AWS バックアップを使う。
  - タグポリシー : 組織のアカウントと AWS リソースにアタッチされたタグを標準化できる。(タグをつける強制はできない, IAM や SCP でやる)

## SCP

管理アカウントの IAM プリンシパル、サービスにリンクされたロールには影響しない

## 連携サービス

### CloudTrail

組織の証跡を作成できる。全ての AWS アカウントに関するすべてのイベントを記録できる。

## Reference

[AWS Organizations の概要 - AWS Organizations](https://docs.aws.amazon.com/ja_jp/organizations/latest/userguide/orgs_introduction.html)
