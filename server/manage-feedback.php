<?php
declare(strict_types=1);

const DATA_FILE = '/home/muneiserver/kotonoha-data/feedback.json';

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

$command = $argv[1] ?? 'list';
$handle = fopen(DATA_FILE, 'c+');
if ($handle === false || !flock($handle, LOCK_EX)) {
    fwrite(STDERR, "感想データを開けません。\n");
    exit(1);
}
rewind($handle);
$raw = stream_get_contents($handle);
$items = json_decode($raw === false ? '' : $raw, true);
if (!is_array($items)) $items = [];

if ($command === 'list') {
    foreach (array_reverse($items) as $item) {
        printf("%s  %s  %s\n", $item['id'] ?? '-', $item['created_at'] ?? '-', $item['nickname'] ?? '-');
    }
    flock($handle, LOCK_UN);
    fclose($handle);
    exit;
}

if ($command !== 'delete' || !isset($argv[2]) || !preg_match('/^[a-f0-9]{16}$/', $argv[2])) {
    fwrite(STDERR, "使い方: php manage-feedback.php list | delete <ID>\n");
    flock($handle, LOCK_UN);
    fclose($handle);
    exit(2);
}

$id = $argv[2];
$remaining = array_values(array_filter($items, static fn(array $item): bool => ($item['id'] ?? '') !== $id));
if (count($remaining) === count($items)) {
    fwrite(STDERR, "指定したIDはありません。\n");
    flock($handle, LOCK_UN);
    fclose($handle);
    exit(3);
}
rewind($handle);
ftruncate($handle, 0);
fwrite($handle, json_encode($remaining, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . "\n");
fflush($handle);
flock($handle, LOCK_UN);
fclose($handle);
echo "削除しました: {$id}\n";
