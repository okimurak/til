# 別のリポジトリの内容を取り込む

取り込み元のリポジトリを A, 取り込み先リポジトリを B とする。

```bash
git --version
git version 2.25.
```

1. B を A のリモートに追加

```bash
cd <A のパス>

git remote add b_repo <B のリポジトリパス(URL など)>
```

2. B の内容を fetch

```bash
git fetch b_repo
```

3. リポジトリの内容を merge する。

```bash
git merge --allow-unrelated-histories b_repo/master

## merge 先のディレクトリを指定する場合は、-X subtree を使う
git merge -X subtree=<merge 先のディレクトリパス> --allow-unrelated-histories b_repo/master
```

コミットログも移行場合は、地道に B から cherry-pick をするしかなさそう。

## 参考

- [Git 別のリポジトリを履歴を残したまま取り込みたい - かもメモ](https://chaika.hatenablog.com/entry/2015/06/04/173401)
- [Git で複数のリポジトリをまとめたり、逆に切り出したりする - Qiita](https://qiita.com/uasi/items/77d41698630fef012f82)
- [別の Git リポジトリの内容を強引にマージする - まくまくGitノート](https://maku77.github.io/git/merge/merge-repo.html)
