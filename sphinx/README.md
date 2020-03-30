# sphinx

## Install

    pip install sphinx recommonmark sphinx-markdown-tables
    mkdir doc # docディレクトリ作成しておく
    sphinx-quick-start # source/conf.pyが作られる

## ライブラリについて
ドキュメント化するファイルの依存関係もインストールしないと、出力されない

## conf.py

    # コメントアウトを外す
    import os
    import sys
    sys.path.insert(0, '<読み込むパス>')

    extensions = ['recommonmark', 'sphinx-markdown-tables'] ## 追記する
    
    ## 以下を新規追加する
    # -- Avaiable Markdown
    source_suffix = ['.rst', '.md']
    source_parsers = {
       '.md': 'recommonmark.parser.CommonMarkParser',
    }
    
    from recommonmark.transform import AutoStructify
    def setup(app):
        app.add_config_value('recommonmark_config', {
                'auto_toc_tree_section': 'Contents',
                }, True)
        app.add_transform(AutoStructify)

## 参考

- [SphinxでMarkdownをHTMLに変換する - Qiita](https://qiita.com/unhurried/items/f0372688e8a8485718b5)

こっちの方がわかりやすかったっていう

- [Sphinxの使い方．docstringを読み込んで仕様書を生成 - Qiita](https://qiita.com/futakuchi0117/items/4d3997c1ca1323259844#indexrst%E3%81%AE%E7%B7%A8%E9%9B%86)