# Cronの書き方

Linuxにおいてプロセスをスケジューリング実行できる機構のこと

## 基本構造

    # 分 時 日 月 曜日 処理  と書く
    *  *  *  *  *  test.sh
    
    # 毎月1日の0時0分の場合
    0  0  1  *  *  test.sh
    
    # 毎日月曜１２時の場合
    *  13  *  *  1  test.sh
    
    # 2時間に1回
    0  */2  *  *  1  * 2jikan.sh  
    
    # 9月、11月-12月の１日12時0分の場合
    # ハイフンで範囲指定できる
    # カンマで複数の指定ができる
    0  12  1  9,11-12  *  test.sh

## Cronの実行調査

[crontabを設定しても実行されない時の確認ポイント](https://gist.github.com/koudaiii/49ac3f8b7c207f0da31f#file-gistfile1-md)

## 参考

- [crontabで第？曜日にタスクを実行する方法 - ソフラボの技術ブログ](http://shinsuke789.hatenablog.jp/entry/2015/08/07/123000)

## ツール
- [CRON tester](http://cron.schlitt.info/)