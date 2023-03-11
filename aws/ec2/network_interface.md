# Network Interface

ENI をアタッチする。

## 拡張ネットワーキング

インスタンスタイプによって異なるが、以下から選択する。

- Elastic Network Adapter(ENA) : 100Gbps まで
- Intel 82599 Virtual Funciton(VF) インタフェース 10 Gbps まで

[Linux での拡張ネットワーキング - Amazon Elastic Compute Cloud](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/enhanced-networking.html)

## ベストプラクティス

- ENI はインスタンスの実行中（ホットアタッチ）、停止中（ウォームアタッチ）、起動中（コールドアタッチ）にアタッチできる
- セカンダリ ENI は、インスタンスの実行中、停止中にデタッチできる。ただしプライマリネットワークインタフェース(eth0)はデタッチできない
- 同じ AZ と VPC にあって、サブネットが異なる場合、ネットワークインタフェースを別のインスタンスに移動できる
- 複数のネットワークインタフェースを使用してインスタンスを起動すると、OS 上でインタフェース、プライベート Ipv4 アドレス、ルートテーブルが自動で設定される
- NIC チーミング設定は使用不可
- 複数割り当てる場合はセカンダリプライベート IPv4 をオススメ

## Reference

- [Elastic Network Interface - Amazon Elastic Compute Cloud](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/using-eni.html)
