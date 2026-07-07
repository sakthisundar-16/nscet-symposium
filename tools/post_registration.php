<?php
// tools/post_registration.php

$api = 'http://localhost:8000/api/register.php';

$events = json_encode([["id" => 1, "phase" => "PHASE 1"]]);
$uploadPath = __DIR__ . '/../assets/dummy.pdf';
if (!file_exists($uploadPath)) {
    file_put_contents($uploadPath, "DUMMY PDF");
}

$ch = curl_init();
$post = [
    'full_name' => 'CLI Tester ' . time(),
    'gender' => 'Male',
    'dob' => '2000-01-01',
    'phone' => strval(9000000000 + (time() % 1000000)),
    'whatsapp' => strval(9000000000 + ((time()+1) % 1000000)),
    'email' => 'cli+' . time() . '@example.test',
    'college' => 'Test College',
    'department' => 'CS',
    'year_of_study' => 'III',
    'city' => 'Chennai',
    'state' => 'TN',
    'transaction_id' => 'CLI_TXN_' . time(),
    'events' => $events,
    'team_size' => 3,
    'team_members' => json_encode([
        ['name' => 'Member One', 'email' => 'm1@example.com', 'phone' => '8888888888'],
        ['name' => 'Member Two', 'email' => 'm2@example.com', 'phone' => '7777777777']
    ]),
    'payment_screenshot' => new CURLFile($uploadPath, 'application/pdf', basename($uploadPath))
];

curl_setopt($ch, CURLOPT_URL, $api);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post);

$response = curl_exec($ch);
$err = curl_error($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP_STATUS: $code\n";
if ($err) {
    echo "CURL_ERR: $err\n";
} else {
    echo "RESPONSE:\n$response\n";
}

?>