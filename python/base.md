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

Inner Function を使えば、簡単にかける

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

### Lambda

`lambda` 演算子をつかう

```python

def change_words(words, func):
  for word in words:
    print(func(word))


l = ['Mon', 'tue', 'Wed', 'Thu', 'fri', 'sat', 'Sun']

change_words(l, lambda word: word.capitalize())
```

### Generator

```python

def run_counter(num=5):
  for _ in range(num):
    yield 'run'

def greeting():
  yield 'Good morning'
  yield 'Good afternoon'
  yield 'Good nignt'

g = greeting

print(next(g))
```

### Comprehension

内包表記

```python
d = [1,2,3,4,5]
key = ['A', 'B', 'C']
value = ['apple', 'banana', 'chocolate']

list = [i for i * 2 in d if i % 2 == 0]
dict = {x: y, for x, y in zip(key, value)}
set = {s for i in range(10) if s % 2 == 0}
tupple = tupple(i fof i in range(10))
generator = (i fof i in range(10))
```

## Class

### Constructor

```python

class Hello(object):

    def __init__(self):
        ...
```

### Destructor

```python

class Hello(object):

    def __del__(self):
        ...
```

### Inherited

```python
class Tool:

    def __init__(self, model=None)
        self.model = model

    def use(self):
        ...

    def name(self):
        print("Tool")
        ...

class Scissors(Tool):

    def __init__(self, model=None, size=10)
        super().__init__(model)
        self.size = size

    def cut(self):
      ...

    def name(self):
        print("Scissors") # override



s = Scissors()

s.use()
s.cut()
```

### Properties

値の入力制限に使うといい

- `_` ... プロパティ経由
- `__` ... クラス内のみ

```python

class Test(object):
    def __init__(self, name=None, type=None):
        self._name = name
        self.__type = type # Don't access from out

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, name):
        self._name = name


```

以下のように、再定義出来てしまうので注意

```python


class Test(object):

    def __init__(self, name=None):
        self.__name = name


t = Test("Mike")
# print(t.__name) これはインタプリタに怒られる
t.__name = "Hanako"
# print(t.__name) Hanako と出力。つまり書き換えられる
```

### Abstract class

```python

import abc

class Person(metaclass=abc.ABCMeta)

    @abc.abstractmethod
    def say(self):
        pass


class Police(Person):
    pass


p = Police() # Error
```

### Multiple Interitance

細書に定義したクラスのメソッド優先

```python

class Thing(object):

    def size(self):
        print("size")

    def name(self):
        print("Thing")

class Type(object):

    def name(self):
        print("Type")


class Box(Thing, Type):
    pass

b = Box()

b.size()  # size
b.name()  # Thing

```

### Classmethod

```Python

class Test(object):

   kind = "unit"

   @classmedhod
   def kind(cls):
       return cls.kind

    @staticmethod
    def about():
       return "This is test."


print(Test.kind())
print(Test.about())

```
