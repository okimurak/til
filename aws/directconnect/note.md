# Direct Connect

オンプレミスと AWS をつなぐための専用線サービス。専用線の速度は 1G, 10G, 100G から選択する。ホストの速度はまちまちだが、パートナーと連携して選択する。

## 仮想インタフェース

仮想インタフェースとオンプレミスのルータを接続する。

オンプレと接続するためには仮想インタフェースへのルート伝搬を設定し、オンプレミス環境への返信ルートを VPC のルートテーブルに追記する。

### パブリック仮想インタフェース

パブリック IP を使って全ての AWS のパブリックサービスにアクセスできる。

### プライベート仮想インタフェース

プライベート IP を使って VPC に接続するときに使う。
ただ、AWS のパブリックサービスには接続できないので、VPC エンドポイントが必要

### トランジット仮想インタフェース

複数の Transit Gateway にアクセスする場合に使う。

## LAG(Link Aggregation Group)

複数の接続を使って、利用できる帯域幅を増やすことができる。

## Direct Connect ゲートウェイ

複数の VPC またはプライベート仮想ゲートウェイがある場合に使う。プライベート仮想ゲートウェイや Transit Gateway と接続先の間に入る

- 同一リージョンに複数の VPC がある場合には Transit Gateway
- 仮想プライベートゲートウェイ

## Reference

[AWS Direct Connect とは - AWS Direct Connect](https://docs.aws.amazon.com/ja_jp/directconnect/latest/UserGuide/Welcome.html)
