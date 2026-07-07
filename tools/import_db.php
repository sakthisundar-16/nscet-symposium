<?php
// tools/import_db.php
require_once __DIR__ . '/../includes/config.php';

$sqlFile = __DIR__ . '/../database/nscet_symposium.sql';
if (!file_exists($sqlFile)) {
    echo "SQL file not found: $sqlFile\n";
    exit(1);
}

try {
    // Connect without specifying database to allow CREATE DATABASE
    $dsn = 'mysql:host=' . DB_HOST . ';charset=utf8mb4';
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    // Drop and re-create the database to ensure a clean import
    $pdo->exec("DROP DATABASE IF EXISTS `" . DB_NAME . "`;");

    $sql = file_get_contents($sqlFile);
    // Execute the SQL file (includes CREATE DATABASE and USE statements)
    $pdo->exec($sql);
    echo "Imported SQL successfully.\n";
} catch (PDOException $e) {
    echo "Import failed: " . $e->getMessage() . "\n";
    exit(1);
}

?>