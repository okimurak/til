# Class

```python
class MyClass:

  def __init__(self): ## コンストラクタ
    self.name = ''
    self.__middle_name = 'Alex'  # private メンバ変数の慣習(実際はアクセスできるs)

  def getName(self):  ## Getter
    return self.name

  def setName(self, name): ## Setter
    self.name = name

  def __del__(self):  # デストラクタ（クラスインスタンス削除時に call)
    print(self.name)

c = MyClass()
a.setName('Sato')
print(a.getName())
```

## 継承(inheritance)

```python

class Car:
  def drive(self):
    print('Drive!')

  def stop(self):
    print('Stop!')

class Taxi(Car):
  def __init__(self):
    self.fare = 10
  def drive_with_payment(self):
    super(Taxi, self).drive()
    self.fare = self.fare + 10

  def stop(self):  # Override
    print('Stop! and Payment! {}'.format(self.fare))
```

## 参考

- [とほほのPython入門 - クラス - とほほのWWW入門](https://www.tohoho-web.com/python/class.html#class)
