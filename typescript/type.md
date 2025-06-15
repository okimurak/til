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

- private メンバーを持つクラスを定義する。

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

## 型ガード

特定の方であることを判定し、絞り込むこと。

```typescript
let userNameOrId: string | number = getUser()

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


## 参考

- [基本的な型付け — 仕事ですぐに使える TypeScript ドキュメント](https://future-architect.github.io/typescript-guide/typing.html)
- [TypeScriptと構造的型付け | TypeScript入門『サバイバルTypeScript』](https://typescriptbook.jp/reference/values-types-variables/structural-subtyping)
