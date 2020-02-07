## grep

よく使うgrepを

### 空行とコメントアウトをマスク

```
grep -v '^\s*$' <filename> | grep -v '^\ds*#' 
```