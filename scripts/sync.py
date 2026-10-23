#!/usr/bin/env python3
from pathlib import Path
import subprocess, datetime

root = Path(__file__).resolve().parents[1]
allowed = ['public', 'server', 'scripts', 'README.md', 'vercel.json', '.gitignore',
           '01_GitHubから更新.command', '02_GitHubへ保存.command',
           '03_Xサーバーをバックアップ.command']
private_key_marker = b'-----BEGIN PRIVATE' + b' KEY'

def git(*args):
    return subprocess.run(['git', *args], cwd=root, check=True)

for folder in ['public', 'server', 'scripts']:
    for path in (root / folder).rglob('*'):
        if not path.is_file():
            continue
        if path.suffix.lower() in ('.key', '.pem', '.sqlite', '.db'):
            raise SystemExit('秘密ファイルを検出したため停止しました。')
        if path.stat().st_size < 2_000_000 and private_key_marker in path.read_bytes():
            raise SystemExit('秘密鍵を検出したため停止しました。')

git('add', '--', *allowed)
if subprocess.run(['git', 'diff', '--cached', '--quiet'], cwd=root).returncode:
    git('commit', '-m', 'Update kotonoha ' + datetime.datetime.now().isoformat(timespec='seconds'))
git('pull', '--rebase', 'origin', 'main')
git('push', 'origin', 'main')
print('MacとGitHubの同期が完了しました。')
