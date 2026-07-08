<?php
// api/update_status.php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/functions.php';
require_once __DIR__ . '/../includes/mailer.php';

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

// Unlock session to prevent other tabs (like frontend registration) from hanging 
// while the server connects to Google SMTP in the background
session_write_close();

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

    $emailSent = false;
    // Send email notification if approved
    if ($status === 'approved') {
        // Fetch participant and registration details
        $stmtDetails = $db->prepare("
            SELECT p.full_name, p.email, r.registration_number
            FROM registrations r
            JOIN participants p ON r.participant_id = p.id
            WHERE r.id = ?
        ");
        $stmtDetails->execute([$id]);
        $participant = $stmtDetails->fetch();

        if ($participant) {
            // Fetch registered events
            $stmtEvents = $db->prepare("
                SELECT e.name, e.type, re.phase
                FROM registration_events re
                JOIN events e ON re.event_id = e.id
                WHERE re.registration_id = ?
            ");
            $stmtEvents->execute([$id]);
            $eventsList = $stmtEvents->fetchAll();

            // Prepare and send email
            $subject = 'Registration Approved - SYNTAX 2K26';
            $htmlBody = get_registration_success_email_html(
                $participant['full_name'], 
                $participant['registration_number'], 
                $eventsList
            );

            $emailSent = send_email($participant['email'], $participant['full_name'], $subject, $htmlBody);
        }
    }

    echo json_encode([
        'success' => true, 
        'message' => 'Status updated successfully' . ($status === 'approved' ? ($emailSent ? ' and email sent' : ', but failed to send email (check SMTP configs)') : '')
    ]);
} catch (PDOException $e) {
    if ($db->inTransaction()) {
        $db->rollBack();
    }
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
