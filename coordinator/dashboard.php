<?php
// coordinator/dashboard.php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/db.php';

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'coordinator') {
    header('Location: ../login.php');
    exit;
}

$event_id = $_SESSION['event_id'];

try {
    $db = Database::getInstance()->getConnection();
    
    // Get event details
    $stmt = $db->prepare("SELECT name FROM events WHERE id = ?");
    $stmt->execute([$event_id]);
    $event_name = $stmt->fetchColumn();

    // Get participants for this event
    $stmt = $db->prepare("
        SELECT p.full_name, p.college_name AS college, p.department, p.phone 
        FROM registration_events re
        JOIN registrations r ON re.registration_id = r.id
        JOIN payments pm ON pm.registration_id = r.id
        JOIN participants p ON r.participant_id = p.id
        WHERE re.event_id = ? AND pm.status = 'approved'
    ");
    $stmt->execute([$event_id]);
    $participants = $stmt->fetchAll();
} catch (PDOException $e) {
    die('Database error.');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coordinator Dashboard - SYNTAX 2K26</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script>
        tailwind.config = {
            theme: {
                extend: { colors: { primary: '#4169E1' } }
            }
        }
    </script>
</head>
<body class="bg-gray-50">
    <div class="flex h-screen overflow-hidden">
        
        <!-- Sidebar -->
        <aside class="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
            <div class="h-16 flex items-center px-6 border-b border-gray-200">
                <span class="text-xl font-bold text-gray-900">SYNTAX <span class="text-primary">Co-ord</span></span>
            </div>
            <nav class="flex-1 overflow-y-auto py-4">
                <ul class="space-y-1 px-3">
                    <li><a href="dashboard.php" class="flex items-center px-3 py-2 text-primary bg-blue-50 rounded-lg font-medium"><i class="fas fa-list w-6"></i> Participants</a></li>
                    <li><a href="#" class="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"><i class="fas fa-clipboard-check w-6"></i> Attendance</a></li>
                    <li><a href="#" class="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"><i class="fas fa-trophy w-6"></i> Update Winners</a></li>
                </ul>
            </nav>
            <div class="p-4 border-t border-gray-200">
                <a href="../includes/logout.php" class="flex items-center text-red-600 font-medium hover:text-red-700"><i class="fas fa-sign-out-alt w-6"></i> Logout</a>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto p-8">
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">Event Dashboard</h1>
                    <p class="text-gray-500 font-medium mt-1">Event: <?php echo htmlspecialchars($event_name); ?></p>
                </div>
                <div class="text-sm text-gray-500">Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?></div>
            </div>

            <!-- Stats -->
            <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8 inline-block pr-12">
                <div class="text-gray-500 text-sm font-semibold mb-2">Total Participants</div>
                <div class="text-3xl font-bold text-gray-900"><?php echo count($participants); ?></div>
            </div>

            <!-- Table -->
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 class="font-bold text-gray-900">Registered Participants</h2>
                    <button class="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-200 transition-colors">
                        <i class="fas fa-download mr-2"></i>Export Excel
                    </button>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm text-gray-500">
                        <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                            <tr>
                                <th class="px-6 py-3">Name</th>
                                <th class="px-6 py-3">College</th>
                                <th class="px-6 py-3">Department</th>
                                <th class="px-6 py-3">Phone</th>
                                <th class="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (count($participants) > 0): ?>
                                <?php foreach ($participants as $p): ?>
                                <tr class="border-b border-gray-50 hover:bg-gray-50">
                                    <td class="px-6 py-4 font-medium text-gray-900"><?php echo htmlspecialchars($p['full_name']); ?></td>
                                    <td class="px-6 py-4"><?php echo htmlspecialchars($p['college']); ?></td>
                                    <td class="px-6 py-4"><?php echo htmlspecialchars($p['department']); ?></td>
                                    <td class="px-6 py-4"><?php echo htmlspecialchars($p['phone']); ?></td>
                                    <td class="px-6 py-4">
                                        <button class="text-primary hover:underline font-medium">Mark Present</button>
                                    </td>
                                </tr>
                                <?php endforeach; ?>
                            <?php else: ?>
                                <tr>
                                    <td colspan="5" class="px-6 py-8 text-center text-gray-500">No participants registered for this event yet.</td>
                                </tr>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>
</body>
</html>
