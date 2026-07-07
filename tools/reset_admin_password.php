<?php
// tools/reset_admin_password.php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/db.php';

// Usage: php reset_admin_password.php [new_password]
$new_password = $argv[1] ?? null;
if (!$new_password) {
    // generate a random 12-character password (alphanumeric + symbols)
    $bytes = random_bytes(9);
    $new_password = substr(str_replace(['/', '+', '='], '', base64_encode($bytes)), 0, 12);
}

$hash = password_hash($new_password, PASSWORD_BCRYPT);

try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->prepare("UPDATE admins SET password = ? WHERE username = 'admin'");
    $stmt->execute([$hash]);
    if ($stmt->rowCount() > 0) {
        echo "Admin password updated successfully.\n";
        echo "New password: $new_password\n";
        echo "Please store this securely and change after login.\n";
        exit(0);
    } else {
        echo "No admin row updated. Is there an 'admin' user?\n";
        exit(1);
    }
} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage() . "\n";
    exit(1);
}
?>