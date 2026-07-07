<?php
require_once '../backend/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (empty($data['username']) || empty($data['password']) || empty($data['type'])) {
        sendJson(["success" => false, "error" => "Username, password, and type are required."], 400);
    }

    $username = $data['username'];
    $password = $data['password'];
    $type = $data['type']; // 'admin' or 'coordinator'

    try {
        if ($type === 'admin') {
            $stmt = $pdo->prepare("SELECT id, username, password_hash, role FROM admins WHERE username = ?");
            $stmt->execute([$username]);
            $user = $stmt->fetch();

            if ($user && password_verify($password, $user['password_hash'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['role'] = $user['role'];
                $_SESSION['type'] = 'admin';

                sendJson([
                    "success" => true,
                    "message" => "Login successful",
                    "user" => [
                        "id" => $user['id'],
                        "username" => $user['username'],
                        "role" => $user['role'],
                        "type" => "admin"
                    ]
                ]);
            } else {
                sendJson(["success" => false, "error" => "Invalid username or password"], 401);
            }

        } else if ($type === 'coordinator') {
            $stmt = $pdo->prepare("SELECT id, name, username, password_hash, event_id FROM coordinators WHERE username = ?");
            $stmt->execute([$username]);
            $user = $stmt->fetch();

            if ($user && password_verify($password, $user['password_hash'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['name'] = $user['name'];
                $_SESSION['event_id'] = $user['event_id'];
                $_SESSION['type'] = 'coordinator';

                sendJson([
                    "success" => true,
                    "message" => "Login successful",
                    "user" => [
                        "id" => $user['id'],
                        "username" => $user['username'],
                        "name" => $user['name'],
                        "event_id" => $user['event_id'],
                        "type" => "coordinator"
                    ]
                ]);
            } else {
                sendJson(["success" => false, "error" => "Invalid username or password"], 401);
            }
        } else {
            sendJson(["success" => false, "error" => "Invalid login type"], 400);
        }

    } catch (PDOException $e) {
        sendJson(["success" => false, "error" => "Database error occurred."], 500);
    }
} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}
?>
