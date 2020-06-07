# SSM (Simple System Manager) Parameter Store

環境変数といった変数を管理するためのマネージドサービス

## EC2 や ECS コンテナに設定するシークレットについて

SSM パラメータストアか SecretManager のどちらかになる

## aws-cli による SSM 操作

### 値挿入

```shell
aws ssm put-parameter --name <値の名前> --value <値> --type <型> (上書きする場合は--overwrite)
```

型は　 String（平文）か SecureString (暗号化文字列)

### 値取得

```shell
aws ssm get-parameter --output text --name <値の名前> --query Parameter.Value (復号する場合）--with-decryption
```

### 暗号化

暗号化を指定して文字列を取得すると、（当然）暗号化されている

```shell
aws ssm get-parameter --output text --name 'encryption_name' --query Parameter.Value
AQICAHi4/AScQX4xfmrt3msIL1FdGCV4JVETaljgiWIZaF0hswH4+9cqN/U9SFjOYC6zKYGhAAAAbjBsBgkqhkiG9w0BBwagXzBdAgEAMFgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMuSjH1dPrQYM+r5Z1AgEQgCvvH3bm0661MVHUTN0LBlW2811gW1fbZbKxpdO+ju0gTd6aqoSFoiA9LjP1
aws ssm get-parameter --output text --name 'encryption_name' --query Parameter.Value --with-decryption
encryption value
```

## 名前空間

パスみたいに、名前空間を使ってグルーピングできる

```text
TestApp/Development/HOGEHOGE_KEY
TestApp/Development/FUGAFUGA_KEY
```

しかも、グループごとにパラメータをまとめて値取得できる

```text
aws ssm get-parameter-by-path --path "/${APP_NAME}/${APP_ENV}"
```

## JSON

json 形式で保存した　 Key Value 形式を、パラメータストアから環境変数などを設定する場合、jq を使って下記のように設定する

### システム環境変数に突っ込む場合

```shell
export $(echo $SSM_ENV | jq -r 'keys[] as $k | "export \($k)=\(.[$k])"')
```

### ファイルに書き出す場合(.env 形式)

```shell
echo $SSM_ENV | jq -r 'keys[] as $k | "\($k)=\(.[$k])"' >> .env
```

## Reference

- [パラメータストアから EC2 に環境変数を設定する - Qiita](https://qiita.com/th_/items/8ffb28dd6d27779a6c9d)
