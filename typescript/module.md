# モジュール

1 つの `.ts/.js` ファイルが 1 モジュール。

## エクスポート

`export` を先頭に付けることで他のファイルから参照できるようになる。

```typescript
export const favorite = "いちご"
export function random() {
  const i = Math.random()
  return i
}
export class Monster {}
```

## インポート

Python と同じ用に `as` を使って別名をつけることができる。

```typescript
import { favorite, random, Monster } from "./monster"
```

## 読み込むパス

相対パスと絶対パスの 2 種類がある。絶対パスの場合は 2 箇所を探索する。

- `compilerOptions.baseDir`
- `node_modules` ディレクトリ以下

## 動的インポート

特定のページのみ必要なスクリプトをあとから読み込むようにするという要件がある。このときに使う。ES2018 以降のみの機能。

```typescript
const zipUtil = await import("./utils/create-zip-file")
```

## 複数のファイル内容をまとめてエクスポート

TypeScript では `immport` と同じような書き方でまとめてエクスポートできる。

```typescript
export { favorite, random, Monster } from "./monster"
```

## 型のみの import/export

TypeScript 3.8 からできる機能。

```typescript
import type { HogeType } from "./hogeType"
```
