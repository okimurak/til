# 並列実行

並列して実行するためには

## コンテナの並列レベルを設定する

```
version: 2
jobs:
  test:
    docker:
      - image: circleci/ruby:2.2
    parallelism: 2
```

並列で実行できるようになりましたが、このままだと同じジョブを実行するだけになる  
例えば、テストを並列実行したいときには、意味ないので

### ファイルを分割する

コンテナ毎にファイルを分割する。(`Circle CI-CLI`が必要)

`glob`でファイル名のパターンマッチングを行い、その結果を `split`コマンドで分割して環境変数として保存。  
それらを引数にテストを実行します。  
`--split-by=timings`はテスト結果を表示するTest Summaryを使う場合には必要です。

```
TESTFILES=$(circleci tests glob "spec/**/*.rb" | circleci tests split --split-by=timings)
    bundle exec rspec -- ${TESTFILES}
```

### コンテナの番号を使って並列化

並列実行すると、`$CIRCLE_NODE_INDEX`という現在実行しているコンテナのインデックスを保持した環境変数が作られる。  
ファイル名での分割ではうまくいかないときは、これを元に、コンテナの担当を決める

下記例では、`コンテナ0`はgroupがJAPANのテストを実行し それ以外はgroupがUSAのテストを実行します。 この場合は、テスト結果もgroup毎に分けるといいと思います。

    GROUP=USA
    if [ $CIRCLE_NODE_INDEX = 0 ] ; then
       GROUP=Japan
    fi
    
    phpunit --group ${GROUP} --log-junit ./result/${GROUP}-logfile.xml


## 参考

- [テストの並列実行 - Circle CI](https://circleci.com/docs/ja/2.0/parallelism-faster-jobs/)