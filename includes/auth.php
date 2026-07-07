<?php
// includes/auth.php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/functions.php';

function require_admin() {
    if (!isset($_SESSION['user_id']) || !in_array($_SESSION['role'], ['super_admin', 'admin'], true)) {
        header('Location: /login.php');
        exit;
    }
}

function require_coordinator() {
    if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'coordinator') {
        header('Location: /login.php');
        exit;
    }
}
