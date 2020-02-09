# Config

[Config File Syntax - Fluentd](https://docs.fluentd.org/configuration/config-file)

    # ここにある
    /etc/td-agent/td-agent.conf

設定はXMLみたいに書く

各設定によるログの流れはだいたい下記の通りになる

source(input) → filter 1 → ... → filter N -> match(output)

## source

    # 以下は設定例
    <source>  # 入力部分の設定
      @type tail  # 必ずtypeをつける(input pluginを指定する)
      format none
      path /var/log/test.log
      pos_file /var/log/test.log.pos
      tag /var/log/test.log
    </source> 

## filter

filterはチェインできる

[https://docs.fluentd.org/filter](https://docs.fluentd.org/filter)

    <filter myapp.access> # フィルタ部分の設定　整形とかはここに
      @type record_transformer # filter pluginを設定する
      <record>
        host_param "#{Socket.gethostname}"
      </record>
    </filter>

## match

一般的に出力に相当する

    <match **.log> # 出力部分の設定 後ろがログ名
      @type cloudwatch_logs # output pluginを設定する
      log_group_name test
      auto_create_stream true
      use_tag_as_stream true
    </match>

## system

ログレベルとかを定義する

プロセス名も変えられる

## label

内部ルーティングをグループ化する

## @include

他のconfを読み込む

絶対相対パス、glob, URLに対応している

## ワイルドカード

ファイル名のワイルドカードは注意が必要

例えば、a.*は*の部分が1文字しか対応しない

aやa.b.cはマッチしない

なので、a.**と書く必要がある

また、**と書く場合は、順番に気をつける

[https://docs.fluentd.org/configuration/config-file#wildcards-and-expansions](https://docs.fluentd.org/configuration/config-file#wildcards-and-expansions)

## Ruby

rubyのコード埋め込みも対応している

## エスケープ

[https://docs.fluentd.org/configuration/config-file#in-double-quoted-string-literal-is-escape-character](https://docs.fluentd.org/configuration/config-file#in-double-quoted-string-literal-is-escape-character)

## confのチェック

    fluentd --dry-run -c AA.conf
    /opt/td-agent/usr/sbin/td-agent --dry-run -c AA.conf

## CloudWatchLogsプラグインのconfig

[https://github.com/fluent-plugins-nursery/fluent-plugin-cloudwatch-logs#configuration](https://github.com/fluent-plugins-nursery/fluent-plugin-cloudwatch-logs#configuration)

## 記述例

    <source>
      @type forward
      format none
    </source>
    
    
    # 各ログごとにmatch句作って、フィルタごとに流す
    # APIとUI分けないといけないね。。。
    <match api.fluent>
      @type cloudwatch_logs
      log_group_name api_default
      use_tag_as_stream true
    </match>
    
    <match api_user_access.fluent>
      @type cloudwatch_logs
      log_group_name api_user_access
      use_tag_as_stream true
    </match>
    
    <match ui.fluent>
      @type cloudwatch_logs
      log_group_name api
      use_tag_as_stream true
    </match>
    
    <match ui_user_access.fluent>
      @type cloudwatch_logs
      log_group_name ui_user_access
      use_tag_as_stream true
    </match>
    
    <match sendmail.fluent>
      @type cloudwatch_logs
      log_group_name api_sendmail
      use_tag_as_stream true
    </match>
    
    <match update_daily_impression.fluent>
      @type cloudwatch_logs
      log_group_name batch_update_daily_impression
      use_tag_as_stream true
    </match>
    
    <match update_y1_placements.fluent>
      @type cloudwatch_logs
      log_group_name batch_update_y1_placements
      use_tag_as_stream true
    </match>
    
    <match update_segment_uu.fluent>
      @type cloudwatch_logs
      log_group_name batch_update_segment_uu
      use_tag_as_stream true
    </match>
