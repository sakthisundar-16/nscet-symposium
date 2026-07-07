<?php
require_once '../backend/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $_SESSION = array();
    
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    
    session_destroy();
    sendJson(["success" => true, "message" => "Logged out successfully"]);
} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}
?>
