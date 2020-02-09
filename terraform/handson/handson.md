# Terraform事始め

## 公式のチュートリアル

[Terraform Curriculum - HashiCorp Learn](https://learn.hashicorp.com/terraform?track=getting-started#getting-started)

## Build Infrastructure

- [Build Infrastructure \| Terraform \- HashiCorp Learn](https://learn.hashicorp.com/terraform/getting-started/build)

## init

最初に実行する。定義したproviderから、対応したプラグインを取ってくるみたい

    PS D:\Document\repository\terraform_study> terraform init
    
    Initializing the backend...
    
    Initializing provider plugins...
    - Checking for available provider plugins...
    - Downloading plugin for provider "aws" (hashicorp/aws) 2.33.0...
    
    Terraform has been successfully initialized!
    
    You may now begin working with Terraform. Try running "terraform plan" to see
    any changes that are required for your infrastructure. All Terraform commands
    should now work.
    
    If you ever set or change modules or backend configuration for Terraform,
    rerun this command to reinitialize your working directory. If you forget, other
    commands will detect it and remind you to do so if necessary.
    PS D:\Document\repository\terraform_study> terraform plan

## plan

定義内容をチェックする

    PS D:\Document\repository\terraform_study> terraform plan
    Refreshing Terraform state in-memory prior to plan...
    The refreshed state will be used to calculate this plan, but will not be
    persisted to local or remote state storage.
    
    
    ------------------------------------------------------------------------
    
    An execution plan has been generated and is shown below.
    Resource actions are indicated with the following symbols:
      + create
    
    Terraform will perform the following actions:
    
      # aws_instance.sandbox[0] will be created
      + resource "aws_instance" "sandbox" {
          + ami                          = "ami-785c491f"
          + arn                          = (known after apply)
          + associate_public_ip_address  = (known after apply)
          + availability_zone            = (known after apply)
          + cpu_core_count               = (known after apply)
          + cpu_threads_per_core         = (known after apply)
          + get_password_data            = false
          + host_id                      = (known after apply)
          + id                           = (known after apply)
          + instance_state               = (known after apply)
          + instance_type                = "t2.micro"
          + ipv6_address_count           = (known after apply)
          + ipv6_addresses               = (known after apply)
          + key_name                     = (known after apply)
          + network_interface_id         = (known after apply)
          + password_data                = (known after apply)
          + placement_group              = (known after apply)
          + primary_network_interface_id = (known after apply)
          + private_dns                  = (known after apply)
          + private_ip                   = (known after apply)
          + public_dns                   = (known after apply)
          + public_ip                    = (known after apply)
          + security_groups              = (known after apply)
          + source_dest_check            = true
          + subnet_id                    = (known after apply)
          + tags                         = {
              + "Name" = "sandbox-01"
            }
          + tenancy                      = (known after apply)
          + volume_tags                  = (known after apply)
          + vpc_security_group_ids       = (known after apply)
    
          + ebs_block_device {
              + delete_on_termination = (known after apply)
              + device_name           = (known after apply)
              + encrypted             = (known after apply)
              + iops                  = (known after apply)
              + kms_key_id            = (known after apply)
              + snapshot_id           = (known after apply)
              + volume_id             = (known after apply)
              + volume_size           = (known after apply)
              + volume_type           = (known after apply)
            }
    
          + ephemeral_block_device {
              + device_name  = (known after apply)
              + no_device    = (known after apply)
              + virtual_name = (known after apply)
            }
    
              + delete_on_termination = (known after apply)
              + encrypted             = (known after apply)
              + iops                  = (known after apply)
              + kms_key_id            = (known after apply)
              + volume_id             = (known after apply)
              + volume_size           = (known after apply)
              + volume_type           = (known after apply)
            }
        }
    
    Plan: 1 to add, 0 to change, 0 to destroy.
    
    ------------------------------------------------------------------------
    
    Note: You didn't specify an "-out" parameter to save this plan, so Terraform
    can't guarantee that exactly these actions will be performed if
    "terraform apply" is subsequently run.

## Apply

定義内容を適用する

    PS D:\Document\repository\terraform_study> terraform apply
    
    An execution plan has been generated and is shown below.
    Resource actions are indicated with the following symbols:
      + create
    
    Terraform will perform the following actions:
    
      # aws_instance.sandbox[0] will be created
      + resource "aws_instance" "sandbox" {
          + ami                          = "ami-785c491f"
          + arn                          = (known after apply)
          + associate_public_ip_address  = (known after apply)
          + availability_zone            = (known after apply)
          + cpu_core_count               = (known after apply)
          + cpu_threads_per_core         = (known after apply)
          + get_password_data            = false
          + host_id                      = (known after apply)
          + id                           = (known after apply)
          + instance_state               = (known after apply)
          + instance_type                = "t2.micro"
          + ipv6_address_count           = (known after apply)
          + ipv6_addresses               = (known after apply)
          + key_name                     = (known after apply)
          + network_interface_id         = (known after apply)
          + password_data                = (known after apply)
          + placement_group              = (known after apply)
          + primary_network_interface_id = (known after apply)
          + private_dns                  = (known after apply)
          + private_ip                   = (known after apply)
          + public_dns                   = (known after apply)
          + public_ip                    = (known after apply)
          + security_groups              = (known after apply)
          + source_dest_check            = true
          + subnet_id                    = (known after apply)
          + tags                         = {
              + "Name" = "sandbox-01"
            }
          + tenancy                      = (known after apply)
          + volume_tags                  = (known after apply)
          + vpc_security_group_ids       = (known after apply)
    
          + ebs_block_device {
              + delete_on_termination = (known after apply)
              + device_name           = (known after apply)
              + encrypted             = (known after apply)
              + iops                  = (known after apply)
              + kms_key_id            = (known after apply)
              + snapshot_id           = (known after apply)
              + volume_id             = (known after apply)
              + volume_size           = (known after apply)
              + volume_type           = (known after apply)
            }
    
          + ephemeral_block_device {
              + device_name  = (known after apply)
              + no_device    = (known after apply)
              + virtual_name = (known after apply)
            }
    
          + network_interface {
              + delete_on_termination = (known after apply)
              + device_index          = (known after apply)
              + network_interface_id  = (known after apply)
            }
    
          + root_block_device {
              + delete_on_termination = (known after apply)
              + encrypted             = (known after apply)
              + iops                  = (known after apply)
              + kms_key_id            = (known after apply)
              + volume_id             = (known after apply)
              + volume_size           = (known after apply)
              + volume_type           = (known after apply)
            }
        }
    
    Plan: 1 to add, 0 to change, 0 to destroy.
    
    Do you want to perform these actions?
      Terraform will perform the actions described above.
      Only 'yes' will be accepted to approve.
    
      Enter a value: yes        # yesで適用される
    
    aws_instance.sandbox[0]: Creating...
    aws_instance.sandbox[0]: Still creating... [10s elapsed]
    aws_instance.sandbox[0]: Still creating... [20s elapsed]
    aws_instance.sandbox[0]: Still creating... [30s elapsed]
    aws_instance.sandbox[0]: Creation complete after 32s [id=i-0d19cafcf3d81212b]
    
    Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
    
    

コンソールで確認すると、できてる！

[Gyazo](https://gyazo.com/f3969137a1c789505c0f9e26722f7ffd)

## show

作ったインフラを確認できる

    PS D:\Document\repository\terraform_study> terraform show
    # aws_instance.sandbox[0]:
    resource "aws_instance" "sandbox" {
        ami                          = "ami-785c491f"
        arn                          = "arn:aws:ec2:ap-northeast-1:<account id>:instance/i-0d19cafcf3d81212b"
        associate_public_ip_address  = true
        availability_zone            = "ap-northeast-1a"
        cpu_core_count               = 1
        cpu_threads_per_core         = 1
        disable_api_termination      = false
        ebs_optimized                = false
        get_password_data            = false
        id                           = "i-0d19cafcf3d81212b"
        instance_state               = "running"
        instance_type                = "t2.micro"
        ipv6_address_count           = 0
        ipv6_addresses               = []
        monitoring                   = false
        primary_network_interface_id = "eni-0709c087db8901a72"
        private_dns                  = "ip-172-31-35-126.ap-northeast-1.compute.internal"
        private_ip                   = "172.31.35.126"
        public_dns                   = "ec2-13-114-235-242.ap-northeast-1.compute.amazonaws.com"
        public_ip                    = "13.114.235.242"
        security_groups              = [
            "default",
        ]
        source_dest_check            = true
        subnet_id                    = "subnet-b63bc3fe"
        tags                         = {
            "Name" = "sandbox-01"
        }
        tenancy                      = "default"
        volume_tags                  = {}
        vpc_security_group_ids       = [
            "sg-25429455",
        ]
    
        credit_specification {
            cpu_credits = "standard"
        }
    
        root_block_device {
            delete_on_termination = true
            encrypted             = false
            iops                  = 100
            volume_id             = "vol-0433e00cba70221b8"
            volume_size           = 8
            volume_type           = "gp2"
        }
    }

## Change Infrastructure

- [Change Infrastructure \| Terraform \- HashiCorp Learn](https://learn.hashicorp.com/terraform/getting-started/change)

sandbox から testboxに名称を変えると

    
    PS D:\Document\repository\terraform_study> terraform plan
    Refreshing Terraform state in-memory prior to plan...
    The refreshed state will be used to calculate this plan, but will not be
    persisted to local or remote state storage.
    
    aws_instance.sandbox[0]: Refreshing state... [id=i-0d19cafcf3d81212b]
    
    ------------------------------------------------------------------------
    
    An execution plan has been generated and is shown below.
    Resource actions are indicated with the following symbols:
      ~ update in-place
    
    Terraform will perform the following actions:
    
      # aws_instance.sandbox[0] will be updated in-place
      ~ resource "aws_instance" "sandbox" {
            ami                          = "ami-785c491f"
            arn                          = "arn:aws:ec2:ap-northeast-1:<account id>:instance/i-0d19cafcf3d81212b"
            associate_public_ip_address  = true
            availability_zone            = "ap-northeast-1a"
            cpu_core_count               = 1
            cpu_threads_per_core         = 1
            disable_api_termination      = false
            ebs_optimized                = false
            get_password_data            = false
            id                           = "i-0d19cafcf3d81212b"
            instance_state               = "running"
            instance_type                = "t2.micro"
            ipv6_address_count           = 0
            ipv6_addresses               = []
            monitoring                   = false
            primary_network_interface_id = "eni-0709c087db8901a72"
            private_dns                  = "ip-172-31-35-126.ap-northeast-1.compute.internal"
            private_ip                   = "172.31.35.126"
            public_dns                   = "ec2-13-114-235-242.ap-northeast-1.compute.amazonaws.com"
            public_ip                    = "13.114.235.242"
            security_groups              = [
                "default",
            ]
            source_dest_check            = true
            subnet_id                    = "subnet-b63bc3fe"
          ~ tags                         = {
              ~ "Name" = "sandbox-01" -> "testbox-01"    ## ここが変わってる
            }
            tenancy                      = "default"
            volume_tags                  = {}
            vpc_security_group_ids       = [
                "sg-25429455",
            ]
    
            credit_specification {
                cpu_credits = "standard"
            }
    
            root_block_device {
                delete_on_termination = true
                encrypted             = false
                iops                  = 100
                volume_id             = "vol-0433e00cba70221b8"
                volume_size           = 8
                volume_type           = "gp2"
            }
        }
    
    Plan: 0 to add, 1 to change, 0 to destroy.  ## change が 1 に
    
    ------------------------------------------------------------------------
    
    Note: You didn't specify an "-out" parameter to save this plan, so Terraform
    can't guarantee that exactly these actions will be performed if
    "terraform apply" is subsequently run.
    
    PS D:\Document\repository\terraform_study> terraform apply   # 変更を適用
    aws_instance.sandbox[0]: Refreshing state... [id=i-0d19cafcf3d81212b]
    
    An execution plan has been generated and is shown below.
    Resource actions are indicated with the following symbols:
      ~ update in-place
    
    Terraform will perform the following actions:
    
      # aws_instance.sandbox[0] will be updated in-place
      ~ resource "aws_instance" "sandbox" {
            ami                          = "ami-785c491f"
            arn                          = "arn:aws:ec2:ap-northeast-1:<account id>:instance/i-0d19cafcf3d81212b"
            associate_public_ip_address  = true
            availability_zone            = "ap-northeast-1a"
            cpu_core_count               = 1
            cpu_threads_per_core         = 1
            disable_api_termination      = false
            ebs_optimized                = false
            get_password_data            = false
            id                           = "i-0d19cafcf3d81212b"
            instance_state               = "running"
            instance_type                = "t2.micro"
            ipv6_address_count           = 0
            ipv6_addresses               = []
            monitoring                   = false
            primary_network_interface_id = "eni-0709c087db8901a72"
            private_dns                  = "ip-172-31-35-126.ap-northeast-1.compute.internal"
            private_ip                   = "172.31.35.126"
            public_dns                   = "ec2-13-114-235-242.ap-northeast-1.compute.amazonaws.com"
            public_ip                    = "13.114.235.242"
            security_groups              = [
                "default",
            ]
            source_dest_check            = true
            subnet_id                    = "subnet-b63bc3fe"
          ~ tags                         = {
              ~ "Name" = "sandbox-01" -> "testbox-01"
            }
            tenancy                      = "default"
            volume_tags                  = {}
            vpc_security_group_ids       = [
                "sg-25429455",
            ]
    
            credit_specification {
                cpu_credits = "standard"
            }
    
            root_block_device {
                delete_on_termination = true
                encrypted             = false
                iops                  = 100
                volume_id             = "vol-0433e00cba70221b8"
                volume_size           = 8
                volume_type           = "gp2"
            }
        }
    
    Plan: 0 to add, 1 to change, 0 to destroy.
    
    Do you want to perform these actions?
      Terraform will perform the actions described above.
      Only 'yes' will be accepted to approve.
    
      Enter a value: yes
    
    aws_instance.sandbox[0]: Modifying... [id=i-0d19cafcf3d81212b]
    aws_instance.sandbox[0]: Modifications complete after 2s [id=i-0d19cafcf3d81212b]
    
    Apply complete! Resources: 0 added, 1 changed, 0 destroyed.

変わったな

[Gyazo](https://gyazo.com/075cb612f3f6068b51dcabf078fa1134)

なお、`auto-approve` をつけると、確認がいらない模様

## Destroy Infrastructure

- [Destroy Infrastructure \| Terraform \- HashiCorp Learn](https://learn.hashicorp.com/terraform/getting-started/destroy)

## destroy

applyと似た感じ。diffみたいに－で表現されてるね

    PS D:\Document\repository\terraform_study> terraform destroy
    aws_instance.sandbox[0]: Refreshing state... [id=i-0d19cafcf3d81212b]
    
    An execution plan has been generated and is shown below.
    Resource actions are indicated with the following symbols:
      - destroy
    
    Terraform will perform the following actions:
    
      # aws_instance.sandbox[0] will be destroyed
      - resource "aws_instance" "sandbox" {
          - ami                          = "ami-785c491f" -> null
          - arn                          = "arn:aws:ec2:ap-northeast-1:<account id>:instance/i-0d19cafcf3d81212b" -> null
          - associate_public_ip_address  = true -> null
          - availability_zone            = "ap-northeast-1a" -> null
          - cpu_core_count               = 1 -> null
          - cpu_threads_per_core         = 1 -> null
          - disable_api_termination      = false -> null
          - ebs_optimized                = false -> null
          - get_password_data            = false -> null
          - id                           = "i-0d19cafcf3d81212b" -> null
          - instance_state               = "running" -> null
          - instance_type                = "t2.micro" -> null
          - ipv6_address_count           = 0 -> null
          - ipv6_addresses               = [] -> null
          - monitoring                   = false -> null
          - primary_network_interface_id = "eni-0709c087db8901a72" -> null
          - private_dns                  = "ip-172-31-35-126.ap-northeast-1.compute.internal" -> null
          - private_ip                   = "172.31.35.126" -> null
          - public_dns                   = "ec2-13-114-235-242.ap-northeast-1.compute.amazonaws.com" -> null
          - public_ip                    = "13.114.235.242" -> null
          - security_groups              = [
              - "default",
            ] -> null
          - source_dest_check            = true -> null
          - subnet_id                    = "subnet-b63bc3fe" -> null
          - tags                         = {
              - "Name" = "testbox-01"
            } -> null
          - tenancy                      = "default" -> null
          - volume_tags                  = {} -> null
          - vpc_security_group_ids       = [
              - "sg-25429455",
            ] -> null
    
          - credit_specification {
              - cpu_credits = "standard" -> null
            }
    
          - root_block_device {
              - delete_on_termination = true -> null
              - encrypted             = false -> null
              - iops                  = 100 -> null
              - volume_id             = "vol-0433e00cba70221b8" -> null
              - volume_size           = 8 -> null
              - volume_type           = "gp2" -> null
            }
        }
    
    Plan: 0 to add, 0 to change, 1 to destroy.
    
    Do you really want to destroy all resources?
      Terraform will destroy all your managed infrastructure, as shown above.
      There is no undo. Only 'yes' will be accepted to confirm.
    
       Enter a value: yes                               ## 確認が
    
    aws_instance.sandbox[0]: Destroying... [id=i-0d19cafcf3d81212b]
    aws_instance.sandbox[0]: Still destroying... [id=i-0d19cafcf3d81212b, 10s elapsed]
    aws_instance.sandbox[0]: Still destroying... [id=i-0d19cafcf3d81212b, 20s elapsed]
    aws_instance.sandbox[0]: Destruction complete after 30s
    
    Destroy complete! Resources: 1 destroyed.

terminateされました

[Gyazo](https://gyazo.com/62cff4e95030bc596533cca0382df136)

## Resource Dependencies

- [Resource Dependencies \| Terraform \- HashiCorp Learn](https://learn.hashicorp.com/terraform/getting-started/dependencies)

リソースの依存関係ということらしいが

EC2にEPI(ElasticIPを付与して）S3を関連付ける

    resource "aws_instance" "sandbox" {
      ami           = "ami-785c491f"
      instance_type = "t2.micro"
    }
    
    # EIPを作る
    resource "aws_eip" "ip" {
      vpc      = true
      instance = aws_instance.sandbox.id # コレは作ったresouceのID
    }

S3を作る

    For example, perhaps an application we will run on our EC2 instance expects to use a specific Amazon S3 bucket, but that dependency is configured inside the application code and thus not visible to Terraform. In that case, we can use depends_on to explicitly declare the dependency:
    
    たとえば、EC2インスタンスで実行するアプリケーションは、特定のAmazon S3バケットの使用を想定していますが、その依存関係はアプリケーションコード内で構成されているため、Terraformには表示されません。 その場合、depends_onを使用して、依存関係を明示的に宣言できます。

→ というより、S3みたいに、各インフラリソースへの設定がなく、EC2のアプリで使う場合には、明示的に関連付けられるように定義できるということらしい

→ 例えば削除するときに削除し忘れないようにということかな
サンプルコード -> [depends_on.tf](./depends_on.tf)


    Because this new instance does not depend on any other resource, it can be created in parallel with the other resources. Where possible, Terraform will perform operations concurrently to reduce the total time taken to apply changes.
    
    この新しいインスタンスは他のリソースに依存しないため、他のリソースと並行して作成できます。 可能な場合、Terraformは変更を適用するのにかかる合計時間を短縮するために操作を同時に実行します。

とあるので、下記を追加するとき、another は sandboxの作成を待たないらしい。

コレが高速化ということだということか

    resource "aws_instance" "another" {
      ami           = "ami-b374d5a5"
      instance_type = "t2.micro"
    }

余談だけどS3のバケット名はグローバルらしいので

チュートリアルのをまんま使うと怒られる

    Error: Error creating S3 bucket: BucketAlreadyExists: The requested bucket name is not available. The bucket namespace is shared by 
    all users of the system. Please select a different name and try again.
            status code: 409, request id: 30477BE3B4F3D4DE, host id: 0b0KvB06TFl8pGqSXaXJUW5zAhRkTVgL7t9IntfcRuoqlMNxhSqIdvLvC7MYvj5TAncaIVBeCbM=
    
      on ec2.tf line 1, in resource "aws_s3_bucket" "testtest":
       1: resource "aws_s3_bucket" "testtest" {

    resource "aws_s3_bucket" "example" {
      # NOTE: S3 bucket names must be unique across _all_ AWS accounts, so
      # this name must be changed before applying this example to avoid naming
      # conflicts.
      bucket = "terraform-getting-started-guide"
      acl    = "private"
    }

## AMIを探す

- [共有 AMI を見つける \- Amazon Elastic Compute Cloud](https://docs.aws.amazon.com/ja_jp/AWSEC2/latest/UserGuide/usingsharedamis-finding.html)

## Provision

- [Provision \| Terraform \- HashiCorp Learn](https://learn.hashicorp.com/terraform/getting-started/provision)

インスタンスの初期化処理っぽい

例えばインストールとかシェルの実行とか

## local-exec

    resource "aws_instance" "sandbox" {
      ami           = "ami-785c491f"
      instance_type = "t2.micro"
    
      provisioner "local-exec" { # ローカルのマシンで実行するprovisioner
        command = "exec ${aws_instance.sandbox.public_ip} > ip_address.txt"
    　　# selfを使って、下記のようにもかける
        # command = "exec ${self.public_ip} > ip_address.txt"
      }
    }

書き方は以下を参照する

- [Provisioners - Terraform by HashiCorp](https://www.terraform.io/docs/provisioners/index.html)

### remote-exec

構成管理ツールとかを実行するときに使うらしい

要はssh(winrm)接続してツールをインストールするとか(npm yum apt-getなど）

    # 実際に使うためにはテストしてねというコードです
    
    resource "aws_key_pair" "example" { // 鍵定義 sshするには必須
      key_name = "examplekey"
      public_key = file("~/.ssh/id_rsa.pub")
    }
    
    resource "aws_instance" "web" {
      key_name = aws_key_pair.example.key_name
      # ...
    
     connection { // 接続方法を定義
        type     = "ssh"
        user     = "root"
        private_key = file("~/.ssh/id_rsa")
        host     = self.ip
      }
    
      provisioner "remote-exec" {  // 実行するシェル
        inline = [
          "sudo amazon-linux-extras enable nginx1.12",
          "sudo yum -y install nginx",
          "sudo systemctl start nginx"
        ]
      }

## Variables

- [Input Variables \| Terraform \- HashiCorp Learn](https://learn.hashicorp.com/terraform/getting-started/variables)

定義は下記のように

    variable "region" {
      default = "us-east-1"
    }
    
    provider "aws" {
      version = "~> 2.0"
      region  = var.region  // varで呼び出す
    }

## 使い方

- コマンドライン  `-var`を使う
`-var 'region=us-east-2'`
- ファイル
`terraform.tfvars` or `*.auto.tfvars` は自動で読み込み
それ意外のファイル名はコマンドラインで -var-fileをつける
- 環境変数 `TF_VAR_name`の形式で読む
`TF_VAR_region` に us-east-1と定義しておくとか
- UI
定義したけど、読み込むものがないとき。
`apply`使うと聞かれる。日常で使う場合にはおすすめしない（チュートリアル程度ならとてもいい）
- default　定義に書いたあれ

### 変数の種類

- リスト(List)

    #  [...] を使って、暗黙的に
    variable "cidrs " { default = [] }
    
    # 明示的に定義
    variable "cidrs" { type = list }
    
    
    # 使うとき
    cidrs = [ "10.0.0.0/16", "10.1.0.0/16" ]

- マップ

AMIとかに使える（地域固有の番号になってしまうので、マップを使うと便利）

    variable "amis" {
      type = "map"
      default = {  // regionごとのAMIマップを作ってあげる
        "us-east-1" = "ami-b374d5a5"
        "us-west-2" = "ami-4b32be2b"
      }
    }
    
    
    ## 使うとき
    
    resource "aws_instance" "example" {
      ami           = var.amis[var.region] # 各地域ごとに書かなくて済む。
      instance_type = "t2.micro"
    }

`variable.tf`

    variable "region" {}
    
    variable "amis" {
      type = "map"
    }
    
    provider "aws" {
      version = "~> 2.0"
      region  = var.region
    }

`terraform.tfvars`

    amis = {
      "ap-northeast-1" = "ami-785c491f"
      "us-east-1"      = "ami-abc123"
    }

実行例

     PS D:\Document\repository\terraform_study> terraform apply -var region=ap-northeast-1
    
    An execution plan has been generated and is shown below.
    Resource actions are indicated with the following symbols:
      + create
    
    Terraform will perform the following actions:
    
      # aws_eip.ip will be created
      + resource "aws_eip" "ip" {
          + allocation_id     = (known after apply)
          + association_id    = (known after apply)
          + domain            = (known after apply)
          + id                = (known after apply)
          + instance          = (known after apply)
          + network_interface = (known after apply)
          + private_dns       = (known after apply)
          + private_ip        = (known after apply)
          + public_dns        = (known after apply)
          + public_ip         = (known after apply)
          + public_ipv4_pool  = (known after apply)
          + vpc               = true
        }
    
      # aws_instance.sandbox will be created
      + resource "aws_instance" "sandbox" {
          + ami                          = "ami-785c491f"
          + arn                          = (known after apply)
          + associate_public_ip_address  = (known after apply)
          + availability_zone            = (known after apply)
          + cpu_core_count               = (known after apply)
          + cpu_threads_per_core         = (known after apply)
          + get_password_data            = false
          + host_id                      = (known after apply)
          + id                           = (known after apply)
          + instance_state               = (known after apply)
          + instance_type                = "t2.micro"
          + ipv6_address_count           = (known after apply)
          + ipv6_addresses               = (known after apply)
          + key_name                     = (known after apply)
          + network_interface_id         = (known after apply)
          + password_data                = (known after apply)
          + placement_group              = (known after apply)
          + primary_network_interface_id = (known after apply)
          + private_dns                  = (known after apply)
          + private_ip                   = (known after apply)
          + public_dns                   = (known after apply)
          + public_ip                    = (known after apply)
          + security_groups              = (known after apply)
          + source_dest_check            = true
          + subnet_id                    = (known after apply)
          + tenancy                      = (known after apply)
          + volume_tags                  = (known after apply)
          + vpc_security_group_ids       = (known after apply)
    
          + ebs_block_device {
              + delete_on_termination = (known after apply)
              + device_name           = (known after apply)
              + encrypted             = (known after apply)
              + iops                  = (known after apply)
              + kms_key_id            = (known after apply)
              + snapshot_id           = (known after apply)
              + volume_id             = (known after apply)
              + volume_size           = (known after apply)
              + volume_type           = (known after apply)
            }
    
          + ephemeral_block_device {
              + device_name  = (known after apply)
              + no_device    = (known after apply)
              + virtual_name = (known after apply)
            }
    
          + network_interface {
              + delete_on_termination = (known after apply)
              + device_index          = (known after apply)
              + network_interface_id  = (known after apply)
            }
    
          + root_block_device {
              + delete_on_termination = (known after apply)
              + encrypted             = (known after apply)
              + iops                  = (known after apply)
              + kms_key_id            = (known after apply)
              + volume_id             = (known after apply)
              + volume_size           = (known after apply)
              + volume_type           = (known after apply)
            }
        }
    
    Plan: 2 to add, 0 to change, 0 to destroy.
    
    Do you want to perform these actions?
      Terraform will perform the actions described above.
      Only 'yes' will be accepted to approve.
    
      Enter a value: yes
    
    aws_instance.sandbox: Creating...
    aws_instance.sandbox: Still creating... [10s elapsed]
    aws_instance.sandbox: Still creating... [20s elapsed]
    aws_instance.sandbox: Still creating... [30s elapsed]
    aws_instance.sandbox: Provisioning with 'local-exec'...
    aws_instance.sandbox (local-exec): Executing: ["cmd" "/C" "echo 3.112.203.152 > ip_address.txt"]
    aws_instance.sandbox: Creation complete after 32s [id=i-003fd10423c279409]
    aws_eip.ip: Creating...
    aws_eip.ip: Creation complete after 1s [id=eipalloc-07570aa62a02fe14a]
    
    Apply complete! Resources: 2 added, 0 changed, 0 destroyed.
    
    Outputs:
    
    ami = ami-785c491f  # Mapで定義した中からregionに合わせて出た

## Output Variables

- [Output Variables \| Terraform \- HashiCorp Learn](https://learn.hashicorp.com/terraform/getting-started/outputs)

apply後に変数を照会するためのコマンド

    # 定義が必要
    output "ip" {
      value = aws_eip.ip.public_ip
    }

    # applyして、state fileに書き込まれた後なら使えるよ
    terraform output ip
    
    # ダメな例
    PS D:\Document\repository\terraform_study> terraform output ami
    The state file either has no outputs defined, or all the defined
    outputs are empty. Please define an output in your configuration
    with the `output` keyword and run `terraform refresh` for it to
    become available. If you are using interpolation, please verify
    the interpolated value is not empty. You can use the
    `terraform console` command to assist.

## Modules

- [Modules \- Configuration Language \- Terraform by HashiCorp](https://www.terraform.io/docs/configuration/modules.html)

公式のチュートリアルはまだ0.12に対応していない

module定義したら terraform initが必要

    # test module
    variable "region" {}　 # コレが入力になる
    
    variable "amis" {
      type = "map"
      default = {
       "ap-northeast-1" = "ami-785c491f"
       "us-east-1"      = "ami-abc123"
      }
    }
    
    resource "aws_instance" "default" {
      ami           = var.amis[var.region]
      instance_type = "t2.micro"
    }
    
    resource "aws_eip" "ip" {
      vpc      = true
      instance = aws_instance.default.id
    }
    
    output "ami" {
      value = aws_instance.default.ami
    }

    # 実際に使う側
    module "sandbox" {
      source        = "./test_modules" // ここでinclude
      region        = var.region
    }

## Function

- [Functions \- Configuration Language \- Terraform by HashiCorp](https://www.terraform.io/docs/configuration/functions.html)

## Log

`terraform apply`時のログレベルを指定できる  
レベルは、TRACE, DEBUG, INFO, WARN, ERRORの5段階

```
TF_LOG = DEBUG terraform apply
```

## 参考

- [Terraform初心者が実戦投入するまでにやったこと | DevelopersIO](https://dev.classmethod.jp/cloud/aws/my-first-step-of-terraform/)

- [10分で理解するTerraform - Qiita](https://qiita.com/Chanmoro/items/55bf0da3aaf37dc26f73)

- [VSCodeでのTerraformはじめ - Qiita](https://qiita.com/garakutayama/items/0cdf43816bde2378f4f9)

- [Terraform入門資料\(v0\.12\.0対応\) ~基本知識から設計や運用、知っておくべきtipsまで~ \- Qiita](https://qiita.com/fukubaka0825/items/68506b1e6644404d6cc0)
