# TypeScript 事始め

Microsoft が開発した JavaScript に追加機能を実装した言語。

型定義や、まだ Proporsal な機能を実装している。

## コンパイルバージョン

以下の JavaScript にコンパイルして出力できる。``tsconfig.json` にコンパイラの動作を定義する。バージョンは利用を想定しているブラウザバージョンで決めるといい。

- ES3
- ES5
- ES2015
- ES2016
- ES2017
- ES2018
- ESNEXT

ブラウザのか反省を維持しつつ、新しい機能を追加したい場合には [`core-js`](https://www.npmjs.com/package/core-js) といった [Polyfill](https://developer.mozilla.org/ja/docs/Glossary/Polyfill) を使う。

## 環境構築

### 前提

npm コマンドが使えること。

### 手順

```bash
npm install --save-dev ts-node typescript
npx tsc --init # ts.config の雛形作成
```

## 参考

- [前書き — 仕事ですぐに使える TypeScript ドキュメント](https://future-architect.github.io/typescript-guide/preface.html#typescript)
- [Node.js エコシステムを体験しよう — 仕事ですぐに使える TypeScript ドキュメント](https://future-architect.github.io/typescript-guide/ecosystem.html)
