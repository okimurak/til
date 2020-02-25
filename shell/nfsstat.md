# nfsstat

NFS、RPCの統計情報を表示する
統計情報は主にコマンドを送信した回数

## Path

`/usr/sbin/nfsstat`

## Option

- `-s` ... サーバ統計のみを表示
- `-c` ... クライアント統計飲み表示
- `-n` ... NFSの統計のみ表示
- `-r` ... RPCの統計のみ表示
- `-o` ... Factroyの統計を表示
   - `nfs` ... NFSのみ, `-n`と一緒
   - `rpc` ... RPC情報, `-r`と一緒
   - `net` ... ネットワーク層の統計
   - `fh`
   - `rc`

### File

統計情報は下記に保存

```
/proc/net/rpc/nfsd
procfs ベースの kernel NFS サーバ統計へのインターフェース。

/proc/net/rpc/nfs
procfs ベースの kernel NFS クライアント統計へのインターフェース。
```

procfsとは、プロセスとカーネル情報にアクセスするための擬似ファイル  
[procfs - Wikipedia](https://ja.wikipedia.org/wiki/Procfs)

## Reference

- [Ubuntu Manpage: nfsstat - NFS の統計情報を表示する](http://manpages.ubuntu.com/manpages/bionic/ja/man8/nfsstat.8.html)
- [NFS バージョン 2 と 3 について](https://docs.oracle.com/cd/E19620-01/805-5656/6j5bcoqg9/index.html)