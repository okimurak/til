# Simple Storege Service (S3)

- S3 はオブジェクトを格納するためのストレージ
  - 階層構造ではない（prefix を使って、そう見せてる）
- オブジェクトのサイズは 5TB まで
- バケットは 100 個まで、上限緩和申請も可
  - バケット名は、グローバルで一意になるように
- メタデータ ... オブジェクトに付随する

## ストレージクラス

IA はアクセスが頻繁なデータ用

- STANDARD ... 複数 AZ にデータを複製 (耐久性 99.9999999999 % の SLA)
  - 頻繁にアクセスされるデータ
- INTELLIGENT_TIERING ... 低頻度アクセス層と高頻度アクセス層を自動で行き来
  - 未知のアクセスパターンのデータに使える
- STANDARD-IA (標準低頻度アクセスストレージ) ... 複数 AZ にデータを複製
  - プライマリ or 再作成できないデータのコピーでのみ使用
- ONEZONE_IA ... 1 つの AZ に格納。大災害ではサヨウナラ
  - データが再作成できる場合や、クロスリージョンレプリケーション（CRR)設定時のオブジェクトレプリカで使用
- S3 Glacier ... 安価なストレージ。90 日の保存必要。取り出しに時間かかる
- S3 Glacier Deep Achive ... Glacier よりも安価。取り出しにとても時間かかる(12 時間~48 時間)
- 低冗長化ストレージ(RRS) ... 頻繁にアクセスされる重要度が低いデータ。非推奨
### 設定

PUT, Post Object, Initiate Multipart Upload API を使う`x-amz-strage-class`リクエストヘッダーを追加して、ストレージクラスを指定する。指定しないと、STANDARD になる

[Amazon S3 ストレージクラス - Amazon Simple Storage Service](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/storage-class-intro.html)

## S3 の操作

知らない操作だけ

- HEAD ... メタデータを取得
- RESTORE ... アーカイブされたオブジェクトを S3 に取り出す
- SELECT ... Select クエリを打てる。データが部分的な取り出しが可能

## バケットポリシーと ACL

基本はバケットポリシーで十分。ACL を使うユースケースは少ない

## Block Public Access

パブリックアクセスできる設定は残るけど、無力化する

- BlockPublicAcls ... パブリックな ACL 設定、オブジェクトのアップロードを防ぐ
- IgnorePublicAcls ... パブリックな ACL の設定をしていても、無力化
- BlockPublicPolicy ... パブリックなバケットポリシーの設定をさせない。AWS Organizations で有効にしておこう
- RestrictPublicBuckets ... パブリックなバケットポリシー設定を持つバケットに対してのアクセス、クロスアカウントでのアクセスを無力化

## 署名付き URL

オブジェクトごとに一定期間だけアクセスできる URL。URL 生成した IAM ユーザロールの権限が用いられる

## Web サイトホスティング

https は使えないので、その場合には CloudFront 経由で配信しようね。

## バージョニング

バケットに対して設定。バージョニングで保管している分も課金対象。
ライフサイクルを使って古いバージョンを削除するのがオススメ

## WORM 機能

Write Once Read Many（Object Lock 機能）

一度書いたら消せない

- コンプライアンスオード
  - root ですら削除 or 無効化できない
  - Cohasset Associates による SEC 17a-4 アセスメント済み
- ガバナンスモード
  - 特別な権限で WORK 保護されたオブジェクトの削除が可能
  - コンプライアンスモードに変更可能

## クロスリージョンレプリケーション

異なるリージョン間の S3 バケットオブジェクトのレプリケーションを実施

- 対象元バケットはバージョニングを有効にする
- それぞれ異なるリージョンである必要がある
- データ転送費用が発生
- バケット、プレフィクックス、オブジェクト単位でのレプリケーション
- レプリ元、先でストレージクラスの指定
- Object Lock は利用できない
- マルチアカウントでも OK

## S3 Glacier

から戻すときの通知をしてくれる

- 迅速(Expedited) ... 1~5 分以内 (DEEP ACHIVE は 利用不可)
- 標準(Standard) ... 3~5 時間 (DEEP ACHIVE は 12 時間以内)
- 大容量(Bulk) ... 5~12 時間 (DEEP ACHIVE は 48 時間以内)

## S3 Analytics

バケット内のオブジェクトのアクセスパターンを分析して、適切なストレージクラスを決定するための指標を作れる。
30 日以上観察して、分析データが作られる

- バケット全体
- プレフィックスやタグによって、グループ化されたオブジェクト
  - グループ化するフィルターを設定できる
- 分析データのエクスポート
  - 格納量と READ の割合を示してくれる
  - QuickSight で見ることもできる

[Amazon S3 分析 – ストレージクラス分析 - Amazon Simple Storage Service](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/analytics-storage-class.html)

## インベントリ

オブジェクト一覧を CSV 形式で取得できる
バッチオペレーションでオブジェクトに対する API アクションを一括実行できる

## 設定項目

- Vault Lock(Glacier) ... 1 度書き込んだら、Read のみ有効になる
- クロスリージョンレプリケーション ... オブジェクトの登録時に実行できる。また CLI のみ実行できる。双方向もできるけど、別途設定が必要

## 暗号化

- CSE (Client Side Encryption) ... クライアント側で行う暗号化
- SSE-S3 ... S3 側で行う暗号化。キー管理も S3. AWS-256 を使用している
- SSE-C ... S3 側で行う暗号化。キー管理はユーザ(自分で準備する必要ある）

## パフォーマンス最適化

- 大きなファイルを快適にダウンロード、アップロードできる
- RANGE GET を使う
- マルチパートアップロードと同じチャンクサイズを利用するのがベストプラクティス
  - 100MB 以上が目安

## S3 Transfer Acceleration

149 の AWS エッジネットワークから、S3 との転送を実現。利用者は自動的に最短のエッジネットワークに接続される

バケットに対して、Acceleration を有効化する

## Private

- Direcct Connect 経由
  - private VIF を使う場合
    - プロキシサーバ(EC2)と S3 VPC EndPoint を使う
  - public VIF を使う場合
    - Direct Connect から直接
      - Direct Connect 側でルータの設定が必要

## S3 Select

SELECT 文を使える。オブジェクト単位で

## 料金

- 小さいファイルは zip などでまとめて送るのがベストプラクティス

  - GET や PUT はリクエストの回数分転送量がかかるため

- S3 Inventory はリストアップされるオブジェクト 100 万個あたり 0.0028USD
- S3 Analytics はオブジェクト 100 万個あたり、0.10 USD
- タグ付けもオブジェクト 100 万個あたり、0.01USD

[料金 - Amazon S3 ｜ AWS](https://aws.amazon.com/jp/s3/pricing/)

## Reference

- [【AWS Black Belt Online Seminar】Amazon S3/Glacier - YouTube](https://www.youtube.com/watch?v=oFG5kMZjKtc&feature=youtu.be)
- [20190220 AWS Black Belt Online Seminar Amazon S3 / Glacier](https://www.slideshare.net/AmazonWebServicesJapan/20190220-aws-black-belt-online-seminar-amazon-s3-glacier)
