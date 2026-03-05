# S3 アクセスポイント

S3 バケットや Amazon FSx for NetApp ONTAP ボリューム、Amazon FSx for OpenZFS ボリュームなどのリソースに別の名前付きエンドポイントを作ることができる。

このエンドポイントに対して S3 オブジェクトオペレーション (GetObject など) を実行できる。

- 1 アクセスポイントは 1 リソースのみ関連付けできる
- クロスアカウントも可能。ただしクロスアカウント先の S3 バケットにはバケットポリシーを設定し、クロスアカウント元のアクセスを許可しなければならない。
- VPC からのみ操作できる、プライベートなエンドポイントも作れる
- アクセスポイントには IAM ポリシーを付与できる。[2] のようにプレフィックス毎にアクセスできる IAM プリンシパルを変更する、ということも可能。ただし今では S3 Access Grants [3] でも同様の要件を満たせそう。

## 参考

[1] アクセスポイントを使用した共有データセットへのアクセスの管理
https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/access-points.html

[2] Amazon S3 Access Points で共有データセットの管理が簡単に
https://aws.amazon.com/jp/blogs/news/easily-manage-shared-data-sets-with-amazon-s3-access-points/

[3] Amazon S3 とは
https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/Welcome.html