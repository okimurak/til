# lint

[hadolint](https://github.com/hadolint/hadolint)が便利。いちいちBuildする手間を省ける

## Install

バイナリ

```
curl -L -O https://github.com/hadolint/hadolint/releases/download/v1.15.0/hadolint-Linux-x86_64
chmod +x hadolint-Linux-x86_64
```

Docker

```
docker pull hadolint/hadolint
```

## Execution

```
hadolint <DockerFile>
```

## Config

コマンドラインで設定でもできるけど`.hadolintyaml`を生成して設定できる。`ignore`を設定できる

```
ignored:
  - DL3000
  - SC1010

trustedRegistries: # 信頼されたイメージを登録できる
  - docker.io
  - my-company.com:5000
```

## 参考

- [Dockerfileの静的解析ツールが便利すぎた \- Qiita](https://qiita.com/ryuichi1208/items/d49f3f6ba39c88899049)