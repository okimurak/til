# List

## Funciton

### insert

指定した位置に要素を挿入する

```python
>>> b = [1]
>>> b.append(2)
>>> b.insert(1,5) # 追加した 2 の前
>>> print(b)
[1, 5, 2]
```

### copy

シャローコピー(shallow copy) を返す。 a[:] と透過

```python
>>> print(b)
[1, 5, 2]
>>> print(b)
[1, 5, 2]
>>> 
>>> c = b.copy()
>>> print(c)
[1, 5, 2]
>>> c.append(3)
>>> print(b) # b には 3 が増えていない
[1, 5, 2]
>>> print(c) # シャローコピーなので、別オブジェクト。つまり 3 が増えている。
[1, 5, 2, 3]
```

### map

各要素に処理を行い、結果を返す

```python
>>> a = [1,2,3]
>>> def double(x): return x * 2
... 
>>> print(list(map(double, a)))
[2, 4, 6]
```

### filter

各要所に処理を行い true となる要素を結果として返す

```python
>>> a = [1,2,3]
>>> def isodd(x): return x % 2
... 

>>> print(list(filter(isodd, a))) 
[1, 3]
```

### reduce

最初の要素 2 つ使って計算し、その結果を使って次の要素と計算する。
これを繰り返して、最終的な単一の結果を返す

`functools` に含まれる。

```python
>>> from functools import reduce
>>> a = [1,2,3]
>>> def add(x, y): return x+y
... 

>>> print(reduce(add, a))
6
```

## Use as queue

insert や pop を使ってもいいけど、遅い

collections.deque を使うと良い

```python
>>> from collections import deque
>>> q = deque(["Tomas", "Pacy", "Dony"])
>>> q.append("Terry")
>>> q.append("Sho")
>>> q.popleft()
'Tomas'
>>> print(q)
deque(['Pacy', 'Dony', 'Terry', 'Sho'])
>>> q.popleft()
'Pacy'
>>> print(q)
deque(['Dony', 'Terry', 'Sho'])

>>> q
deque(['Dony', 'Terry', 'Sho'])
```

## del

要素を削除できる。返却はしない。スライスも使える。
変数も消せる。

```python
>>> d = [-1, 1, 66.25, 333, 333, 1234.5]
>>> del d[0]
>>> d
[1, 66.25, 333, 333, 1234.5]
>>> del d[2:5]
>>> d
[1, 66.25]
>>> del d[:]
>>> d
[]
>>> del d
>>> d
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'd' is not defined. Did you mean: 'id'?
```


## Reference

- [とほほのPython入門 - リスト・タプル・辞書 - とほほのWWW入門](https://www.tohoho-web.com/python/list.html)
- [5. データ構造 — Python 3.13.2 ドキュメント](https://docs.python.org/ja/3/tutorial/datastructures.html)
