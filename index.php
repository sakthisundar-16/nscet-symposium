<?php
// index.php
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
?>

<main class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-[90vh]">
        <!-- Background Image with 70% White Overlay -->
        <div class="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style="background-image: url('/assets/images/college-building.jpg')">
            <div class="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>
        </div>

        <div class="container mx-auto px-4 relative z-10 text-center">
            
            <div class="flex justify-center mb-8" data-aos="zoom-in" data-aos-duration="1000">
                <img src="/assets/images/event-logo.svg" alt="SYNTAX 2K26 Logo" class="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-[0_20px_50px_rgba(65,105,225,0.4)] border-4 border-white event-logo-float fallback-event-logo" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwMCIgZmlsbD0iIzQxNjlFMSIvPjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjRkZGIj5TVU1QT1NJVU08L3RleHQ+PC9zdmc+'">

            <h1 class="text-6xl md:text-8xl font-bold tracking-tighter text-gray-900 mb-4 font-poppins" data-aos="fade-up" data-aos-delay="200">
                SYNTAX <span class="premium-text-gradient">2K26</span>
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-800 font-medium mb-12 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="300">
                Code. Create. Connect. <span class="premium-text-gradient font-bold">Conquer.</span>
            </p>

            <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16" data-aos="fade-up" data-aos-delay="400">
                <div class="flex items-center space-x-2 text-gray-800 bg-white/50 px-6 py-3 rounded-full backdrop-blur-md shadow-sm border border-white/60">
                    <i class="fas fa-calendar text-primary text-xl"></i>
                    <span class="font-semibold text-lg">31 July 2026</span>
                </div>
                <div class="flex items-center space-x-2 text-gray-800 bg-white/50 px-6 py-3 rounded-full backdrop-blur-md shadow-sm border border-white/60">
                    <i class="fas fa-map-marker-alt text-primary text-xl"></i>
                    <span class="font-semibold text-lg">Faculty of Computing, NSCET</span>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6" data-aos="fade-up" data-aos-delay="500">
                <a href="registration.php" class="btn-primary group flex items-center justify-center">
                    Register Now 
                    <i class="fas fa-chevron-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </a>
                <a href="events.php" class="btn-outline group flex items-center justify-center">
                    View Events
                    <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </a>
                <!-- Optional: Download Brochure if needed -->
                <!-- <a href="/assets/downloads/brochure.pdf" target="_blank" class="text-gray-600 font-semibold hover:text-primary transition-colors flex items-center justify-center underline decoration-2 underline-offset-4 decoration-primary/30">Download Brochure</a> -->
            </div>
        </div>
    </section>

    <!-- Stats Section with Glass Panel -->
    <section class="py-20 relative z-20 -mt-10">
        <div class="container mx-auto px-4">
            <div class="flex justify-center">
                <div class="glass-panel w-full max-w-5xl p-8 md:p-12" data-aos="fade-up">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12" id="stats-container">
                        
                        <!-- Expected Participants -->
                        <div class="text-center group">
                            <div class="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-500 mb-2 font-inter drop-shadow-sm group-hover:scale-110 transition-transform duration-300 counter" data-target="500">
                                0
                            </div>
                            <div class="text-primary font-bold text-3xl absolute top-0 -right-4">+</div>
                            <div class="text-gray-500 uppercase tracking-widest text-sm font-semibold">Participants</div>
                        </div>

                        <!-- Colleges Participating -->
                        <div class="text-center group relative">
                            <div class="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-500 mb-2 font-inter drop-shadow-sm group-hover:scale-110 transition-transform duration-300 counter" data-target="50">
                                0
                            </div>
                            <div class="text-primary font-bold text-3xl absolute top-0 right-4">+</div>
                            <div class="text-gray-500 uppercase tracking-widest text-sm font-semibold">Colleges</div>
                        </div>

                        <!-- Events -->
                        <div class="text-center group relative">
                            <div class="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-500 mb-2 font-inter drop-shadow-sm group-hover:scale-110 transition-transform duration-300 counter" data-target="11">
                                0
                            </div>
                            <div class="text-primary font-bold text-3xl absolute top-0 right-4">+</div>
                            <div class="text-gray-500 uppercase tracking-widest text-sm font-semibold">Events</div>
                        </div>
                        
                        <!-- Prize Pool (Optional) -->
                        <div class="text-center group relative">
                            <div class="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-500 mb-2 font-inter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
                                50K
                            </div>
                            <div class="text-gray-500 uppercase tracking-widest text-sm font-semibold">Prize Pool</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

<?php
require_once __DIR__ . '/includes/footer.php';
?>
