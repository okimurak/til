# 複合型

## 配列

[]で表現する。

```typescript
const buttleType: string[] = ["火", "水", "草"]
const divs = ["tig", "sig"] // 後ろの型が明確なら省略可能
```

### タプル

配列の要素ごとに型が違う配列。~~名前でインデックスにアクセスできない~~ので、あまり使うことはないだろう。

```typescript
const product: [number, string] = [1, "Apple pen"]
```

下記のようにインデックスでアクセスできる。

```typescript
const tuple: [string, number] = ["hello", 20];

// hello
console.log(tuple[0]);
// 20
console.log(tuple[1]);

// 複数の値を返したいとき便利
// 以下だと直列処理になる(3s + 5s = 8s)
const str: string = await takes3Seconds();
const num: number = await takes5Seconds();

// 以下のように並列で処理したいときに使える
const tuple: [string, number] = await Promise.all([
  takes3Seconds();
  takes5Seconds();
])
```

[タプル (tuple) | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/values-types-variables/tuple)

### 分割代入

残余(Rest)構文(`...`)を使う。

```typescript
const buttleType: string[] = ["火", "水", "草"]
const [fire, water, grass] = buttleType // それぞれの変数に展開できる
```

### 要素の存在チェック

`include()` を使おう。

### 配列の加工

スプレッド構文を使うと、標準文法の範囲内で加工ができる。

```typescript
const oldTypes = ["火", "水", "草"]
const newTypes = ["悪", "鋼", "フェアリー"]

// 旧: 3番目要素を削除して1つの要素を追加、その後配列を結合
// 関数使わないと無理だった。
oldTypes.splice(2, 1, "氷")
var allTypes = oldTypes.concat(newTypes)

// 新: スプレッド構文を使うと、関数を使わずにできる(しかも元のオブジェクトを汚さない)
const allTypes = [...oldTypes.slice(0, 2), "氷", ...newTypes]
// ["火", "水", "氷", "悪", "鋼", "フェアリー"]
```

### ソート

`sort()` を使う。インプレースになるので注意。

```typescript
// 一度文字列にすることから、数値のときは比較関数を引数に渡す必要がある。
const numbers = [10, 4, 20, 8]
numbers.sort((a, b) => a - b) // ないと、[ 10, 20, 4, 8 ] となる(文字順)

// 非破壊ソート
const sorted = [...numbers].sort((a, b) => a - b)
```

### ループ

従来の C などのループ、 `forEach()` に加えて、`for ... of` 構文が追加されたので、これを使うといい。`Array`, `Set`, `Map`, `String` など iterable オブジェクト( `@@iterafor` があるオブジェクト)に対してループできる。最速は従来の C などのループで、TypeScript では `for ... of` のループもこれに変換される。

```typescript
var iterable = ["火", "水", "草"]

for (const [i, value] of iterable.entries()) {
  // entries() は ES 2015 以上必要 (TS2569: Type 'IterableIterator<[number, string]>' is not an array type or a string type. Use compiler option '--downlevelIteration' to allow iterating of iterators.)
  console.log(i, value)
}
```

### Readonly 用配列

TypeScript では型の前に `readonly` を付与する、`ReadonlyArray<T>` を使う、リテラルの後ろに `as const` をつける。readonly な変数や引数だけに渡すことができる。

```typescript
const readOnlyArray: readonly number[] = [1, 2, 3];
const nums: ReadonlyArray<number>  = [1, 2, 3];
const roArray: number[] = [1, 2, 3] as const
```

これらの書き方は好み。また、`push`, `pop` メソッドが無い。

[読み取り専用の配列 (readonly array) | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/values-types-variables/array/readonly-array)

### 特殊な配列っぽいオブジェクト

`HTMLCollection`, `NodeList` の 2 つ。どちらも配列よりメソッドがかなり少ない。ただし、イテレータは利用できる。

## オブジェクト

`{}` で囲んで定義する、key-value 形式のデータ。

```typescript

const json = JSON.stringfy(<オブジェクト>, <データ変換するための関数>, <インデント幅>) // JSON 化するためのメソッド
const jsonObject = JSON.parse(json) // JSON からオブジェクトに変換する

// Readonly
type User = {
  name: string,
  age: number
};
const user : Readonly<User> = {name = "sato", age: 20};
```

### 取り出し

```typescript
const monster = {
  name: "ピカチュウ",
  type: "電気",
}

// まとめて取り出せる
const { name, type, dictNumber = 25 } = monster
// name 以外を other にまとめて取り出しとかできる(nameにも入る)
const { name, ...other } = monster

// 大文字のtype を取得する場合
// 以前だと、一つ一つ階層ごとに確認していく必要がありめんどくさい。
// var currentType = monster && monster.type && monster.type.toUpperCase()
// オプショナルチェイニング : ?. で存在チェック。 途中で nullish (null か undefined の値) があると、式全体の評価結果が undefined になる。
const currentType = monster?.type?.toUpperCase()
```

### 要素の加工

```typescript
const monster = {
  name: "ピカチュウ",
  type: "電気",
}

const stage = {
  field: "トキワの森",
}

// Copy
// 旧 : const copu = Object.assign({}, monster)
const copy = { ...monster }

// Merge
// const merged = Object.assign({}, monster, stage)
const merged = { ...monster, ...stage }
```

## Map ・ Set

ES2015 以降で利用可能。

```typescript
const map = new Map<string, string>([
  ["東京", "スカイツリー"],
  ["パリ", "エッフェル塔"]
]);

// for (const key of map.keys()) や for (const value of map.values()) も使える
for (const [key, value] of map) {
  console.log(`${key}, ${value}`);
}
```

## 参考

- [複合型 — 仕事ですぐに使える TypeScript ドキュメント](https://future-architect.github.io/typescript-guide/complex.html)
- [スプレッド構文 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
