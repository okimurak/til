# gitignore

## 自動生成してくれるツール

[gitignore\.io](https://www.gitignore.io/)を使う

## 後からまとめてignoreしたいとき

コミット後にgitignoreを編集したので、後からまとめてignore死体ケースがある
gitignoreに追加した後に、以下を実行


```
git rm --cached
git ls-files --full-name -i exclude-from=.gitignore
```

## 参考

- [あとからまとめて\.gitignoreする方法 \- Qiita](https://qiita.com/yuuAn/items/b1d1df2e810fd6b92574)