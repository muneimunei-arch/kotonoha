# kotonoha

「本来の自分を知る」鑑定サイトです。Xサーバーで公開中の最新版を、MacとGitHubで管理します。

## 保存場所

- Mac：デスクトップ `muneimunei/GPTS/kotonoha`
- GitHub：https://github.com/muneimunei-arch/kotonoha
- Xサーバー：https://muneiserver.xsrv.jp/kotonoha/
- Vercel：GitHub の `main` ブランチから `public` を公開

`public` が公開用ファイルです。Vercelはリポジトリ直下の `vercel.json` を読み、`public` を公開します。

## 日常の使い方

1. 作業前に `01_GitHubから更新.command` を実行します。
2. `public` 内を編集します。
3. 作業後に `02_GitHubへ保存.command` を実行します。
4. 必要に応じて `03_Xサーバーをバックアップ.command` を実行します。

バックアップは `muneimunei/GPTS/kotonoha-非公開バックアップ` に保存され、GitHubには入りません。Xサーバーへの公開更新は、別途アップロードが必要です。
