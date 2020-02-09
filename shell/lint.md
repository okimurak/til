# シェルの静的チェック

要はシェルのlint

## SH

手軽

    # 複数できないけど
    sh -n <チェックしたいシェル>

## ShellCheck

Web版もあるし、インストール版もある。特定のエラーを除外可能

[ShellCheck](https://www.shellcheck.net/)

    ❯ shellcheck -h
    unrecognized option `-h'
    
    Usage: shellcheck [OPTIONS...] FILES...
      -a                  --check-sourced            Include warnings from sourced files
      -C[WHEN]            --color[=WHEN]             Use color (auto, always, never)
      -i CODE1,CODE2..    --include=CODE1,CODE2..    Consider only given types of warnings
      -e CODE1,CODE2..    --exclude=CODE1,CODE2..    Exclude types of warnings
      -f FORMAT           --format=FORMAT            Output format (checkstyle, diff, gcc, json, json1, quiet, tty)
                          --list-optional            List checks disabled by default
                          --norc                     Don't look for .shellcheckrc files
      -o check1,check2..  --enable=check1,check2..   List of optional checks to enable (or 'all')
      -P SOURCEPATHS      --source-path=SOURCEPATHS  Specify path when looking for sourced files ("SCRIPTDIR" for script's dir)
      -s SHELLNAME        --shell=SHELLNAME          Specify dialect (sh, bash, dash, ksh)
      -S SEVERITY         --severity=SEVERITY        Minimum severity of errors to consider(error, warning, info, style)
      -V                  --version                  Print version information
      -W NUM              --wiki-link-count=NUM      The number of wiki links to show, whenapplicable
      -x                  --external-sources         Allow 'source' outside of FILES
                          --help                     Show this usage summary and exit

## CIツールとの連携

### CircleCI

利用ガイドもある : [シェルスクリプトの使用](https://circleci.com/docs/ja/2.0/using-shell-scripts/)

また、orbsがある : [CircleCI Orb Registry \- circleci/shellcheck](https://circleci.com/orbs/registry/orb/circleci/shellcheck)



## 参考

- [シェルスクリプトのlint - Qiita](https://qiita.com/dharry/items/f593d96c1b0269182922)

- [GitHub Actions を用いて Pull-Request で shellcheck をする方法 - Qiita](https://qiita.com/osakiy/items/27d5382e41107de482a4)