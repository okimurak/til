
# S3
- S3はオブジェクトを格納するためのストレージ
  - 階層構造ではない（prefixを使って、そう見せてる）
- オブジェクトのサイズは5TBまで
- バケットは100個まで、上限緩和申請も可
- メタデータ...オブジェクトに付随する

## ストレージクラス

IAはアクセスが頻繁ではにデータ用

- スタンダード ... 複数AZにデータを複製
  - 頻繁にアクセスされるデータ
- INTELLIGENT_TIERING ... 低頻度アクセス層と高頻度アクセス層を自動で行き来
  - 未知のアクセスパターンのデータに使える
- スタンダードIA ... 複数AZにデータを複製
  - プライマリ or 再作成できないデータのコピーでのみ使用
- ONEZONE_IA ... 1つのAZに格納。大災害ではサヨウナラ
  - データが再作成できる場合や、クロスリージョンレプリケーション（CRR)設定時のオブジェクトレプリカで使用
- S3 Glacier ... 安価なストレージ。90日の保存必要。取り出しに時間かかる
- S3 Glacier Deep Achive ... Glacierよりも安価。取り出しにとても時間かかる(12時間~48時間)
- 低冗長化ストレージ(RRS) ... 頻繁にアクセスされる重要度が低いデータ。非推奨

### 設定

PUT, Post Object, Initiate Multipart Upload APIを使う`x-amz-strage-class`リクエストヘッダーを追加して、ストレージクラスを指定する。指定しないと、STANDARDになる

[Amazon S3 ストレージクラス - Amazon Simple Storage Service](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/storage-class-intro.html)
- スタンダード ... 複数AZにデータを複製
- スタンダードIA
- INTELLIGENT_TIERING
- ONEZONE_ID ... 1つのAZに格納。大災害ではサヨウナラ
- S3 Glacier ... 安価なストレージ。取り出しに時間かかる
- S3 Glacier Deep Achive ... Glacierよりも安価。取り出しにとても時間かかる
- 低冗長化ストレージ(RRS)

## S3の操作
しらないのだけ

- HEAD ... メタデータを取得
- RESTORE ... アーカイブされたオブジェクトをS3に取り出す
- SELECT ... Selectクエリを打てる。データが部分的な取り出しが可能

## バケットポリシーとACL
基本はバケットポリシーで十分。ACLを使うユースケースは少ない

## Block Public Access
パブリックアクセスできる設定は残るけど、無力化する

- BlockPublicAcls ... パブリックなACL設定、オブジェクトのアップロードを防ぐ
- IgnorePublicAcls ... パブリックなACLの設定をしていても、無力化
- BlockPublicPolicy ... パブリックなバケットポリシーの設定をさせない。AWS Organizationsで有効にしておこう
- RestrictPublicBuckets ... パブリックなバケットポリシー設定を持つバケットに対してのアクセス、クロスアカウントでのアクセスを無力化

## 署名付きURL
オブジェクトごとに一定期間だけアクセスできるURL。URL生成したIAMユーザロールの権限が用いられる

## Webサイトホスティング
httpsは使えないので、その場合にはCloudFront経由で配信しようね。

## WORM機能
Write Once Read Many（Object Lock機能）

## S3 Glacier

から戻すときの通知をしてくれる

- 迅速(Expedited)
- 標準)Standard()
- 大容量(Bulk)

## S3 Analytics

- 格納量とREADの割合を示してくれる
  ->どのストレージクラスを使うべきかの目安になる
- QuickSightで見ることもできる

## インベントリ
オブジェクト一覧をCSV形式で取得できる
バッチオペレーションでオブジェクトに対するAPIアクションを一括実行できる


## 設定項目

- Vault Lock(Glacier)
- クロスリージョンレプリケーション ... オブジェクトの登録時に実行できる。またCLIのみ実行できる。双方向もできるけど、別途設定が必要

## 暗号化

- CSE (Client Side Encryption) ... クライアント側で行う暗号化
- SSE-S3 ... S3側で行う暗号化。キー管理もS3. AWS-256を使用している
- SSE-C ... S3側で行う暗号化。キー管理はユーザ(自分で準備する必要ある）
バッチオペレーションでオブジェクトに対するAPIアクションを一括実行できる
