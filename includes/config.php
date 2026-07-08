<?php
// includes/config.php

// Application details
define('APP_NAME', 'SYNTAX 2K26');
define('APP_ORG', 'Faculty of Computing, Nadar Saraswathi College of Engineering & Technology');
define('APP_FEE', 350);
define('SITE_EMAIL', 'syntax2k26@nscet.org');
define('SITE_URL', 'https://example.com'); // Update to your live domain after deployment

// Mail / SMTP Configuration
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_USER', 'syntax2k26@gmail.com');
define('SMTP_PASS', 'P@$$w0rd.'); // Generate an App Password in your Google Account
define('SMTP_PORT', 587);
define('SMTP_SECURE', 'tls'); // or 'ssl' for port 465

// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'nscet_symposium');

// Session config
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
ini_set('session.use_strict_mode', 1);
// ini_set('session.cookie_secure', 1); // Enable this if using HTTPS in prod

// Start session if not started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>
