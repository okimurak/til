# pyenv

[pyenv](https://midsatoh.github.io/python/install/pyenv/)とは、pythonのバージョンを切り替えられるツール

ただ、今ならDocker使って、専用の環境作ったほうがいい(VSCodeでリモートできるし)

## Install

    ## brewから
    brew install pyenv

    # インストールできる一覧
    pyenv install -l

    # インストール
    pyenv isntall <version>

    # 使うpythonのバージョンを確定する
    pyenv local <version>

## 使い方

```
# 今インストールしているバージョンを表示
pyenv versions
```

バージョンを切り替えるときは、今いるディレクトリだけ(`local`)か全体(`global`)かを指定する

```
pyenv local 3.5.0
pyenv global 3.3.0
```
