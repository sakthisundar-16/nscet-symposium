<?php
require 'includes/config.php';
require 'includes/db.php';
require 'includes/mailer.php';

$db = Database::getInstance()->getConnection();
$id = 8;
$status = 'approved';

$stmtDetails = $db->prepare("
    SELECT p.full_name, p.email, r.registration_number
    FROM registrations r
    JOIN participants p ON r.participant_id = p.id
    WHERE r.id = ?
");
$stmtDetails->execute([$id]);
$participant = $stmtDetails->fetch();

if ($participant) {
    echo "Participant found: " . $participant['email'] . "\n";
    $stmtEvents = $db->prepare("
        SELECT e.name, e.type, re.phase
        FROM registration_events re
        JOIN events e ON re.event_id = e.id
        WHERE re.registration_id = ?
    ");
    $stmtEvents->execute([$id]);
    $eventsList = $stmtEvents->fetchAll();

    echo "Events count: " . count($eventsList) . "\n";

    $subject = 'Registration Approved - SYNTAX 2K26';
    $htmlBody = get_registration_success_email_html(
        $participant['full_name'], 
        $participant['registration_number'], 
        $eventsList
    );

    $emailSent = send_email($participant['email'], $participant['full_name'], $subject, $htmlBody);
    echo "Email sent result: " . ($emailSent ? "True" : "False") . "\n";
} else {
    echo "Participant not found.\n";
}
