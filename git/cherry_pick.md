# Cherry Pick

コミットの付替えができるコマンド
付け替え後のコミットハッシュは付替前から異なるので注意（コピーされるイメージだね）

```
# 1個
git cherry-pick <commit id>
# 複数（繋がっていることが条件）
git cherry-pick <start commit id>..<end commit id>
```