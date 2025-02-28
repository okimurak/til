# kubectl

Kubernetest API を使ったクラスターのコントロールと通信するための CLI ツール

[コマンドラインツール(kubectl) | Kubernetes](https://kubernetes.io/ja/docs/reference/kubectl/)

[Kubectl Reference Docs](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#-strong-getting-started-strong-)

## Name Space

基本的にはコマンドに `--namespace <Name space名>` を付与して、対象の Name Space のオブジェクトを操作する。

`--all-namespace` を使えば全ての Name Space のオブジェクトを取得できる。

あとは、[kubeens](https://github.com/ahmetb/kubectx) などを使って Name Space を切り替える方法もある。

## Command

沢山あるが、よく使う or 忘れるコマンドだけ

### get

オブジェクトの一覧を取得する

```bash
kubectl get <オブジェクトの種類> (--namespace <Name space名>)

# より詳細な Node の情報を表示
kubectl get node -o wide

# YAML 形式で Pod の情報を表示
kubectl get pods -o yaml
```

他にも Custom Column や JSON, json-path, Go-template の形式で出力もできる

[コマンドラインツール(kubectl) | Kubernetes](https://kubernetes.io/ja/docs/reference/kubectl/#%E5%87%BA%E5%8A%9B%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3)

[Kubectl Reference Docs](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#get)

### describe

オブジェクトの詳細を取得する

```bash
kubectl describe <オブジェクトの種類> <オブジェクト名> (--namespace <Name space名>)
```

### apply

マニフェストを適用する

```bash
kubectl apply <マニフェストファイル or マニフェストファイルのディレクトリ>
```

### create

リソースを作成する。`--save-config` を使用しないと、履歴のメタデータ(`metadata.annotations.kubectl.kubernetes.io/last-applied-configuration`)が残らないため、その点は注意。次回以降更新時に比較ができない

```bash
kubectl create <マニフェストファイル>
```

### delete

```bash
kubectl delete <マニフェストファイル or オブジェクト名>
```

### log

Pod 内のコンテナのログ(標準出力)を表示

```bash
kubectl logs <Pod 名> <-c コンテナ名>
```

### exec

```bash
kubectl exec <pod 名> (-i) -- <コマンド>
```

### wait

特定のリソースが特定の状態になるまで待つ

```bash
kubectl wait --for=condition=<Pod の condition 名> <オブジェクト名>

# 全ての Pod がスケージューリングされるまで
kubectl wait --for=condition=PodScheduled pod -all

# 全ての Pod が削除されるまで
kubectl wait --for=condition=delete pod --all
```
