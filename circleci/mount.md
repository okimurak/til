## Volume mount on Docker on CircleCI


以下は使えない
```
docker run -v ./output:/output schemaspy/schemaspy:shapshot
# ls outputしても出力結果が見えない
```

volumes-fromを使ってつなぐ

```
docker create -v /output –name output alphine:3.4 /bin/true # volume用のコンテナを作成
docker run –volumes-from output schemaspy/schemaspy:shapshot -rails docker cp output:/output .
```