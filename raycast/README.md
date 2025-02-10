# Raycast

[Raycast](https://www.raycast.com/)

Spotlight や Alfred のような Rust 製のランチャーソフトウェアです。

## Raycast でできること

多いので Alfred でできることを並べながら比較してきます。

|機能|Alfred|Raycast|
|---|---|---|
| ファイル検索 | デフォルト| デフォルト |
| ウェブサイト呼び出し | デフォルト | デフォルト |
| ブラウザのブックマーク | デフォルト | デフォルト |
| Clipboard 呼び出し | Power Pack | デフォルト |
| Snippet 呼び出し | Power Pack | デフォルト |
| バックアップ | Power Pack | デフォルト|

### Extensions

Raycast では各機能を Extension といいます。公開されている Extentions を [Store](https://www.raycast.com/store) で導入可能です。

Extentions は引数を入力できるものも有り、例えばウェブサイト呼び出し(Quick Link) はエイリアスや引数 (Query) を設定できます。

### Development Extention

Extension はカスタマイズして作ることもできます。TypeSript/React で開発します。

[raycast/extensions: Everything you need to extend Raycast.](https://github.com/raycast/extensions)

[Introduction | Raycast API](https://developers.raycast.com/)

### Script

[Script Commands](https://manual.raycast.com/script-commands) を使ってスクリプトを実行でき、それを Extentions として登録できます

- シェル, Apple Script. Java Script, Python, Swift, Ruby, PHP など PC 環境で実行できるスクリプトを実行できる。
- 特定のフォーマットを満たす必要があります。(テンプレート : [script-commands/templates at master · raycast/script-commands](https://github.com/raycast/script-commands/tree/master/templates))

