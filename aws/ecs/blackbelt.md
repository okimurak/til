# Elastic Container Service (ECS)

Amazon ECS コンテナエージェントを実行して、クラスターに登録されている EC2 インスタンスを操作する
EC2 は Amazon ECS-optimized AMI を使って作る

## ECS-optimized AMI

コンテナインスタンスに求められる要件/推奨事項に従って事前構成された AMI

- Docker demon
- ECS コンテナエージェント

## ECS コンテナエージェント

ECS コントロールプレーンと通信し、コンテナインスタンスの管理やタスクの起動停止を行う
ECS--optimized AMI を元に起動していない場合、自身でインストールする必要がある
エージェント自体もコンテナで実行される

## コンテナインスタンスのドレイン

クラスタからコンテナインスタンスを削除すること

コンテナインスタンスを DRAINING に設定

- 新規タスクは配置されない
- PENDING 状態のサービスタスクは即時停止
- RUNNING 状態のサービスタスクはデプロイ設定に応じて置換

## EC2 起動タイプの課題

- EC2 インスタンスの運用業務
  - OS のパッチ当てとかエージェントのアップデート

## タスク定義

イミュータブルのため、後から変更できない。新しいリビジョンを作成する必要がある

- 必須
  - family ... タスク定義のリビジョン
  - containerDefiniton
    - name
    - image
    - memory ... ハードリミット
    - memoryReservation ... ソフト制限
    - logConfiguration
      - logDriver
      - options, secretOptions
    - environment
      - 環境変数として設定する。平文
    - secrets
      - 機密情報を環境変数に設定
      - Amazon Serets Manager シークレット
      - Amazon Systems Manager パラメータストアの パラメータ
      - それぞれタスク実行ロールに適切な IAM アクセス許可設定が必要
    - depentdsOn ... 実行順制御
      - condition (START|COMPLETE|SCUCESS|HEALTHY)
        - START ... 依存先が起動開始したら起動し始める
        - COMPLETE ... 終了後に起動開始
  - taskRoleArn ... コンテナが利用できる IAM ロール
  - executionRoleArn ... ECS コンテナエージェントが利用する IAMRole ECR からの pull や CloudWatchLogs への書き込みなど
  - networkMode

## タスク定義更新方法

- 新しいタスク定義のリビジョンを作成
- サービスを更新する

## awslogs ログドライバー

コンテナアプリのログは STDOUT/STDERR で CloudWatchLogs に出力される

## コンテナの機密情報の取り扱い

secrets, logConfiguration->secretOptions ではいずれかに格納されたデータ参照可能

- Amazon Serets Manager シークレット
  - EC2 起動タイプでは、JSON キーやバージョンを指定可能 (Fargate では未サポート)
- Amazon Systems Manager パラメータストアの パラメータ
  - 同じリージョンなら名前だけ。別リージョンなら完全な ARN が必要

## ECS と IAM の連携整理

- クラスターパーミッション
  - クラスタのタスク起動、参照を制御
- コンテナインスタンスロール
  - コンテナインスタンスの ECS API へのアクセス許可
- アプリケーション：タスクロール
  - コンテナが AWS リソースに安全にアクセスすることを許可
- ハウスキーピング
  - タスク実行ロール
    - コンテナレジストリのイメージ取得
  - ECS のサービスにリンクされたロール
    - Elastic network inferface の作成
    - ELB へのターゲット登録解除

## ネットワークモード

Windows は指定できない

- none ... 外部と指定しない
- bridge ... EC2 起動タイプのデフォルト。Docker の組み込み仮想ネットワーク
- host ... Docker の仮想ネットワークをバイパスして、コンテナポートがホスト EC2 インスタンスの NIC にマッピング
- awsvpc
  - タスクごとに ENI を自動割当
  - EC2 にアタッチして実現しているので、EC2 インスタンスの ENI アタッチ上限に引っかかるかも
  - ENI トランキングを使う(ECS のアカウント設定から設定)

## データボリューム

- Docker ボリューム

  - タスク間の共有や明示的なライフサイクル管理
  - EC2 起動タイプのみ

- バインドマウント

  - ホストマシン上のファイル/ディレクトリをコンテナにマウント

- EFS
  - NFS でアクセス（パフォーマンスも検討してね）
  - EC2 起動の場合は、ECS コンテナエージェント 1.35 以上
  - Fargate1.4 以上

## 今後のロードマップ

- [aws/containers-roadmap: This is the public roadmap for AWS container services (ECS, ECR, Fargate, and EKS).](https://github.com/aws/containers-roadmap)

## Reference

- [【AWS Black Belt Online Seminar】Amazon Elastic Container Service (Amazon ECS) - YouTube](https://www.youtube.com/watch?v=tmMLLjQrrRA&feature=youtu.be)
- [20200422 AWS Black Belt Online Seminar Amazon Elastic Container Servi…](https://www.slideshare.net/AmazonWebServicesJapan/20200422-aws-black-belt-online-seminar-amazon-elastic-container-service-amazon-ecs)
