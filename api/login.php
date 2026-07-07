<?php
// api/login.php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/functions.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'success' => false, 'message' => 'Invalid request method.']);
    exit;
}

$username = sanitize_text($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';
$type = sanitize_text($_POST['type'] ?? 'admin');

if (!$username || !$password) {
    echo json_encode(['status' => 'error', 'success' => false, 'message' => 'Missing credentials']);
    exit;
}

try {
    $db = Database::getInstance()->getConnection();
    if ($type === 'admin') {
        $stmt = $db->prepare('SELECT id, username, password AS password_hash, role FROM admins WHERE username = ? LIMIT 1');
    } else {
        $stmt = $db->prepare('SELECT id, username, password AS password_hash, event_id FROM coordinators WHERE username = ? LIMIT 1');
    }
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password_hash'])) {
        session_regenerate_id(true);
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['role'] = ($type === 'admin') ? $user['role'] : 'coordinator';
        if ($type !== 'admin') {
            $_SESSION['event_id'] = $user['event_id'];
        }

        echo json_encode(['status' => 'success', 'success' => true, 'message' => 'Authenticated']);
        exit;
    }

    echo json_encode(['status' => 'error', 'success' => false, 'message' => 'Invalid username or password']);
    exit;
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'success' => false, 'message' => 'Database error']);
    exit;
}

?>
