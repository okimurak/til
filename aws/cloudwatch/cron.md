# CloudWatchEventにおけるcronによるタスクスケジューリング

CloudWatchEventにはタスクスケジュールの機能があり、cron式が使える

## cron式

Unixのcron設定と同様  
`Month` と `Day-of-month`は共存できない

Name|Configure Value|Wildcards
-|-|-
Minutes|0-59|, - * /
Hours|0-23|, - * /
Day-of-month|1-31|, - * ? / L W/
Month|1-12 or JAN-DEC|, - * /
Day-of-week|1-7 or SUN-SAT|, - * ? L #
Year|1970-2199|, - * /


## 参考
- [Schedule Expressions for Rules](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html)

- [タスクのスケジューリング (cron)](https://docs.aws.amazon.com/ja_jp/AmazonECS/latest/developerguide/scheduled_tasks.html)

- [AWS CLI を使用したスケジュールされたタスクの作成](https://docs.aws.amazon.com/ja_jp/AmazonECS/latest/developerguide/scheduled_tasks_cli_tutorial.html)