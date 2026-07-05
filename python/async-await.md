# async, await

asyncio パッケージで非同期処理が使える

Python 3.5 -

```python
import asyncio

async def wait(sec):
  await asyncio.sleep(sec)

async def main():
  r = await wait(5)
  print('finish')

if __name__ == "__main__":
  asyncio.run(main()) # run() はPython 3.7 - 
```
