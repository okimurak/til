# Floating IPパターン

インスタンス障害を検知してIPを付け替えるクラウドデザインパターン。普段はELBを使うべきだが、用いることができない場合に使えるかもしれない。

## AWSでは 
EIPを付け替えることになるが、数秒かかる。

## Reference
- [【AWS】クラウドデザインパターン実践編／仮想IPアドレスによるFloating IPパターン | Developers.IO](https://dev.classmethod.jp/articles/aws-cdp-floating-ip-pattern/)
- [CDP:Floating IPパターン - AWS-CloudDesignPattern](http://aws.clouddesignpattern.org/index.php/CDP:Floating_IP%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3)