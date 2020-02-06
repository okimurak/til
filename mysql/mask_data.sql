#データをマスクするためのSQL
# 例えばユーザのメールをマスク
UPDATE users SET email = CONCAT(LEFT("email", "3"), REPEAT("<置換文字:xとかいいと思う>", CHAR_LENCTH("email")-"3"));

#これを変数化すると
SET @UNMASKED_LEN=3; #マスクしない文字数
SET @TBL_NAME='users'; #テーブル名
SET @COL_NAME='email'; #カラム名
SET @UME_MOJI='x'; #埋め文字（「X」「0」など適当に）
SET @STMT=CONCAT("UPDATE ",@TBL_NAME," SET ",@COL_NAME,"=CONCAT(LEFT(",@COL_NAME,",",@UNMASKED_LEN,"),REPEAT('",@UME_MOJI,"',CHAR_LENGTH(",@COL_NAME,")-",@UNMASKED_LEN,"));");
SELECT @STMT; #組み立てたSQLを表示

#参考
#https://qiita.com/murak/items/7add80e9624b1abf103a
