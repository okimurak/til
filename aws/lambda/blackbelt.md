# Lambda

## サーバレス
- インフラのプロビジョニング不要、管理不要
- 自動でスケール
- 価値に対する支払い
  - 事前に必要なコストが存在しない
- 高可用かつ安全

### 使う場合

- インフラ管理したくない
- 必要なときだけコードを実行したい

### 用途
- Resources ... イベントドリブン
- 処理 ... lambda
- Output ... データソースとか


## 基本
### Lambda関数
- コンテナで実行される。１コンテナで複数イベントを実行されることはない
- ハンドラー内ではパラメータとしてイベントのデータ（json）にアクセスすることが可能
- コードはビルド、パッケージしてアップロード
  - ZIP形式(jarでもOk)
  - アップロードしたものはS3に保存されて、実行時以外は暗号化

### サポートされている言語

- Python
- Node JS
- .Net
- Go
- Java8
- Ruby 2.5

- 上記以外はカスタムランタイム

### 基本設定
- メモリ　128 ~ 3008MB (容量に応じてCPU能力も増加)
  - コア数も同様に比例して増える
- タイムアウト ... 最大900秒(15分)まで、デフォルトは15秒だったかな
- 実行ロール ... 必要なAWSResourcesへのアクセス許可をするIAMロール

### 実行環境
- Amazon Linux

常に更新されるので、確認したほうがいい。特にSDKはデプロイパッケージに組み込んでおくのがオススメ

### 制限
- インバウンドネットワーク接続はブロック
- アウトバウンドはTCP/IP,UDP,IPのみ
- ptraceシステムコール
- TCP25はブロック

### イベントソース

AWSのサービスかユーザが開発したアプリケーション

- ポーリングベース
  - ストリームベース
  - それ以外
  - Lambdaがポーリングして、処理するデータが有る場合にはLambda関数を実行
- それ以外 ... lambda関数はイベントソースから呼び出される

- イベントソースによって呼び出しタイプが異なるため、リトライの処理も異なる

### 呼び出しタイプ
カスタムアプリケーションによる呼び出し、AWS CLIなどを用いての手動実行の場合のみ指定可能  
AWSのサービスをイベントソースとしている場合には変更不可

- 非同期呼び出し
  - InvovationType = Event
  - リクエスト受けられたかどうかのみ
- 同期呼び出し
  - InvocationType = RequestResponse
  - 実行完了時にLambdaで設定したレスポンスが返ってくる

## リトライ

- ストリームベースではないイベントソース
  - 同期呼び出し
    - レスポンスヘッダにFunctionErrorを含む
    - [Invoke - AWS Lambda](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/API_Invoke.html#API_Invoke_Errors)
  - 非同期呼び出し
    - 自動で2回までリトライされてイベントを破棄される
    - リトライには遅延がある
    - Dead Letter Queue(DLQ)を設定して、SNS経由で確認が可能

- ポーリングベースでストリームベース
  - データの有効期限が来れるまでリトライ
  - シャードからの読み込みはブロックされ、新しいレコードの読み込みは行われない

- ポーリングベースでストリームベースではない（今の所、SQS）
  - 全てーキューに返って Visibility Timeout後にまた処理が行われて成功されればキューから削除
  - 新しいメッセージの処理はブロックされない

## VPCアクセス

Lambdaファンクションに対して、VPCサブネット及びセキュリティグループを指定

AZ毎に1つ以上のサブネットを指定しておくのがオススメ

ENIによって実現
- AWSLambdaVPCAccesExecutinRoleというポリシーをアタッチすること

インターネットアクセスが必要な場合は、NATインスタンスかVPC NAT Gatewayを使う

ENIが作成できない場合は、非同期呼び出しの場合、CloudWatch Logsには記録されないのでコンソールで実行してエラー応答で確認

ENIのキャパシティは下記の式でざっくり
Projected peak concurrent exexutinos * (memory in GB / 3GB)

プライベートアクセスIP固定はできない

グローバルIPアドレスは　Managed Nat gatewayや独自のNATインスタンスを利用することで、インターネット通信及びグローバルIPを固定することが可能

オンプレミスに有るリソースへのアクセスはDirect Connect

ENI作成に10~60秒
- 2019/09/03のアップデートで関数作成時かVPC設定有効化時、ENIを作成しておけるようになった（90秒くらいかかる）

## ロール

最低でもCloudWatchlogsへのアクセス許可が必要

Function version エイリアス、レイヤーバージョンをResourcesベースのポリシーとして指定することができる

### リソースポリシー

## 同時実行数
1000で制限されている
- 緩和したとしても、制限に到達するまで1分ごとに500ずつ増えていく

- 実績に応じて、制限緩和申請することが可能

超えた場合は、スロットリングエラー（エラーコード429）が返される

### 管理
ファンクション単位で任意に割り当てることができる

スロットリングというボタンが有るが、同時実行数が0になるのでエラー時に有効

### 見積もり
- ポーリングベースかつストリームベース
  - シャード数
- ポーリングベースかつストリームベースではない
  - 同時実行数までポーリングを自動的にスケールアップ
- それ以外
  - 秒間呼び出し回数 * 平均実行時間（秒）

## ライフサイクル

### コールドスタート
利用可能なコンテナがない場合に発生

1. ENIの作成　... 10~30秒

2. コンテナ作成

3. デプロイパッケージのロード

4. デプロイパッケーzの展開

5. ランタイム起動・初期化

6. 関数メソッドの実行

7. コンテナの破棄


### ウォームスタート
利用可能なコンテナがある場合、コールドスタートの1~6を省略できる。


## 料金
- 月間100万リクエストまでは無料
  - $0.2 / 100万リクエスト

- 実行時間
  - 1GBのファンクションで40万秒まで無料
    - 128MBのファンクションなら320万秒-> 888時間

- 複雑なので
  - [AWS LambdaのPricingを読み解く - Qiita](https://qiita.com/Keisuke69/items/e3f79b50b6039175401b)

## プログラミングモデル

- ハンドラー ... 実行する関数メソッド、エントリーポイント、パラメータ(JSON)にアクセスすることが可能
- コンテキスト ... ランタイムに関する情報。コールバックも設定できる

- ロギング ... CloudWatch Logへ出力。CloudWatch Logsの制限に注意
- 例外  ... 使用する言語によって、正常終了、例外通知方法が異なる。同期的に呼び出している場合はクライアントへエラーがレスポンスされる

- ステートレスにする。次も同じコンピューティングインスタンスで起動するとは限らないため
- ローカルファイルシステムへのアクセス、子プロセスなどその他類似の生成物はリクエストの有効期限に限定
- 永続化するには、S3, DynamoDB, その他のクラウドストレージサービスへの保存が必要

### 設計図
- ユースケース向けのサンプルコード集 ... Python, Nodejs向けのみ
- Serverless Application repository ... ほかユーザへ公開するための機能

### 各言語の実装
普通に実装する

- [Node.js による Lambda 関数のビルド - AWS Lambda](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/programming-model.html)
- [Python による Lambda 関数のビルド - AWS Lambda](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/python-programming-model.html)
- [Java による Lambda 関数のビルド - AWS Lambda](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/java-programming-model.html)
- [Go による Lambda 関数のビルド - AWS Lambda](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/go-programming-model.html)
- [C# による Lambda 関数のビルド - AWS Lambda](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/dotnet-programming-model.html)
- [PowerShell による Lambda 関数のビルド - AWS Lambda](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/powershell-programming-model.html)
- [Ruby による Lambda 関数のビルド - AWS Lambda](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/lambda-ruby.html)

### デプロイパッケージ
コードと依存関係で構成される、.zip .jar。すべてにread権限つけること

### 環境変数
OSの環境変数に準拠

- キーバリューの合計サイズが4KB以下
- キー名は文字で始まる必要があり、英文字とアンダースコアだけ

### 暗号化
- デプロイプロセス後に、KMSサービスキーで暗号化される（デフォルト）
- 機密情報はデプロイ前に暗号化をすることを推奨
- 独自のサービスキーを使うことも可能、KMSの料金が適用される。実行ロールに`kms:Decript`を許可すること

## バージョニング
ある一時点のファンクションをバージョンとして管理可能。環境変数もスナップショットに保存される

### エイリアス
特定のバージョンに対するポインタ（別名）をつけることができる

routing-config を使ってエイリアスのインバウンドリクエストトラフィックが転送される割合を決めることができる

## Lambda Layer

共通利用できるコンポーネントを定義することができる、ファンクションと同様にバージョン管理もできる

`/opt`の下に指定した順番で展開されるので、特定のモジュールを上書きすることも可能。
なので、同じパスや同名ファイルを使うと、意図せず上書きされることに注意

Layerは１つの関数で5個まで。登録はzip or S3のみ

## タグ付け
グループ化とフィルタリング
コスト配分

## Dead Leter Queue (DLQ)
非同期呼び出しのとき、2回のリトライ後に正常終了しなかったときに、イベントを指定されたSQSのキューかSNSのトピックへと送信可能

ペイロード
- RequestID
- ErrorCode
- Errormessage

## Custom Runtimes
Linuxで互換のランタイムを持ち込むことで、任意の言語をLambdaに記述できるように

### Runtime bootstrap
bootstrapと呼ばれる実行ファイルを含める必要がある。デプロイパッケージに含めても、Layerとして登録してもいい

- `bootstrap`
   - Runtime HTTP APIと実行するファンクションとの間でブリッジとして振る舞う
   - レスポンスとエラーハンドリング、contextの作成とファンクション実行を管理する
   - Lambdaファンクション実行時にデプロイパッケージもしくは指定されたlayer内にbootstrapという名前を実行する
   - 存在しなければエラーになる
   - Layer登録がオススメ

### Custom Runtimeの作り方

以下を実装する
- Initializaton Tasks
  - 環境変数の読み取り
  - 関数の初期化
    - SFKクライアント、DB接続などを作成し、再利用する
  - エラーハンドリング
- Processing Tasks
  - イベントの取得
  - トレーシングヘッダの伝搬
  - コンテキストオブジェクトの作成
  - ハンドラ呼び出し
  - レスポンスのハンドリング
  - エラーハンドリング
  - クリーンアップ
    - 使われないリソースをリリース

### 使い所

- サポートされていない言語の新しいバージョン、サポートを打ち切ったバージョン
- サポートされていない言語

## 監視

### メトリクス

- Invocaton ... 同時実行数
- Throttles ... 同時実行数超過の回数
- DeadLetterErrors ... DLQの回数

### モニタリングでの注意

最低１回実行することを保証する

- 冪等性の確保

### SQS起動での注意

- メッセージ到達時の挙動
  - 5つのパラレルロングポーリング接続を使用してSQSキューのポーリングを開始、メッセージ数>処理量の傾向が続き、最終的な処理が追いつかない場合は同時実行数の上限までスケール

  - ファンクション単位で同時実行数を制限しない場合はアカウントの上限までスケールする可能性がある
    - 他のLambda起動を妨げるかも

## X-ray

ファンクションのトレースシステム。
- デプロイパッケージにX-Ray SDKを追加して、アクティブトレースをONにする
- 実行ロールへの権限も必要(Managed Policyが用意されている)
- コールドスタートの一部を X-Rayで確認できる

## ベストプラクティス

### コールドスタートを早くする
- コンピューティングリソースを増やす
  - メモリ設定
    - パフォーマンス設定と同義
      - メモリ増やしたほうが実行時間短くなってコスト変わらないってことも往々にして有る
- ランタイムを変える
  - コンパイルしない言語に
  - ウォームスタートではコンパイルする言語のほうが早かったり

- パッケージサイズを小さくする
  - コードを減らす
  - 依存関係を減らす
    - java の依存ライブラリは/libに置くとか
  - コード最適化ツールを使う

- VPCは必要でない限り必要しない
  - RDSなどパブリックに公開できない
  - ElasticsearchなどはIAMで保護できるのでパブリックでもOk

### 関数コード

コードの最適化

Fatでのモノリシックな関数にナラないようにする
 - 1つの関数はなるべく単機能に

### コンテナ再利用を有効活動

- AWS SDKのクライアントやDBクライアントの初期化はハンドラの外側で行う
  - グローバルスコープはコールドスタートしか実行されないため

- 必要なもののみ読み込むようにする
  - S3 Selectの利用

- lambdaでオーケストレーションをしない
  - するときは、Step Functionを使う

- レジリエンシの向上
  - エラーハンドリング
    - リトライ処理を実装(Exponential Backoff with Jitter: ゆらぎをいれてリトライ)
  - Lambdaのリトライポリシーを理解
    - 同期はリトライなし
    - 非同期は2回リトライ
    - ストリームはデータの期限が来れるまで
  - DLQを活用する

- 複雑な依存関係をやめる

- 組み込まれたSDKを使用しない
  - 更新がされているため、ファンクションの動作が微妙に変わる可能性がある
- 非同期実行を活用する
  - バーストも許容されているため、スループットが上がるため
  - DLQを設定してね
- 冪等性を確保する
- 並行処理
- Javaの場合はバイトストリーム
- ハードコーディングしない
- SSMを使う場合は、キャッシュを保存する。ライブラリも有る

### ストリーム型のイベントソースを利用する場合のプラクティス

- バッチサイズは１バッチで最大6MBしか処理できない
- DLQを活用する。ただしこれは自前になる

- ファンアウトパターンがいい
  - Kinesis Data Stremaに結びつけるファンクションは一つ（Dispatcher）
  - Dispatcherが実際の処理をするファンクションをぶら下げてそちらにイベントを投げる


### Lambdaで利用するデータベース

- Lambda + RDBMSがアンチパターン
  - コネクション数の問題
    - コネクションどんどん増えるから、各ファンクションからの同時接続数を超えてしまう
  - VPCコールドスタートの問題
    - 10秒の遅延を必要する

- 実行数が少ない、コールドスタートの遅延が許容できる環境ならいいかなと

- DynamoDBを使う
  - 分散DBなのでコネクションの問題から解放
  - VPC外リソースとしてアクセスできる
  - RDBではない、NoSQLなのでRDBの常識は忘れて
    - [【イチから理解するサーバーレスアプリ開発】 サーバーレスアプリケーション向きの DB 設計ベストプラクティス 20190905版](https://www.slideshare.net/AmazonWebServicesJapan/db-20190905)
    - [DynamoDB を使用した設計とアーキテクチャの設計に関するベストプラクティス - Amazon DynamoDB](https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/best-practices.html)
    - [AWS Black Belt Online Seminar 2018 Amazon DynamoDB Advanced Design Pa…](https://www.slideshare.net/AmazonWebServicesJapan/aws-black-belt-online-seminar-2018-amazon-dynamodb-advanced-design-pattern)

- RDB使う場合は非同期にする
  - DynamoDB Streams + Lambda
  - Kinesis Data Streams + SQS + Lambda
  - API Gateway + Lambda

- 同時実行数を制御する

- Aurora Serverless Data というのがある
  - Serverlessようではないっぽい
  - APIとしてHTTPSエンドポイント
  - コネクション管理不要
  - APIコールに認証情報不要
  - MySQLとお暗示方法でSQL文を実行可能で、クエリ結果はJSON形式
    - 一度のレスポンスに1000行か1MBまで、トランザクションなし
  - バージニア Regionだけでβ提供中

- IP固定したい
  - アンチパターン

## アプリケーションの管理

- IDEプラグイン
 - VSCodeもある
- SAM
  - 複雑なCloudFormationをシンプルにできる

## テスト

- ユニットテストはローカルで
- インテグレーションテスト、受け入れテストは実際のサービスで
- パイプラインの一部としてテストを実効する
  - 3rdPartyを使う

### SAM CLI
- テストを支援するツール
  - SAMテンプレートをもとにしたLambdaファンクションのローカル実行
  - Dockerを利用して、Lambdaｎランタイムイメージをローカルで実行
    - dockerの環境が必要だよ
  - ローカルでAPI Gatewayのエンドポイントを実行することも可能
    - ホットリロードもサポート
  - テスト用イベントデータも作れるし
  - `sam init`コマンドでアプリの雛形生成
  - パッケージング、デプロイも可能
  - リモートデバッグもサポート

## セキュリティ

ホワイトペーパーに記載されている

- コントロールプレーン
  - ファンクション管理API
  - AWSサービスとのインテグレーションを管理
- データプレーン
  - Invole APIのコントロール
  - Invokeされると、実行環境を割り当てるか既存の実行環境を選択
  - MicroVM上で実行される。アカウントごとにAWSから割り当てられる

### 実行環境の隔離  
以下のコピーを持っている  
- 関数コード
- Lamnda Layer
- Runtuime
- Linuxベースの最低限のユーザランド

Micro VMはFirecrackerを使って生成  ... AWSが開発しているOSSで、ハイパーバイザ


### ペイロード

- 同期呼び出し
  - API Caller -> ロードバランサ -> Lambda invoke service
- 非同期呼び出し
  - SQS(AWS Lambdaが管理) -> pollerプロセス -> Lambda Invoke service

### Lambda関数の Audit(監査)

- CloudTrail
  - 実行監査、リスク監査を追跡
- AWS Config
  - 設定変更削除を追跡

### コンプライアンス

[AWS クラウドコンプライアンス | AWS](https://aws.amazon.com/jp/compliance/)

### Lambdaがセキュアな理由

- パッチが適用されていないサーバがない
- SSHいらない
- リクエストは認可され、監査可能
- ファンクションは短命

## 関数コードのセキュリティ

- ルートアカウントを無効にする
- 環境毎にアカウントを分ける
- IAMで厳格なアクセスコントロールを

- 各言語のベストプラクティスに則る
  - 割り当てるIAMロールは適切な権限を付与
    - 最低限必要なのは、CloudWatch Logsへの出力権限
    - リソースに対しても、必要最小限のアクションを許可
    - 1つの関数に対して、1つのIAMロールにする
      - 複数の関数を1つのIAMロールで共有することは規則に反する

- ハードコーディングしない
- アプリケーション固有のバリデーションは適切な方法で実装する
- 依存関係のバリデーション
  - 依存ライブラリの脆弱性スキャンを行う
    - OWASP
    - Snyk
    - Twistlock

## ユースケースと事例

webに事例有るので見てね

- 動的Webアプリモバイルバックエンド
  - リクエスト/レスポンス型向け
- インタラクティブモバイル、モバイルオフライン処理
  - リアルタイム通信、非接続状態
- 業務API
  - 内部データの公開ルートをAPI化
  - VPC内でのAPI公開も可能
- インタラクティブAPI
  - データ配信
- データ加工
  - S3へのデータ投入をトリガーにファイル情報を引き出して処理を起動
- イベント駆動
- 短時間の並列処理
- アプリケーションフロー処理
- 流入データの連続処理
  - Kinesis に流入するデータを加工して格納
- チャットボット
- IoTバックエンド
- データ変更トリガー
  - DBに実行されたデータ変更処理に反応したイベント処理
- バックエンド
  - ログデータ収集
  - 機械学習ETLデータラプライン
  - データレイクからのデータ加工
  - スケジュールジョブ・CRON

## Reference
- [【AWS Black Belt Online Seminar】 AWS Lambda Part1 - YouTube](https://www.youtube.com/watch?v=QvPgjEwgiew&list=PLzWGOASvSx6FIwIC2X1nObr1KcMCBBlqY&index=18&t=0s)
- [【AWS Black Belt Online Seminar】 AWS Lambda Part2 - YouTube](https://www.youtube.com/watch?v=96ku2x1NCaE&feature=youtu.be)
- [【AWS Black Belt Online Seminar】 AWS Lambda Part3 - YouTube](https://www.youtube.com/watch?v=rMG18Fr896U&feature=youtu.be)
- [【AWS Black Belt Online Seminar】AWS Lambda Part4 - YouTube](https://www.youtube.com/watch?v=AOx5iNmxOC8)
- [20190402 AWS Black Belt Online Seminar Let's Dive Deep into AWS Lambd…](https://www.slideshare.net/AmazonWebServicesJapan/20190402-aws-black-belt-online-seminar-lets-dive-deep-into-aws-lambda-part1-part2/)
- [20190813 AWS Black Belt Online Seminar 実践的 Serverless セキュリティプラクティス](https://www.slideshare.net/AmazonWebServicesJapan/20190813-aws-black-belt-online-seminar-serverless)
