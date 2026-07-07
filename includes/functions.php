<?php
// includes/functions.php
require_once __DIR__ . '/config.php';

function sanitize_text($value) {
    return trim(filter_var($value, FILTER_SANITIZE_FULL_SPECIAL_CHARS));
}

function sanitize_email($value) {
    return trim(filter_var($value, FILTER_SANITIZE_EMAIL));
}

function sanitize_int($value) {
    return filter_var($value, FILTER_VALIDATE_INT);
}

function escape($value) {
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

function get_base_url() {
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    return $scheme . '://' . $_SERVER['HTTP_HOST'];
}

function sendJsonResponse($status, $message, $data = null, $code = 200) {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode([
        'status' => $status,
        'success' => $status === 'success',
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

function generate_csrf_token() {
    if (empty($_SESSION['_csrf_token'])) {
        $_SESSION['_csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['_csrf_token'];
}

function verify_csrf_token($token) {
    if (empty($token) || empty($_SESSION['_csrf_token'])) {
        return false;
    }
    return hash_equals($_SESSION['_csrf_token'], $token);
}

function generate_captcha() {
    $a = random_int(3, 9);
    $b = random_int(1, 9);
    $_SESSION['_captcha_answer'] = $a + $b;
    $_SESSION['_captcha_question'] = "What is {$a} + {$b}?";
    return $_SESSION['_captcha_question'];
}

function get_captcha_question() {
    if (empty($_SESSION['_captcha_question'])) {
        return generate_captcha();
    }
    return $_SESSION['_captcha_question'];
}

function verify_captcha_answer($answer) {
    if (!isset($_SESSION['_captcha_answer'])) {
        return false;
    }
    return intval($answer) === intval($_SESSION['_captcha_answer']);
}

function refresh_captcha() {
    return generate_captcha();
}
