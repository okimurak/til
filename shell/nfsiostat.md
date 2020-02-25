# nfsiostat

NFSの統計情報を `/proc/self/mountstats` から集計する

## Execute

```
nfsiostat <interval> <count> <options> <mount_point>
```

## Option

- `-a` ... 属性キャッシュに関連する統計表示
- `-d` ... ディレクトリに関連する統計表示
- `-s` ... NFSマウントポイントを、ops / s でソートする

## Source

[git.linux-nfs.org Git - steved/nfs-utils.git/blob - tools/nfs-iostat/nfs-iostat.py](http://git.linux-nfs.org/?p=steved/nfs-utils.git;a=blob;f=tools/nfs-iostat/nfs-iostat.py;h=b7e98a2a2fb1e4044b80cb7e7bb9b5ed0903bf83;hb=HEAD)

## Reference
[nfsiostat(8) - Linux manual page](http://man7.org/linux/man-pages/man8/nfsiostat.8.html)