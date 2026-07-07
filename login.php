<?php
// login.php
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/db.php';

// Redirect if already logged in
if (isset($_SESSION['user_id'])) {
    if ($_SESSION['role'] === 'super_admin' || $_SESSION['role'] === 'admin') {
        header('Location: admin/dashboard.php');
    } else {
        header('Location: coordinator/dashboard.php');
    }
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $csrf_token = filter_input(INPUT_POST, '_csrf_token', FILTER_SANITIZE_STRING);
    if (!verify_csrf_token($csrf_token)) {
        $error = 'Invalid session. Please refresh and try again.';
    } else {
        $username = sanitize_text($_POST['username'] ?? '');
        $password = trim($_POST['password'] ?? '');
        $type = sanitize_text($_POST['type'] ?? '');

        if ($username && $password && $type) {
            try {
                $db = Database::getInstance()->getConnection();
                if ($type === 'admin') {
                    // admins table uses column `password` — alias to `password_hash` for compatibility
                    $stmt = $db->prepare('SELECT id, username, password AS password_hash, role FROM admins WHERE username = ? LIMIT 1');
                } else {
                    // coordinators table uses column `password` — alias to `password_hash`
                    $stmt = $db->prepare('SELECT id, username, password AS password_hash, event_id FROM coordinators WHERE username = ? LIMIT 1');
                }
                $stmt->execute([$username]);
                $user = $stmt->fetch();

                if ($user && password_verify($password, $user['password_hash'])) {
                    session_regenerate_id(true);
                    $_SESSION['user_id'] = $user['id'];
                    $_SESSION['username'] = $user['username'];
                    $_SESSION['role'] = ($type === 'admin') ? $user['role'] : 'coordinator';
                    if ($type === 'coordinator') {
                        $_SESSION['event_id'] = $user['event_id'];
                    }

                    if ($type === 'admin') {
                        header('Location: admin/dashboard.php');
                    } else {
                        header('Location: coordinator/dashboard.php');
                    }
                    exit;
                }

                $error = 'Invalid username or password.';
            } catch (PDOException $e) {
                $error = 'Database error occurred.';
            }
        } else {
            $error = 'Please fill in all fields.';
        }
    }
}

require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
?>

<main class="min-h-screen pt-32 pb-24 relative overflow-hidden flex items-center justify-center bg-background">
    <div class="absolute inset-0 z-0 bg-background pointer-events-none">
        <div class="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100 rounded-full blur-[100px] opacity-50"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10 max-w-md">
        
        <div class="glass-panel p-8 md:p-10" data-aos="fade-up">
            <div class="text-center mb-8">
                <div class="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-lock text-2xl"></i>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2 font-poppins">Staff Portal</h2>
                <p class="text-gray-500 text-sm">Secure login for Admins & Coordinators</p>
            </div>

            <?php if ($error): ?>
                <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-center mb-6">
                    <i class="fas fa-exclamation-circle mr-2"></i>
                    <?php echo htmlspecialchars($error); ?>
                </div>
            <?php endif; ?>

            <form method="POST" action="login.php" class="space-y-5">
                <input type="hidden" name="_csrf_token" value="<?php echo generate_csrf_token(); ?>">

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Login Type</label>
                    <div class="flex space-x-4">
                        <label class="flex-1 cursor-pointer">
                            <input type="radio" name="type" value="admin" class="peer sr-only" checked>
                            <div class="text-center px-4 py-3 rounded-xl border border-gray-200 bg-white/50 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition-all font-semibold text-sm">
                                Admin
                            </div>
                        </label>
                        <label class="flex-1 cursor-pointer">
                            <input type="radio" name="type" value="coordinator" class="peer sr-only">
                            <div class="text-center px-4 py-3 rounded-xl border border-gray-200 bg-white/50 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition-all font-semibold text-sm">
                                Coordinator
                            </div>
                        </label>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                    <div class="relative">
                        <i class="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input type="text" name="username" required class="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <div class="relative">
                        <i class="fas fa-key absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input type="password" name="password" required class="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                    </div>
                </div>

                <button type="submit" class="w-full btn-primary mt-4">
                    Sign In <i class="fas fa-sign-in-alt ml-2"></i>
                </button>
            </form>
        </div>
    </div>
</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
