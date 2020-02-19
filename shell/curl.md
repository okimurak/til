# cURL

For transfering data with URLs tool.

- [Official](https://curl.haxx.se/)

## Specitify TLS version.

```
curl -s -b --tlsv<TLSversion> <URL> > /dev/null

<TLSversion> ... TLS Version 1.0 or 1.1 or 1.2
```

## Reference
- [cURL, OpenSSLコマンドでTLSのバージョンを指定する方法 - Qiita](https://qiita.com/Esfahan/items/53399964cb76cdb87e60)