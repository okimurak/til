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

## for in

`hasOwnProperty` を使う。プロトタイプのプロパティも含めてループされるため、プロトタイプが変更されると意図せずにループ回数が変わる可能性がある。

```js
const foo = {a: 1, b: 2, c: 3};
Object.prototype.hi = "Hi!";

for (const prop in foo) {
  console.log(prop, foo[prop]);
  // a 1
  // b 2
  // c 3
  // Hi Hi! <--- foo だけのはずだが、プロトタイプもループに含まれるため hi プロパティを持っていると判断されて出力
}

for (const prop in foo) {
  if(Object.prototype.hasOwnProperty.call(foo, prop)) { // ここで foo は prop を持っているかチェック
    console.log(prop, foo[prop]);
    // a 1
    // b 2
    // c 3
  }
```

[オブジェクトをループする方法 | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/values-types-variables/object/how-to-loop-an-object#for-in%E6%96%87)

また、配列をループするのには使わないほうがいい。順序を気にしないため。

[配列をループする方法 | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/values-types-variables/array/how-to-loop-an-array)


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

## プロトタイプベース

オブジェクトからオブジェクトを作る考え方

### 継承

クラスベースだと extends を使っていたがプロトタイプベースだと、以下でもできる。ただし JavaScript でも ES2015 から class や extends が使えるようになった。とはいえ、JavaScript はプロトタイプベースなのは頭に入れておく必要がある。

```js
const animal = {
  walkCount : 0,
  walk() {
    this.count +=2;
  }
}

const dog = Object.create(animal);
dog.walk = function() { // walk を別の function に置き換え。
  this.count +=4;
}
```

[プロトタイプベース | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/values-types-variables/object/prototype-based-programming)

## 即時実行関数式 IIFE (自己実行無名関数)

定義と同時に実行される関数。

```js
(() => {
  console.log("IIFE");
})();

const result1 = (function (arg) {
  console.log(`IIFE with args:${arg}`);
  return "IIFE with args";
})("hoge");

const result = await(async () => {
  console.log("async IIFE");
  return "async IIFE";
})();
```

### 用途

#### 非同期関数を受け取らない引数に、非同期処理を渡す場合

React の useEffect などに使う。以下は `useEffect()` は非同期関数を受け取らない引数を持っていて、その中で非同期で "https://example.com" にアクセスした結果を `console.log()` として出力している。この関数を `return` にしてしまうと適用できない。

```js
useEffect(() => {
  (async () => {
    const result = await fetch("https://example.com");
    console.log(result);
  })();
}, []);
```

#### if や switch を擬似的に式として扱いたい場合

if や switch は構文なので判定結果を変数に代入できない。そこで IIEF を使って擬似的に if や switch を関数式にして判定結果を保存する。あと可読性も向上するカモ。

```js
const result = ((type: string) => {
  if (type === "Apple") {
    return "林檎";
  } else if (type === "Orange") {
    return "オレンジ";
  } else {
    return "謎の果物";
  }
})(fruit.type);

// IIFE を使わない場合
// let を使う必要があり、変数 result の再代入のリスクが発生する。
let result;
const type = fruit.type;
if (type === "Apple") {
  result = "林檎";
} else if (type === "Orange") {
  result = "蜜柑";
} else {
  result = "謎の果物";
}
```

#### スコープ内の変数汚染を防ぐ

同じスコープ内で、同じ変数を使いまわしたい場合に使える。`result1`, `result2` と定義しなくて良くなるカモ、ということらしい。

```js
// api1 と api2 の結果を、特定の場合 console.log() に出力する。どっちもプライベートなので result という変数名を使い回せる。
async function callApiAAndB() {
  await (async () => {
    const result = await fetch("api1");
    if (result !== "OK") {
      console.log(result);
    }
  })();
  await (async () => {
    const result = await fetch("api2");
    if (result !== "Success") {
      console.log(result);
    }
  })();
}
```

#### モジュール化できる

[IIFE (即時実行関数式) - MDN Web Docs 用語集 | MDN](https://developer.mozilla.org/ja/docs/Glossary/IIFE#%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3)

```js
const makeWithdraw = (balance) =>
  ((copyBalance) => {
    let balance = copyBalance; // この変数はプライベートです
    const doBadThings = () => {
      console.log("I will do bad things with your money");
    };
    doBadThings();
    return {
      withdraw(amount) {
        if (balance >= amount) {
          balance -= amount;
          return balance;
        }
        return "Insufficient money";
      },
    };
  })(balance);

const firstAccount = makeWithdraw(100); // "I will do bad things with your money"
console.log(firstAccount.balance); // undefined. プライベートだからアクセスできない
console.log(firstAccount.withdraw(20)); // 100 - 20 = 80
console.log(firstAccount.withdraw(30)); //  80 - 30 = 50
console.log(firstAccount.doBadThings); // undefined; このメソッドはプライベートです
const secondAccount = makeWithdraw(20); // "I will do bad things with your money". firstAccount ではないので初期化される。
console.log(secondAccount.withdraw(30)); // 20 - 30 なので "Insufficient money"
console.log(secondAccount.withdraw(20)); // 20 - 20 = 0
```


[即時実行関数式 (IIFE) | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/functions/iife)
[IIFE (即時実行関数式) - MDN Web Docs 用語集 | MDN](https://developer.mozilla.org/ja/docs/Glossary/IIFE)

## 参考

[変数と宣言 · JavaScript Primer #jsprimer](https://jsprimer.net/basic/variables/)
