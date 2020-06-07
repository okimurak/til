# MFA を必須にする

`Condition`に以下を追加

```json
"Condition": {
  "BoolIfExists": {
    "aws:MultiFactorAuthPresent": "true"
  }
}
```
