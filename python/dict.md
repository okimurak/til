# 辞書型

`dict()` でタプルのリストから辞書を作れる

```python
>>> list(zip(range(3), ["fee", "fi", "fo"]))
[(0, 'fee'), (1, 'fi'), (2, 'fo')]

>>> dict(list(zip(range(3), ["fee", "fi", "fo"])))
{0: 'fee', 1: 'fi', 2: 'fo'}
```

`del` で指定した key の要素を削除できる

```python
>>> m = dict(list(zip(range(3), ["fee", "fi", "fo"])))
>>> print(m)
{0: 'fee', 1: 'fi', 2: 'fo'}
>>> del m[2]
>>> print(m)
{0: 'fee', 1: 'fi'}
```

`in` でキーが有るかを調べられる

```python
>>> 1 in m
True
>>> 2 in m 
False
```

## To JSON

`json.dump()` がファイル書き出し、`json.dumps()` が文字列変換

```python
>>> import json

>>> print(json.dumps(m))
{"0": "fee", "1": "fi"}

>>> print(json.dumps(m, indent=2))
{
  "0": "fee",
  "1": "fi"
}

>>> file = "test.json"
>>> with open(file, mode="wt", encoding="utf-8") as f: # ファイル書き出し
...     json.dump(m,f,indent=2)
... 
>>> exit()

❯ cat test.json 
{
  "0": "fee",
  "1": "fi"
}
```

JSON を dict にするには `json.load()` を使う。 JSON 形式の文字列から dict は `json.loads()`

```python
>>> import json
>>> file = "test.json"
>>> with open(file, mode="rt", encoding="utf-8") as f:
...     print(json.load(f))
... 
{'0': 'fee', '1': 'fi'}

>>> s = '{"0": "fee", "1": "fi"}'
>>> print(json.loads(s))
{'0': 'fee', '1': 'fi'}
```


## Reference

[5. データ構造 — Python 3.12.9 ドキュメント](https://docs.python.org/ja/3.12/tutorial/datastructures.html#dictionaries)
