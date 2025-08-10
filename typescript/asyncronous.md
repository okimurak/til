# 非同期処理

## コールバックから Promise、 await

非同期処理を実現するために、最初はコールバックだった。ネスト地獄。

```typescript
func1(param, function(err, value) {
  if (err) return err;
  func2(param, function(err, value) {
    if (err) return err;
    ....
  });
});
```

次に `Promise` が出た。今でも使わている書き方で、ネストせず、チェインで書くことができる。

```typescript
fetch(url)
  .then((resp) => {
    return resp.json()
  })
  .then((json) => {
    console.log(json)
  })
  .catch((e) => {
    // エラー発生時の処理
  })
  .finally(() => {
    // 最後にかならず実行する処理 ES2018 で実装
  })
```

その後、 `await` が出た。`Promise` の糖衣構文。

```typescript
// async 関数の中での有効
const resp = await fetch(url)
const json = await resp.json()
console.log(json)
```

`async` を返す関数の返り値は必ず `Promise` になるので、ジェネリクスの方として返り値の型を設定しよう。

```typescript
// 関数定義
async function(): Promise<number> {
  await // 時間かかる処理();
  return 10;
}
```

コールバック関数方式のコードを扱う場合には、`Promise` インスタンス化すること。

```typescript
const sleep = async (time: number): Promise<number> => {
  return new Promise<numbser>((resolve) => {
    setTimeout(() => {
      resolve(time)
    }, time)
  })
}

await sleep(100)
```

拒否したいときは `throw` を使えばいい

```typescript
async function requestReject(): Promise<number> {
  throw new Error('error);
}
```

## Promise.all()

すべての Promise が完了するのを待つという処理ができる。

```typescript
async function hoge(): Promise<string> {
  await innerHoge()
  return new Hoge()
}

async function fuga(): Promise<string> {
  await innerFuga()
  return new Fuga()
}

// すべての結果が出るのを待つ
const [answerHoge, answerFuga] = await Promise.all([hoge(), fuga()])
```

### ループの Promise.all()

以下だと、ループ内で `await` する処理があるので、処理時間がかかる可能性。

```typescript
for (const value of iterable) {
  await doSomething(value) // ここの処理時間に依存する
}
```

この `for` の処理を並列で行って良いならば、`Promise.all()` を使えば、要素の中で最も遅い処理だけ待てばすべての処理が終わる。

```typescript
await Promise.all(iterable.map(async (value) => doSomething(value)))
```

もし外部 API 呼び出しに使う場合は、秒間のアクセス数が制限されるので、並列数を制御しつつ `map()` と同等のことを実現してくれる [`p-map`](https://www.npmjs.com/package/p-map) というライブラリが便利。

## Promise.allSettled()

Promise の結果が履行、拒否されるにかかわらず、待ち受ける。ES2020 で追加。

戻り値はユニオン型で返却される。

```typescript
function request1(): Promise<number> {
  return Promise.resolve(1);
}

function request2(): Promise<number> {
  return Promise.reject(new Error("Failed"));
}

Promise.allSettled([request1(), request2()]).then((values) =>{
  console.log(values);
  // { status: "fulfilled", value: 1}, { status: "rejected", reason: {}}
})
```


## Promise.race()

最初に返却された Promise を返す。

```typescript
function request1(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 4000)
  });
}

function request2(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 2000)
  });
}

function request3(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      reject(new Error("Failed"))
    }, 1000)
  });
}


Promise.race([request1(), request2(), request3()]).then((num) =>{
  console.log(num);
}).catch((e) => {
  console.log(e.message);
}

// Failed
// 最初に解決するのは request3. ただし、reject なので catch 文で出力される。
```

## Promise の状態

以下の 4 つ

- pending : 待機中
- fulfilled : 履行。例外なく処理されたということ。
- rejected : 拒否
- settled : 決定。fulfilled or rejected で何かしら値が決まったということ。


## 非同期で繰り返し呼ばれる処理

`async` / `await` はワンショットで終わるイベント処理向け。繰り返し行われるイベント処理(`addEventLitener()` を使うようなスクロールイベントなど) は引き続きコールバック関数を登録して使う。これをモダンにしようという動きに、[RxJS](https://rxjs-dev.firebaseapp.com/guide/overview) がある。

## 参考

- [非同期処理 — 仕事ですぐに使える TypeScript ドキュメント](https://future-architect.github.io/typescript-guide/async.html)
- [Promise<T> | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/asynchronous/promise)
- [async | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/asynchronous/async)
- [await | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/asynchronous/await)
