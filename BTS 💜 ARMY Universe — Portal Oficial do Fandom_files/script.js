// ============================================
// BTS ARMY Universe — Interactive Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initStars();
    initNavbar();
    initScrollAnimations();
    initQuotesCarousel();
    initBreathingExercise();
    initSmoothScroll();
});

// --- Floating Particles ---
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const count = Math.min(50, Math.floor(window.innerWidth / 30));

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 3 + 1;
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${Math.random() * 15 + 10}s;
            animation-delay: ${Math.random() * 10}s;
            background: ${Math.random() > 0.5 ? 'var(--purple-400)' : 'var(--pink-400)'};
            opacity: ${Math.random() * 0.4 + 0.1};
        `;
        container.appendChild(particle);
    }
}

// --- Hero Stars ---
function initStars() {
    const container = document.getElementById('heroStars');
    if (!container) return;

    for (let i = 0; i < 80; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            width: ${Math.random() * 2 + 1}px;
            height: ${Math.random() * 2 + 1}px;
            animation-duration: ${Math.random() * 3 + 2}s;
            animation-delay: ${Math.random() * 3}s;
        `;
        container.appendChild(star);
    }
}

// --- Navbar scroll behavior ---
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // Mobile toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    links.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });
}

// --- Scroll Animations ---
function initScrollAnimations() {
    const animateElements = document.querySelectorAll(
        '.about-card, .member-card, .era-card, .apoio-card, .apoio-intro-card, .breathing-card'
    );

    animateElements.forEach(el => el.classList.add('animate-on-scroll'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animateElements.forEach(el => observer.observe(el));
}

// --- Quotes Carousel ---
function initQuotesCarousel() {
    const cards = document.querySelectorAll('.quote-card');
    const dotsContainer = document.getElementById('quotesDots');
    if (!cards.length || !dotsContainer) return;

    let currentIndex = 0;

    // Create dots
    cards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = `quote-dot${i === 0 ? ' active' : ''}`;
        dot.setAttribute('aria-label', `Citação ${i + 1}`);
        dot.addEventListener('click', () => goToQuote(i));
        dotsContainer.appendChild(dot);
    });

    function goToQuote(index) {
        cards.forEach(c => c.classList.remove('active'));
        dotsContainer.querySelectorAll('.quote-dot').forEach(d => d.classList.remove('active'));

        cards[index].classList.add('active');
        dotsContainer.children[index].classList.add('active');
        currentIndex = index;
    }

    // Auto-rotate
    setInterval(() => {
        const nextIndex = (currentIndex + 1) % cards.length;
        goToQuote(nextIndex);
    }, 5000);
}

// --- Breathing Exercise ---
function initBreathingExercise() {
    const circle = document.getElementById('breathCircle');
    const text = document.getElementById('breathText');
    const btn = document.getElementById('breathBtn');

    if (!circle || !text || !btn) return;

    let isRunning = false;
    let timeout = null;

    function breathCycle() {
        if (!isRunning) return;

        // Inhale
        circle.className = 'breath-circle inhale';
        text.textContent = 'Inspire...';
        timeout = setTimeout(() => {
            if (!isRunning) return;
            // Hold
            circle.className = 'breath-circle hold';
            text.textContent = 'Segure...';
            timeout = setTimeout(() => {
                if (!isRunning) return;
                // Exhale
                circle.className = 'breath-circle exhale';
                text.textContent = 'Expire...';
                timeout = setTimeout(() => {
                    if (!isRunning) return;
                    // Hold
                    circle.className = 'breath-circle hold';
                    text.textContent = 'Segure...';
                    timeout = setTimeout(() => {
                        if (!isRunning) return;
                        breathCycle();
                    }, 4000);
                }, 4000);
            }, 4000);
        }, 4000);
    }

    function toggleBreathing() {
        if (isRunning) {
            isRunning = false;
            clearTimeout(timeout);
            circle.className = 'breath-circle';
            text.textContent = 'Iniciar';
            btn.textContent = 'Começar Exercício';
            btn.classList.remove('btn-secondary');
            btn.classList.add('btn-primary');
        } else {
            isRunning = true;
            btn.textContent = 'Parar Exercício';
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-secondary');
            breathCycle();
        }
    }

    btn.addEventListener('click', toggleBreathing);
    circle.addEventListener('click', toggleBreathing);
}

// --- Smooth Scroll ---
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile nav
                document.getElementById('navLinks')?.classList.remove('open');
            }
        });
    });
}
