# loop

for とか

## items

dict 型のループで key, value 両方取り出せる。

```python
>>> knights = {'gallahad': 'the pure', 'robin': 'the brave'}
>>> 
>>> for k,v in knights.items():
...     print(k,v)
... 
gallahad the pure
robin the brave
```

## enumerate

リストのループで index も同時に取り出せる

```python
>>> for i, fruit in enumerate(['apple', 'grape', 'orange']):
...     print(i, fruit)
... 
0 apple
1 grape
2 orange
```

## zip

2 つ以上のリストを同時にループして、各要素を 1 組(タプル)にできる。


```python
>>> days = ['Mon', 'Tue', 'Wed']
>>> fruits = ['apple', 'grape', 'orange']
>>> drinks = ['coffee', 'tea', 'beer']
>>> 
>>> for day, fruit, drink in zip(days, fruits, drinks): 
...     print(f"{day}'s fruit is {fruit}, and drink is {drink}")
... 
Mon's fruit is apple, and drink is coffee
Tue's fruit is grape, and drink is tea
Wed's fruit is orange, and drink is beer
```

以下のように配列計算も簡単にできる（行列の入れ替え）

```python
>>> matrix = [
...     [1, 2, 3, 4],
...     [5, 6, 7, 8],
...     [9, 10, 11, 12],
... ]
>>> 
>>> list(zip(*matrix))
[(1, 5, 9), (2, 6, 10), (3, 7, 11), (4, 8, 12)]
```

デフォルトでは最も短いリストを消費し切ると終了する。以下は range(3) が短いのでそこで終了し、fum は処理されない

```python
>>> list(zip(range(3), ['fee', 'fi', 'fo', 'fum']))
[(0, 'fee'), (1, 'fi'), (2, 'fo')]
```

リストが同じ長さということを想定する場合、`strict=True` オプションが推奨。異なる場合、ValueError 例外が返る

```python
>>> list(zip(range(3), ['fee', 'fi', 'fo', 'fum'], strict=True))
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: zip() argument 2 is longer than argument 1
```

なお、itertools.zip_longest を使うと、最も長いリストを消費し切ると終了し、空いたところに pading できる。(デフォルト None)

```python
>>> list(zip_longest(range(3), ['fee', 'fi', 'fo', 'fum']))
[(0, 'fee'), (1, 'fi'), (2, 'fo'), (None, 'fum')]

>>> list(zip_longest(range(3), ['fee', 'fi', 'fo', 'fum'], fillvalue="Blank"))
[(0, 'fee'), (1, 'fi'), (2, 'fo'), ('Blank', 'fum')]
```

## Reference

- [5. データ構造 — Python 3.13.2 ドキュメント](https://docs.python.org/ja/3/tutorial/datastructures.html#nested-list-comprehensions)
- [itertools --- 効率的なループ用のイテレータ生成関数群 — Python 3.13.2 ドキュメント](https://docs.python.org/ja/3/library/itertools.html#itertools.zip_longest)
