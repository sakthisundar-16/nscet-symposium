<?php
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
?>
<main class="min-h-screen flex items-center justify-center bg-background py-24">
    <div class="text-center px-6 py-16 bg-white rounded-[2rem] shadow-2xl border border-slate-100 max-w-xl">
        <h1 class="text-7xl font-black text-primary mb-6">403</h1>
        <p class="text-xl text-gray-600 mb-8">Access denied. You do not have permission to view this page.</p>
        <a href="/login.php" class="btn-primary">Login</a>
    </div>
</main>
<?php require_once __DIR__ . '/includes/footer.php'; ?>
