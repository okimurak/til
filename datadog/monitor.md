# datadog monitor

様々なリソースを監視して、アクションを起こせる。

アクション例：EC2 インスタンスの再起動、Slack 通知。

## メトリクスモニター

名の通り、メトリクスの値とユーザ定義の値を比較して、アクションを行う。

検出方法は下記 5 種類
- Threshold (しきい値)
- Change (変化)
- Anomaly (異常値検知)
- Outliers (外れ値検知)
- Forecast (予測値)

## Terraform

- [datadog_monitor | Resources | DataDog/datadog | Terraform Registry](https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor)

## 参考
- [モニター](https://docs.datadoghq.com/ja/monitors/monitor_types/)
