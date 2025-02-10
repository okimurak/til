# alphine ベースのタイムゾーン変更

以下を追加する

```dockerfile
    RUN apk add --update --no-cache tzdata && \
        cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
        echo "Asia/Tokyo" > /etc/timezone && \
        apk del tzdata
```

## 参考

- [Alpine Linux で timezone を変更する（最新版？） - Qiita](https://qiita.com/yukin01/items/dff2c68b15b9ddf6c070)
- [docker alpineイメージでtimezoneをAsia/Tokyoに設定する - モヒカンは正義](https://blog.pinkumohikan.com/entry/set-timezone-to-asia-tokyo-on-docker-alpine-linux)
