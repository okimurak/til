# React memo


## DOM

Document object model


## JSX

React doesn't require JSX.

createElement や appendChild なしに JS で DOM に要素を追加できる機能のこと。


厳密には HTML をそのまま埋め込むものではなく、記述する規則がある。

[JSX でマークアップを記述する – React](https://ja.react.dev/learn/writing-markup-with-jsx)

## Components and Props

- Function components: JS 関数を定義できる
- Class components: オブジェクト指向的にクラスを定義できる。
- Props: Read only



## State and Lifecycle

- [React lifecycle methods diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
- [state の管理 – React](https://ja.react.dev/learn/managing-state)
- [Hooks時代のReactライフサイクル完全理解への道](https://zenn.dev/yodaka/articles/7c3dca006eba7d#%E5%90%84%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B5%E3%82%A4%E3%82%AF%E3%83%AB%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89%E3%81%AE%E8%AA%AC%E6%98%8E)

State は直接更新しない。

## React Hooks

- useEffect()
- useState()

## Handling event

document.addEventListener() は使わない。

条件付きでレンダリングもできる

[条件付きレンダー – React](https://ja.react.dev/learn/conditional-rendering)


## Lists and Key

for 文ではなく、map をつかう。