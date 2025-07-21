# 型付け

```typescript
type Birthday = number | string // 合併型もOK
type Birthday = "ラーメン" | "カレーライス "// 値もOK

type Person = { // オブジェクト型も OK
  name: string;
  readonly favoriteSong: string; // 読み込み専用
  favoriteMeet?: string; // 省略可能
}

type Monster = {
  number: number;
  type: string;
}

const pikachu Partial<Monster> = {nunber: 25}; // Pertial 型ユーティリティを使って定義した方のすべての属性に ? をつけるので省略できる

const chatapy Readonly<Monster> = {number: 10, type: "虫"}; // Readonly 型ユーティリティを使ってすべての属性を readonly に
```

## any

何でもいいよってやつ。その変数のチェックをすべて放棄する。外部からやってくるデータや型ガードの診断に。

```typescript
function someFunction(opts: any) {
  console.log(opt.debug) // debug があるかどうかはチェックしないのでエラーにはならない。
}
```

## unknown

型アサーションを使ってチェックを行わないとエラーになる。

`unknown` 型の値は具体的な型へ代入できないし、メソッドも呼び出せない。

```typescript
const value: unknown = 89;

const int: nunber = value; // できない

const any: any = value; // OK
const unknown: unknown = value; // OK
```

`unknown` から他の型を確定させるには、型ガードを使う。

### 用途

- `any` 型をより安全にする。返り値が `any` のメソッドを一旦 `unknown` にすることで、より型を安全に使える。(もちろんその後型ガードを駆使して型を確定させる必要がある)
- 型アサーションの成約を回避する。(`str as unknown as number` ができる)

try-cache で補足される値の型は、4.4 以降 `any` か `unknown` 選べる。`tsconfig.json` の `useUnknownInCatchVariables` を true にする必要がある。

[unknown型 | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/statements/unknown)

## 属性名が可変のオブジェクト

`[key: string]: string` と表現する。

```typescript
const postalCodes { [key: string]: string } = {
  "602-0000": "京都市上京区",
  "602-0827": "京都市上京区相生町"
};
```

## 交差型 (Intersection Type)

それぞれの型定義を合成し、すべての属性を含むようにする。 `&` を使う。

```typescript
type Monster = {
  number: number
}

type Type = {
  type: string
}

// Monster, Type の型が持つプロパティとメソッドを備えている
const pikachu: Monster & Type = {
  number: 25,
  type: "電気",
}
```

## 構造的型付け

型が持つプロパティやメソッドの構造が同一であれば、互換性があるとみなす。

```typescript
class Person {
  walk();
}

class Dog {
  walk();
}

const kenta = new Person
const dog = kenta; // コンパイルのエラーとはならない。Dog が別のメソッド(例えば bark()など)ならば構造が違うのでエラーになる
```

### 構造的部分型

```typescript
class Shape {
  area(): number {
    return 0;
  }
}

class Circle {
  radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  area(): number {
    return Math.PI * this.radius **2;
  }
}

// Circle が Shape のメソッドを含んでいるから代入できる。
const shape = new Circle(2);

// extends と似た効果だが、extends はインターフェースを守ることを保証する。
class Rectangle extends Shape {
  wide: number;

  constructor(wide: number) {
    this.wide = wide;
  }

// 以下コンパイルエラーになる。Shape が持つ area() と異なり、area()が引数をもつ
  area(height: number){
    return this.wide * height;
  }
}
```

欠点としては、上記 Shape のような型と、別で定義した型が意図せず互換性を持つ場合がある。

この場合、名前的型付けのテクニックを使う方法が考えられる。

- private メンバーを持つクラス(公称型クラス) を定義する。

公称型クラスは 1 つでも非パブリック(private, protected)なプロパティやメソッドがあると、そのクラスは構造的部分型ではなくなる。

```typescript
class UserId {
  private id: string;
 
  constructor(id: string) {
    this.id = id;
  }
 
  getId(): string {
    return this.id;
  }
}
 
class ProductId {
  private id: string;
 
  constructor(id: string) {
    this.id = id;
  }
 
  getId(): string {
    return this.id;
  }
}
 
const userId: UserId = new UserId("1");
const productId: ProductId = userId; // 代入できない。
```

- ブランド型(__brand)を定義する。

```typescript
interface UserId {
  __brand: "UserId";
  id: number
}

interface ProductId {
  __brand: "ProductId";
  id: number;
}

const userId = {id:1} as UserId; // __brand には値を入れず、型アサーションを使う
const productId: ProductId = userId; // 代入できない
```

[公称型クラス | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/object-oriented/class/class-nominality)

## 型ガード

特定の型であることを判定し、絞り込むこと。

```typescript
let userNameOrId: string | number = getUser(); // userNameOrId は string か number のいずれか

if (typeof userNameOrId === "string") {
  // ここは string と判断した場合
  this.setState({
    userName: userNameOrId.toUpperCase(),
  })
} else {
  // ここは number と判断した場合
  const user = this.repository.findUserByID(userNameOrId)
  this.setState({
    userName: user.getName(),
  })
}
```

### 組み込みの型ガード

`typeof`, `instanfceof`, `in`

#### typeof

変数から型を抽出する型演算子

```typescript
const monster = {
  name: "Pichu",
  age: 2;
};

// Monster は monster のプロパティを持つ型となる
type Monster = typeof object;
```

JavaScript の `typeof` とは異なるので注意（あっちは値の型を調べる）

[typeof型演算子 | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/type-reuse/typeof-type-operator)


### ユーザ定義の型ガード

```typescript
// ↓ ESLint で any 型をエラーにしているため、回避するアサーションが必要
// eslint-disable-next-line @typescript-eslint/no-explicit-any
functions isArray(arg: any): arg is Array {
  return Array.isArray(arg);
}
```

- 関数名は `is型名` だとわかりやすい
- 引数が `any`
- 返り値の型は `arg is Array`
- 型注釈として `A is B` のように型述語を書く必要がある。
  - TypeScript 5.5 以降では省略できる。
  - 戻り値の型に `boolean` を指定するだけでは型ガードとして機能しない。(TypeScript 5.5 以降も同様)

[型ガード関数 (type guard function) | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/functions/type-guard-functions)

### アサーション関数

例外を投げるかどうかで判断する。

```typescript
function isDuck(animal: Animal): asserts animal is Duck {
  if (walksLikeDuck(animal)) {
    if (quacksLikeDuck(animal)) {
      return;
    }
  }
 
  throw new Error("YOU ARE A FROG!!!");
}
 
// ここではquacks()は存在しない
animal.quacks();
```

### key だけの型定義

`keyof` を使う。オブジェクトの型からプロパティ名を型として返却する型演算子

```typescript
type Book = {
  title: string;
  price: nunber;
  auther: string;
}

type BookKey = keyof Book; // = "title" | "price" | "auther";
```

複数の箇所で 「"title" | "price" | "auther"」のようなプロパティ名のユニオン型を定義をしなくて良いところがメリット。1 つオブジェクトを定義しておけば、プロパティ名のユニオン型は keyof を使えば定義できる。

[keyof型演算子 | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/type-reuse/keyof-type-operator)

## インタフェースを使った型定義

`type` とほぼ同じことができる。

```typescript
interface Monster {
  name: string
  type: string
}
```

## Mapped Types

Map のキーを定義できる。主にユニオン方と合わせて使う。例えば入力の形式がわかっているような場合

```typescript
type SupportedLanguage = "en" | "fr" | "kr" | "es" | "ja";
// keyof を使った場合
type SelectLanguage = {
  en: string;
  fr: string,
  kr: string,
  es: string,
  ja: string,
}
type SupportedLanguage = keyof SelectLanguage;


// SupportedLanguage のプロパティのみを定義できる。
type Software = {
  [key in SupportedLanguage]: string;
};

const testSoft: Software = {
  en: "Software",
  fr: "logiciel",
  kr: "소프트웨어",
  es: "programas",
  ja: "ソフトウェア",
  de: "", // 設定できない
}
```

追加のプロパティを定義したい場合は Intersection 型を使って定義する必要がある。

```typescript
// name プロパティは追加できない
type KeyValueName = {
  [K in string]: string;
  name: string;
}


type KeyValues = {
  [K in string]: string;
};

type Name = {
  name: string;
}

// 以下いずれかの方法で定義する。
type KeyValueName = KeyValues & Name;
type KeyValueName = {
  [K in string]: string;
} & {
  name: string;
}
```

[Mapped Types | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/type-reuse/mapped-types)

## インデックス型

Mapped Types でも登場しつつあるが、フィールド名を指定せずにプロパティを指定する型

```typescript
let obj = {
  [K: string]: number;
}
```

この場合だと値が number 型であれば好きな名前のプロパティをフィールドとして代入できる。

```typescript
obj = { a:1, b:2};
obj.c = 4;
obj["d"] = 5;
```

コンパイラオプションの `noUncheckedIndexedAccess` を有効にすると、存在しないプロパティの型には `undefined` が追加される。

```typescript
const e: number | undefined  = obj.e // e はまだ代入していないので undefined が追加
```

`Record<K, T>` でも表現できる。

```typescript
let obj = {
  [K: string]: number;
};

let obj2: Record<string, number>;
```

## Optional Chain

得られる値の型は、最後のプロパティの型と `undefined` のユニオン型となる。

```typescript
let book: undefined | { title: string };

const title = book?.title; // const title: string | undefined
```

コンパイルのオプション `target` が `ec2020` 以上の場合、そのまま JavaScripr にコンパイルされるが、`es2019` 以前の場合は三項演算子を用いたコードにコンパイルされる。

```
const title = book === null || book === void 0 ? void 0 : book.title;
```

[オプショナルチェーン (optional chaining) | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/values-types-variables/object/optional-chaining#typescript%E3%81%A7%E3%81%AE%E5%9E%8B)

## 列挙型(enum)

数値列挙型(代入すればそこから連番)

```typescript
enum Positon {
  Top, // 0
  Right, // 1
  Bottom, // 2
  Left, // 3
}

const positon = 5; // TypeScript 5.0 未満なら出来てしまう

console.log(Positon[0]); // メンバー名を出力できる。 "Top"

console.log(Positon[5]); // undefined (5 はメンバーが無い)
```

文字列挙型

```typescript
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

// 公称型になる。

const dic1: Direction = Direction.Up; // OK
const dic2: Direction = "DOWN"; // コンパイルエラー
```

[列挙型 (enum) | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/values-types-variables/enum)

## 関数の型

関数の実装を用いずに定義できる。interface のような感じ

```typescript
// number を引数として number を返す関数 Increment 型。アロー構文
type Increment = (num: number) => number;

// 関数式の型注釈には使える。（関数宣言 function 文には使えない）
const increment: Increment = function(num: number): number {
  return num + 1;
};

// メソッド構文
type Increment1 = {
  (num: number): number;
};

// typeof で関数から型を導くこともできる。
function decrement(num: number): number {
  return num - 1;
}

type Decrement = typeof decrement; // type Decrement = (num: number) => number;
```

## 参考

- [基本的な型付け — 仕事ですぐに使える TypeScript ドキュメント](https://future-architect.github.io/typescript-guide/typing.html)
- [TypeScriptと構造的型付け | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/values-types-variables/structural-subtyping)
- [インデックス型 (index signature) | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/values-types-variables/object/index-signature)
