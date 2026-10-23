<?php
declare(strict_types=1);

date_default_timezone_set('Asia/Tokyo');

const DATA_DIR = '/home/muneiserver/kotonoha-data';
const DATA_FILE = DATA_DIR . '/feedback.json';
const RATE_FILE = DATA_DIR . '/feedback-rate.json';
const SECRET_FILE = DATA_DIR . '/feedback-rate-secret';
const MAX_NICKNAME = 30;
const MAX_COMMENT = 600;
const RATE_SECONDS = 30;

$allowedOrigins = [
    'https://muneiserver.xsrv.jp',
    'https://kotonoha-personality-reading.vercel.app',
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    if (!in_array($origin, $allowedOrigins, true)) {
        respond(['error' => 'このページからは投稿できません。'], 403);
    }
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

ensureDataDirectory();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $items = readJsonArray(DATA_FILE);
    usort($items, static fn(array $a, array $b): int => strcmp((string)($b['created_at'] ?? ''), (string)($a['created_at'] ?? '')));
    $publicItems = array_map('publicItem', array_values($items));
    respond(['items' => $publicItems]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: GET, POST, OPTIONS');
    respond(['error' => '利用できない操作です。'], 405);
}

$contentLength = (int)($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 5000) {
    respond(['error' => '送信内容が大きすぎます。'], 413);
}
$raw = file_get_contents('php://input');
$input = json_decode($raw === false ? '' : $raw, true);
if (!is_array($input)) {
    respond(['error' => '送信内容を確認してください。'], 400);
}

// Hidden honeypot. Bots receive a normal response without adding a public post.
if (isset($input['website']) && trim((string)$input['website']) !== '') {
    respond(['ok' => true], 201);
}

$nickname = cleanSingleLine($input['nickname'] ?? null);
$comment = cleanComment($input['comment'] ?? null);
if ($nickname === '' || $comment === '') {
    respond(['error' => 'ペンネームと感想を入力してください。'], 422);
}
if (textLength($nickname) > MAX_NICKNAME) {
    respond(['error' => 'ペンネームは30文字以内で入力してください。'], 422);
}
if (textLength($comment) > MAX_COMMENT) {
    respond(['error' => '感想は600文字以内で入力してください。'], 422);
}

enforceRateLimit($_SERVER['REMOTE_ADDR'] ?? 'unknown');

$item = [
    'id' => bin2hex(random_bytes(8)),
    'nickname' => $nickname,
    'comment' => $comment,
    'created_at' => date('c'),
];
appendItem($item);
respond(['item' => publicItem($item)], 201);

function respond(array $payload, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function publicItem(array $item): array
{
    return [
        'nickname' => (string)($item['nickname'] ?? ''),
        'comment' => (string)($item['comment'] ?? ''),
        'created_at' => (string)($item['created_at'] ?? ''),
    ];
}

function ensureDataDirectory(): void
{
    if (!is_dir(DATA_DIR) && !mkdir(DATA_DIR, 0700, true) && !is_dir(DATA_DIR)) {
        respond(['error' => '保存先を準備できませんでした。'], 500);
    }
}

function textLength(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function cleanSingleLine(mixed $value): string
{
    if (!is_string($value)) return '';
    $value = preg_replace('/[\x00-\x1F\x7F]/u', ' ', $value) ?? '';
    return trim(preg_replace('/\s+/u', ' ', $value) ?? '');
}

function cleanComment(mixed $value): string
{
    if (!is_string($value)) return '';
    $value = str_replace(["\r\n", "\r"], "\n", $value);
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    $value = preg_replace('/[ \t]+/u', ' ', $value) ?? '';
    $value = preg_replace('/\n{3,}/u', "\n\n", $value) ?? '';
    return trim($value);
}

function readJsonArray(string $path): array
{
    if (!is_file($path)) return [];
    $handle = fopen($path, 'rb');
    if ($handle === false) return [];
    flock($handle, LOCK_SH);
    $raw = stream_get_contents($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
    $decoded = json_decode($raw === false ? '' : $raw, true);
    return is_array($decoded) ? $decoded : [];
}

function appendItem(array $item): void
{
    $handle = fopen(DATA_FILE, 'c+');
    if ($handle === false || !flock($handle, LOCK_EX)) {
        respond(['error' => '感想を保存できませんでした。'], 500);
    }
    rewind($handle);
    $raw = stream_get_contents($handle);
    $items = json_decode($raw === false ? '' : $raw, true);
    if (!is_array($items)) $items = [];
    $items[] = $item;
    $encoded = json_encode($items, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    if ($encoded === false) {
        flock($handle, LOCK_UN);
        fclose($handle);
        respond(['error' => '感想を保存できませんでした。'], 500);
    }
    rewind($handle);
    ftruncate($handle, 0);
    $written = fwrite($handle, $encoded . "\n");
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
    if ($written === false) respond(['error' => '感想を保存できませんでした。'], 500);
    @chmod(DATA_FILE, 0600);
}

function enforceRateLimit(string $address): void
{
    if (!is_file(SECRET_FILE)) {
        file_put_contents(SECRET_FILE, bin2hex(random_bytes(32)), LOCK_EX);
        @chmod(SECRET_FILE, 0600);
    }
    $secret = trim((string)file_get_contents(SECRET_FILE));
    $key = hash_hmac('sha256', $address, $secret);
    $now = time();
    $handle = fopen(RATE_FILE, 'c+');
    if ($handle === false || !flock($handle, LOCK_EX)) {
        respond(['error' => 'ただいま投稿を受け付けられません。'], 500);
    }
    rewind($handle);
    $raw = stream_get_contents($handle);
    $rates = json_decode($raw === false ? '' : $raw, true);
    if (!is_array($rates)) $rates = [];
    foreach ($rates as $hash => $time) {
        if (!is_int($time) || $time < $now - 86400) unset($rates[$hash]);
    }
    if (isset($rates[$key]) && $rates[$key] > $now - RATE_SECONDS) {
        flock($handle, LOCK_UN);
        fclose($handle);
        respond(['error' => '少し時間を置いてから投稿してください。'], 429);
    }
    $rates[$key] = $now;
    rewind($handle);
    ftruncate($handle, 0);
    fwrite($handle, json_encode($rates, JSON_UNESCAPED_SLASHES));
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
    @chmod(RATE_FILE, 0600);
}
