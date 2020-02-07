# tee

標準入力を標準出力とファイルに出力コマンド  
実行したコマンドに対して、パイプで繋げて使う

```
sh hogehoge.sh | tee hogehoge_output.txt
```

## オプション
```
-a, --append ファイル上書き禁止
-i --ignore-interruputs 割り込み禁止
```

### 複数のファイルに出したい時

単純に複数ファイル指定すれば良い
```
telnet hogehoge.co.jp | tee telnet.log telnet_backup.log
```

### 標準エラー出力も出す

パイプする側で標準エラー出力するようにする

```
telnet hogehoge.co.jp 2>&1 | tee telnet.log
```