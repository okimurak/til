#!/bin/bash
# オプション付きのコマンドを実装する場合のテンプレート
# 参考 : https://deeeet.com/writing/2014/05/18/shell-template/
#       https://qiita.com/b4b4r07/items/dcd6be0bb9c9185475bb

usage() {
    echo "Usage: $PROGNAME [OPTIONS] FILE"
    echo "  This script is ~."
    echo
    echo "Options:"
    echo "  -h, --help"
    echo "  -a, --long-a"
    echo "  -b, --long-b"
    echo "  -d --debug"
    echo
    exit 1
}

# 引数を確認する
check_param () {
  PROGNAME=$(basename $0)
  ENV="development"
  FLG=false

  for OPT in "$@"
  do
    case $OPT in
        -h | --help)
            usage
            exit 1
            ;;
        -a | --long-a) #引数必須なオプションパターン
            if [[ -z "$2" ]] || [[ "$2" =~ ^-+ ]]; then
                echo "$PROGNAME: option requires an argument -- $1" 1>&2
                exit 1
            fi
            ENV_TEMP=$2
            shift 2
            ;;
        -b | --long-b) # 引数いらないオプションパターン
            FLG=true
            shift 1
            ;;
        --debug|-d) # あると便利
            set -x
            ;;
        -*)
            echo "$PROGNAME: illegal option -- '$(echo $1 | sed 's/^-*//')'" 1>&2
            exit 1
            ;;
        *)
            if [[ ! -z "$1" ]] && [[ ! "$1" =~ ^-+ ]]; then
                param+=( "$1" )
                shift 1
            fi
            ;;
      esac
  done

  # 引数必須の場合のチェック
  if [ -z "$param" ]; then
      echo "$PROGNAME: too few arguments" 1>&2
      echo "Try '$PROGNAME --help' for more information." 1>&2
      exit 1
  fi

  # 環境の確認
  envs=(development staging production )
  local ENV_=
  for e in ${envs[@]}; do
      if [[ "$e" == "${ENV_TEMP}" ]]; then ENV_="$e"; fi
  done
  if [[ -z "${ENV_}" ]]; then
      echo "[${ENV_TEMP}] is not exist environemnt."
      exit 2
  fi
  ENV="$ENV_"

}