<?php
require_once __DIR__ . '/../includes/config.php';
try {
    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);

    $sql = <<<SQL
ALTER TABLE participants
    ADD COLUMN IF NOT EXISTS dob DATE DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS whatsapp VARCHAR(20) DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS city VARCHAR(100) DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS state VARCHAR(100) DEFAULT NULL;
SQL;
    $pdo->exec($sql);
    // Add registrations.team_size if missing and create team_members table
    $sql2 = <<<SQL
ALTER TABLE registrations
    ADD COLUMN IF NOT EXISTS team_size INT(2) NOT NULL DEFAULT 1;

CREATE TABLE IF NOT EXISTS team_members (
  id INT(11) NOT NULL AUTO_INCREMENT,
  registration_id INT(11) NOT NULL,
  member_name VARCHAR(150) NOT NULL,
  member_email VARCHAR(150) DEFAULT NULL,
  member_phone VARCHAR(30) DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (id),
  KEY registration_id (registration_id),
  CONSTRAINT fk_team_registration FOREIGN KEY (registration_id) REFERENCES registrations (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
SQL;
    $pdo->exec($sql2);
    echo "Schema updated successfully.\n";
} catch (PDOException $e) {
    echo "Schema update failed: " . $e->getMessage() . "\n";
    exit(1);
}
?>