# AWS Well-Architected Framework

システム設計／運用の大局的な考え方とベストプラクティス集。W-Aが略称らしい

## クラウド活用の道のり

- クラウドネイティブによるアプリ開発 -> クラウド最適化
- リフト＆シフト -> クラウド最適化

## W-A パートナープログラム

認定された人からレビューもらえる

- IoT Lens
  - IoT向け(Alexaとか)

## ホワイトペーパー

- 運用の優秀性
- セキュリティ
- 信頼性
- パフォーマンス効率
- コストの最適化

実装方法が書いてあるわけではなく、原則が書いてある。  
質問と回答形式で書いてある

### 大原則

クラウドでの一般設計原則
- 必要なキャパシティを勘に頼らない
  - データ計測しろ。もしくはやらない
- 本番規模でのシステムテストを行う
- アーキテクチャ試行回数を増やすために自動化
- 発展的なアーキテクチャを受け入れる
- データ計測に基づいてアーキテクチャを決定する
- 本番で想定されるトラブルを予めテストし、対策する

### ベストプラクティス

- 46項目ベストプラクティスがある
  - 全項目乗っている必要はなく、理解した上で（ビジネス的な）判断することが重要
    - リスクや改善点の顕在化をしておく
      - なんとなくこういう構成、というのはやめておきたい

要件定義から運用までどこでも活用できる

### リージョン毎の価格

- usが一番安い
  - コンプライアンスとレイテンシの問題だけ

### AWSのSAによるW-A個別相談会

毎週行っている

### Well-Architected tool

ツールでセルフレビューできるツール。無料で使えるし、ベストプラクティスの説明動画、ドキュメントへのリンクも表示する

46項目の質問にセルフサービス方式で回答していくことで、ワークロードの改善点やリスクに気づくことができる

レビュー結果をPDF形式で出力可能

[質問の参考日本語訳](https://d1.awsstatic.com/webinars/jp/pdf/services/Well-Architected_review_sheet_201811.f5f4c1ad817180c658c2c20feb729d13c156940f.xlsx)

### レビュー

- 関係者全員が参加してやってね
- 継続的にやってね
- 運用中もやってね
  - 定期健康診断のイメージ

## Reference
- [【AWS Black Belt Online Seminar】AWS Well-Architected Framework - YouTube](https://www.youtube.com/watch?v=jMJFFo1Oybo&list=PLzWGOASvSx6FIwIC2X1nObr1KcMCBBlqY&index=39&t=0s)
- [AWS Black Belt Online Seminar 2018 AWS Well-Architected Framework](https://www.slideshare.net/AmazonWebServicesJapan/aws-black-belt-online-seminar-2018-aws-wellarchitected-framework)