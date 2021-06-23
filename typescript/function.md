# 関数

## 定義

オーバーロードは不可。何も返さない場合は `: void` をつけると明示的に表現される。 `compilerOptions.noImplicitAny` オプションがついているときは必須。(コンパイルエラーとなる)

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

// 引数 1 つ
arg1 => { /* 式 */ };

// 引数 0 はカッコ必要
() =>  { /* 式 */ };

// 式のカッコを省略すると、式の結果が return
arg => arg * 2;

// それ以外で return させるときは return が必ず必要

arg => {
  return arg * 2;
};
```

## 参考

- [関数 — 仕事ですぐに使える TypeScript ドキュメント](https://future-architect.github.io/typescript-guide/function.html)
- [華麗に getter と setter を使いたい。（現代的 JavaScript おれおれアドベントカレンダー 2017 – 05 日目） | Ginpen.com](https://ginpen.com/2017/12/05/javascript-getter-setter/)
```
