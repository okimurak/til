# iptables

## Official

[netfilter/iptables project homepage - The netfilter.org "iptables" project](https://www.netfilter.org/projects/iptables/index.html)

## Related document

- [iptables - ArchWiki](https://wiki.archlinux.jp/index.php/Iptables)
- [Iptables Tutorial 1.2.2](https://www.frozentux.net/iptables-tutorial/iptables-tutorial.html)

## Concept

### Table

- raw : 接続追跡対象から外れるようにパケットを設定する
- filter : ファイアウォールが備えるアクション。デフォルトのテーブル
- nat : ネットワークアドレス変換に使う。ポートフォワーディングとか。
- mangle : 壊れていたり、不正なパケットの変換に使う。DDos といった攻撃の対処とか
- security : MAC(強制アクセス制御) に使う。([参考](https://wiki.archlinux.jp/index.php/%E3%82%BB%E3%82%AD%E3%83%A5%E3%83%AA%E3%83%86%E3%82%A3#.E5.BC.B7.E5.88.B6.E3.82.A2.E3.82.AF.E3.82.BB.E3.82.B9.E5.88.B6.E5.BE.A1))

基本的に使うのは filter, nat

### Chain

順序付けて並べられたルールのリスト。filter は `INPUT`, `OUTPUT`, `FORWARD`, nat には `PREROUTING`, `POSTROUTING`, `OUTPUT` の組み込みチェインが含まれる。

これらのチェインにルールを追加することでルーティングを設定、ルールの適用順を制御する。


### Rule

複数のルールが適用される条件（マッチ）と 1 つのターゲット（マッチに一致したときのアクション）で構成される。

マッチするものは、インターフェースやパケットのタイプ、パケットの送信先ポートなど。

```bash
$ iptables -nvL --line-numbers  # 現在のルールを表示できる。ルールの行番号は --line--numbers オプションを使う。
Chain INPUT (policy ACCEPT 0 packets, 0 bytes)
num   pkts bytes target     prot opt in     out     source               destination
1        0     0 REJECT     tcp  --  *      *       0.0.0.0/0            0.0.0.0/0            tcp dpt:17500 reject-with icmp-port-unreachable

Chain FORWARD (policy DROP 0 packets, 0 bytes)
num   pkts bytes target     prot opt in     out     source               destination

Chain OUTPUT (policy ACCEPT 0 packets, 0 bytes)
num   pkts bytes target     prot opt in     out     source               destination

$ iptables -R INPUT 1 -p tcp --dport 17500 ! -s 10.0.0.85 -j REJECT --reject-with icmp-port-unreachable # ルールを追加する。

$ iptables -nvL --line-numbers
Chain INPUT (policy ACCEPT 0 packets, 0 bytes)
num   pkts bytes target     prot opt in     out     source               destination
1        0     0 REJECT     tcp  --  *      *      !10.0.0.85            0.0.0.0/0            tcp dpt:17500 reject-with icmp-port-unreachable

Chain FORWARD (policy DROP 0 packets, 0 bytes)
num   pkts bytes target     prot opt in     out     source               destination

Chain OUTPUT (policy ACCEPT 0 packets, 0 bytes)
num   pkts bytes target     prot opt in     out     source               destination
```

## Configuration File

Archlinux だと、`/etc/iptables/iptables.rules` に保存される。あとは、`/etc/sysconfig/iptables` など ([参考: 5.13. Setting and Controlling IP sets using iptables](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/security_guide/sec-setting_and_controlling_ip_sets_using_iptables))
