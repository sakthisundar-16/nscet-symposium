<?php
require_once '../backend/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->query("SELECT id, name, designation, type FROM coordinators");
        $coordinators = $stmt->fetchAll();
        
        $faculty = [];
        $students = [];
        
        foreach ($coordinators as $coord) {
            if ($coord['type'] === 'faculty') {
                $faculty[] = $coord;
            } else {
                $students[] = $coord;
            }
        }
        
        sendJson(["success" => true, "data" => ["faculty" => $faculty, "students" => $students]]);
    } catch (PDOException $e) {
        sendJson(["success" => false, "error" => "Failed to fetch coordinators"], 500);
    }
} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}
?>
