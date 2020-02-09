# du

ディスクやディレクトリの使用容量を調べる(Linux)


## 基本パターン

    du

## 特定のディレクトリ内合計サイズ

    du -sh <directory_path>

-s … サブディレクトリも含めたサイズ -h … 人間がわかりやすい、サイズ表記（5M）とかにする

## 特定のサブディレクトリの合計サイズ

    find <directory_path> -maxdepth 1 -type d -exec du -sh {} \;

`-maxdepth` … サブディレクトリの階層