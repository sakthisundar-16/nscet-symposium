<?php
require 'includes/db.php';
$db = Database::getInstance()->getConnection();
$stmt = $db->query('SELECT * FROM admins');
print_r($stmt->fetchAll(PDO::FETCH_ASSOC));
?>
