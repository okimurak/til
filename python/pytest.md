# Pytest

## Option

- `-s` : Test 内の print の内容も出力できる
- `-rs` : Ski@p した情報、理由を参照できる

## Setup, TearDown

`setup_class` -> `setup_method` -> `test` -> `teardown_method` -> `teardown_class` と実行される。

```python

@classmethod
def setup_class(cls):
    something code ...

def setup_method(self, method):
    something code ...

def teardown_method(self, method):
    something code ... (ex: del hogehoge)

@classmethod
def teardown_class(cls):
    something code ...
```

## Builtin Fixture

Pytest で事前に定義されている Fixtrue。`@pytest.fixture` というデコレータが不要。

- config ... pytest の構成オブジェクト
- tmpdir ... pytest で使う tmp ディレクトリのパス

[Pytest API and builtin fixtures](https://docs.pytest.org/en/2.8.7/builtin.html)

### Example

`conftest`

```python

def pytest_addoption(parser):
    paser.addoption('--env', default='test', help='Environtment Name')

```

`test/py`

```python:conftest
import os

def test_ent(self, request):
    env_name = request.config.getoption('--env')
    assert env_name == "test"

def test_path(self, tmpdir):
    hogehoge.path(tmpdir) # テスト対象がパスに対してなにかやる
    test_path = os.path.join(tmpfir, "hogehoge.txt")
    assert os.path.exist(test_path)

```

## Raise

`pytest.raises` を使う。

```python
def test_raise():
    with pytest.raises(ValueError):
        hoge.fuga_method()
```

## Skip

```python

@pytest.mark.skip # テスト実行をスキップできる
def test_hoge_skip_method(reason='Skip reason string'):
    something test code ...

is_skip = True

@pytest.mark.skipif(is_skip=True) # 条件付きでテスト実行をスキップできる
def test_fuga_skip_method(reason='Skip reason string'):
    something test code ...

```

## Coverage

`pytest-cov`, `pytest-xdist` を使う。

### Install

```bash
pip install pytest-cov pytest-xdist
```

### Run

```bash
pytest <test>.py  --cov=<method_name> --cov-report term-missing
```
