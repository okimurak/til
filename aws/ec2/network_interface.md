# Network Interface

ENI をアタッチする。

## ベストプラクティス

- ENI はインスタンスの実行中（ホットアタッチ）、停止中（ウォームアタッチ）、起動中（コールドアタッチ）にアタッチできる
- セカンダリ ENI は、インスタンスの実行中、停止中にデタッチできる。ただしプライマリネットワークインターフェース(eth0)はデタッチできない
- 同じ AZ と VPC にあって、サブネットが異なる場合、ネットワークインターフェースを別のインスタンスに移動できる
- 複数のネットワークインターフェースを使用してインスタンスを起動すると、OS 上でインターフェース、プライベート Ipv4 アドレス、ルートテーブルが自動で設定される
- NIC チーミング設定は使用不可
- 複数割り当てる場合はセカンダリプライベート IPv4 をオススメ

## Reference

- [Elastic Network Interface - Amazon Elastic Compute Cloud](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/using-eni.html)
