# StepFunctions と AWS CDK

ワークフローを生成するためのマネージドツール

## State

- Task ... 基本処理単位。ここから Lambda や ECS を呼び出すことができる
- Wait ... 待機処理
- Parallel ... 並列処理
- Choice ... 条件分岐処理。前処理の output を受け取り、その値によって分岐させる
- Succeed, Fail ... 成功か失敗かを定義する。Choice と組み合わせ、Choice の結果に合わせて使う。到達した段階でステートマシンは終了する
- Map ... 動的並列処理を行う。input に配列を受け取り配列の数だけ処理を繰り返す。

## ASL (Amazon Langugae)

ステートマシンへ JSON を入力できる。ステートマシンへ受け取るには下記のように記載する。

入力例：

```:json
{
  "input": {
    "important" : "fugafuga"
  }
}
```


ステートマシンでの受け取り例

```:json
{
  "hogehoge.$" : "$.imput.important"
}
```

また、ステートマシン起動時に予め設定されているオブジェクト([Contextオブジェクト](https://docs.aws.amazon.com/ja_jp/step-functions/latest/dg/input-output-contextobject.html))にもアクセスすることができる


```:json
{
  "starttime.$$" : "$$.State.EnteredTime"
}
```

## AWS CDK

StepfunctionできるStepfunctionで良い

### タスクの順次処理

`.next()`を記述するだけで簡単にかける。チェインすることもできる

### AWS CDK によるデプロイ

```bash
npm run build
npm run cdk deploy
```

## Reference

- [AWS CDK + Step Functions 入門 #devio2020 - YouTube](https://www.youtube.com/watch?v=YL8SI8F-y54&feature=youtu.be)
