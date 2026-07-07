<?php
// includes/navbar.php
$current_page = basename($_SERVER['PHP_SELF']);
?>
<nav id="navbar" class="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-transparent py-4">
    <div class="container mx-auto px-4 md:px-8 flex justify-between items-center relative">
        
        <!-- Left: College Logo -->
        <a href="index.php" class="flex-shrink-0 z-10">
            <img src="/assets/images/college-logo.svg" alt="NSCET Logo" class="h-12 md:h-16 w-auto object-contain fallback-logo" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iNTAiPjxwYXRoIGQ9Ik0wIDBoMTAwdjUwaC0xMDB6IiBmaWxsPSIjZWVlIi8+PHRleHQgeD0iNTAiIHk9IjMwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5OTkiPkNvbGxlZ2UgTG9nbzwvdGV4dD48L3N2Zz4='">
        </a>

        <!-- Center: College Name & Faculty -->
        <div class="hidden md:flex flex-col items-center absolute left-1/2 transform -translate-x-1/2 w-full max-w-[60%] pointer-events-none text-center">
            <h2 class="text-sm md:text-base font-bold text-gray-900 tracking-tight uppercase nav-text">
                Nadar Saraswathi College of Engineering & Technology
            </h2>
            <p class="text-xs md:text-sm text-gray-500 font-medium mt-0.5 nav-subtext">
                Faculty of Computing
            </p>
        </div>

        <!-- Right: Desktop Nav -->
        <div class="hidden md:flex items-center space-x-6 z-10 bg-white/50 px-6 py-2 rounded-full border border-gray-100 backdrop-blur-md shadow-sm">
            <a href="index.php" class="text-sm font-semibold transition-colors <?php echo $current_page == 'index.php' ? 'text-primary' : 'text-gray-700 hover:text-primary'; ?>">Home</a>
            <a href="events.php" class="text-sm font-semibold transition-colors <?php echo $current_page == 'events.php' ? 'text-primary' : 'text-gray-700 hover:text-primary'; ?>">Events</a>
            <a href="registration.php" class="text-sm font-semibold transition-colors <?php echo $current_page == 'registration.php' ? 'text-primary' : 'text-gray-700 hover:text-primary'; ?>">Register</a>
            <a href="login.php" class="text-sm font-semibold transition-colors <?php echo $current_page == 'login.php' ? 'text-primary' : 'text-gray-700 hover:text-primary'; ?>">Admin</a>
        </div>

        <!-- Mobile Menu Button -->
        <button id="mobile-menu-btn" class="md:hidden z-10 p-2 text-gray-600 hover:text-primary">
            <i class="fas fa-bars text-2xl"></i>
        </button>
    </div>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-lg border-t border-gray-100 p-4 flex flex-col space-y-4">
        <a href="index.php" class="text-gray-800 font-semibold p-2 hover:bg-gray-50 rounded-lg">Home</a>
        <a href="events.php" class="text-gray-800 font-semibold p-2 hover:bg-gray-50 rounded-lg">Events</a>
        <a href="registration.php" class="text-gray-800 font-semibold p-2 hover:bg-gray-50 rounded-lg">Register</a>
        <a href="login.php" class="text-gray-800 font-semibold p-2 hover:bg-gray-50 rounded-lg">Admin</a>
    </div>
</nav>
