# JavaScript

JavaScript の update で追加された機能を列挙。

## 変数

- const, let
  - const は再代入できない変数

```js
// 以下は代入できる
const object = {
  key : "value"
};

object.key = "value2"
console.log(object.key) // value2
```

## BigInt

ES2020

9007199254740991 以上の数値(2^53^1) のデータを扱える

```js
console.log(1n);

// 9007199254740993
console.log(`${9007199254740992n + 1n}`);

// 9007199254740992 => can not add one
console.log(`${9007199254740992 + 1}`);
```

## 分割代入

ES2015

```js
[a, b] = [1, 2];
```

## Nullish coalescing 演算子 ??

ES2020

左辺が nullish(null || undedined) ならば右辺の評価結果を返す。

```js
// Result1
console.log(null ?? "Result1");
// Result2
console.log(undefined ?? "Result2");

// true
console.log(true ?? "Result3");
// false
console.log(false ?? "Result4")
```

## デフォルト引数

ES2015

```js
function func(a, b = 1){
  console.log(`a = ${a}, b = ${b}`);
}

// a = 2, b = 1
func(2);
```

## 残余引数 ...

ES2015

可変配列を引数にしたいとき

```js
function func(...args){

  console.log(args);
}

// ['a','b','c']
func("a", "b", "c")
```


## 関数への分割代入

ES2015

```js
function func({ key }){
  console.log(key);
}

const object = {
  key: "value"
};

// value
func(object);


function funcArray([one, two]){
  console.log(one);
  console.log(two);
}

// 1
// 2
funcArray([1, 2])
```

## メソッドの短縮記法

ES2015

いちいち function と書かなくて良くなった

```js
const obj = {
  method() {
    return "pikachu";
  }
};

// pikachu
console.log(obj.method())
```

## for of

ES2015

iterable オブジェクトを反復できる。(Array, Map, Set, String)

```js

const numArray = [1, 2, 3];

for (const value of numArray){
  // 1
  // 2
  // 3
  console.log(value);
};

const str = "埼玉県";

for(const char of str){
  // 埼
  // 玉
  // 県
  console.log(char);
};
```

## プロパティの存在確認


ES2022

Object.hasOwn : 静的メソッドで Object.prototype.hasOwnProperty とはインスタンスから呼び出す点が異なる。


```js
const obj = {};

// false
console.log(Object.hasOwn(obj, "適当"));
```

## Optional caining

ES2020

`undefined` のプロパティがあってもエラーにならない、`?.`

以下 if 文で記載していたものを Nullish coalescing 演算子も組み合わせて書き換えられる。

```js

function beforePrint(a) {
  if(a.test !== undefined && a.test.hogehoge !== undefined) {
    console.log(a.test.hogehoge);
  } else {
    console.log("None");
  }
}

function improvePrint(a) {
  const value = a?.test?.hogehoge ?? "None";
  console.log(value);
}

const valueA = {};
const valueB = {
  test : "b"
};
const valueC = {
  test : {
    hogehoge : "C"
  }
};


// None
beforePrint(valueA);
// None
beforePrint(valueB);
// C
beforePrint(valueC);

// None
improvePrint(valueA);
// None
improvePrint(valueB);
// C
improvePrint(valueC);
```

## 型強制

そういうものとして覚えるしか無い

```javascript
const one = "1";
console.log(one - 1); // => 0  (1 - 1) 左辺の "1" が 1 に変換される。
console.log(one + 1); // => "11" ("1" + "1") 右辺の 1 が "1" に変換される。
```

[型強制 (type coercion) | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/values-types-variables/type-coercion)

## 参考

[変数と宣言 · JavaScript Primer #jsprimer](https://jsprimer.net/basic/variables/)
