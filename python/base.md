# Python

の基礎をまとめていく（知らない部分だけ）


## Method

- range() ... 範囲関数

```python
for i in range(2, 10):
    print(i)
```

```text
2
3
4
5
6
7
8
9
```

- enumerate ... リストの index を同時に取得できる

```python
for i, fruit in enumerate(['apple', 'grape', 'orange']):
  print(i, fruit)
```

```text
0 apple
1 grape
2 orange
```

- zip ... 複数の配列の同じ index の要素をまとめて扱うことができる

```python
days = ['Mon', 'Tue', 'Wed']
fruit = ['apple', 'grape', 'orange']
drinks = ['coffee', 'tea', 'beer']

for day, fruit, drink in zip(days, fruit, drinks):
  print(day, fruit, drink)
```

```text
Mon apple coffee
Tue grape tea
Wed orange beer
```

## Params

### Default Params

参照渡しになりそうな型をデフォルト引数にしないこと

```python

def bad_append(x, l=[]):
  l.append(x)
  return l


def good_append(x, l=None):
  if l is None:
    l = [] # 初期化してあげる
  l.append(x)
  return l

```

### Tuple Params

```python


def say(*args):
  for arg in args:
    print(arg)


say('Hello', 'I\'m', 'Yappo!')
```

### Keyword Params

```python
def menu(**kwargs):
  for k, v in kwargs.items():
    print(k, v)

d = {
  'entree' : 'chicken',
  'drink': 'ice coffee',
  'dessert': 'ice'
}

menu(**d)
```

### Inner function

関数の中でしか使わない関数を定義する

```python
def outer(a, b):
  def inner(c, d):
    return c + d
  r = inner(a, b)
  print(r)

outer(1, 2)
```


### Closure

```python
def outer(a, b):
  def inner():
    return a + b
  return inner

f = outer(1, 2)
print(f())
```

### Decorator

Inner Functionを使えば、簡単にかける

```python
def print_info(func):
  def wrappper(*args, **kwargs):
    print('Start')
    result = func(*args, **kwargs)
    print('End')
    return result
  return wrappper

@print_info # アノテーションが使える
def plus(a, b):
  return a + b

f = plus(15, 25)
print(f)

# アノテーションなしだと、以下のように書く
#f = print_info(plus)
#print(f(15, 25))
```