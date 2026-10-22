#!/usr/bin/env python3
from pathlib import Path
import subprocess, datetime, os

home = Path.home()
key = home / 'Desktop/muneimunei/muneiserver.key'
dest = home / 'Desktop/muneimunei/GPTS/kotonoha-非公開バックアップ'
stamp = datetime.datetime.now().strftime('%Y%m%d-%H%M%S')
remote = '/home/muneiserver/kotonoha-backups/desktop-backup.tar.gz'
archive = dest / f'kotonoha-{stamp}.tar.gz'
dest.mkdir(mode=0o700, parents=True, exist_ok=True)
ssh = ['ssh', '-i', str(key), '-p', '10022', '-o', 'BatchMode=yes', '-o', 'StrictHostKeyChecking=yes', 'muneiserver@sv17240.xserver.jp']
command = "tar --exclude=github-public-transfer.tar.gz --exclude=desktop-backup.tar.gz -czf /home/muneiserver/kotonoha-backups/desktop-backup.tar.gz -C /home/muneiserver/muneiserver.xsrv.jp/public_html kotonoha -C /home/muneiserver kotonoha-backups"
subprocess.run([*ssh, command], check=True)
subprocess.run(['scp', '-i', str(key), '-P', '10022', '-o', 'BatchMode=yes', '-o', 'StrictHostKeyChecking=yes', f'muneiserver@sv17240.xserver.jp:{remote}', str(archive)], check=True)
os.chmod(archive, 0o600)
print(f'バックアップを保存しました：{archive}')
