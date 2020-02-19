# RI (Reserved Instance)

## とは
インスタンスを年次使う前提で、インスタンスを一括購入することで有効にできる割引プラン
- 1年、3年から選択可能
- スタンダードRIとコンバージョンRIがある

## 正規化係数

インスタンスファミリー内で、インスタンスタイプによって、性能の係数が決まっている
例えば t3.smallだと1となるが t3.mediumだと倍のスペック（おおよそ）なので2となっている


## RIの分割、結合

例えば t3.medium1(正規化係数2)をRIで購入したとすると

- t3.small(正規化係数1)へのインスタンスタイプ変更する場合、t3.small2台分賄えるため余る

- t3.large(正規化係数4)へのインスタンスタイプ変更する場合、50%だけRIで賄うことができ、残りの50%はオンデマンドで課金が発生する

## 参考
- [リザーブドインスタンス がどのように適用されるか - Amazon Elastic Compute Cloud](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/apply_ri.html)
- [リザーブドインスタンス（RI）- Amazon EC2 | AWS](https://aws.amazon.com/jp/ec2/pricing/reserved-instances/)