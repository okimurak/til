# Githubの他のプライベートリポジトリからcloneできるようにする

CircleCIでは、Projectに関連づけたプライベートリポジトリ1つだけがcloneできるが
以下の二通りが有る

## SSH Permissionを登録する

1. SSHの鍵を生成する
1. GithubのDeploy keyに公開鍵を登録する
1. CircleCIのConsoleから秘密鍵を登録する
  - SSH Permission - Add SSH keys
    - Hostnameにgithub.com以外の文字を追加する。例えばgithub.com-aとか
    - SSH KeyはGithubで発行したSSH Keyを使う
    [Circle CI で Github に write access 可能な Deploy key を設定する - Qiita](https://qiita.com/boushi-bird@github/items/6b6eb1d1ed6f6d3341e4)

## User keyを登録する

cloneするプライベートリポジトリに権限を持つ、ユーザのkeyを登録する。
楽だけど、そのユーザがプライベートリポジトリの管理下からいなくなると繋がらなくなる

## 参考

- [CircleCIで任意のprivateリポジトリをcloneする - Qiita](https://qiita.com/yuku_t/items/53a3f2444d254e42c5be)

[本当にそれでいい？CircleCIにおける複数のPrivateリポジトリのClone方法](https://medium.com/veltra-engineering/there-may-be-security-risks-in-your-clone-of-multiple-private-repositories-in-circleci-6ae6368eacb9)