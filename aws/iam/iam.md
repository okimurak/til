# IAM

色々細かすぎるので、整理していく

## Policy

ルール的なもの。何を許可するか

Active Directoryの権限はこれに該当する。

## Role

一時的に渡すための権限

## サービスにロールを渡したい場合

    iam:PassRole

を設定する

[AWS サービスにロールを渡すアクセス許可をユーザーに許可する](https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/id_roles_use_passrole.html)
