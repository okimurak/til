# S3 Replication Time Control

> S3 Replication Time Control (S3 RTC) では、データレプリケーションに関するコンプライアンス要件 (またはビジネス要件) への対応をサポートします。また、Amazon S3 レプリケーション時間を可視化します。S3 RTC は、Amazon S3 にアップロードしたほとんどのオブジェクトを数秒でレプリケートします。99.9% のオブジェクトが 15 分以内にレプリケートされます。

## メトリクス

レプリケーションのメトリクスも取得できる。レプリケーション開始後 15 分後にメトリクスが生成される。

- Bytes Pending Replication
- Replication Latency
- Operations Pending Replication
- Operations Failed Replication


## S3 イベント

s3:Replication:OperationFailedReplication, s3:Replication:OperationMissedThreshold, s3:Replication:OperationReplicatedAfterThreshold, and s3:Replication:OperationNotTracked が飛ぶ。

## 参考

S3 Replication Time Control (S3 RTC)を使用してコンプライアンス要件を満たす
https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/replication-time-control.html

S3 レプリケーションメトリクスの使用
https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/repl-metrics.html