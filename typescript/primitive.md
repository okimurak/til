# プリミティブ型

ソースコード上に直接記載できるデータ。

## boolean

true / false の２つの真偽値を取るデータ型。string や number にも変換可能

## number

64 ビットの浮動小数点で扱う。int とか float ではない。整数をロス無く格納できるのは 53 ビット(-1) までなので、9007 兆まで扱える。([IEEE 754](https://ja.wikipedia.org/wiki/IEEE_754))

```typescript
console.log(0b11) // 2進数
console.log(0o777) // 8進数
console.log(0xf5) // 16進数

console.log(parseInt("010")) // 10進数には parseInt 使っておけば間違いなさそう
```

number は 2 進数で表した数値表現なので、細かい計算が必要な場合には [`defimal.js`](https://www.npmjs.com/package/decimal.js) などの外部ライブラリを使ったほうがいい。

### 演算子

`**` (べき乗) が ES2016 から使えるようになった。

あと小数値を整数にするビット演算の方法 (`|0`)を末尾につける。

```typescript
console.log(19.89 | 0) // 19 → 0 との OR を取る
```

### Math オブジェクト

数値計算の関数や定数のライブラリ。(`Math.floor()` みたいに呼び出す)

## string

文字列を表現、バッククォート (`) で囲むと、改行が中にあっても OK。
JavaScript は UTF-16 という文字コードを使っている。

### 文字コードの正規化

表記のブレを無くすための手法。`NFKC` 使っていれば問題ない。長音、ハイフンとマイナス、漢数字の 1, 横罫線など字形が似ているが意味が異なるものはこれでは難しいので、別途対処が必要。

```ts
"ＡＢＣｱｲｳｴｵ㍻".normalize("NFKC") // 'ABCアイウエオ平成'
```

### 結合

テンプレートリテラルを使う。配列などは `.join()` で OK

```typescript
console.log(`INFO: ${message}`)
```

### 事前処理

テンプレートリテラルには関数を指定できる。この関数には文字を加工する処理を挟むことができる。


```typescript

function i18n(texts, ...placeholders) {
   // texts = ['タイプは', 'です。']
   // placeholders = ['火']
   // 処理
  return
}

const buttleType = "火"
console.log(i18n`タイプは${buttleType}です。`)
```

## undefined, null

`undefined` は未定義や代入されていない変数の参照。`tsconfig.json` で `struct: true` にするとコンパイルエラーとできる。

また、関数の引数を咲楽するために `?` をつけることで、JavaScript の関数で引数の数が会わなかった場合の再現ができる。

```typescript
function print(name: string, age?: number) {
  console.log(`name: ${name}, age: ${age || 'empty'}`); // undefined の場合は 'empty' という文字列を出力する
}
```


## 参考

- [プリミティブ型 — 仕事ですぐに使える TypeScript ドキュメント](https://future-architect.github.io/typescript-guide/primitive.html)
