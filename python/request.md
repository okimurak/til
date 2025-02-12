# Request

## How to use ? 

```python
import requests

headers =  {
  'Accept': 'application/json'
}

params = (
  ('name', "hogehoge")

url = "https://hogehoge.fugafuga.com/"

response = requests.get(url, headers=headers, params=params)

## Convert Dictionaly from json data
data = response.json()

## Show formatted JSON.
print(json.dumps(data["response"], indent=2))
)
```

## Reference
- [クイックスタート — requests-docs-ja 1.0.4 documentation](https://requests-docs-ja.readthedocs.io/en/latest/user/quickstart/)
- [Pythonでcurlコマンドと同等の処理を実行する方法 - 知的好奇心](https://intellectual-curiosity.tokyo/2019/08/31/python%E3%81%A7curl%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%81%A8%E5%90%8C%E7%AD%89%E3%81%AE%E5%87%A6%E7%90%86%E3%82%92%E5%AE%9F%E8%A1%8C%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95/)
