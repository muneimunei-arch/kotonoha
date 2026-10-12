#!/bin/zsh
set -e
cd "$(dirname "$0")"
trap 'echo "バックアップを完了できませんでした。上の表示を確認してください。"; read "?Enterキーで閉じます。"' ERR
python3 scripts/backup.py
read "?Enterキーで閉じます。"
