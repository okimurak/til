# submodule

別の Git リポジトリを子リポジトリとして追加できる。

```bash
git submodule add <リポジトリの URI>
```

そうすると、`.gitmodules` ファイルが作成される。

```bash
git submodule add ../hogehoge
Cloning into 'hogehoge'...
remote: Enumerating objects: 3, done.
remote: Counting objects: 100% (3/3), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
Receiving objects: 100% (3/3), done.

ls -al
total 32
drwxr-xr-x   9 okimurak  staff  288  7  8 11:39 ./
drwxr-xr-x   3 okimurak  staff   96  7  8 11:37 ../
drwxr-xr-x  14 okimurak  staff  448  7  8 11:40 .git/
drwxr-xr-x   3 okimurak  staff   96  7  8 11:37 .github/
-rw-r--r--   1 okimurak  staff  117  7  8 11:39 .gitmodules
-rw-r--r--   1 okimurak  staff   99  7  8 11:37 README.md
drwxr-xr-x   4 okimurak  staff  128  7  8 11:39 hogehoge/

-rw-r--r--   1 okimurak  staff   54  7  8 11:37 test.txt

ls -al hogehoge
total 16
drwxr-xr-x  4 okimurak  staff  128  7  8 11:39 ./
drwxr-xr-x  9 okimurak  staff  288  7  8 11:39 ../
-rw-r--r--  1 okimurak  staff   44  7  8 11:39 .git
-rw-r--r--  1 okimurak  staff   42  7  8 11:39 README.md

cat .gitmodules
[submodule "hogehoge"]
        path = case-test-submodule
        url = ../hogehoge
```
