<?php
// includes/mailer.php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/**
 * Send an email using PHPMailer
 * @param string $toEmail Recipient email address
 * @param string $toName Recipient name
 * @param string $subject Email subject
 * @param string $htmlBody HTML content of the email
 * @return bool True if email was sent, false otherwise
 */
function send_email($toEmail, $toName, $subject, $htmlBody) {
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = SMTP_HOST;
        $mail->SMTPAuth   = true;
        $mail->Username   = SMTP_USER;
        $mail->Password   = SMTP_PASS;
        $mail->SMTPSecure = SMTP_SECURE;
        $mail->Port       = SMTP_PORT;

        // Recipients
        $mail->setFrom(SMTP_USER, APP_NAME);
        $mail->addAddress($toEmail, $toName);

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $htmlBody;
        $mail->AltBody = strip_tags(str_replace(['<br>', '<br/>', '<br />'], "\n", $htmlBody));

        $mail->send();
        return true;
    } catch (Exception $e) {
        // Log error in production, but for now just return false
        error_log("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
        return false;
    }
}

/**
 * Generates the HTML template for a successful event registration
 */
function get_registration_success_email_html($name, $reg_number, $eventsList) {
    $eventsHtml = '';
    foreach ($eventsList as $event) {
        $eventsHtml .= "<li style='margin-bottom: 8px;'><strong>{$event['name']}</strong> ({$event['phase']} - {$event['type']})</li>";
    }

    return "
    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #EEF2F8; border-radius: 8px; overflow: hidden;'>
        <div style='background-color: #1B3A6B; padding: 20px; text-align: center;'>
            <h1 style='color: #FFFFFF; margin: 0; font-size: 24px; letter-spacing: 1px;'>SYNTAX <span style='color: #C8845A;'>2K26</span></h1>
        </div>
        <div style='padding: 30px; background-color: #FFFFFF; color: #0F2444; line-height: 1.6;'>
            <h2 style='color: #1B3A6B; margin-top: 0;'>Registration Approved! 🎉</h2>
            <p>Dear <strong>{$name}</strong>,</p>
            <p>Your payment for SYNTAX 2K26 has been successfully verified and approved! We are thrilled to have you join us for a day of technology, innovation, and competition.</p>
            
            <div style='background-color: #F5F7FA; border-left: 4px solid #C8845A; padding: 15px; margin: 20px 0;'>
                <p style='margin: 0; font-size: 14px; color: #4A6080; text-transform: uppercase; letter-spacing: 1px;'>Your Registration Number</p>
                <p style='margin: 5px 0 0 0; font-size: 20px; font-weight: bold; color: #1B3A6B;'>{$reg_number}</p>
            </div>

            <h3 style='color: #0F2444; margin-bottom: 10px;'>Registered Events:</h3>
            <ul style='color: #4A6080; padding-left: 20px;'>
                {$eventsHtml}
            </ul>

            <p style='margin-top: 30px;'>Please keep your registration number handy. You will need to present your college ID card on the day of the symposium.</p>
            
            <p>See you on <strong>August 7, 2026</strong> at NSCET, Theni!</p>
            
            <p style='margin-bottom: 0;'>Best Regards,<br><strong>The SYNTAX 2K26 Team</strong></p>
        </div>
        <div style='background-color: #F5F7FA; padding: 15px; text-align: center; border-top: 1px solid #EEF2F8;'>
            <p style='margin: 0; font-size: 12px; color: #A0623E;'>Faculty of Computing, NSCET · Vadapudupatti, Annanji (PO), Theni – 625 531</p>
        </div>
    </div>
    ";
}
?>
