# SSH

## 鍵の作成

ssh-keygenコマンドを使う

.ssh配下に秘密鍵と公開鍵ができる

    # rsa暗号鍵
    # -f 鍵ファイル名 指定しないと、id_<鍵タイプ>ができる
    # -t 鍵タイプ rsa | dsa | ecdsa | ed25519 | rsa1
    # -b ビット数  4096とか
    # -C コメント  わかるように
    
    # 使用例
    ssh-keygen -t rsa -f tekito
    
    # どこに作るか聞かれる
    > Enter file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]
    
    # パスフレーズの入力を求められる（しなくてもいいけど）
    Enter passphrase (empty for no passphrase): [Type a passphrase]
    Enter same passphrase again: [Type passphrase again]
    
    ## 以下が作られる
    ## /.ssh/tekito_rsa.pub 公開鍵
    ## /.ssh/tekito_rsa     秘密鍵

基本的には公開鍵は接続される側（サーバ）に、秘密鍵は接続する側（クライアント）に配置する

公開鍵は、.ssh/authorized_keysに追記する

    ## /.ssh/tekito_rsa.pub 公開鍵をつくったとして
    
    cat tekito_rsa.pub >> ~/.ssh/authorized_keys

## 秘密鍵から公開鍵を生成する

作れるんだっけ

    ssh-keygen -yf ${private_key_file} > ${public_key_file}

## 参考

- [SSH-KEYGEN (1)](https://euske.github.io/openssh-jman/ssh-keygen.html)

- [お前らのSSH Keysの作り方は間違っている - Qiita](https://qiita.com/suthio/items/2760e4cff0e185fe2db9)

- [秘密鍵から公開鍵を生成する - Qiita](https://qiita.com/hnakamur/items/94a3a1d8862941a13d4f)