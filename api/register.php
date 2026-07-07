<?php
// api/register.php
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/functions.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse('error', 'Invalid request method.', null, 405);
}

// 1. Sanitize and validate inputs
$csrf_token = filter_input(INPUT_POST, '_csrf_token', FILTER_SANITIZE_STRING);
$full_name = sanitize_text($_POST['full_name'] ?? '');
$gender = sanitize_text($_POST['gender'] ?? '');
$dob = sanitize_text($_POST['dob'] ?? '');
$phone = sanitize_text($_POST['phone'] ?? '');
$whatsapp = sanitize_text($_POST['whatsapp'] ?? '');
$email = sanitize_email($_POST['email'] ?? '');
$college = sanitize_text($_POST['college'] ?? '');
$department = sanitize_text($_POST['department'] ?? '');
$year_of_study = sanitize_text($_POST['year_of_study'] ?? '');
$city = sanitize_text($_POST['city'] ?? '');
$state = sanitize_text($_POST['state'] ?? '');
$transaction_id = sanitize_text($_POST['transaction_id'] ?? '');
// Team info
$team_size = isset($_POST['team_size']) ? intval($_POST['team_size']) : 1;
$team_members_json = $_POST['team_members'] ?? '[]';
$team_members = json_decode($team_members_json, true);

// Events
$events_json = $_POST['events'] ?? '[]';
$events = json_decode($events_json, true);
$selected_events = [];
if (is_array($events)) {
    foreach ($events as $item) {
        $event_id = filter_var($item['id'] ?? null, FILTER_VALIDATE_INT);
        $event_phase = sanitize_text($item['phase'] ?? '');
        if ($event_id && $event_phase) {
            $selected_events[] = ['id' => $event_id, 'phase' => $event_phase];
        }
    }
}

$missing_fields = [];
if (!$full_name) $missing_fields[] = 'full_name';
if (!$email) $missing_fields[] = 'email';
if (!$phone) $missing_fields[] = 'phone';
if (!$whatsapp) $missing_fields[] = 'whatsapp';
if (!$transaction_id) $missing_fields[] = 'transaction_id';
if (!$college) $missing_fields[] = 'college';
if (!$department) $missing_fields[] = 'department';
if (!$year_of_study) $missing_fields[] = 'year_of_study';
if (!$city) $missing_fields[] = 'city';
if (!$state) $missing_fields[] = 'state';
if (!$dob) $missing_fields[] = 'dob';

if (!empty($missing_fields)) {
    sendJsonResponse('error', 'Missing required fields: ' . implode(', ', $missing_fields), null, 400);
}

if ($csrf_token !== null && $csrf_token !== '' && !verify_csrf_token($csrf_token)) {
    sendJsonResponse('error', 'Invalid session. Please refresh the page and try again.', null, 403);
}

if (empty($selected_events)) {
    sendJsonResponse('error', 'Please select at least one event.', null, 400);
}

// 2. Handle File Upload
if (!isset($_FILES['payment_screenshot'])) {
    sendJsonResponse('error', 'Payment screenshot file not sent.', null, 400);
}
if ($_FILES['payment_screenshot']['error'] !== UPLOAD_ERR_OK) {
    sendJsonResponse('error', 'File upload error code: ' . $_FILES['payment_screenshot']['error'], null, 400);
}

$file = $_FILES['payment_screenshot'];
$allowed_types = ['image/jpeg', 'image/png', 'application/pdf'];
if (!in_array($file['type'], $allowed_types)) {
    sendJsonResponse('error', 'Only JPG, PNG, and PDF files are allowed.', null, 400);
}
if ($file['size'] > 10 * 1024 * 1024) { // 10MB limit
    sendJsonResponse('error', 'File size must be less than 10MB.', null, 400);
}

$upload_dir = __DIR__ . '/../assets/uploads/';
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0755, true);
}

$file_ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$new_filename = 'PAY_' . time() . '_' . uniqid() . '.' . $file_ext;
$destination = $upload_dir . $new_filename;

if (!move_uploaded_file($file['tmp_name'], $destination)) {
    sendJsonResponse('error', 'Failed to save payment proof.', null, 500);
}

try {
    $db = Database::getInstance()->getConnection();
    $db->beginTransaction();

    // 3. Check for duplicates
    $stmt = $db->prepare("SELECT id FROM participants WHERE email = ? OR phone = ?");
    $stmt->execute([$email, $phone]);
    if ($stmt->fetch()) {
        $db->rollBack();
        sendJsonResponse('error', 'Email or phone number is already registered.', null, 409);
    }

    $stmt = $db->prepare("SELECT id FROM payments WHERE transaction_id = ?");
    $stmt->execute([$transaction_id]);
    if ($stmt->fetch()) {
        $db->rollBack();
        sendJsonResponse('error', 'Transaction ID already exists.', null, 409);
    }

    // 4. Insert Participant
    $reg_number = 'SYN26' . strtoupper(substr(md5(uniqid()), 0, 6));
    
    $stmt = $db->prepare("INSERT INTO participants (full_name, gender, dob, phone, email, whatsapp, college_name, department, year_of_study, city, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$full_name, $gender, $dob, $phone, $email, $whatsapp, $college, $department, $year_of_study, $city, $state]);
    $participant_id = $db->lastInsertId();

    // 5. Insert Registration
    $stmt = $db->prepare("INSERT INTO registrations (registration_number, participant_id, status, team_size) VALUES (?, ?, 'pending', ?)");
    $stmt->execute([$reg_number, $participant_id, $team_size]);
    $registration_id = $db->lastInsertId();

    // 6. Insert Payment
    $stmt = $db->prepare("INSERT INTO payments (registration_id, transaction_id, screenshot_path, amount, status) VALUES (?, ?, ?, ?, 'pending')");
    $stmt->execute([$registration_id, $transaction_id, $new_filename, APP_FEE]);
    $payment_id = $db->lastInsertId();

    // 7. Insert Events
    $event_ids = array_column($selected_events, 'id');
    if (!empty($event_ids)) {
        $placeholders = implode(',', array_fill(0, count($event_ids), '?'));
        $stmt = $db->prepare("SELECT id, phase FROM events WHERE id IN ($placeholders)");
        $stmt->execute($event_ids);
        $eventPhases = [];
        while ($row = $stmt->fetch()) {
            $eventPhases[] = ['id' => $row['id'], 'phase' => $row['phase']];
        }

        $event_query = "INSERT INTO registration_events (registration_id, event_id, phase) VALUES (?, ?, ?)";
        $event_stmt = $db->prepare($event_query);
        foreach ($eventPhases as $item) {
            $event_stmt->execute([$registration_id, $item['id'], $item['phase']]);
        }
    }

    // 8. Insert team members if provided
    if (is_array($team_members) && !empty($team_members)) {
        $tm_stmt = $db->prepare("INSERT INTO team_members (registration_id, member_name, member_email, member_phone) VALUES (?, ?, ?, ?)");
        foreach ($team_members as $m) {
            $m_name = sanitize_text($m['name'] ?? '');
            $m_email = sanitize_email($m['email'] ?? '');
            $m_phone = sanitize_text($m['phone'] ?? '');
            if ($m_name) {
                $tm_stmt->execute([$registration_id, $m_name, $m_email, $m_phone]);
            }
        }
    }

    $db->commit();

    sendJsonResponse('success', 'Registration successful.', [
        'registration_number' => $reg_number
    ]);

} catch (PDOException $e) {
    if ($db->inTransaction()) {
        $db->rollBack();
    }
    // Delete uploaded file on failure
    if (file_exists($destination)) {
        unlink($destination);
    }
    sendJsonResponse('error', 'Database error: ' . $e->getMessage(), null, 500);
}
?>
