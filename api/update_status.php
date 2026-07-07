<?php
// api/update_status.php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/functions.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

// Check admin authentication
if (empty($_SESSION['user_id']) || !in_array($_SESSION['role'], ['superadmin', 'super_admin', 'admin'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized access']);
    exit;
}

$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
$status = sanitize_text($_POST['status'] ?? '');

if (!$id || !in_array($status, ['approved', 'rejected', 'pending'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid parameters']);
    exit;
}

try {
    $db = Database::getInstance()->getConnection();
    $db->beginTransaction();

    $stmt = $db->prepare("UPDATE registrations SET status = ? WHERE id = ?");
    $stmt->execute([$status, $id]);

    $stmt = $db->prepare("UPDATE payments SET status = ? WHERE registration_id = ?");
    $stmt->execute([$status, $id]);

    $db->commit();

    echo json_encode(['success' => true, 'message' => 'Status updated successfully']);
} catch (PDOException $e) {
    if ($db->inTransaction()) {
        $db->rollBack();
    }
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
