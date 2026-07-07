<?php
require 'includes/db.php';
$db = Database::getInstance()->getConnection();
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
print_r($stmt->fetchAll(PDO::FETCH_ASSOC));
?>
