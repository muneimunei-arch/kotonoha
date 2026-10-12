#!/bin/zsh
set -e
cd "$(dirname "$0")"
trap 'echo "更新を完了できませんでした。上の表示を確認してください。"; read "?Enterキーで閉じます。"' ERR
git pull --ff-only origin main
echo "GitHubの最新版をMacへ取り込みました。"
read "?Enterキーで閉じます。"
