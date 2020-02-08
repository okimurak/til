# Simple System Manager Parameter Store

環境変数といった変数を管理するためのマネージドサービス

## EC2やECSコンテナに設定するシークレットについて

SSMパラメータストアか SecretManager のどちらかになる

## aws-cliによるSSM操作

### 値挿入

    aws ssm put-parameter --name <値の名前> --value <値> --type <型> (上書きする場合は--overwrite)
    
    型は　String（平文）か SecureString (暗号化文字列)

### 値取得

    aws ssm get-parameter --output text --name <値の名前> --query Parameter.Value (復号する場合）--with-decryption

### 暗号化
暗号化を指定して文字列を取得すると、（当然）暗号化されている

    PS D:\Document\repository\terraform_study> aws ssm get-parameter --output text --name 'encryption_name' --query Parameter.Value
    AQICAHi4/AScQX4xfmrt3msIL1FdGCV4JVETaljgiWIZaF0hswH4+9cqN/U9SFjOYC6zKYGhAAAAbjBsBgkqhkiG9w0BBwagXzBdAgEAMFgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMuSjH1dPrQYM+r5Z1AgEQgCvvH3bm0661MVHUTN0LBlW2811gW1fbZbKxpdO+ju0gTd6aqoSFoiA9LjP1
    PS D:\Document\repository\terraform_study> aws ssm get-parameter --output text --name 'encryption_name' --query Parameter.Value --with-decryption
    encryption value
    PS D:\Document\repository\terraform_study>

## 名前空間

名前空間を使ってグルーピングできる

```
TestApp/Development/HOGEHOGE_KEY
TestApp/Development/FUGAFUGA_KEY
```

しかも、グループごとにパラメータをまとめて値取得できる

```
aws ssm get-parameter-by-path --path "/${APP_NAME}/${APP_ENV}"
```

以下はパラメータストアに設定するパラメータをjson形式で保存する前提がある

AWS SSMパラメータストアから環境変数などを設定する場合、jqを使って下記のように設定できる

### システム環境変数に突っ込む場合

```
export $(echo $SSM_ENV | jq -r 'keys[] as $k | "export \($k)=\(.[$k])"')
```

### ファイルに書き出す場合(.env形式)

```
echo $SSM_ENV | jq -r 'keys[] as $k | "\($k)=\(.[$k])"' >> .env
```

## 参考

[パラメータストアからEC2に環境変数を設定する - Qiita](https://qiita.com/th_/items/8ffb28dd6d27779a6c9d)
