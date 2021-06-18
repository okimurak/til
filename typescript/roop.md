# ループ

## `for await of`

ES2018 で導入。ループ毎に非同期の待ち処理を入れる必要がある。
が、 `ReadableStream` くらいしかサポートしていない。(asyncIterator に対応している必要がある)

```typescript
for await (const body of response.body) {
  console.log(body)
}
```

- 並行して処理を投げる場合には、`Promise.all()` を使う
- `for await of` は同期的な処理で使おう。
