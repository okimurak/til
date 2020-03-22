# Amazon S3 Transfer Acceleration
クライアントとS3バケットの間で各リージョンに展開することができる。内部でCloudFrontのエッジロケーションを使っている

## ユースケース

- 中央のバケットに対して、世界中の人からアップロード
- 大陸間で定期的にGB ~ TB単位のデータを転送する
  - こちらの利用が多そう
- S3へのアップロード時にインターネット経由で利用可能な帯域幅を十分に活用できていない

## Reference
- [Amazon S3 Transfer Acceleration - Amazon Simple Storage Service](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/transfer-acceleration.html)