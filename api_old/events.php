<?php
require_once '../backend/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM events ORDER BY phase ASC, id ASC");
        $events = $stmt->fetchAll();
        
        $phases = [
            'PHASE 1' => [],
            'PHASE 2' => [],
            'PHASE 3' => []
        ];
        
        foreach ($events as $event) {
            $phases[$event['phase']][] = $event;
        }
        
        sendJson(["success" => true, "data" => $phases]);
    } catch (PDOException $e) {
        sendJson(["success" => false, "error" => "Failed to fetch events"], 500);
    }
} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}
?>
