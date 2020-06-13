# IAM (Identity and Access Management)

全世界のリージョンに結果整合性によって適用するので、反映に時間がかかる場合がある

## Best Practice

- ID と認証情報の管理
- アクセス権限の管理
- 権限の委任
- ID と権限のライフサイクル管理

## リソースへの仕組み

- プリンシパル
  - ユーザ
  - Role
  - Application
- 認証
  - Authentication
  - AWS STS
  - MFA token
- リクエスト
  - アクション
  - リソース
  - プリンシパル
  - リソースデータ
- 認可
- アクションオペレーション
  - 各 AWS のアクション
- AWS リソース

## ID と認証情報の管理

- Root ユーザをロックしたい
  - Root ユーザのみできる操作も有る
    - アカウント解約とか、無効な制約を設定したポリシーとか
- ルートユーザのアクセスキーは削除する
- 個別ユーザを作成する
  - CloudTrail のログからアクションを追跡できる
- 強力なパスワードポリシーを設定する
- アクセスキーを共有しない
  - 情報の置き場に注意(リポジトリとかプレーンテキストの補完とか)
- 特権ユーザに対して MFA を有効化
  - 仮想 MFA デバイス
    - スマホにインストールするアプリ
      - Google Authenticator
      - Authy
      - 2-Factor Authentication
  - U2F セキュリティキー
    - Yubikey セキュリティキー
  - Gemalto

## ポリシー

IAM やリソースに関連付けることによってアクセス許可を定義することができるオブジェクト

- アイデンティティベースのポリシー
  - 管理ポリシー
    - 複数のユーザとグループ、ロールに関連付け可能(10 個まで)
    - 使い回すポリシー
    - まずは AWS 管理ポリシーを使ってみる
    - その後にカスタマー管理ポリシーを使う
      - カスタマイズできるので
  - インラインポリシー
    - 使わない
- 追加セキュリティに対するポリシー条件を使用する
  - Version ... 指定しないと、ポリシー変数(\${aws:username})が文字列になる
  - Principal ... IAM エンティティを指定する。リソースベースポリシーで使用する。IAM ユーザ名にワイルドカードは使えない
  - Condition ... ポリシーが有効になるタイミングの条件を指定する
    - 形式 "Conditoin" : {<条件演算子>:{<条件キー> : <条件値>}}
    - ブロックは AND, 演算子に対する値は OR
    - [IAM JSON ポリシーエレメント: 条件演算子 - AWS Identity and Access Management](https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/reference_policies_elements_condition_operators.html)
    - [AWS グローバル条件コンテキストキー - AWS Identity and Access Management](https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/reference_policies_condition-keys.html)
    - [IAM および AWS STS の条件コンテキストキー - AWS Identity and Access Management](https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/reference_policies_iam-condition-keys.html)

## ツール群

- [AWS Policy Generator](http://awspolicygen.s3.amazonaws.com/policygen.html)
- https://policysim.aws.amazon.com/home/index.jsp

## 最小の権限付与

- インラインポリシーとアイデンティティーベースポリシーは OR
- リソースベースポリシーとアイデンティティーベースポリシーは OR
  　- クロスアカウントだと AND - 双方向で許可するから
- アクセス許可の境界とアイデンティティーベースポリシーは AND
- AWS Organizatinos のサービスコントロールポリシー(SCP)とアイデンティティーベースポリシーは AND

## グループ

- アクセス許可を割り当てるためにグループを使用する

## ロール

サービスやエンティティーに対して、AWS リソースの操作権限を付与するための仕組み  
ユーザまたはアプリケーションはロールを一時的に引き受けることでアクセス許可

### サービスに一時的に引き渡す時

以下アクションを許可する

```text
iam:PassRole
```

[AWS サービスにロールを渡すアクセス許可をユーザーに許可する](https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/id_roles_use_passrole.html)

### 一時的なセキュリティ認証情報

- 有効期限付きのアクセスキー ID、シークレットアクセスキー、セキュリティトークンで構成
- STS が動的に作成

### STS(AWS Security Token Service)

- 一時的なセキュリティ認証情報を作成するためのマネージドサービス

- AssumeRole ... 一時的な認証情報を取得するためのアクション
- AssumeRoleWithWebIdentity ... Amazon Facebook Google による承認情報を使ってロールを引き受けて認証情報を取得するためのアクション
- AssumeRoleWithSAML ... IdP による認証と SAML のアサーションを AWS にポストすることでロールを引き受けて認証情報を取得するためのアクション
- GetSessionToken ... 自身で利用する IAM ユーザの認証情報を取得するためのアクション
- GetFederationToken ... 認証を受けた Federated ユーザの認証情報を取得するためのアクション

- EC2 インスタンスで実行するアプリケーションに対して、ロールを使用する
  - SDK によって、認証情報を取得、再取得を自動的に実施可能

## 権限の委任

- ロールを使ったアクセス許可の委任の例

  - 別の AWS アカウントユーザが認証情報を共有せずに、自分の AWS アカウントのリソースにアクセスを制御可能(クロスアカウントアクセス)
  - MFA のチェックもできる
  - Switch Role

- SAML2.0 ベースの ID フェデレーション
  - 他のプロバイダーのアカウントを使って AWS を利用可能
  - SSO も実現できる(AWS SSO エンドポイントが必要)

## ID と権限のライフサイクル管理

- 以下を有効にして監視
  - CloudFront
  - CloudTrail
    - 全リージョン
  - CloudWatch
  - Config
    - IAM 系の AWS リソースの設定履歴情報
  - S3

### アクセスアドバイザー

IAM エンティティーが最後に AWS サービスにアクセスした日付と時刻を表示

## アクセスレベル

権限を確認する

- List
- Read
- Write
- Permissinos maangement

## 不要な認証情報を削除

IAM 認証情報レポートをダウンロードできる

## 認証情報の定期的なローテーション

- パスワードの有効期限

## SSL 証明書

ACM でサポートされていないリージョンで HTTPS 接続をサポートする場合のみ、証明書マネージャーとして利用できる(API のみ)

## Reference

- [【AWS Black Belt Online Seminar】AWS Identity and Access Management (AWS IAM) Part1 - YouTube](https://www.youtube.com/watch?v=K7F5yTThynw&list=PLzWGOASvSx6FIwIC2X1nObr1KcMCBBlqY&index=33&t=0s)
- [20190129 AWS Black Belt Online Seminar AWS Identity and Access Manage…](https://www.slideshare.net/AmazonWebServicesJapan/20190129-aws-black-belt-online-seminar-aws-identity-and-access-management-iam-part1)
- [【AWS Black Belt Online Seminar】AWS Identity and Access Management (AWS IAM) Part2 - YouTube](https://www.youtube.com/watch?v=qrZKKF6V6Dc&list=PLzWGOASvSx6FIwIC2X1nObr1KcMCBBlqY&index=32&t=0s)
- [20190130 AWS Black Belt Online Seminar AWS Identity and Access Manage…](https://www.slideshare.net/AmazonWebServicesJapan/20190130-aws-black-belt-online-seminar-aws-identity-and-access-management-aws-iam-part2)

- [IAM JSON ポリシーリファレンス - AWS Identity and Access Management](https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/reference_policies.html)
- [Presentation Title Here](https://d1.awsstatic.com/webinars/jp/pdf/solution-casestudy/20160621_AWS-BlackBelt-Authority-public.pdf)
