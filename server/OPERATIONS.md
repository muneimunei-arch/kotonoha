# 感想欄の運営手順

感想データは公開領域外の `/home/muneiserver/kotonoha-data/feedback.json` に保存されます。
公開ページやGitHubには含まれません。

XサーバーへSSH接続した後、次のコマンドで投稿IDを確認できます。

```sh
php /home/muneiserver/kotonoha-tools/manage-feedback.php list
```

不適切な投稿を削除する場合は、一覧の先頭に表示された16桁のIDを指定します。

```sh
php /home/muneiserver/kotonoha-tools/manage-feedback.php delete 投稿ID
```

API本体は `/home/muneiserver/muneiserver.xsrv.jp/public_html/kotonoha-api/feedback.php`、
運営ツールは `/home/muneiserver/kotonoha-tools/manage-feedback.php` へ配置します。
