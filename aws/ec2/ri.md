# RI (Reserved Instance)

インスタンスを年次使う前提で、インスタンスを一括購入することで有効にできる割引プラン

- 1 年、3 年から選択可能
- スタンダード RI とコンバージョン RI がある

## 正規化係数

インスタンスファミリー内で、インスタンスタイプによって、性能の係数が決まっている
例えば t3.small だと 1 となるが t3.medium だと倍のスペック（おおよそ）なので 2 となっている

## RI の分割、結合

例えば t3.medium1(正規化係数 2)を RI で購入したとすると

- t3.small(正規化係数 1)へのインスタンスタイプ変更する場合、t3.small2 台分賄えるため余る

- t3.large(正規化係数 4)へのインスタンスタイプ変更する場合、50%だけ RI で賄うことができ、残りの 50%はオンデマンドで課金が発生する

## 参考

- [リザーブドインスタンス がどのように適用されるか - Amazon Elastic Compute Cloud](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/apply_ri.html)
- [リザーブドインスタンス（RI）- Amazon EC2 | AWS](https://aws.amazon.com/jp/ec2/pricing/reserved-instances/)
