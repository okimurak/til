
const array = [33, 12, 4, -132, -12, -69, 6];

array.sort();

// -12, -132, 4, 6, 12, 33
// Array.prototype.sort() はデフォルトでは UTF-16 のコード順となるため、数値比較にはならない
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
console.log(array);

// 引数に比較関数 (conpareFn(a, b)) を指定できるのでこちらをうまく使う
// 未指定だと、配列要素はすべて文字列に変換されて、文字列が UTF-16 コード単位順でソートされる。
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#%E8%A7%A3%E8%AA%AC

// 昇順 (Inifinity や NaN がなければ使える)
array.sort((a, b) => a - b);

// 非 ASCII 文字のソート(英語以外の文字列、日本語など)
// String.prototype.localeCompare() を使う
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#%E9%9D%9E_ascii_%E6%96%87%E5%AD%97%E3%81%AE%E3%82%BD%E3%83%BC%E3%83%88

const items = ["一", "五", "七", "三", "四", "6"];

// ["6", "一", "五", "三", "四", "七"]
items.sort((a, b) => a.localeCompare(b));

// ["6", "一", "七", "三", "五", "四"]
items.sort();
