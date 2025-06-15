# ジェネリクス

使うまで型が決まらないような、いろいろな方の値を受け入れられるような機能を作るときに使う。総称型。共通ライブラリを作るといったときに使う。

```typescript
function multiply<T>(value: T, n: number): Array<T> {
  const result Array<T> = [];
  result.length = n;
  result.fill(value);
  return result;
}
```

## 引数名

`T`, `U`, `V` などの大文字が一般的に使われる（C++ や Java での慣習）

## 型パラメータに制約をつける

継承を使うことで、特定のインタフェースを満たす方だけを受け入れられるように指定できる。

```typescript
type Monster {
  getSkills(): Array[String];
}

function isUseLightningShock<T extends Monster>(monster: T): boolean {
  const skills = monster.getSkills();
  return skills.includes("でんきショック");
}
```

## ユーティリティ

TypeScript では組み込みの型変換のためのジェネリクスのユーティリティを提供している。

### オブジェクトに対するユーティリティ型

```typescript
const userDiff: Partial<User> = {
  organization: "Hogehoge Company";
};
```

- `Particial<T>` : 要素が省略可能になった型

```typescript
type Person = {
  name: string;
  age : number;
}

type ParticialPerson = Particial<Person>;
/*
以下に変化する
type ParticialPerson = {
  name?: string;
  age? : number;
}
*/
```

- `Readonly<T>` : 要素が readonly になった型

```typescript
type Person = {
  name: string;
  age : number;
}

type ReadOnlyPerson = ReadOnly<Person>;
/*
以下に変化する
type ReadOnlyPerson = {
  readonly name: string;
  readonly : number;
}
*/

const ken: ReadOnlyPerson = {"健", 10};
// 以下出来ない
ken.10 = 20;
```

- `Required<T>` : すべての省略可能な要素を必須に直した型

```typescript
type Person = {
  name: string;
  age? : number;
}


type RequiredPerson = Required<Person>;
/*
以下に変化する
type RequiredPerson = {
  name: string;
  age : number;
}
*/
```

### オブジェクトと属性名に対するユーティリティ型

`T` 以外に、`K` としてプロパティの文字列の合併型を持ち、新しいオブジェクトの型を作成する。

```typescript
const viewItems: Pick<User, "name" | "gender"> = {
  name: "Taro Yamada",
  gender: "male",
}
```

- `Record<K, T>` : `T` を子供の要素の持つ `Map` 型のようなデータ型 (`K` がキー)を作成

```typescript
type ThreeLetterRecord = Record<"one", | "two" | "three", string>;
/*

type ThreeLetterRecord = {
  one: string;
  two: string;
  three: string;
}
*/
```

- `Pick<T, K>` : `T` の中の特定のキー `K` だけを持つ型を作成
- `Omit<T, K>` : `T` の中の特定のキー `K` だけを持たない型を作成

### 型の集合演算のユーティリティ型

`T` と `U` として合併型をパラメータとして受け、新しい合併型を作り出す。

```typescript
cont year: NonNullable<string | number | undefined> = "令和";
```

- `Exclude<T, U>` : `T` の合併型から、`U` の合併型の構成要素を**除外**した合併型を作る方
- `Extract<T, U>` : `T` の合併型と、`U` の合併型の両方に含まれる合併型を作る型
- `NonNullable<T>` : `T` の合併型から、`undefined` を抜いた合併型を作る型

### 関数のユーティリティ型

- `ReturnType<T>` : 関数を渡すと、その返り値の型を返すユーティリティ型。

```typescript
function hogehogeFunc(value: number): string {
  return `${value}`;
}

type HogeHogeFuncReturnType = ReturnType<typeof hogehogeFunc>;
// type HogeHogeFuncReturnType = string
```

- `Awaited<T>` : Promise の戻り値の型を返す。

```typescript
const value = Promise.resolve("data");

type Data = Awaited<type of value>;
// type Data = string;
```

### クラスに対するユーティリティ型

クラスに対するユーティリティ型。

- `ThisType<T>` : `this` が何を表すのかを外挿することを表現するユーティリティ型。`--noImplictThis` がないと動作しない。
- `InstanceType<T>` : `IntanceType<typeof C>` が `C` を返す。 `abstract new (...args: any) => any` のコンストラクタを満たす必要がある。


### インデックスアクセス型

型のプロパティを取得できる。

```typescript
type Monster = {
  name = string;
  level = number;
}

type MonsterName = Monster[name];
// type MonsterName = string;
```

## 参考

- [ジェネリクス — 仕事ですぐに使える TypeScript ドキュメント](https://future-architect.github.io/typescript-guide/generics.html)
- [TypeScript: Documentation - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [TypeScript入門『サバイバルTypeScript』〜実務で使うなら最低限ここだけはおさえておきたいこと〜](https://typescriptbook.jp/)
