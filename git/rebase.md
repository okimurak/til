# rebase

コミットを様々に編集できる

## 別のブランチを取り込む

masterブランチの内容を取り込む場合

```
git rebase master
```

今編集しているコミット以前にmasterブランチのコミット内容を反映される


## 過去のコミットを操作する

```
git rebase -i HEAD~<数字> # 今のコミットからどれだけさかのぼって編集するか
```

この後にエディタが開く

    pick test commmit2 5f227d1ac3cfde5ec37d93af8e1e8376a4867a35
    pick test commmit1 910135430fdabb93112413c8854f9c446bca0c6d

## 過去のコミットで編集する (edit)

- commit1を編集する場合は pickをeにする。

    pick test commmit2 5f227d1ac3cfde5ec37d93af8e1e8376a4867a35
    e test commmit1 910135430fdabb93112413c8854f9c446bca0c6d

- ファイルを編集
- `git commit --amend`で保存
- `git rebase --continue`でrebaseを確定


## コミットをまとめる (Squash)

- 上記の例で、commit1を2に場合

    pick test commmit2 5f227d1ac3cfde5ec37d93af8e1e8376a4867a35
    s test commmit1 910135430fdabb93112413c8854f9c446bca0c6d
    

- エディタが開くのでコミットメッセージを編集

## Push

過去のコミットを編集していたら`force push`してね（コワイ）

## 参考
- [Git \- リベース](https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E3%83%96%E3%83%A9%E3%83%B3%E3%83%81%E6%A9%9F%E8%83%BD-%E3%83%AA%E3%83%99%E3%83%BC%E3%82%B9)
- [rebase \-i でコミットをまとめる \- Qiita](https://qiita.com/takke/items/3400b55becfd72769214)