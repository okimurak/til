## countでつくるつくらないを判断させるモジュールの作成メモ

resource "hogehoge_resource" "fugafuga" {
  ## properties
  count = var.is_create_hogehoge_resource
}