<?php
// registration.php
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/functions.php';

$eventOptions = [
    'PHASE 1' => [],
    'PHASE 2' => [],
    'PHASE 3' => []
];

try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->query("SELECT id, name, phase FROM events ORDER BY FIELD(phase, 'PHASE 1', 'PHASE 2', 'PHASE 3'), name");
    while ($row = $stmt->fetch()) {
        $eventOptions[$row['phase']][] = $row;
    }
} catch (PDOException $e) {
    // fallback data if DB is not available
    $eventOptions = [
        'PHASE 1' => [
            ['id' => 1, 'name' => 'Code Debugging'],
            ['id' => 2, 'name' => 'AI Prompt Battle'],
            ['id' => 3, 'name' => 'Web Design Battle'],
        ],
        'PHASE 2' => [
            ['id' => 4, 'name' => 'Paper Presentation'],
            ['id' => 5, 'name' => 'Logic Building Challenge'],
            ['id' => 6, 'name' => 'SQL Query Challenge'],
        ],
        'PHASE 3' => [
            ['id' => 7, 'name' => 'Connection'],
            ['id' => 8, 'name' => 'Logo Guessing'],
            ['id' => 9, 'name' => 'Short Film Challenge'],
            ['id' => 10, 'name' => 'Free Fire Tournament'],
            ['id' => 11, 'name' => 'Meme Challenge'],
        ],
    ];
}
?>

<main class="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background">
    <!-- Abstract Background -->
    <div class="absolute inset-0 z-0 bg-background pointer-events-none">
        <div class="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100 rounded-full blur-[100px] opacity-50"></div>
        <div class="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-100 rounded-full blur-[100px] opacity-50"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto">
            
            <div class="text-center mb-12" data-aos="fade-down">
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight font-poppins">
                    Register for <span class="premium-text-gradient">SYNTAX 2K26</span>
                </h1>
                <p class="text-gray-500">Complete the steps below to secure your spot.</p>
            </div>

            <!-- Stepper -->
            <div class="flex justify-center mb-12" data-aos="fade-up">
                <div class="flex items-center w-full max-w-2xl">
                    <div class="step-indicator active flex flex-col items-center relative w-1/3">
                        <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-md z-10 transition-colors" id="step1-circle">1</div>
                        <span class="text-xs font-semibold mt-2 text-primary" id="step1-text">Personal Details</span>
                        <div class="absolute top-5 left-1/2 w-full h-1 bg-gray-200 -z-0" id="line1"></div>
                    </div>
                    <div class="step-indicator flex flex-col items-center relative w-1/3">
                        <div class="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold shadow-sm z-10 transition-colors" id="step2-circle">2</div>
                        <span class="text-xs font-semibold mt-2 text-gray-400" id="step2-text">Select Events</span>
                        <div class="absolute top-5 left-1/2 w-full h-1 bg-gray-200 -z-0" id="line2"></div>
                    </div>
                    <div class="step-indicator flex flex-col items-center relative w-1/3">
                        <div class="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold shadow-sm z-10 transition-colors" id="step3-circle">3</div>
                        <span class="text-xs font-semibold mt-2 text-gray-400" id="step3-text">Payment</span>
                    </div>
                </div>
            </div>

            <!-- Form -->
            <div class="glass-panel p-8 md:p-12" data-aos="fade-up" data-aos-delay="200">
                <form id="registrationForm" onsubmit="return false;">
                    
                    <!-- STEP 1 -->
                    <div id="step1" class="step-content">
                        <h2 class="text-2xl font-bold text-gray-900 mb-6">Personal Details</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                                <input type="text" name="full_name" required class="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
                                <select name="gender" required class="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                                <input type="tel" name="phone" required pattern="[0-9]{10}" placeholder="10-digit mobile number" class="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number *</label>
                                <input type="tel" name="whatsapp" required pattern="[0-9]{10}" placeholder="10-digit WhatsApp number" class="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                                <input type="email" name="email" required class="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
                                <input type="date" name="dob" required class="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                            </div>
                            <div class="md:col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">College Name *</label>
                                <input type="text" name="college" required class="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                                <input type="text" name="city" required class="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                                <input type="text" name="state" required class="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Department *</label>
                                <input type="text" name="department" required class="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Year of Study *</label>
                                <select name="year" required class="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                                    <option value="">Select Year</option>
                                    <option value="I">I Year</option>
                                    <option value="II">II Year</option>
                                    <option value="III">III Year</option>
                                    <option value="IV">IV Year</option>
                                </select>
                            </div>
                        </div>
                        <div class="mt-8 flex justify-end">
                            <button type="button" onclick="nextStep(2)" class="btn-primary">Next Step <i class="fas fa-arrow-right ml-2"></i></button>
                        </div>
                    </div>

                    <!-- STEP 2 -->
                    <div id="step2" class="step-content hidden">
                        <h2 class="text-2xl font-bold text-gray-900 mb-6">Select Events</h2>
<input type="hidden" name="_csrf_token" value="<?php echo generate_csrf_token(); ?>">
                    <div class="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-6">
                        <p class="text-sm text-blue-800"><i class="fas fa-info-circle mr-2"></i> You can select maximum ONE event per phase.</p>
                    </div>
                    
                    <div class="space-y-6">
                        <!-- Phase 1 -->
                        <div class="p-6 rounded-xl bg-white/60 border border-gray-100 shadow-sm">
                            <h3 class="font-bold text-gray-900 mb-4">Phase 1 Events (Choose One)</h3>
                            <select name="phase1" class="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none">
                                <option value="">None</option>
                                <?php foreach ($eventOptions['PHASE 1'] as $event): ?>
                                    <option value="<?php echo intval($event['id']); ?>"><?php echo htmlspecialchars($event['name']); ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        
                        <!-- Phase 2 -->
                        <div class="p-6 rounded-xl bg-white/60 border border-gray-100 shadow-sm">
                            <h3 class="font-bold text-gray-900 mb-4">Phase 2 Events (Choose One)</h3>
                            <select name="phase2" class="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none">
                                <option value="">None</option>
                                <?php foreach ($eventOptions['PHASE 2'] as $event): ?>
                                    <option value="<?php echo intval($event['id']); ?>"><?php echo htmlspecialchars($event['name']); ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        
                        <!-- Phase 3 -->
                        <div class="p-6 rounded-xl bg-white/60 border border-gray-100 shadow-sm">
                            <h3 class="font-bold text-gray-900 mb-4">Phase 3 Events (Choose One)</h3>
                            <select name="phase3" class="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none">
                                <option value="">None</option>
                                <?php foreach ($eventOptions['PHASE 3'] as $event): ?>
                                    <option value="<?php echo intval($event['id']); ?>"><?php echo htmlspecialchars($event['name']); ?></option>
                                <?php endforeach; ?>
                                </select>
                            </div>
                        </div>

                        <div class="mt-8 flex justify-between">
                            <button type="button" onclick="prevStep(1)" class="btn-outline">Back</button>
                            <button type="button" onclick="nextStep(3)" class="btn-primary">Next Step <i class="fas fa-arrow-right ml-2"></i></button>
                        </div>
                    </div>

                    <!-- STEP 3 -->
                    <div id="step3" class="step-content hidden">
                        <h2 class="text-2xl font-bold text-gray-900 mb-6">Payment</h2>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col items-center justify-center">
                                <p class="text-gray-500 font-medium mb-4">Registration Fee</p>
                                <div class="text-4xl font-bold text-primary mb-6">₹<?php echo APP_FEE; ?></div>
                                
                                <div class="w-48 h-48 bg-white p-2 rounded-xl border border-gray-200 shadow-sm mb-4">
                                    <!-- Replace with actual QR Code -->
                                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=nscet@upi&pn=NSCET&am=350" alt="QR Code" class="w-full h-full object-contain">
                                </div>
                                <p class="text-sm font-semibold text-gray-600">Scan to pay via UPI</p>
                            </div>
                            
                            <div class="space-y-6">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">Transaction ID / UTR No. *</label>
                                    <input type="text" name="transaction_id" required class="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all uppercase">
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">Upload Payment Screenshot *</label>
                                    <div class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer" onclick="document.getElementById('payment_proof').click()">
                                        <i class="fas fa-cloud-upload-alt text-3xl text-primary mb-2"></i>
                                        <p class="text-sm text-gray-500 font-medium">Click to browse or drag and drop</p>
                                        <p class="text-xs text-gray-400 mt-1">PNG, JPG, PDF up to 2MB</p>
                                        <input type="file" id="payment_proof" name="payment_proof" accept=".png,.jpg,.jpeg,.pdf" required class="hidden" onchange="showPreview(event)">
                                    </div>
                                    <div id="file-preview" class="mt-4 hidden items-center text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
                                        <i class="fas fa-file-image text-primary mr-2"></i>
                                        <span id="file-name" class="font-medium"></span>
                                        <button type="button" class="ml-auto text-red-500 hover:text-red-700" onclick="clearFile()">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Error Message Container -->
                        <div id="form-error" class="hidden mt-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-medium flex items-center">
                            <i class="fas fa-exclamation-circle mr-2"></i>
                            <span id="error-text"></span>
                        </div>

                        <div class="mt-8 flex justify-between">
                            <button type="button" onclick="prevStep(2)" class="btn-outline">Back</button>
                            <button type="button" id="submitBtn" onclick="submitForm()" class="btn-primary">
                                <span id="submitText">Complete Registration</span>
                                <i id="submitIcon" class="fas fa-check-circle ml-2"></i>
                                <i id="loadingIcon" class="fas fa-spinner fa-spin ml-2 hidden"></i>
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
</main>

<script>
// Vanilla JS for Stepper and Form Handling
function nextStep(step) {
    // Basic validation before moving
    if(step === 2) {
        const step1Inputs = document.querySelectorAll('#step1 input[required], #step1 select[required]');
        let valid = true;
        step1Inputs.forEach(input => {
            if(!input.checkValidity()) {
                input.reportValidity();
                valid = false;
            }
        });
        if(!valid) return;
    }
    
    if(step === 3) {
        const p1 = document.querySelector('[name="phase1"]').value;
        const p2 = document.querySelector('[name="phase2"]').value;
        const p3 = document.querySelector('[name="phase3"]').value;
        if(!p1 && !p2 && !p3) {
            alert('Please select at least one event!');
            return;
        }
    }

    document.querySelectorAll('.step-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(`step${step}`).classList.remove('hidden');

    // Update Stepper UI
    updateStepper(step);
}

function prevStep(step) {
    document.querySelectorAll('.step-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(`step${step}`).classList.remove('hidden');
    updateStepper(step);
}

function updateStepper(step) {
    // Reset all
    for(let i=1; i<=3; i++) {
        const circle = document.getElementById(`step${i}-circle`);
        const text = document.getElementById(`step${i}-text`);
        const line = document.getElementById(`line${i}`);
        
        if(i < step) {
            circle.className = "w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-md z-10 transition-colors";
            circle.innerHTML = '<i class="fas fa-check"></i>';
            text.className = "text-xs font-semibold mt-2 text-primary";
            if(line) line.className = "absolute top-5 left-1/2 w-full h-1 bg-primary -z-0 transition-colors";
        } else if (i === step) {
            circle.className = "w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-md z-10 transition-colors";
            circle.innerHTML = i;
            text.className = "text-xs font-semibold mt-2 text-primary";
            if(line) line.className = "absolute top-5 left-1/2 w-full h-1 bg-gray-200 -z-0 transition-colors";
        } else {
            circle.className = "w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold shadow-sm z-10 transition-colors";
            circle.innerHTML = i;
            text.className = "text-xs font-semibold mt-2 text-gray-400";
            if(line) line.className = "absolute top-5 left-1/2 w-full h-1 bg-gray-200 -z-0 transition-colors";
        }
    }
}

function showPreview(event) {
    if(event.target.files.length > 0) {
        document.getElementById('file-name').innerText = event.target.files[0].name;
        document.getElementById('file-preview').classList.remove('hidden');
        document.getElementById('file-preview').classList.add('flex');
    }
}

function clearFile() {
    document.getElementById('payment_proof').value = "";
    document.getElementById('file-preview').classList.add('hidden');
    document.getElementById('file-preview').classList.remove('flex');
}

function submitForm() {
    const form = document.getElementById('registrationForm');
    if(!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const btn = document.getElementById('submitBtn');
    const text = document.getElementById('submitText');
    const icon = document.getElementById('submitIcon');
    const load = document.getElementById('loadingIcon');
    const errorBox = document.getElementById('form-error');

    // Loading State
    btn.disabled = true;
    text.innerText = "Processing...";
    icon.classList.add('hidden');
    load.classList.remove('hidden');
    errorBox.classList.add('hidden');

    form.action = 'api/register.php';
    const formData = new FormData(form);
    const endpoint = form.action;

    // Vanilla AJAX
    fetch(endpoint, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success') {
            window.location.href = 'registration-success.php?ref=' + encodeURIComponent(data.data.registration_id);
        } else {
            errorBox.classList.remove('hidden');
            document.getElementById('error-text').innerText = data.message;
            resetBtn();
        }
    })
    .catch(err => {
        errorBox.classList.remove('hidden');
        document.getElementById('error-text').innerText = "An error occurred. Please try again.";
        resetBtn();
    });

    function resetBtn() {
        btn.disabled = false;
        text.innerText = "Complete Registration";
        icon.classList.remove('hidden');
        load.classList.add('hidden');
    }
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
