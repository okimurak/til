# カスタムメトリック
プラグインを作ることになる

- 設定ファイルに下記を記載

```
[plugin.metrics.vmstat]
command = ["実行コマンド"]
user = "SOME_USER_NAME" # optional
custom_identifier = "SOME_IDENTIFIER" # optional
include_pattern = 'cpu' # optional
exclude_pattern = 'waiting$' # optional
timeout_seconds = 45 # optional
env = { SAMPLE_KEY = "VALUE" } # optional
```

commandによるプログラムの出力形式

```
# mackerel-agent-plugin
{
  "graphs": {
    {graph}: {
      "label": GRAPH_LABEL,
      "unit": UNIT_TYPE
      "metrics": [
        {
          "name": METRIC_NAME,
          "label": METRIC_LABEL
        },
        ...
      ]
    },
    GRAPH_NAME: <Value>
  }
}
…
```

```
# Value
{metric name}\t{metric value}\t{epoch seconds}
```

## シェル芸でなんとかできないかな

Valueの形式守れって標準出力すればいいみたい

```
echo <metrics>
```

## 参考

- [ホストのカスタムメトリックを投稿する - Mackerel ヘルプ](https://mackerel.io/ja/docs/entry/advanced/custom-metrics)
- [mysql へのSelectクエリの結果をMackerelに投稿したい - koudenpaのブログ](https://koudenpa.hatenablog.com/entry/2018/04/17/013138)