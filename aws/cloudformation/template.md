# テンプレート

## プロパティの仕様

[プロパティの仕様 - 仕様の形式 - AWS CloudFormation](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/cfn-resource-specification-format.html#cfn-resource-specification-format-propertytypes) を参照のこと。

## リソースの仕様

[リソース仕様 - 仕様の形式 - AWS CloudFormation](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/cfn-resource-specification-format.html#cfn-resource-specification-format-resourcetype) を参照のこと。

ここでいう `Attirbutes` とは `Fn::GetAtt` 関数で使用できるリソース属性の一覧。

## スキーマ

[CloudFormation リソースプロバイダースキーマ - AWS CloudFormation](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/resource-type-schemas.html) からリージョンごとに別れているため、選択してダウンロードする。

## 組み込み関数の短縮形

`Fn::<FunctionName>` を `!<FunctionName>` と書ける。

## 参照

同じスタックのリソースやパラメータを参照したい場合は、組み込み関数 `Fn::Ref` を使う。リソースごとに `Ref` で返す値が異なるので、公式ドキュメントを参照すること。

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  FirstVPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      Tags:
      - Key: Name
        Value: FirstVPC
  InternetGateway:
    Type: AWS::EC2::InternetGateway
    Properties:
      Tags:
        - Key: Name
          Value: FirstVPC-IGW
  AttachGateway:
    Type: AWS::EC2::VPCGatewayAttachment
    Properties:
      VpcId: !Ref FirstVPC
```

別のスタックから参照したい場合(クロススタック)は、`Fn::InportValue` を使う。これは別スタックで記載した `Outputs` セクションの値を読み込むことができる。

※ クロススタックはリージョン間では不可。

[Fn::ImportValue - AWS CloudFormation](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-importvalue.html)

### SSM パラメータストアや、Secrets Manager の値を参照する

秘匿情報はベタ書きせず、SSM パラメータストア Secure Strings や、Secret Manager に保存して、参照させること。

- SSM パラメータストア : `'resolve:ssm:<パラメータ名:<version>>'`
- SSM パラメータストア(Secure Strings) : `'resolve:ssm-secure:<パラメータ名:<version>>'`
- Secrets Manager : `'resolve:secretmanager:<secret-id>:<secret-string>:<json-key>:<version-stage>:<version-id>'`

[動的な参照を使用してテンプレート値を指定する - AWS CloudFormation](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/dynamic-references.html)

## 依存関係の定義

`DependsOn` 属性を使う。ただし、`!Ref` と `!GetAtt` の組み込み関数を使うと、暗黙的な依存関係がある。

```yaml
  AttachGateway:
    Type: AWS::EC2::VPCGatewayAttachment
    Properties:
      VpcId: !Ref FirstVPC
      InternetGatewayId: !Ref InternetGateway
  FrontendRouteTable:
    Type: AWS::EC2::RouteTable
    DependsOn: AttachGateway
    Properties:
      VpcId: !Ref FirstVPC
      Tags:
        - Key: Name
          Value: FirstVPC-FrontendRoute
```

- [DependsOn 属性 - AWS CloudFormation](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html)

## GetAtt

テンプレートのリソースの値を返す。こちらのほうが直感的。こちらもリソースの属性によって返す値が異なるので、公式ドキュメントを参照すること。

- [Fn::GetAtt - AWS CloudFormation](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-getatt.html)

## 条件式

`Fn::And`, `Fn::Equals`, `Fn::Not`, `Fn::Or` がサポートされている。 (意味から察して)

`Fn::If` を使うと、 `True` の場合と、 `False` の場合で設定値を変えることができる。

```yaml
Fn::If: [<condition_name>, <value_if_true>, <value_if_false>]
```

`Attribute` の `Condition` キーを使うことで、リソースを作るかどうかを設定できる。

```yaml
NewVolume:
  Type: AWS::EC2::Volume
  Condition: CreateProdResources
  Properties:
    Size: 100
    AvailabilityZone: !GetAtt Ec2Instance.AvailabilityZone
```

## 擬似パラメータ参照

事前定義されたパラメータ。アカウント ID やリージョン名、スタック名など。

[擬似パラメータ参照 - AWS CloudFormation](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/pseudo-parameter-reference.html)

## 参考

- [【CloudFormation入門】5分と6行で始めるAWS CloudFormationテンプレートによるインフラ構築 | DevelopersIO](https://dev.classmethod.jp/articles/cloudformation-beginner01/)
- [テンプレートの分析 - AWS CloudFormation](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/template-anatomy.html#w2ab2c17c15b9)
- [組み込み関数リファレンス - AWS CloudFormation](https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference.html)
- [CloudFormation の参照周りで意識すべきポイント・Tips | DevelopersIO](https://dev.classmethod.jp/articles/cloudformation-tips-focused-on-refs/)
