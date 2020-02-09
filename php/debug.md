# Debug

## Debuger

XDebugが有名。VSCodeと連携可能

### Install

```
pecl install xdebug
```

### VSCodeとの連携

Docker + PHP + xdebug環境にVSCodeでデバッグする

#### Create Dockerfile

```
FROM php:7.0-apache
RUN apt-get update \
&& apt-get -y install git apt-utils \
&& docker-php-ext-install pdo_mysql mysqli mbstring \
&& pecl install xdebug
:
# for Xdebug
COPY zend.ini  /usr/local/etc/php/conf.d/zend.ini
```

記述からわかるように、`zend.ini`を`Dockerfile`と同じディレクトリに配置する

**zend.ini**
```
zend_extension=/usr/local/lib/php/extensions/no-debug-non-zts-20151012/xdebug.so

[XDebug]
xdebug.remote_autostart=1
xdebug.remote_enable=1
xdebug.remote_host=<Local IP>
xdebug.remote_port=9001
xdebug.remote_log=/tmp/xdebug.log
xdebug.remote_mode=req
xdebug.idekey=xdebug
xdebug.remote_handler=dbgp
```

#### Run Docker Container

```
docker build
docker run -p 80:80 -d www
```

#### Configure VSCode

`launch.json`に以下を追記する

```
{
    "version": "0.2.0",
    "configurations": [

        {
            "name": "xdebug1", #何でもいい
            "type": "php",
            "request": "launch",
            "port": 9001,
            "pathMappings": {
                "/var/www/html": "${workspaceFolder}\\www\\html" 
            }
        }
    ]
}
```

## function

**var_dump($変数)**

... 標準出力に配列形式＋型を出力。文字列で返さないので以下の工夫が必要

    ob_start(); # 配列をダンプ
    var_dump($array); # バッファの内容を変数に代入
    $content = ob_get_contents();
    ob_end_clean(); # バッファリングの終了
    error_log($content,3,'./debug.txt'); # 出力

**var_export($変数, $outputFlag)**
... 変数（配列も）をPHP形式で出力 $outputFlagをTRUEにすると文字列で返す。
    
**print_r($変数, $outputFlag))***
... 変数（配列も）を配列形式で出力 $outputFlagをTRUEにすると文字列で返す。

### 参考
- [Linux \( docker \(PHP \+ Apache \+ Xdebug \) \)&lt;\-&gt; Windows \+ VS Code メモ \- Qiita](https://qiita.com/kabayan/items/dd12dec3d329841705ea)
- [var_dump、var_export、print_r、デバッグ時に使うのがベストなのはどれ！？ - Qiita](https://qiita.com/awesam86/items/1103079594fefc8e9f3f)