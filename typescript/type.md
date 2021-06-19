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

const pikachu: Monster & Type = {
  number: 25,
  type: "電気",
}
```

### 型ガード

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

### ユーザ定義の型ガード

```typescirpt
// ↓ ESLint ので any をエラーにしているため、回避するアサーションを
// eslint-disable-next-line @typescript-eslint/no-explicit-any
functions isArray(arg: any): arg is Array {
  return Array.isArray(arg);
}
```

- 関数名は `is型名` だとわかりやすい
- 引数が `any`
- 返り値の型は `arg is Array`

### key だけの型定義

`keyof` を使う。

```typescript
type Park = {
  name: string
  hadTako: boolean
};

type Key = keyof Park;

const key: Key = "name"
```

## インタフェースを使った型定義

`type` とほぼ同じことができる。

```typescript
interface Monster {
  name: string
  type: string
}

## 参考

- [基本的な型付け — 仕事ですぐに使える TypeScript ドキュメント](https://future-architect.github.io/typescript-guide/typing.html)
