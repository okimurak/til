# Moto

boto3 のテスト用として、AWS オブジェクトのモックを作成することができるライブラリ

- [spulec/moto: A library that allows you to easily mock out tests based on AWS infrastructure.](https://github.com/spulec/moto)

## 使い方

テストしたい、AWS のオブジェクト用デコレータをつけてテストをする

## 使用例

pytest での例を示します。

```python
import pytest

import boto3
from moto import mock_s3

@pytest.fixture(scope='function')
def aws_credentials():
    """Mocked AWS Credentials for moto."""
    # boto3 の仕様で、必ず必要 https://github.com/spulec/moto#very-important----recommended-usage
    os.environ['AWS_ACCESS_KEY_ID'] = 'testing'
    os.environ['AWS_SECRET_ACCESS_KEY'] = 'testing'
    os.environ['AWS_SECURITY_TOKEN'] = 'testing'
    os.environ['AWS_SESSION_TOKEN'] = 'testing'

@mosk_s3
def test_s3_object_value(aws_credentials):
    s3 = boto3.client('s3')
    # s3バケットのモックを作成して、オブジェクトを PUT
    s3.create_bucket(Bucket='test-bucket')
    s3.put_object(Bucket='test-bucket', Key="test.txt", Body="hello")
    body = s3.get_object(Bucket='test-bucket', Key="test.txt")['Body'].read().decode("utf-8")

    assert body == 'hello'
```

## S3 のモック作成時の注意

リージョンを指定して作成する場合、`CreateBucketConfiguration` を設定しないと、`IllegalLocationConstraintException` になるため注意

ちなみにデフォルト値は `us-east-1` となる。

参考リンク：[S3 - Allow create_bucket(region=None), instead of throwing IllegalLocationConstraintException · Issue #3292 · spulec/moto](https://github.com/spulec/moto/issues/3292#issuecomment-688687502)

```python
def test_s3_update():
    s3 = boto3.client('s3', region_name='ap-northeast-1')
    # s3バケットのモックを作成して、オブジェクトを PUT
    s3.create_bucket(Bucket='test-bucket', CreateBucketConfiguration={'LocationConstraint': 'ap-northeast-1'})
    s3.put_object(Bucket='test-bucket', Key="test.txt", Body="hello")
    s3.put_object(Bucket='test-bucket', Key="test.txt", Body="Good bye")
    body = s3.get_object(Bucket='test-bucket', Key="test.txt")['Body'].read().decode("utf-8")

    assert body == 'Good bye'
```
