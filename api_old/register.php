<?php
require_once '../backend/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Basic validation
    $required_fields = ['full_name', 'gender', 'dob', 'phone', 'email', 'whatsapp', 'college', 'department', 'year_of_study', 'city', 'state', 'transaction_id'];
    foreach ($required_fields as $field) {
        if (empty($_POST[$field])) {
            sendJson(["success" => false, "error" => "Missing required field: $field"], 400);
        }
    }

    if (empty($_FILES['payment_screenshot']) || $_FILES['payment_screenshot']['error'] !== UPLOAD_ERR_OK) {
        sendJson(["success" => false, "error" => "Payment screenshot is required."], 400);
    }

    // Extract POST data
    $full_name = $_POST['full_name'];
    $gender = $_POST['gender'];
    $dob = $_POST['dob'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $whatsapp = $_POST['whatsapp'];
    $college = $_POST['college'];
    $department = $_POST['department'];
    $year_of_study = $_POST['year_of_study'];
    $city = $_POST['city'];
    $state = $_POST['state'];
    $transaction_id = $_POST['transaction_id'];

    $events = isset($_POST['events']) ? json_decode($_POST['events'], true) : [];
    if (!is_array($events) || count($events) == 0) {
        sendJson(["success" => false, "error" => "At least one event must be selected."], 400);
    }

    try {
        $pdo->beginTransaction();

        // 1. Check for duplicates
        $stmt = $pdo->prepare("SELECT id FROM participants WHERE email = ? OR phone = ?");
        $stmt->execute([$email, $phone]);
        if ($stmt->fetch()) {
            throw new Exception("Participant with this email or phone already exists.");
        }

        $stmt = $pdo->prepare("SELECT id FROM payments WHERE transaction_id = ?");
        $stmt->execute([$transaction_id]);
        if ($stmt->fetch()) {
            throw new Exception("Transaction ID already exists.");
        }

        // 2. Insert Participant
        $stmt = $pdo->prepare("INSERT INTO participants (full_name, gender, dob, phone, email, whatsapp, college, department, year_of_study, city, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$full_name, $gender, $dob, $phone, $email, $whatsapp, $college, $department, $year_of_study, $city, $state]);
        $participant_id = $pdo->lastInsertId();

        // 3. Generate Registration Number
        $reg_prefix = "SYN26";
        $reg_number = $reg_prefix . str_pad($participant_id, 4, "0", STR_PAD_LEFT);

        // 4. Insert Registration
        $stmt = $pdo->prepare("INSERT INTO registrations (registration_number, participant_id, status) VALUES (?, ?, 'pending')");
        $stmt->execute([$reg_number, $participant_id]);
        $registration_id = $pdo->lastInsertId();

        // 5. Insert Registration Events
        foreach ($events as $event) {
            $event_id = $event['id'];
            $phase = $event['phase'];
            $stmt = $pdo->prepare("INSERT INTO registration_events (registration_id, event_id, phase) VALUES (?, ?, ?)");
            $stmt->execute([$registration_id, $event_id, $phase]);
        }

        // 6. Handle File Upload
        $upload_dir = '../uploads/payments/';
        if (!is_dir($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }

        $file_extension = pathinfo($_FILES['payment_screenshot']['name'], PATHINFO_EXTENSION);
        $allowed_extensions = ['jpg', 'jpeg', 'png', 'pdf'];
        
        if (!in_array(strtolower($file_extension), $allowed_extensions)) {
            throw new Exception("Invalid file format. Only JPG, PNG, and PDF are allowed.");
        }

        $new_filename = $reg_number . '_' . time() . '.' . $file_extension;
        $destination = $upload_dir . $new_filename;

        if (!move_uploaded_file($_FILES['payment_screenshot']['tmp_name'], $destination)) {
            throw new Exception("Failed to upload payment screenshot.");
        }

        $screenshot_path = 'uploads/payments/' . $new_filename;

        // 7. Insert Payment
        $stmt = $pdo->prepare("INSERT INTO payments (registration_id, transaction_id, screenshot_path, status) VALUES (?, ?, ?, 'pending')");
        $stmt->execute([$registration_id, $transaction_id, $screenshot_path]);

        $pdo->commit();

        sendJson([
            "success" => true,
            "message" => "Registration successful",
            "registration_number" => $reg_number
        ]);

    } catch (Exception $e) {
        $pdo->rollBack();
        sendJson(["success" => false, "error" => $e->getMessage()], 400);
    }

} else {
    sendJson(["success" => false, "error" => "Method not allowed"], 405);
}
?>
