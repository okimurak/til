# Command

## Images

pullやビルドして、保持しているイメージの一覧を表示

```bash
docker images　
```

## Pull

Dockerリポジトリからイメージをダウンロードする
リポジトリ先は`docker login`している先になる(基本はDocker Hub, コマンドで変更することも可能:AWS ECRとか)

```bash
docker pull
```

## Run

イメージからコンテナを起動する

```bash
docker run -h <ホスト名> -name <起動するコンテナ名> -i <標準出力の開放> -t <標準入力を出力に>  -d バックグラウンド起動  <イメージ名>
```

```bash
docker run -h hhvm -it hhvm/hhvm /bin/bash
```

他のオプション
- `-m` メモリを指定する 単位はb,k,m,g
- `-e` 環境変数を設定
- `-p <port num>:<port num>` ポート指定 ホストが受ける方:コンテナで受けている方(8080:9000)と指定
- `--rm` 終了したらコンテナを削除する。これを指定しないとコンテナは削除されない（再利用する場合にはいいけど）

## PS

イメージの実行状態確認。普通に別のツール([lazydocker](https://github.com/jesseduffield/lazydocker))使ったほうがいい

```bash
docker ps -a 
```

## Stop

コンテナ停止

```bash
docker stop <コンテナID>
```

## Remove

停止したコンテナ、ボリューム、ネットワーク、イメージを削除。これが一番便利

```bash
docker system prune
```

コンテナの削除

```bash
docker rm <コンテナID>
```

イメージの削除

```bash
docker rmi <イメージ名>
```

ボリュームの削除

```bash
docker volume prune
```

exitやterminateのコンテナを全て削除

```bash
docker container prune 
```

imageの<none>を全て削除

```bash
docker image prune 
```

## inspect

コンテナやイメージの状態を確認できる。

```bash
docker inspect <コンテナ ID or イメージ名>
```

`-f` で取得した結果を整形できる。

```bash
# PID を取得する
docker inspect -f '{{.State.Pid}}' <コンテナ ID>
```

## df

コンテナやイメージ、ボリュームのサイズとかを参照できる

```bash
docker system df

TYPE                TOTAL               ACTIVE              SIZE                RECLAIMABLE
Images              1                   0                   1.84kB              1.84kB (100%)
Containers          0                   0                   0B                  0B
Local Volumes       0                   0                   0B                  0B
Build Cache                                                 0B                  0B
```

## Connect container

```bash
docker attach <コンテナ名>
```

attach は exit で抜けると終了してしまう

```bash
docker exec -it <コンテナ名>
```

exec は exit で抜けても終了しない

## Create image from started container

起動したコンテナからイメージを作成

```bash
docker commit <sha1> <新規のイメージ名> 
```

## Copy file

コンテナからホスト

```bash
docker cp <コンテナID>:/<ローカルのコピー先パス>
```

ホストからコンテナ(1.8移行)

```
docker cp <ローカルのコピー元ファイルパス> <コンテナID>:<コンテナのコピー先ファイルパス>
```

## 参考

- [(初心者向け)Dockerの使い方 - Qiita](https://qiita.com/butada/items/3e6cd338cb703eef64b4)
- [【入門】Dockerとは？使い方と基本コマンドを分かりやすく解説します | カゴヤのサーバー研究室](https://www.kagoya.jp/howto/rentalserver/docker/)
- [Dockerでホストとコンテナ間でのファイルコピー - Qiita](https://qiita.com/gologo13/items/7e4e404af80377b48fd5)
- [Dockerの不要なコンテナ・イメージを一括削除する方法](https://suin.io/537)
