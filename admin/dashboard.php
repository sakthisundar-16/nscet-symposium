<?php
// admin/dashboard.php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/db.php';

if (!isset($_SESSION['user_id']) || ($_SESSION['role'] !== 'super_admin' && $_SESSION['role'] !== 'admin')) {
    header('Location: ../login.php');
    exit;
}

try {
    $db = Database::getInstance()->getConnection();
    
    // Quick Stats
    $stmt = $db->query("SELECT COUNT(*) FROM registrations");
    $total_regs = $stmt->fetchColumn();
    
    $stmt = $db->query("SELECT COUNT(*) FROM payments WHERE status = 'pending'");
    $pending_regs = $stmt->fetchColumn();
    
    $stmt = $db->query("SELECT COUNT(*) FROM payments WHERE status = 'approved'");
    $approved_regs = $stmt->fetchColumn();
    
    $stmt = $db->query("SELECT p.full_name, p.college_name AS college, pm.status AS payment_status, pm.transaction_id, pm.uploaded_at AS created_at 
                       , pm.screenshot_path, r.id AS registration_id, r.team_size
                       FROM payments pm 
                       JOIN registrations r ON pm.registration_id = r.id 
                       JOIN participants p ON r.participant_id = p.id 
                       ORDER BY pm.uploaded_at DESC LIMIT 10");
    $recent_regs = $stmt->fetchAll();
    
} catch (PDOException $e) {
    die("Database error.");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - SYNTAX 2K26</title>
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
                <span class="text-xl font-bold text-gray-900">SYNTAX <span class="text-primary">Admin</span></span>
            </div>
            <nav class="flex-1 overflow-y-auto py-4">
                <ul class="space-y-1 px-3">
                    <li><a href="dashboard.php" class="flex items-center px-3 py-2 text-primary bg-blue-50 rounded-lg font-medium"><i class="fas fa-home w-6"></i> Dashboard</a></li>
                    <li><a href="#" class="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"><i class="fas fa-users w-6"></i> Registrations</a></li>
                    <li><a href="#" class="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"><i class="fas fa-money-bill w-6"></i> Payments</a></li>
                    <li><a href="#" class="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"><i class="fas fa-file-excel w-6"></i> Export Data</a></li>
                </ul>
            </nav>
            <div class="p-4 border-t border-gray-200">
                <a href="../includes/logout.php" class="flex items-center text-red-600 font-medium hover:text-red-700"><i class="fas fa-sign-out-alt w-6"></i> Logout</a>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto p-8">
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <div class="text-sm text-gray-500">Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?></div>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div class="text-gray-500 text-sm font-semibold mb-2">Total Registrations</div>
                    <div class="text-3xl font-bold text-gray-900"><?php echo $total_regs; ?></div>
                </div>
                <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div class="text-gray-500 text-sm font-semibold mb-2">Pending Payments</div>
                    <div class="text-3xl font-bold text-amber-500"><?php echo $pending_regs; ?></div>
                </div>
                <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div class="text-gray-500 text-sm font-semibold mb-2">Approved Payments</div>
                    <div class="text-3xl font-bold text-emerald-600"><?php echo $approved_regs; ?></div>
                </div>
            </div>

            <!-- Table -->
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-100">
                    <h2 class="font-bold text-gray-900">Recent Registrations</h2>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm text-gray-500">
                        <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                            <tr>
                                <th class="px-6 py-3">Name</th>
                                <th class="px-6 py-3">College</th>
                                    <th class="px-6 py-3">Team Size</th>
                                    <th class="px-6 py-3">Team Members</th>
                                <th class="px-6 py-3">Txn ID</th>
                                    <th class="px-6 py-3">Payment Proof</th>
                                <th class="px-6 py-3">Status</th>
                                <th class="px-6 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($recent_regs as $reg): ?>
                                <?php
                                    // fetch team members for this registration
                                    $tm_stmt = $db->prepare("SELECT member_name, member_email, member_phone FROM team_members WHERE registration_id = ?");
                                    $tm_stmt->execute([$reg['registration_id']]);
                                    $team_members = $tm_stmt->fetchAll();
                                    $screenshot = $reg['screenshot_path'] ?? null;
                                    $screenshot_url = $screenshot ? '../assets/uploads/' . $screenshot : null;
                                ?>
                            <tr class="border-b border-gray-50 hover:bg-gray-50">
                                <td class="px-6 py-4 font-medium text-gray-900"><?php echo htmlspecialchars($reg['full_name']); ?></td>
                                <td class="px-6 py-4"><?php echo htmlspecialchars($reg['college']); ?></td>
                                    <td class="px-6 py-4"><?php echo htmlspecialchars($reg['team_size'] ?? 1); ?></td>
                                    <td class="px-6 py-4"> 
                                        <?php if (!empty($team_members)): ?>
                                            <ul class="text-sm text-gray-700">
                                            <?php foreach ($team_members as $tm): ?>
                                                <li><?php echo htmlspecialchars($tm['member_name']); ?><?php echo $tm['member_email'] ? ' — ' . htmlspecialchars($tm['member_email']) : ''; ?><?php echo $tm['member_phone'] ? ' (' . htmlspecialchars($tm['member_phone']) . ')' : ''; ?></li>
                                            <?php endforeach; ?>
                                            </ul>
                                        <?php else: ?>
                                            <span class="text-sm text-gray-500">—</span>
                                        <?php endif; ?>
                                    </td>
                                <td class="px-6 py-4"><?php echo htmlspecialchars($reg['transaction_id']); ?></td>
                                    <td class="px-6 py-4">
                                        <?php if ($screenshot_url): ?>
                                            <a href="<?php echo $screenshot_url; ?>" target="_blank" class="text-blue-600 hover:underline">View</a>
                                        <?php else: ?>
                                            <span class="text-sm text-gray-500">—</span>
                                        <?php endif; ?>
                                    </td>
                                <td class="px-6 py-4">
                                    <span class="px-2.5 py-1 rounded-full text-xs font-semibold <?php echo $reg['payment_status'] === 'approved' ? 'bg-green-100 text-green-700' : ($reg['payment_status'] === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'); ?>">
                                        <?php echo ucfirst(htmlspecialchars($reg['payment_status'])); ?>
                                    </span>
                                </td>
                                <td class="px-6 py-4"><?php echo date('M d, H:i', strtotime($reg['created_at'])); ?></td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>
</body>
</html>
