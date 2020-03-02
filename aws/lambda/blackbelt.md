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

## ロール

最低でもCloudWatchlogsへのアクセス許可が必要

Function version エイリアス、レイヤーバージョンをResourcesベースのポリシーとして指定することができる

### リソースポリシー

## 同時実行数
1000で制限されている
- 緩和したとしても、制限に到達するまで1分ごとに500ずつ増えていく

- 実績に応じて、制限緩和申請することが可能

超えた場合は、スロットリングエラー（エラーコード429）が返される

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
## Reference
- [【AWS Black Belt Online Seminar】 AWS Lambda Part1 - YouTube](https://www.youtube.com/watch?v=QvPgjEwgiew&list=PLzWGOASvSx6FIwIC2X1nObr1KcMCBBlqY&index=18&t=0s)
- [20190402 AWS Black Belt Online Seminar Let's Dive Deep into AWS Lambd…](https://www.slideshare.net/AmazonWebServicesJapan/20190402-aws-black-belt-online-seminar-lets-dive-deep-into-aws-lambda-part1-part2/)
- [20190813 AWS Black Belt Online Seminar 実践的 Serverless セキュリティプラクティス](https://www.slideshare.net/AmazonWebServicesJapan/20190813-aws-black-belt-online-seminar-serverless)