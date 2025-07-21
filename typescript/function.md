# 関数

## 定義

何も返さない場合は `: void` をつけると明示的に表現される。 `compilerOptions.noImplicitAny` オプションがついているときは必須。(コンパイルエラーとなる)

```typescript
function checkFlag(flag: boolean): string {
  console.log(flag)
  return "check done"
}

// アロー関数の場合
// 返り値が明確な場合、省略可能
const lowerCase = (input: string) => {
  return input.toLowerCase()
}

// デフォルト引数
function hello(name = "田中太郎", favorite = "飴") {
  console.log(`${name}は${favorite}を食べています。`)
}

// オブジェクトの分割代入を使って、オブジェクトの要素が省略時にデフォルト値を設定するパターン (末尾の {} が重要)
function hello({ name = "田中太郎", favorite = "飴" } = {}) {
  console.log(`${name}は${favorite}を食べています。`)
}

hello({ name: "山田太郎" }) // "山田太郎は飴を食べています。"
```

### 関数を扱う変数の型定義

```typescript
// 引数1にstring, 引数2にnumberを受け取って、booleanを返す関数の場合
let check: (arg1: string, arg2: number) => boolean
```

### 何も設定しない関数を変数に設定する

```typescript
// JavaScript の場合
var callback = function () {}

// TypeScript の場合
let callback: (name: string) => void // 意味はなくとも型定義をする必要がある
callback = (name: string): void => {}
```

### 関数を含むオブジェクトの定義方法

できるんだ。ES2015 からは setter/getter の宣言も簡単に行えるようになった。

```typescript
const smallAninal = {
  getName() {
    // functions がいらない
    return "小動物"
  },
  _favorite: "小笠原", // private とする慣習。外から書き換えもできちゃうけど基本やらない
  get favorite() {
    // 参照用
    return this._favorite
  },
  set favorite(favorite) {
    // 代入用
    this._favorite = favorite
  },
}
```

### オーバーロード関数

1 つの関数に、異なる関数シグネチャを複数持つ関数。関数シグネチャは引数、返り値を定義した関数の型のこと。

```typescript
function hello(person: string): void; // シグネチャ1 最も詳しいものを 1 つ目に持っていく
function hello(persons: string[]): void; // シグネチャ2

// 実装
function hello(persion: string | string[]): void {
  if (typeof person === "string") {
    console.log(`Hello ${person}`);
  } else {
    // string[]
    console.log(`Hello ${person.join(",")}`);
  }
}
```

TypeScript では Java などのようなオーバーロードは書けない。シグネチャを全部定義して、実装を書く。JavaScript ではオーバーロードは無い。

#### アロー関数で実装する場合

型注釈が必要

```typescript
type Hello = {
  (person: string): void;
  (persons: string[]): void;
}
// もしくは関数型とインターセクション型を使う type Hello = ((person: string) => void) & ((persons: string[]) => void);

// 実装
const hello: Hello(persion: string | string[]): void => {
  if (typeof person === "string") {
    console.log(`Hello ${person}`);
  } else {
    // string[]
    console.log(`Hello ${person.join(",")}`);
  }
}
```

#### 代替案

- オプション引数 : 引数の個数が異なる場合
- ユニオン型 : 引数の型だけ異なる場合
- ジェネリクス : 引数の型と戻り値の型に一定の対応関係がある場合

つまり、オーバーロード関数は、引数および戻り値に一定の対応関係がない場合に使うことを検討すると良さそう。

[オーバーロード関数 (overload function) | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/functions/overload-functions)

## クロージャ

ソースコードの定義時の親子関係を元にして、変数のスコ－プが決定される。これを、**レキシカルスコープ** という。自分が定義された場所の外の変数を束縛した関数を **クロージャ** という。

```typescript

function a() {
  const b = 10;
  funtion c() {
    console.log({b});
  }
  c();
}
```

## アロー関数

関数が定義された場所の `this` の保持もセットで行い、`function` という長いキーワードが頻出するのを減らせる。

```typescript
// 外の this も維持される
this.button.addEventListener("click", () => {
  this.smallAnimal.walkTo("公園")
})
```

### 記法

省略できるパターン。

- 引数が 1 つの場合は引数のカッコ
  - 引数に型を付けたい場合はエラーになる。
- 式の結果をそのまま `return` する場合は式のカッコ

```typescript
// 基本形
(arg1, arg2) => { /* 式 */ };

// 引数 1 つならカッコを省略できる。
arg1 => { /* 式 */ };

// 引数 0 はカッコ必要
() =>  { /* 式 */ };

// 式 1 行だけなら、引数も戻り値もカッコと return を省略できる。
// ただし、引数のカッコを省略した場合、引数、戻り値どちらも型注釈を書けない
arg => arg * 2;

// それ以外で return させるとき、型注釈をつけたいときは return が必ず必要
arg => {
  return arg * 2;
};

// 戻り値がオブジェクトリテラルのときはカッコ() で囲む
(n) => ({foo: n + 1});
```

[アロー関数 (arrow function) | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/functions/arrow-functions)

## キーワード引数

Python の機能の一つ。名前=値で引数を指定する方法のこと。JavaScript や TypeScript にこれに相当する機能はないが、Options Object パターンというデザインパターンで似た実装ができる。

### Options Object パターン

```typescript
// 通常の関数(位置引数)
function normalFunc(x, y, z) {
  console.log(x, y, z);
}

func(undefined, undefined, 3); // x, y を省略したいときはデフォルト値を指定する必要がある。
 
// オブジェクトひとつだけを引数に持つ関数
function func(options) {
  console.log(options.x, options.y, options.z);
}
 
func({ x: 1, y: 2, z: 3 }); // 1 2 3
func({z: 3}); // x, y を簡単に省略できる。

// 分割代入引数を使ったほうがシンプル
function func({x, y, z}) {
  console.log(x, y, z);
}

// 型もつけられる。
function func({x, y, z}: {x: number, y: number, z: number}) {
  console.log(x, y, z);
}
```

[キーワード引数とOptions Objectパターン | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/functions/keyword-arguments-and-options-object-pattern)

## 参考

- [関数 — 仕事ですぐに使える TypeScript ドキュメント](https://future-architect.github.io/typescript-guide/function.html)
- [華麗に getter と setter を使いたい。（現代的 JavaScript おれおれアドベントカレンダー 2017 – 05 日目） | Ginpen.com](https://ginpen.com/2017/12/05/javascript-getter-setter/)
```
