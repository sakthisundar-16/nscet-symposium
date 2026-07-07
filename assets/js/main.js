// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Scroll Animations)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            offset: 50,
            duration: 800,
            easing: 'ease-in-out-cubic',
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.remove('bg-transparent', 'py-4');
                navbar.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'py-2');
            } else {
                navbar.classList.add('bg-transparent', 'py-4');
                navbar.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'py-2');
            }
        });
    }

    // 3. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 4. Counter Animation (GSAP)
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0 && typeof gsap !== 'undefined') {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            
            // Format number to string with leading zeros if needed
            const updateCounter = (val) => {
                counter.innerText = Math.floor(val).toString().padStart(2, '0');
            };

            gsap.to({ val: 0 }, {
                val: target,
                duration: 2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '#stats-container',
                    start: 'top 80%',
                },
                onUpdate: function() {
                    updateCounter(this.targets()[0].val);
                }
            });
        });
    }
});
