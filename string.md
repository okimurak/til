# String

## 大文字、小文字系

- `capitalize()` : パスカルケースみたいに先頭を大文字に
- `upper()` : 大文字
- `lower()` : 小文字
- `title()` : 各単語の先頭を大文字に

```python
>>> print("hello world".capitalize()) 
Hello world
>>> print("hello world".title())
Hello World
```

## 文字列の検索

### find

最初に見つかったときの文字の位置を返す（見つからない場合 -1 を返す）

```python
>>> print("hello world".find("w")) 
6
>>> print("hello world".find("l"))
2
>>> print("hello world".find("$"))
-1
```

最後に見つかったとき、にしたい場合は `rfind()` を使う

```python
>>> print("hello world".rfind("l"))
9
```

正規表現を使いたい場合は、`re.search()` を使い、row 表現で正規表現を指定する

```python
>>> import re
>>> s = '012-3456-7890'
>>> print(re.search(r'\d+', s))
<re.Match object; span=(0, 3), match='012'>

>>> m = re.search(r'\d+', s)
>>> m.group(0) # 一致したグループ内の 1 要素を取得
'012'
>>> m.span()  # 位置(start, end)を返す
(0, 3)
```

## swith

prefix, suffix を検索できる。（ヒットしたら `True`）

```python
>>> print("hello world".startswith("he"))
True
>>> print("hello world".startswith("hoge"))
False
>>> print("hello world".endswith("ld"))
True
```

## 結合、分割

split, join を使う

```python
>>> print("hello world".split())
['hello', 'world']
>>> print(" ".join(['hello', 'world']))
hello world
```

## encode

```python
>>> print("hello world".encode("utf-8"))
b'hello world
>>> print("hello world".encode("utf-16"))
b'\xff\xfeh\x00e\x00l\x00l\x00o\x00 \x00w\x00o\x00r\x00l\x00d\x00
```

## format

```python
>>> print("hello {}".format("world"))
hello world

>>> print_text = "{name} is most variable hit maker and hi makes {hit_numbers} hits during NLB and MLB"
>>> print(print_text.format(name="Ichiro", hit_numbers=4367))
Ichiro is most variable hit maker and hi makes 4367 hits during NLB and MLB
```

フォーマット文字列もある

```python
>>> a="hoge"
>>> b="fuga"
>>> print(f"{a} and {b}")
hoge and fuga
```

`:` のあとに `format_spec` を書くことができる。format_spec は様々な書式を指定できる

```python
>>> b=1234
>>> print(f"{a} and {b:b}")
hoge and 10011010010
```

## Reference

- [string --- 一般的な文字列操作 — Python 3.13.2 ドキュメント](https://docs.python.org/ja/3.13/library/string.html)
- [re --- 正規表現操作 — Python 3.13.2 ドキュメント](https://docs.python.org/ja/3.13/library/re.html)
