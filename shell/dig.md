# dig

DNSを調査するためのコマンド

Unix系では、ほぼ標準装備
  - FreeBSD10以降では削除されていて、代わりに`drill`を使うか`ports/pkg(dns/bind-tools)`からインストール

WinではISCがBIND9のバイナリとして提供

## Install (Windows)
- [Windowsでnslookupの代わりにdigコマンドでDNSを調べる（BIND編）：Tech TIPS - ＠IT](https://www.atmarkit.co.jp/ait/articles/1410/20/news122.html)

## How to use

```
dig <dns server> <domain name> <query type> <option>
```

- query type
  - SOA

- option
  - +rec ... 再帰的問い合わせ(階層構造をたどって)
  - +norec ... 反復問い合わせ(持ってる情報を教えて)
  - +multi(+multiline) ... SOAが読みやすくなる
  - +vc ... 最初からTCPで問い合わせ

## Reference
- [初心者のためのDNSの設定とよくあるトラブル事例](https://dnsops.jp/event/20140626/dns-beginners-guide2014-mizuno.pdf)