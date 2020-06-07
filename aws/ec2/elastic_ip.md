# Elastic IP

EC2に固定IPを指定でき、基本は一時的に利用するのに使う

## 料金

- 0.005USD/時
- EC2インスタンス1台につき、1EIPは無料  
- 追加は料金がかかり、**付与しているEC2を停止しても料金がかか(0.005USD/時))**  
- 解放すると同じIPは戻らない（BYOIPは除く）

## 参考
- [Elastic IP アドレス](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html)
- [Elastic IP の料金を理解する](https://aws.amazon.com/jp/premiumsupport/knowledge-center/elastic-ip-charges/)