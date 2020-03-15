# AWS Config

パラメータの構成管理

- リソースのインベントリ管理、構成変更のためのフルマネージドサービス
- リソースの構成変更をロギング
  - デフォルトで7年間(30日~7年)
- 構成管理の履歴もS3に保存

### ストリーム (Configuratoin Stream)

- リソースが作成変更削除される度に作成
- SNSトピック連携可能

### ヒストリー
- 任意の期間における各リソースタイプの構成用途の集合
- リソースの設定履歴を。指定したS3仁保存

### スナップショット
- ある時点でのコンフィグレーションアイテムの集合
- 自動て定期的、あるいは変更トリガで作成され、指定したS3バケットに保存

## リソース間の関係
- アカウント内のAWSリソース間の関係を管理

## リソースのインベントリ
リソースの情報を調べることができる。削除したのもも調べられる

- 高度なクエリで様々なクエリを投げることができる
  - いくつかサンプルクエリが用意されている
  - 特定のSGを利用しているリソースの検索とか

## 対応しているAWSリソース

たくさんありますが。。。24サービス対応

グローバル・サービスは、バージニアのみ
- Cloud Front、AWS WAF 

## AWS Config Rules

構成設定の評価基準を設定できるよ

- マネージドルール
  - AWSによって定義提供される
  - コンピューティング
  - データベース
  - マネジメントとガバナンス
  - ネットワークとコンテンツ配信
  - セキュリティアイデンティティ、コンプライアンス
  - ストレージ
- カスタムルール
  - Lambdaをベースにルールを作成可能
    - ConfigがLambdaを実行して、評価結果をAWS Cofnigに引き渡す
    - 開発キットがある(RDK) -> https://github.com/awslabs/aws-config-rdk

### トリガータイプ

- 設定変更
  - 関連リソースが作成、変更された場合
- 定期的
  - 任意のタイミング（1時間~24時間毎)
  - AWS Config がスナップショットを取る際

### 修正アクション
ルールに関連付けられた修正アクションを実行できる

- 事前入録されたリストから修正アクションを選択
- SSM Automation ドキュメントを使用したカスタムの修正アクソンを設定できる
- Cloud Watch EventsからLambdaをトリガーして、細かいアクションも取れる

### AWS Config Rules Repository
コミュニティベースでカスタマイズされた AWS Config RulesをGithubで公開

https://github.com/awslabs/aws-config-rules

## OS構成情報の管理例

- SSM Inventory でソフトウェアの導入状況を確認して、 Configに連携
- AWS Configで導入状況を記録監視

## ベストプラクティス

- 記録対象について
  - すべてのアカウントとリージョンで有効にする
  - すべてのリソースタイプについて記録
  - グローバルリソースは1リージョンで記録を有効
    - 重複して記録されるのを防ぐ
- 保存先
  - 安全なS3バケットに(特定の日としたアクセスできず、改ざんできない場所)
  - S3バケットの公開設定をチェックする AWS managed Ruleも活用する
- マルチアカウント環境での利用について
  - 構成管理用アカウントから集中管理

- EN:[AWS Config best practices | AWS Management & Governance Blog](https://aws.amazon.com/jp/blogs/mt/aws-config-best-practices/)

## 集約ビュー
- アグリゲータの設定をして、各アカウント情報を集約する

## 料金

- リソースに対して記録された設定項目 : 1記録あたり $0.003
- 最初の10万ルールの評価について : $0.001
- 次の400,000 : $0.0008
- 次の500,001以上のルール評価 : $0.0005

他には、S3、SNS、Lambda、SSM Automation

## Reference
- [【AWS Black Belt Online Seminar】AWS Config - YouTube](https://www.youtube.com/watch?v=vnqX0gMj6jw)
- [20190618 AWS Black Belt Online Seminar AWS Config](https://www.slideshare.net/AmazonWebServicesJapan/20190618-aws-black-belt-online-seminar-aws-config)
- [よくある質問 - AWS Config | AWS](https://aws.amazon.com/jp/config/faq/)