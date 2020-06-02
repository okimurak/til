# S3 Glacier

S3のアーカイブサービス

## 料金

- ストレージは 毎月0.004USD/ GB, 1USD / TByteの利用ができる
- アップロードリクエストは1000リクエストにつき、0.05USD

## データのアップロード

1アーカイブごとにIDが振られる。1アーカイブにつき、ファイルを複数入れることが可能。  
アップロード先は**ボールド** というらしい（アーカイブを一まとめ）  
個々のアーカイブは1~40TBまでという制約はある

```bash
aws glacier upload-archive --account-id %ACCOUNT_ID% --vault-name %VAULT_NAME% --archive-description %ZIP_DESC% --body %ZIP_FILENAME%

{
    "archiveId": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "checksum": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "location": "/xxxxxxxxxx/vaults/vaultname/archives/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}

戻り値にアーカイブIDが付与されるのでメモしておくんだよ。（後で確認する方法もある


```

## アーカイブの確認

```bash
aws glacier initiate-job --account-id %ACCOUNT_ID% --vault-name %VAULT_NAME% --job-parameters file://inventory-retrieval.json

# Responce
{
    "location": "/xxxxxxxxxx/vaults/vaultname/archives/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "jobId": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

## データのダウンロード


ダウンロードするためのジョブを開始する

```bash
aws glacier get-job-output --account-id %ACCOUNT_ID% --vault-name %VAULT_NAME% --job-id %JOB_ID% %OUTPUT_FILENAME%
```

数時間かかるので、以下でジョブ状態を確認できる

```bash
aws glacier list-jobs --account-id %ACCOUNT_ID% --vault-name %VAULT_NAME%
```

### 参考

- [よくある質問 - Amazon S3 Glacier | AWS](https://aws.amazon.com/jp/glacier/faqs/#dataretrievals)
- [Amazon Glacierでクラウド破産しないために - HDE BLOG](http://blog.hde.co.jp/entry/2015/01/30/154101)
- [AWS Glacier にCLIでアーカイブをアップロード／ダウンロードする \- Qiita](https://qiita.com/fkooo/items/9c49a084a1926def627b#)