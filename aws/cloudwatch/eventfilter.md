# CloudWatchLogsのログ検索

- ログ内容(message)の文字列について、部分一致で検索する場合 (例えば"query"を含むログ)
  - *がワイルドカードになる

```
{$.message = "*query*"}
```
- 重要度(level_name)がINFOだけ検索する

```
{$.level_name = "INFO"}
```

# 参考
- [ロググループとログストリームを操作する - Amazon CloudWatch Logs](https://docs.aws.amazon.com/ja_jp/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html)
- [ログデータの検索およびフィルタリング - Amazon CloudWatch Logs](https://docs.aws.amazon.com/ja_jp/AmazonCloudWatch/latest/logs/MonitoringLogData.html)