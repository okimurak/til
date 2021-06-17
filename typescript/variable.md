# 変数

- `const` ... 定数。三項演算子で変更する場合もこれが使える。
- `let` .. 変数を変更する場合

※ `var` は使わない。スコープが関数単位で影響が大きくなるため。

## 参考

[変数 — 仕事ですぐに使えるTypeScript ドキュメント](https://future-architect.github.io/typescript-guide/variable.html)

## 型定義

```typescript
let name: string;

// error TS2322: Type '123' is not assignable to type 'string'
name = 1

// 型推論により、 string が自動で設定される
let title = "教師"

// 未定義か any で何でも入る変数を作ることができる。
let address;
let address: any

// 型定義は複数設定できる Union Type (合併型) という
let birthYear: number | string

// 特定の文字列しか設定できないようにできる
let pointRate : 5 | 8 | 10

// 値と型の合併型
let birthYear: number | "平成" | "令和"
```
