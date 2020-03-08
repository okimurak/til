# Simple Queue Service (SQL)

## 柔軟性

柔軟性（アジリティ）とは疎結合であること

- つなぐコンポーネント
  - アプリケーションを疎結合にする
  - 機密性
    - アプリケーションの保護
  - 可用性
    - 耐障害性、自動回復、スケーラビリティ
  - 低価格

- つなぐ際に検討すること
  - ストリーミング/ メッセージング 
    - ストリーミング ... Kinesis, Managed Streaming for Kafka, API Gateway(WebSocket)
      - 連続的にデータを送り、データの順序性に意味がある
    - メッセージング
      - 連続性の意味は持たないで単体で処理をする方式
  - 同期/非同期方式の検討
    - 同期方式
      - リクエスタがプロバイダの処理完了まで応答を待つ方式
    - 非同期方式
      - リクエスタが処理完了の応答を待たずに後続の処理を実施する方式
  - Push / Pull方式検討
    - Push
      - プロデューサが任意でコンシューマに送る
    - Pull
      - コンシューマがほしいときにプロデューサから受信する
    - 両方が任意のタイミングで送受信したいときはコネクタを介する
  - P2P / Publish Subscribe
    - P2P
      - 1対1で連携する
    - Publish Subscribe
      - 1つのメッセージを複数のコンシューマ(Subscriber)が受信する方式

### AWSのマネージドサービスでは

サービス名|同期方式|Push/Pull|P2P/PubSub
-|-|-|-
SNS|非同期|Push|PubSub
SQS|非同期|Pull|P2P
MQ|非同期|Pull|P2P/PubSub


## 特徴

- セキュリティ ... 暗号化
- 耐久性 .... 複数のDCに全メッセージを重複して保存
- フルマネージド
- スケーラビリティ ... 無限のTPS(Transaction per second)
- 初期投資不要 ... 毎月無料枠

## 構成要素

- プロデューサがメッセージをキューに送信(256KBまで）
- コンシューマ自身がキューからメッセージを受信

##　ユースケース

- バッファリングとバッチ化
  - 大量のバッチ処理をキューに格納
- ワークキュー
  - アプリケーション間の依存関係を弱めたい
- リクエストのオフロード
  - 重い処理が含まれていても、素早く応答したい
    - 軽い処理をプロデューサに
      - 処理だけ受け付けてキューに投げる
    - 重い処理をコンシューマに
- ターゲットのファンアウト
  - 複数の処理を並列処理をしたい
    - SNSを間に噛ませて、並列処理を簡単に実現

## キューの特徴

- スタンダドキュー
  - スループットが無制限
  - 少なくとも1回の配信
    - 複数回配信する可能性があるので、冪等性を確保する
  - ベストエフォート(順所が変わる)
  - 100万県越えた場合$0.4

- FIFOキュー
  - 1秒に300件
  - 配信は1回
  - 順序は保つ
  - 100万県越えた場合$0.5

## キューのメッセージ取得方式

- ショートポーリング方式
  - 即応答。ない場合は「空」を応答
  - 複数のキューを1つのスレッドでポーリングするようなケース

- ロングポーリング方式
  - 最大20秒待つ
  - 基本はこっちがオススメ

### メッセージを取得する際のお作法

- ポーリング ... 特定のIDや条件によるメッセージの取得不可
- 取得&処理 ... 受信したメッセージを利用して各々処理実装
- 削除 ... 取り出したら削除する。削除しないと最大14日間滞留するため同じメッセージを取得できてしまう

## 可視性タイムアウト

コンシューマが取得したメッセージに対して、指定された期間(デフォルト30秒)他のコンシューマから同一のメッセージのアクセスをブロックする機能

- 複数のコンシューマが同じメッセージを処理するのを防ぐ
- 受け取ったコンシューマが障害発生した場合、指定した期間のために再試行時間が長くなるので注意

## 遅延キューとメッセージタイマー

- メッセージにキューを送信してから一定時間経過後に利用可能になる
  - 可視性タイムアウトの前に発生する
  - 遅延キューは全体
  - メッセージタイマーは特定のメッセージに対して
    - 両方の場合はメッセージタイマーが優先
    - FIFOは未サポート

## Dead Letter Queue
正しく処理できないメッセージがキュー内に滞留し続けるのを回避するために、分離先に利用するキュー

## 暗号化

- KMSで管理されているキーを使用してSQSキュー内のメッセージの内容を保護する
  - プロデューサはKMSの暗号化
  - コンシューマはKMSの復号化
  - メッセージ本文のみ

## アクセス制御

- IAMポリシー
- SQSポリシー

## メッセージ属性
最大10個までメタデータを保持できる。メッセージサイズ上限のサイズにも含まれ、暗号化の対象外


## モニタリング
CloudWatchに

## キューの保持期間
デフォルト4日、最大14日


## Reference
- [20190717 AWS Black Belt Online Seminar Amazon Simple Queue Service - YouTube](https://www.youtube.com/watch?v=avfc0gQ7X0A&feature=youtu.be)
- [20190717 AWS Black Belt Online Seminar Amazon Simple Queue Service](https://www.slideshare.net/AmazonWebServicesJapan/20190717-aws-black-belt-online-seminar-amazon-simple-queue-service)