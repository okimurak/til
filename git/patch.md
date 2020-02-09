# Patch

あまりやることはないけど、gitの情報からパッチを作成できる

## 作成方法
```
git diff > diff.patch
```

## patchの適用方法

```
patch -p1 < diff.patch
```

## 参考

- [Git で変更を patch ファイルにする / patch コマンドで適用する \- Qiita](https://qiita.com/sea_mountain/items/7d9c812e68a26bd1a292)