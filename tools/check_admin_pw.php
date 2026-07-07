<?php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/db.php';

try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->prepare("SELECT username, password FROM admins WHERE username = ? LIMIT 1");
    $stmt->execute(['admin']);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row) {
        echo "Admin not found\n";
        exit(1);
    }
    echo "Username: " . $row['username'] . "\n";
    echo "Hash: " . $row['password'] . "\n";
    $ok = password_verify('password', $row['password']);
    echo "Password 'password' verifies? " . ($ok ? 'YES' : 'NO') . "\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>