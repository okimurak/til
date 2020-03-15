# Network Interface
ENIをアタッチする。

## ベストプラクティス

- ENIはインスタンスの実行中（ホットアタッチ）、停止中（ウォームアタッチ）、起動中（コールドアタッチ）にアタッチできる
- セカンダリENIは、インスタンスの実行中、停止中にデタッチできる。ただしプライマリネットワークインターフェース(eth0)はデタッチできない
- 同じAZとVPCにあって、サブネットが異なる場合、ネットワークインターフェースを別のインスタンスに移動できる
- 複数のネットワークインターフェースを使用してインスタンスを起動すると、OS上でインターフェース、プライベートIpv4アドレス、ルートテーブルが自動で設定される
- NICチーミング設定は使用不可
- 複数割り当てる場合はセカンダリプライベートIPv4をオススメ

## Reference
- [Elastic Network Interface - Amazon Elastic Compute Cloud](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/using-eni.html)