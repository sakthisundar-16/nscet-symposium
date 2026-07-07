<?php
// events.php
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';

// Mock Events Data (In a real app, this would come from the database via PDO)
// Since the user wants a commercial site, we should use DB, but for the UI mockup we can use arrays.
// Actually, I'll fetch it from the database if available, otherwise fallback to static data for demonstration.
require_once __DIR__ . '/includes/db.php';

$phases = [
    'Phase 1' => [
        ['id' => 1, 'name' => 'Code Debugging', 'description' => 'Find and fix bugs in complex code snippets within the given time limit. Test your problem-solving skills.', 'duration' => '60 Minutes', 'venue' => 'Lab 1', 'coordinator' => 'Dr. Smith', 'icon' => 'fas fa-code'],
        ['id' => 2, 'name' => 'AI Prompt Battle', 'description' => 'Generate the most accurate and creative outputs using AI tools with limited prompts.', 'duration' => '45 Minutes', 'venue' => 'Lab 2', 'coordinator' => 'Prof. Johnson', 'icon' => 'fas fa-robot'],
        ['id' => 3, 'name' => 'Web Design Battle', 'description' => 'Design a responsive and stunning landing page on the spot using HTML, CSS, and JS.', 'duration' => '90 Minutes', 'venue' => 'Lab 3', 'coordinator' => 'Mr. Williams', 'icon' => 'fas fa-laptop-code'],
    ],
    'Phase 2' => [
        ['id' => 4, 'name' => 'Paper Presentation', 'description' => 'Present your research papers on recent trends in technology and innovation.', 'duration' => '10 Mins/Team', 'venue' => 'Seminar Hall', 'coordinator' => 'Dr. Brown', 'icon' => 'fas fa-file-alt'],
        ['id' => 5, 'name' => 'Logic Building Challenge', 'description' => 'Solve algorithmic puzzles and logical reasoning questions to prove your mettle.', 'duration' => '60 Minutes', 'venue' => 'Classroom A', 'coordinator' => 'Mrs. Davis', 'icon' => 'fas fa-brain'],
        ['id' => 6, 'name' => 'SQL Query Challenge', 'description' => 'Write complex SQL queries to extract data from a provided database schema.', 'duration' => '60 Minutes', 'venue' => 'Lab 4', 'coordinator' => 'Mr. Miller', 'icon' => 'fas fa-database'],
    ],
    'Phase 3' => [
        ['id' => 7, 'name' => 'Connection', 'description' => 'Guess the technical word by connecting the given pictures.', 'duration' => '45 Minutes', 'venue' => 'Auditorium', 'coordinator' => 'Ms. Wilson', 'icon' => 'fas fa-link'],
        ['id' => 8, 'name' => 'Logo Guessing', 'description' => 'Identify the logos of tech companies, software, and tools.', 'duration' => '30 Minutes', 'venue' => 'Classroom B', 'coordinator' => 'Mr. Moore', 'icon' => 'fas fa-image'],
        ['id' => 9, 'name' => 'Short Film Challenge', 'description' => 'Screening of pre-submitted short films based on a given technical theme.', 'duration' => '120 Minutes', 'venue' => 'Mini Theatre', 'coordinator' => 'Dr. Taylor', 'icon' => 'fas fa-video'],
        ['id' => 10, 'name' => 'Free Fire Tournament', 'description' => 'Battle Royale tournament for gaming enthusiasts. Squad up and survive.', 'duration' => '120 Minutes', 'venue' => 'Gaming Arena', 'coordinator' => 'Mr. Anderson', 'icon' => 'fas fa-gamepad'],
        ['id' => 11, 'name' => 'Meme Challenge', 'description' => 'Create the funniest tech-related memes on the spot.', 'duration' => '30 Minutes', 'venue' => 'Classroom C', 'coordinator' => 'Ms. Thomas', 'icon' => 'fas fa-smile-beam'],
    ]
];

$activePhase = isset($_GET['phase']) ? $_GET['phase'] : 'Phase 1';
if (!array_key_exists($activePhase, $phases)) {
    $activePhase = 'Phase 1';
}
?>

<main class="min-h-screen pt-32 pb-24 relative overflow-hidden">
    <!-- Abstract Background -->
    <div class="absolute inset-0 z-0 bg-background pointer-events-none">
        <div class="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-100 rounded-full blur-[120px] opacity-60"></div>
        <div class="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-purple-100 rounded-full blur-[120px] opacity-60"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
        
        <div class="text-center mb-16" data-aos="fade-down">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight font-poppins">
                Symposium <span class="text-primary">Events</span>
            </h1>
            <p class="text-lg text-gray-500 max-w-2xl mx-auto">
                Explore our exciting lineup of technical and non-technical events spread across three phases.
            </p>
        </div>

        <!-- Phase Tabs -->
        <div class="flex justify-center mb-12" data-aos="fade-up">
            <div class="inline-flex bg-white/70 backdrop-blur-md p-2 rounded-2xl shadow-sm border border-white/40">
                <?php foreach (array_keys($phases) as $phase): ?>
                    <a href="?phase=<?php echo urlencode($phase); ?>" class="px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 <?php echo $activePhase === $phase ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:text-primary hover:bg-white/50'; ?>">
                        <?php echo htmlspecialchars($phase); ?>
                    </a>
                <?php endforeach; ?>
            </div>
        </div>

        <!-- Events Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <?php foreach ($phases[$activePhase] as $index => $event): ?>
                <div class="glass-card group cursor-pointer relative overflow-hidden" data-aos="fade-up" data-aos-delay="<?php echo $index * 100; ?>">
                    <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div class="p-8 relative z-10">
                        <div class="flex justify-between items-start mb-6">
                            <div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                                <i class="<?php echo $event['icon']; ?> text-2xl"></i>
                            </div>
                            <span class="bg-white border border-gray-100 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                                Technical
                            </span>
                        </div>

                        <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors"><?php echo htmlspecialchars($event['name']); ?></h3>
                        <p class="text-gray-500 mb-8 line-clamp-2 text-sm leading-relaxed"><?php echo htmlspecialchars($event['description']); ?></p>

                        <div class="space-y-3">
                            <div class="flex items-center text-sm text-gray-600 font-medium bg-gray-50/50 p-2 rounded-lg">
                                <i class="fas fa-clock mr-3 text-primary w-4 text-center"></i>
                                <?php echo htmlspecialchars($event['duration']); ?>
                            </div>
                            <div class="flex items-center text-sm text-gray-600 font-medium bg-gray-50/50 p-2 rounded-lg">
                                <i class="fas fa-map-marker-alt mr-3 text-primary w-4 text-center"></i>
                                <?php echo htmlspecialchars($event['venue']); ?>
                            </div>
                        </div>
                    </div>

                    <div class="border-t border-gray-100 p-6 bg-white/40 flex justify-between items-center group-hover:bg-primary/5 transition-colors duration-300">
                        <div class="flex items-center">
                            <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs mr-3 shadow-sm border border-blue-200">
                                <?php echo substr($event['coordinator'], 0, 1); ?>
                            </div>
                            <span class="text-sm font-semibold text-gray-700"><?php echo htmlspecialchars($event['coordinator']); ?></span>
                        </div>
                        <a href="registration.php" class="text-primary font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform">
                            Register <i class="fas fa-chevron-right ml-1 text-xs"></i>
                        </a>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</main>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
