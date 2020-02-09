# シェルでJSONを扱う方法

ヒアドキュメントを作成して、echoを文字列で出力する

    json=$(cat << EOS
    {
      "number": ${number},
      "string": "${string}"
    }
    EOS
    )
    
    echo "${json}" > a.json

## 参考

- [シェルスクリプトでJSONを扱う](https://qiita.com/unhurried/items/c62d29540de3e10a50ad)