# Fluentdのinstall

Fluentdか td-agent のインストールすることになる

td-agent v3が安定板
[td-agent-v3-is-now-stable-version](https://docs.fluentd.org/quickstart/td-agent-v2-vs-v3)

### 事前確認

[Before Installation - Fluentd](https://docs.fluentd.org/installation/before-install)

### NTP

NTPしてないなら設定する

### Ulimit

    # 同時に開けるファイル限界数を調べる
    hogehoge ~: ulimit -n
    65536  # これでOK

[【 ulimit 】コマンド――ユーザーが使用できるリソースを制限する：Linux基本コマンドTips（326） - ＠IT](https://www.atmarkit.co.jp/ait/articles/1908/01/news031.html)

### Optimize Network Kernel Parameters

たくさんFluentdインスタンスを立てる場合には設定するらしいけど、今回は1つなのでパス

### インストール

[Install by RPM Package (Redhat Linux) - Fluentd](https://docs.fluentd.org/installation/install-by-rpm)

    # Amazon Linux 1
    sudo yum install http://packages.treasuredata.com.s3.amazonaws.com/3/amazon/1/2017.09/x86_64/td-agent-3.1.1-0.el2017_09.x86_64.rpm
    
    sudo /etc/init.d/td-agent start
    td-agent td-agent:                                         [  OK  ]

以下は格闘経緯

    # Amazon Linux 2
    $ curl -L https://toolbelt.treasuredata.com/sh/install-amazon2-td-agent3.sh | sh
    ## 起動確認 (systemctlなかったわ)
    sudo /etc/init.d/td-agent start
    sudo /etc/init.d/td-agent status
    
    hogehoge ~: sudo /etc/init.d/td-agent start
    Starting td-agent: /opt/td-agent/embedded/bin/ruby: /lib64/libc.so.6: version `GLIBC_2.25' not found (required by /opt/td-agent/embedded/lib/libruby.so.2.4)
    
    ## ねぇのかよ！
    
    ldd --version
    ldd (GNU libc) 2.17
    Copyright (C) 2012 Free Software Foundation, Inc.
    This is free software; see the source for copying conditions.  There is NO
    warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
    作者 Roland McGrath および Ulrich Drepper。
    
    ## 古いじゃないか
    
    yum update glibc
    
    ## 更新してもダメ
    ## 以下見るとインストール先が異なるので再インストール
    
    https://support.treasuredata.com/hc/en-us/articles/360000687108-Overview-of-Server-Side-Agent-td-agent-
    
    curl -L https://toolbelt.treasuredata.com/sh/install-amazon1-td-agent3.sh | sh
    Downloading packages:
    td-agent-3.5.0-0.amazon2.x86_6 FAILED
    http://packages.treasuredata.com/3/amazon/1/latest/x86_64/td-agent-3.5.0-0.amazon2.x86_64.rpm: [Errno 14] HTTP Error 404 - Not Found |    0 B  --:--:-- ETA
    他のミラーを試します。
    To address this issue please refer to the below knowledge base article
    
    https://access.redhat.com/articles/1320623
    
    If above article doesnt help to resolve this issue please open a ticket with Red Hat Support.
    
    
    
    Error downloading packages:
      td-agent-3.5.0-0.amazon2.x86_64: [Errno 256] No more mirrors to try.
    
    
    # 404かよ！
    # 調べると
    # https://qiita.com/mzdakr/items/4d6a3fb714bedfbfd0cb
    # どうやら、amazonの2017.03以降しか公式サポートしてない
    # また、AMIから $relasever といった変数を使っているので、うまくリンク作れないみたい
    # https://support.treasuredata.com/hc/en-us/articles/360010821214-Installing-td-agent-on-Amazon-Linux-
    
    # ということで
    sudo yum install http://packages.treasuredata.com.s3.amazonaws.com/3/amazon/1/2017.09/x86_64/td-agent-3.1.1-0.el2017_09.x86_64.rpm
    sudo /etc/init.d/td-agent start
    td-agent td-agent:                                         [  OK  ]
    
    # 起動確認まではOK

### ログの入出力確認

    $ curl -X POST -d 'json={"json":"message"}' http://localhost:8888/debug.test
    
    cat /var/log/td-agent/td-agent.log # デフォルトだとここに出る

### CloudWatchPluginのインストール (output plugin)

[Plugin Management - Fluentd](https://docs.fluentd.org/deployment/plugin-management)

[fluent-plugins-nursery/fluent-plugin-cloudwatch-logs: CloudWatch Logs Plugin for Fluentd](https://github.com/fluent-plugins-nursery/fluent-plugin-cloudwatch-logs)

    ## td-agent使ってるなら、専用コマンドをつかってインストール（gemだけだと、認識できない）
    ## td-agent-gemはgemのtd-agentラッパー
    sudo td-agent-gem install fluent-plugin-cloudwatch-logs


## Option

- [Command Line Option](https://docs.fluentd.org/deployment/command-line-option)