<?php
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/functions.php';

$registration_number = isset($_GET['ref']) ? trim($_GET['ref']) : '';
$registration = null;
$participant = null;
$events = [];
$payment = null;

if ($registration_number) {
    try {
        $db = Database::getInstance()->getConnection();
        $stmt = $db->prepare(
            "SELECT r.id AS registration_id, r.registration_number, r.status AS registration_status, r.created_at AS registration_date,
                    p.full_name, p.college_name AS college, p.department, p.email, p.phone, p.whatsapp, p.city, p.state,
                    pm.transaction_id, pm.amount, pm.status AS payment_status, pm.uploaded_at
             FROM registrations r
             JOIN participants p ON r.participant_id = p.id
             LEFT JOIN payments pm ON pm.registration_id = r.id
             WHERE r.registration_number = ? LIMIT 1"
        );
        $stmt->execute([$registration_number]);
        $registration = $stmt->fetch();

        if ($registration) {
            $stmt = $db->prepare(
                "SELECT e.name, e.phase
                 FROM registration_events re
                 JOIN events e ON e.id = re.event_id
                 WHERE re.registration_id = ? ORDER BY e.phase, e.id"
            );
            $stmt->execute([$registration['registration_id']]);
            $events = $stmt->fetchAll();
        }
    } catch (PDOException $e) {
        $registration = null;
    }
}

require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
?>
<main class="min-h-screen pt-32 pb-24 bg-background">
    <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
            <?php if ($registration): ?>
                <div class="glass-panel p-8 md:p-12" data-aos="fade-up">
                    <div class="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
                        <div>
                            <p class="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Registration Confirmed</p>
                            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mt-3">Thank you, <?php echo escape($registration['full_name']); ?>!</h1>
                        </div>
                        <div class="text-right">
                            <p class="text-sm text-gray-500">Registration Number</p>
                            <p class="text-2xl font-bold text-gray-900 mt-2"><?php echo escape($registration['registration_number']); ?></p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <div class="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                            <h2 class="text-xl font-semibold text-gray-900 mb-4">Participant Details</h2>
                            <ul class="space-y-3 text-sm text-gray-600">
                                <li><strong class="text-gray-900">Email:</strong> <?php echo escape($registration['email']); ?></li>
                                <li><strong class="text-gray-900">Phone:</strong> <?php echo escape($registration['phone']); ?></li>
                                <li><strong class="text-gray-900">WhatsApp:</strong> <?php echo escape($registration['whatsapp']); ?></li>
                                <li><strong class="text-gray-900">College:</strong> <?php echo escape($registration['college']); ?></li>
                                <li><strong class="text-gray-900">Department:</strong> <?php echo escape($registration['department']); ?></li>
                                <li><strong class="text-gray-900">City & State:</strong> <?php echo escape($registration['city']); ?>, <?php echo escape($registration['state']); ?></li>
                            </ul>
                        </div>
                        <div class="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                            <h2 class="text-xl font-semibold text-gray-900 mb-4">Payment Receipt</h2>
                            <ul class="space-y-3 text-sm text-gray-600">
                                <li><strong class="text-gray-900">Transaction ID:</strong> <?php echo escape($registration['transaction_id']); ?></li>
                                <li><strong class="text-gray-900">Amount Paid:</strong> ₹<?php echo number_format($registration['amount'], 2); ?></li>
                                <li><strong class="text-gray-900">Payment Status:</strong> <?php echo escape($registration['payment_status'] ?: 'Pending'); ?></li>
                                <li><strong class="text-gray-900">Registered on:</strong> <?php echo date('d M Y, H:i', strtotime($registration['registration_date'])); ?></li>
                            </ul>
                        </div>
                    </div>

                    <div class="bg-blue-50/80 rounded-3xl border border-blue-100 p-6 mb-8">
                        <h2 class="text-lg font-semibold text-blue-900 mb-4">Selected Events</h2>
                        <div class="grid gap-4 md:grid-cols-2">
                            <?php foreach ($events as $event): ?>
                                <div class="rounded-3xl bg-white border border-gray-100 p-5 shadow-sm">
                                    <p class="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-2"><?php echo escape($event['phase']); ?></p>
                                    <h3 class="text-xl font-bold text-gray-900 mb-2"><?php echo escape($event['name']); ?></h3>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>

                    <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div class="flex items-center gap-3 text-sm text-gray-600">
                            <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <i class="fas fa-qrcode"></i>
                            </span>
                            <span>Your registration QR code is below for verification.</span>
                        </div>
                        <div class="text-right">
                            <button onclick="window.print()" class="btn-outline">Print Receipt</button>
                        </div>
                    </div>

                    <div class="mt-8 flex justify-center">
                        <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=<?php echo urlencode($registration['registration_number']); ?>" alt="Registration QR Code" loading="lazy" class="mx-auto">
                        </div>
                    </div>
                </div>
            <?php else: ?>
                <div class="glass-panel p-12 text-center" data-aos="fade-up">
                    <h1 class="text-4xl font-bold text-gray-900 mb-4">Registration not found</h1>
                    <p class="text-gray-600 mb-6">Please check your registration number and try again.</p>
                    <a href="/registration.php" class="btn-primary">Return to Registration</a>
                </div>
            <?php endif; ?>
        </div>
    </div>
</main>
<?php require_once __DIR__ . '/includes/footer.php'; ?>
