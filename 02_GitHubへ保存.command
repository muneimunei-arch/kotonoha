#!/bin/zsh
set -e
cd "$(dirname "$0")"
trap 'echo "同期を完了できませんでした。上の表示を確認してください。"; read "?Enterキーで閉じます。"' ERR
python3 scripts/sync.py
read "?Enterキーで閉じます。"
