// Theme Toggle - Initialize immediately and on DOM ready
(function () {
    'use strict';

    const html = document.documentElement;

    // Function to update theme icon
    function updateThemeIcon(theme) {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        const themeIcon = themeToggle.querySelector('.theme-icon');
        if (!themeIcon) return;

        if (theme === 'dark') {
            // Sun icon for dark mode (click to go to light)
            themeIcon.innerHTML = '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>';
        } else {
            // Moon icon for light mode (click to go to dark)
            themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        }
    }

    // Function to apply theme
    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    }

    // Function to toggle theme
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    }

    // Initialize theme on page load
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);

        // Add click event listener to theme toggle button
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
    }

    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        // DOM already loaded
        initTheme();
    }
})();

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Typing Animation
const typingText = document.getElementById('typingText');
const phrases = [
    'Problem Solver',
    'Full Stack Developer',
    'System Architect',
    'Technical Consultant'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeText, typeSpeed);
}

// Start typing animation
typeText();

// Animate on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .skill-category, .stat-item, .method-card, .social-link').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Skill Progress Animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.style.width;
            progressBar.style.width = '0';
            setTimeout(() => {
                progressBar.style.width = width;
            }, 100);
            skillObserver.unobserve(progressBar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Statistics Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            const suffix = entry.target.getAttribute('data-suffix');
            const duration = 2000; // 2 seconds
            const startTime = performance.now();
            const startValue = 0;

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (easeOutQuad)
                const ease = 1 - Math.pow(1 - progress, 2);

                const current = Math.floor(startValue + (target - startValue) * ease);
                entry.target.textContent = current + suffix;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    entry.target.textContent = target + suffix;
                }
            }

            requestAnimationFrame(update);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// Premium Toast Notification
let toastTimeout;

function showToast({ title, message }) {
    let toast = document.querySelector('.toast');

    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 12l2 2 4-4"></path>
                    <circle cx="12" cy="12" r="9"></circle>
                </svg>
            </div>
            <div class="toast-content">
                <div class="toast-title"></div>
                <div class="toast-message"></div>
            </div>
            <button class="toast-close" aria-label="Close notification">&times;</button>
        `;
        document.body.appendChild(toast);

        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.classList.remove('toast--visible');
            if (toastTimeout) clearTimeout(toastTimeout);
        });
    }

    const titleEl = toast.querySelector('.toast-title');
    const messageEl = toast.querySelector('.toast-message');

    titleEl.textContent = title;
    messageEl.textContent = message;

    toast.classList.add('toast--visible');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('toast--visible');
    }, 4000);
}

// Contact Form Handling (Formspree)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjgabayp';

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showToast({
                    title: 'Message envoyé',
                    message: 'Merci ! Ton message a bien été transmis à Jonas.'
                });
                contactForm.reset();
            } else {
                showToast({
                    title: "Envoi impossible",
                    message: "Une erreur est survenue. Tu peux aussi écrire directement à : jmakeke6@mail.com"
                });
            }
        } catch (error) {
            showToast({
                title: "Connexion échouée",
                message: "Impossible de contacter le serveur. Écris directement à : jmakeke6@mail.com"
            });
        }
    });
}

// Scroll to Top Button (optional enhancement)
let scrollTopBtn;

function createScrollTopButton() {
    scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(scrollTopBtn);
}

function toggleScrollTopButton() {
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
}

createScrollTopButton();
window.addEventListener('scroll', toggleScrollTopButton);

// Performance: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions (only once)
if (typeof debouncedUpdateActiveNav === 'undefined') {
    const debouncedUpdateActiveNav = debounce(updateActiveNav, 10);
    window.addEventListener('scroll', debouncedUpdateActiveNav);
}

// Carousel Gallery
(function () {
    'use strict';

    const carouselTrack = document.getElementById('carouselTrack');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    const carouselIndicators = document.querySelectorAll('.carousel-indicator');

    if (!carouselTrack || carouselSlides.length === 0) return;

    let currentSlide = 0;
    let autoPlayInterval;
    const autoPlayDelay = 5000; // 5 seconds

    function updateCarousel() {
        // Update slides
        carouselSlides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentSlide) {
                slide.classList.add('active');
            }
        });

        // Update indicators
        carouselIndicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === currentSlide) {
                indicator.classList.add('active');
            }
        });

        // Update track position
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        updateCarousel();
        resetAutoPlay();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
        updateCarousel();
        resetAutoPlay();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
        resetAutoPlay();
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Initialize carousel
    updateCarousel();
    startAutoPlay();

    // Button events
    if (carouselNext) {
        carouselNext.addEventListener('click', nextSlide);
    }

    if (carouselPrev) {
        carouselPrev.addEventListener('click', prevSlide);
    }

    // Indicator events
    carouselIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carouselTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    });

    carouselTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
})();

// CV Download Functionality - Simple enhancement (doesn't block natural behavior)
(function () {
    'use strict';

    const downloadCVBtn = document.getElementById('downloadCV');

    if (downloadCVBtn) {
        // Only enhance, don't prevent default behavior
        downloadCVBtn.addEventListener('click', function (e) {
            // Let the browser handle the download naturally first
            // The download attribute should work

            // Optional enhancement: try fetch method for better control
            const cvFileName = './Jonas Makeke cv weB3.pdf';
            const downloadName = 'Jonas Makeke cv.pdf';

            // Try fetch as enhancement (non-blocking)
            fetch(cvFileName)
                .then(response => {
                    if (response.ok) {
                        return response.blob();
                    }
                    return null; // Let natural download handle it
                })
                .then(blob => {
                    if (blob && blob.size > 0) {
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = downloadName;
                        a.style.display = 'none';
                        document.body.appendChild(a);
                        a.click();
                        setTimeout(() => {
                            document.body.removeChild(a);
                            window.URL.revokeObjectURL(url);
                        }, 100);
                    }
                })
                .catch(() => {
                    // Natural download will handle it
                });
        }, false);
    }
})();