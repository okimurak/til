  """monkeypatching のサンプル
  """

import pytest

from hogehoge_module from fuga_function

def test_fuga_function(monkeypatch):
  def mock_fuga_function():
    return "test_fuga"

  # 関数の差し替え
  monkeypatch.setattr("hogehoge_module.fuga_function", mock_fuga_function)

  assert "test_fuga" == fuga_function()