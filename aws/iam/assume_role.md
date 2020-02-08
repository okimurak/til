# Assume Role

IAMの権限の委譲、委任をすること。`STS(Security Token Service)`を使う

- 委任する側のユーザを作成し、assumeRoleに許可したいAWSサービスと操作内容を書く

    sts:AssumeRole

- そのユーザのクレデンシャルをアプリやOSやAWSサービスに設定すれば
許可したAWSのサービスが一時的に使える
    - これが勝手にできるアプリやサービスもある

以下がわかりやすいかも

[IAMロール徹底理解 〜 AssumeRoleの正体 | DevelopersIO](https://dev.classmethod.jp/cloud/aws/iam-role-and-assumerole/)

[チュートリアル: AWS アカウント間の IAM ロールを使用したアクセスの委任](https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html)

[初めてのAssumeRole | DevelopersIO](https://dev.classmethod.jp/etc/sugano-005-s3/)

## クロスアカウントのAssume Role

ユーザでも、Roleでもできるよ！  
この仕組みをプログラムで使う場合は、STS使用が必要かも（AssumeRoleをする)

### 引き受けがユーザの場合

    # やりたいこと
    
    AWS account 1 の IAM ユーザ foo から AWS account 2 の barRole を実行する
    
    # 設定
    
    ## account 1 側
    
    IAM ユーザ foo に account 2 の barRole を AssumeRole できるようpolicy を attach する。
    switch role可能なroleを名前で絞ることもできる
    
    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "",
                "Effect": "Allow",
                "Action": "sts:AssumeRole",
                "Resource": "arn:aws:iam::<account 2 の id>:role/*"
            }
        ]
    }
    ```
    
    ## account 2側
    
    switch role される role へ trust relationship をつける。
    `sts:ExternalId` を設定すると management console で switch role できない。
    
    
    
    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": {
            "AWS": "arn:aws:iam::<accoun 1 のid>:root" or "arn:aws:iam::<accoun 1 のid>:user/<iam ユーザ名>"
          },
          "Action": "sts:AssumeRole",
          "Condition": {}
        }
      ]
    }
    ```

### 引き受けがロールの場合

- 上記のユーザがpolicyになる