# CloudFormation

AWS リソースの環境構築を、設定ファイルを元に自動化できるサービス。

## 料金

無料。作成したリソースについては、使った分料金がかかる（これはそれぞれのマネージドサービスごと）

## 基本機能

- 作成
  - テンプレートごとに定義された構成で、スタックを自動作成
  - 依存関係も自動的に解決
- 変更
  - スタックに前回のテンプレートとの差分を適用（冪等性）
  - リソースの変更時は、無停止/ 再起動/ 再作成のいずれかが発生
  - Change Set を作ることでさ分内容を事前に確認可能
- 削除
  - 依存関係は解決しつつ、リソースを全て削除
  - データストアはスナップショット取得/ 保持が可能

## 構成管理の流れ

- YAML/JSON で記述
- アップロード
  - コンソールか CLI, S3 経由
- スタックの作製
  - IAM リソースが作成されることを承認して作成
- リソースの作成と管理

## 既存リソースの Import

Former2 を使うとテンプレートを生成してくれる(公式ではない)

スタックになら、既存 Import も可能。

## テンプレート

- スタックの設計図
- JSON/YAML でフォーマット
- 依存関係も

## スタック

単一のユニットとして管理できる AWS リソースのコレクション（要は状態を管理する）

## 開発ツール

### エディタ

自動補完を使えるツールがよい。
なんでもいいって言ってるけど、実質 VSCode と PyCharm がいいのでは。

### cfn-lint

入力した値の整合性チェックをできるコマンドラインツール。

### 自動補完

CloudFormation template schema を利用できる。

VSCode / PyCharm で利用可能。

## テスト

- cfn-lint による厳密なチェック
- TaskCat によるマルチリージョン/アカウントテスト
  - 1 つのテンプレートやスタックをテストしたのではわからない問題を検知できる
- cfn-nag によるセキュリティチェック
  - CloudFormation テンプレートから潜在的なセキュリティの問題を発見できる
- CloudFormation Guard (202008 現在 Preview)
  - ルールを記述して対象リソースが満たすべき条件を指定する

## デプロイ

- AWS CodePipeline を使う
- ChangeSet で変更内容を事前確認した上で、デプロイ
- StackSets (マルチリージョン/マルチアカウント)
  - 2000 スタックインスタンス / 1 スタックセット
  - Organization Unit に作成した新規アカウントへ自動デプロイ

## 運用

### スタックの更新

- ドリフト ... テンプレートと現状スタックの差分のこと。手動で変えたとか
  - 差分をテンプレートに反映する必要がある

### スタックとリソースの保護

- IAM ポリシー
- スタックの削除保護
- スタックポリシー
  - 指定したリソースに対して実行できるアクションを定義する JSON ドキュメント
- リソースの DeletionPolicy 属性を付与
  - Delete ... 削除してもいい
  - Retain ... 保持する
  - Snapshot ... スナップショットを取得(対象がある)

### ライフサイクル別のスタック

ライフサイクルが異なるものをスタックごとに分けて管理しよう

### スタック分割

- レイヤー別に分けて依存関係をつける。
  - Application Layer
    - Application
    - Data
    - Shared Service
  - Security Layer
  - Network Layer
  - 既存関係は参照させたいリソースを Output に出力し、それをスタック間で参照する (`Cross Stack Reference`)

### 既存スタックのリファクタリング

例えばスタックを分割したい。 → リソースインポート/エクスポートを利用する。

- リソースインポート
  - Drift Detection に対応したリソースのみ

### ヘルパースクリプト

スタック内の EC2 インスタンスの構築、変更を行えるようにする。

- cfn-init ... Amazon Linux に初期設定ツール。現在は AWS Systems Manager の State Manager の利用推奨
- cfn-get-metadata ... メタデータ情報を取得するためのスクリプト
- EC2 ... リソースが正常に作成されたかを CloudFormation に送信するスクリプト
- cfn-hup ... 作成されたリソースのメタデータの変更を検知してカスタムフックを実行する。EC2 の再起動をせずアプリケーションの設定変更を CloudFormation で適用したい時に使う。

### Dynamic References

動的にデータを参照したいときに使う。Systems Manager パラメータストアと AWS Secrets Manager に格納されたデータを動的に参照できる。
ただし、System Manager パラメータストアの Secure String 型は参照できるリソースが決まっている。

[動的な参照を使用してテンプレート値を指定する - AWS CloudFormation](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/dynamic-references.html)

## 参考

- [【AWS Black Belt Online Seminar】AWS CloudFormation - YouTube](https://www.youtube.com/watch?v=Viyqh9fNBjw)
- [20200826 AWS Black Belt Online Seminar AWS CloudFormation](https://www.slideshare.net/AmazonWebServicesJapan/20200826-aws-black-belt-online-seminar-aws-cloudformation-238501102)
