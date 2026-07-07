<?php
// api/dashboard.php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/functions.php';

header('Content-Type: application/json');

// Check admin authentication
if (empty($_SESSION['user_id']) || !in_array($_SESSION['role'], ['superadmin', 'super_admin', 'admin'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized access']);
    exit;
}

try {
    $db = Database::getInstance()->getConnection();

    // 1. Fetch Stats
    $stats = [
        'total' => 0,
        'pending' => 0,
        'approved' => 0,
        'rejected' => 0
    ];

    $stmt = $db->query("SELECT status, COUNT(id) as count FROM registrations GROUP BY status");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        if ($row['status'] === 'pending') $stats['pending'] = (int)$row['count'];
        if ($row['status'] === 'approved') $stats['approved'] = (int)$row['count'];
        if ($row['status'] === 'rejected') $stats['rejected'] = (int)$row['count'];
    }
    $stats['total'] = $stats['pending'] + $stats['approved'] + $stats['rejected'];

    // 2. Fetch Registrations
    $query = "SELECT 
                r.id,
                r.registration_number as reg_no,
                p.full_name as name,
                p.email,
                p.phone,
                p.college_name as college,
                GROUP_CONCAT(DISTINCT e.name SEPARATOR ', ') as registered_events,
                r.team_size,
                GROUP_CONCAT(DISTINCT tm.member_name SEPARATOR ', ') as team_members,
                pay.transaction_id as tx_id,
                pay.screenshot_path,
                r.status
              FROM registrations r
              JOIN participants p ON r.participant_id = p.id
              LEFT JOIN payments pay ON pay.registration_id = r.id
              LEFT JOIN registration_events re ON re.registration_id = r.id
              LEFT JOIN events e ON e.id = re.event_id
              LEFT JOIN team_members tm ON tm.registration_id = r.id
              GROUP BY r.id
              ORDER BY r.id DESC";
              
    $stmt = $db->query($query);
    $registrations = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'stats' => $stats,
        'registrations' => $registrations
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
