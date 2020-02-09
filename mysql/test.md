# Test

## Pytest

### Install

    pip3 install pytest

### Fixture

関数として、テストのために事前処理する機能を作ることができる。

例えば、テストデータ、オブジェクトの準備とか

    import pytest
    import json
    
    # jsonデータを読み込むとか
    @pytest.fixture(scope="module")
    def get_test_message_data():
      with open("./test/data/message.json") as f:
        return json.load(f)

Fixtureは一つのテストに書くことも可能ですが、他テストとも共有したいときは`conftest.py`を作成して、その中に記載します。

(ちなみに、conftest.pyは例えばtestディレクトリを作流場合にも必要になります。クラスのインポートがうまくいかない)

### Monkypatching


コードの一部を差し替える機能。環境変数を再定義したり、コードの挙動を変えることが可能

```
import os.path

def getssh()
   return os.path.join(os.path.expanduser("~admin"), '.ssh'

def test_sshtest(monkeypatch):
    def mockreturn(path):
        return '/abc'
    monkeypatch.setattr(os.path, 'expanduser', mockreturn) # expanduserをmockreturnに置換
    x = getssh()
    assert x == '/abc/.ssh'
```

- [Monkeypatching/mocking modules and environments — pytest documentation](https://docs.pytest.org/en/latest/monkeypatch.html)
- [pytestの使い方と便利な機能 \- Qiita](https://qiita.com/sasaki77/items/97c90ae272373d78b422#monkey-patching--mock)

## doctest

コメントアウトとしてドキュメントライクにテストを書くことが可能  
ただし大量に書くと、ドキュメントが読みづらくなる  
他モジュールをインポートできない

### 使用例

```

def add(a, b):
  '''dotstring
  >>> add(2, 3)
  5
  '''

  return a + b;

if __name__ == '__main__'
  import doctest
  doctest.testmod()

```

## 参考

- [doctest - Test interactive Python examples - Python 3.8.0 documentation](https://docs.python.org/3/library/doctest.html)

- [初心者向け・Pythonのdoctestモジュールを使ってユニットテストする方法 \- paiza開発日誌](https://paiza.hatenablog.com/entry/2019/03/22/%E5%88%9D%E5%BF%83%E8%80%85%E5%90%91%E3%81%91%E3%83%BBPython%E3%81%AEdoctest%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%83%A6%E3%83%8B%E3%83%83%E3%83%88%E3%83%86)

