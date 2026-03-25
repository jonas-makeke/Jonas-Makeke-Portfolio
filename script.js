// Theme Toggle - Initialize immediately and on DOM ready
(function() {
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
    anchor.addEventListener('click', function(e) {
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

// Language Toggle (EN/FR)
const langToggle = document.getElementById('langToggle');
// Force EN as default (toggle only switches to FR when user clicks).
let currentLang = 'en';

const translations = {
    en: {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.methodology': 'Methodology',
        'nav.projects': 'Projects',
        'nav.skills': 'Skills',
        'nav.articles': 'Articles',
        'nav.contact': 'Contact',
        'hero.greeting': "Hello, I'm",
        'hero.description': 'I transform the complexity of Web3 into practical and educational technical solutions. As a Junior Web3 Developer and blockchain content creator, I design scalable decentralized tools while making blockchain technologies more accessible to communities.',
        'hero.viewWork': 'View My Work',
        'hero.getInTouch': 'Get In Touch',
        'hero.downloadCv': 'Download CV',
        'articles.title': 'Articles',
        'articles.description': 'A selection of my Web3 and blockchain articles published on Medium and shared through my YouTube channel.',
        'articles.healthTitle': 'Blockchain for Healthcare',
        'articles.healthExcerpt': 'A reflection on how blockchain can help address healthcare challenges in Goma, DR Congo, and improve transparency.',
        'articles.healthTag': 'Health',
        'articles.readMediumFr': 'Read on Medium',
        'contact.title': 'Get In Touch',
        'contact.description': "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.",
        'contact.form.name': 'Name',
        'contact.form.email': 'Email',
        'contact.form.message': 'Message',
        'contact.form.send': 'Send Message',
        'contact.form.namePlaceholder': 'Your name',
        'contact.form.emailPlaceholder': 'Your email',
        'contact.form.messagePlaceholder': 'Hello Jonas, I am contacting you about...',
        'articles.moreSocials': 'To see more, visit my social networks',

        'about.title': 'About Me',
        'about.p1': 'I am a Junior Web3 Developer passionate about blockchain and decentralized technologies. I specialize in transforming complex Web3 concepts into practical, scalable, and accessible solutions. My approach combines analytical thinking, technical experimentation, and continuous learning to build systems that are both functional and impactful.',
        'about.p2': 'Each project begins with understanding the underlying blockchain logic and user needs, then designing decentralized applications that are secure, maintainable, and community-oriented. I focus on writing clean, structured code while improving my expertise in smart contracts, front-end integration, and Web3 architecture.',
        'about.p3': 'Beyond development, I actively create educational content to simplify blockchain technologies and contribute to community growth and adoption.',
        'about.stat.projectsSolved': 'Projects Solved',
        'about.stat.yearsExperience': 'Years Experience',
        'about.stat.successRate': 'Success Rate',

        'projects.title': 'Featured Projects',
        'projects.p1.placeholder': 'Project 1',
        'projects.p1.title': 'ProofChain',
        'projects.p1.description': 'A brief description of the project, highlighting key features and technologies used.',
        'projects.p1.demo': 'Live Demo',
        'projects.p2.placeholder': 'Project 2',
        'projects.p2.title': 'ProofChain',
        'projects.p2.description': 'A brief description of the project, highlighting key features and technologies used.',
        'projects.p2.demo': 'Live Demo',
        'projects.p3.placeholder': 'Project 3',
        'projects.p3.title': 'ProofChain',
        'projects.p3.description': 'A brief description of the project, highlighting key features and technologies used.',
        'projects.p3.demo': 'Live Demo',

        'methodology.title': 'Problem-Solving Approach',
        'methodology.step1.title': 'Analyze',
        'methodology.step1.description': 'Deep dive into the problem space, understanding constraints, requirements, and stakeholder needs.',
        'methodology.step2.title': 'Design',
        'methodology.step2.description': 'Architect robust solutions with scalability, maintainability, and performance in mind.',
        'methodology.step3.title': 'Implement',
        'methodology.step3.description': 'Build with clean code, following best practices, testing thoroughly, and iterating based on feedback.',
        'methodology.step4.title': 'Optimize',
        'methodology.step4.description': 'Continuously monitor, measure, and improve solutions to ensure they deliver maximum value.',

        'skills.title': 'Skills & Technologies',
        'skills.category.frontend': 'Frontend',
        'skills.category.backend': 'Backend',
        'skills.category.tools': 'Tools & Others',
        'skills.misc.databaseDesign': 'Database Design',
        'skills.misc.apiDevelopment': 'API Development',

        'articles.a1.title': 'How to Join Safrochain and Why This New Blockchain Matters',
        'articles.a1.excerpt': 'A practical guide to understanding Safrochain, why it is important for emerging markets, and how to join the ecosystem step by step.',
        'articles.a1.linkLabel': 'Read on Medium',
        'articles.a2.title': 'Polkadot: The Inter-Blockchain Highway Connecting Web3',
        'articles.a2.excerpt': 'An overview of Polkadot as a Layer 0 protocol, explaining how it connects multiple blockchains to build a more interoperable Web3.',
        'articles.a2.linkLabel': 'View article on Medium',
        'articles.a3.title': 'Blockchain for Health',
        'articles.a3.excerpt': 'A reflection on how blockchain can help address healthcare challenges in Goma, DR Congo, and improve transparency.',
        'articles.a3.linkLabel': 'Read on Medium',
        'articles.a4.title': 'Web3 & Blockchain Educational Videos',
        'articles.a4.excerpt': 'Video content where I explain Web3 concepts, blockchain use cases and development tips in an accessible and visual way.',
        'articles.a4.linkLabel': 'Watch on YouTube',

        'footer.copyright': '© 2026 Jonas Makeke. All rights reserved.'
    },
    fr: {
        'nav.home': 'Accueil',
        'nav.about': 'A Propos',
        'nav.methodology': 'Methodologie',
        'nav.projects': 'Projets',
        'nav.skills': 'Competences',
        'nav.articles': 'Articles',
        'nav.contact': 'Contact',
        'hero.greeting': 'Bonjour, je suis',
        'hero.description': "Je transforme la complexite du Web3 en solutions techniques pratiques et educatives. En tant que developpeur Web3 junior et createur de contenu blockchain, je concois des outils decentralises evolutifs tout en rendant ces technologies plus accessibles aux communautes.",
        'hero.viewWork': 'Voir mes projets',
        'hero.getInTouch': 'Me contacter',
        'hero.downloadCv': 'Telecharger le CV',
        'articles.title': 'Articles',
        'articles.description': 'Une selection de mes articles Web3 et blockchain publies sur Medium et partages sur ma chaine YouTube.',
        'articles.healthTitle': 'La Blockchain pour la Sante',
        'articles.healthExcerpt': "Une reflexion sur l'utilisation de la blockchain pour repondre aux defis du systeme de sante a Goma, en RDC, et ameliorer la transparence.",
        'articles.healthTag': 'Sante',
        'articles.readMediumFr': 'Lire sur Medium',
        'contact.title': 'Me contacter',
        'contact.description': "Je suis toujours ouvert a discuter de nouveaux projets, d'idees creatives, ou d'opportunites de collaboration.",
        'contact.form.name': 'Nom',
        'contact.form.email': 'Email',
        'contact.form.message': 'Message',
        'contact.form.send': 'Envoyer le message',
        'contact.form.namePlaceholder': 'Votre nom',
        'contact.form.emailPlaceholder': 'Votre email',
        'contact.form.messagePlaceholder': 'Bonjour Jonas, je te contacte au sujet de...',
        'articles.moreSocials': 'Pour voir plus, visitez mes reseaux sociaux',

        'about.title': 'A Propos',
        'about.p1': "Je suis un developpeur Web3 junior passionne par la blockchain et les technologies decentralisees. Je transforme des concepts Web3 complexes en solutions pratiques, evolutives et accessibles. Mon approche combine une pensee analytique, l'experimentation technique et l'apprentissage continu pour construire des systemes a la fois fonctionnels et porteurs de valeur.",
        'about.p2': "Chaque projet commence par la comprehension de la logique blockchain sous-jacente et des besoins utilisateurs, puis par la conception d'applications decentralisees securisees, maintenables et orientees community. Je m'efforce d'ecrire du code propre et structure tout en developpant mon expertise dans les smart contracts, l'integration front-end et l'architecture Web3.",
        'about.p3': "Au-dela du developpement, je cree activement du contenu educatif pour simplifier les technologies blockchain et contribuer a la croissance et a l'adoption de la communaute.",
        'about.stat.projectsSolved': 'Projets resolus',
        'about.stat.yearsExperience': "Annees d'experience",
        'about.stat.successRate': 'Taux de reussite',

        'projects.title': 'Projets en vedette',
        'projects.p1.placeholder': 'Projet 1',
        'projects.p1.title': 'ProofChain',
        'projects.p1.description': 'Une breve description du projet, mettant en avant les fonctionnalites cles et les technologies utilisees.',
        'projects.p1.demo': 'Demo en direct',
        'projects.p2.placeholder': 'Projet 2',
        'projects.p2.title': 'ProofChain',
        'projects.p2.description': 'Une breve description du projet, mettant en avant les fonctionnalites cles et les technologies utilisees.',
        'projects.p2.demo': 'Demo en direct',
        'projects.p3.placeholder': 'Projet 3',
        'projects.p3.title': 'ProofChain',
        'projects.p3.description': 'Une breve description du projet, mettant en avant les fonctionnalites cles et les technologies utilisees.',
        'projects.p3.demo': 'Demo en direct',

        'methodology.title': 'Approche de Resolution',
        'methodology.step1.title': 'Analyser',
        'methodology.step1.description': 'Approfondir l espace du probleme, comprendre les contraintes, les exigences et les besoins des parties prenantes.',
        'methodology.step2.title': 'Concevoir',
        'methodology.step2.description': 'Concevoir des solutions robustes en tenant compte de la scalabilite, de la maintenabilite et de la performance.',
        'methodology.step3.title': 'Implementer',
        'methodology.step3.description': 'Construire avec du code propre, en suivant les bonnes pratiques, en testant en profondeur, puis en iterant selon le feedback.',
        'methodology.step4.title': 'Optimiser',
        'methodology.step4.description': 'Surveiller, mesurer et ameliorer en continu pour s assurer que les solutions apportent le maximum de valeur.',

        'skills.title': 'Competences & Technologies',
        'skills.category.frontend': 'Frontend',
        'skills.category.backend': 'Backend',
        'skills.category.tools': 'Outils et autres',
        'skills.misc.databaseDesign': 'Conception de bases de donnees',
        'skills.misc.apiDevelopment': "Developpement d API",

        'articles.a1.title': 'Comment rejoindre Safrochain et pourquoi cette nouvelle blockchain compte',
        'articles.a1.excerpt': 'Un guide pratique pour comprendre Safrochain, pourquoi c est important pour les marches emergents, et comment rejoindre l ecosysteme pas a pas.',
        'articles.a1.linkLabel': 'Lire sur Medium',
        'articles.a2.title': 'Polkadot : l autoroute inter-blockchain reliant Web3',
        'articles.a2.excerpt': 'Un aperçu de Polkadot en tant que protocole Layer 0, expliquant comment il connecte plusieurs blockchains pour construire un Web3 plus interoperable.',
        'articles.a2.linkLabel': 'Voir l article sur Medium',
        'articles.a3.title': 'La Blockchain pour la Sante',
        'articles.a3.excerpt': 'Une reflexion sur l utilisation de la blockchain pour repondre aux defis du systeme de sante a Goma, en RDC, et ameliorer la transparence.',
        'articles.a3.linkLabel': 'Lire sur Medium',
        'articles.a4.title': 'Videos educatives Web3 et Blockchain',
        'articles.a4.excerpt': 'Du contenu video ou j explique les concepts Web3, les cas d usage de la blockchain et des conseils de developpement de maniere accessible et visuelle.',
        'articles.a4.linkLabel': 'Regarder sur YouTube',

        'footer.copyright': '© 2026 Jonas Makeke. Tous droits reserves.'
    }
};

function applyLanguage(lang) {
    const dict = translations[lang] || translations.en;
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) el.setAttribute('placeholder', dict[key]);
    });

    // Fallback updates for elements without data-i18n attributes
    const navMap = {
        '#home': dict['nav.home'],
        '#about': dict['nav.about'],
        '#methodology': dict['nav.methodology'],
        '#projects': dict['nav.projects'],
        '#skills': dict['nav.skills'],
        '#articles': dict['nav.articles'],
        '#contact': dict['nav.contact']
    };
    Object.keys(navMap).forEach((href) => {
        const links = document.querySelectorAll(`a.nav-link[href="${href}"], .footer-links a[href="${href}"]`);
        links.forEach((el) => {
            if (navMap[href]) el.textContent = navMap[href];
        });
    });

    const greeting = document.querySelector('.greeting');
    if (greeting) greeting.textContent = dict['hero.greeting'];

    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) heroDescription.textContent = dict['hero.description'];

    const heroBtns = document.querySelectorAll('.hero-buttons a');
    if (heroBtns[0]) heroBtns[0].lastChild.textContent = ` ${dict['hero.viewWork']}`;
    if (heroBtns[1]) heroBtns[1].lastChild.textContent = ` ${dict['hero.getInTouch']}`;
    if (heroBtns[2]) heroBtns[2].lastChild.textContent = ` ${dict['hero.downloadCv']}`;

    const contactTitle = document.querySelector('#contact .section-title');
    if (contactTitle) contactTitle.textContent = dict['contact.title'];

    const contactDescription = document.querySelector('.contact-description');
    if (contactDescription) contactDescription.textContent = dict['contact.description'];

    const nameLabel = document.querySelector('label[for="name"]');
    const emailLabel = document.querySelector('label[for="email"]');
    const messageLabel = document.querySelector('label[for="message"]');
    if (nameLabel) nameLabel.textContent = dict['contact.form.name'];
    if (emailLabel) emailLabel.textContent = dict['contact.form.email'];
    if (messageLabel) messageLabel.textContent = dict['contact.form.message'];

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    if (nameInput) nameInput.placeholder = dict['contact.form.namePlaceholder'];
    if (emailInput) emailInput.placeholder = dict['contact.form.emailPlaceholder'];
    if (messageInput) messageInput.placeholder = dict['contact.form.messagePlaceholder'];

    if (langToggle) {
        langToggle.textContent = lang.toUpperCase();
    }

    currentLang = lang;
    localStorage.setItem('lang', lang);
}

if (langToggle) {
    langToggle.addEventListener('click', () => {
        const next = currentLang === 'en' ? 'fr' : 'en';
        applyLanguage(next);
    });
}

applyLanguage(currentLang);

// Typing Animation
const typingText = document.getElementById('typingText');
const typingPhrases = {
    en: ['Problem Solver', 'Full Stack Developer', 'System Architect', 'Technical Consultant'],
    fr: ['Resolutif', 'Developpeur Full Stack', 'Architecte Systeme', 'Consultant Technique']
};
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const phrases = typingPhrases[currentLang] || typingPhrases.en;
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
                    title: currentLang === 'fr' ? 'Message envoye' : 'Message sent',
                    message: currentLang === 'fr'
                        ? 'Merci ! Ton message a bien ete transmis a Jonas.'
                        : 'Thanks! Your message has been sent to Jonas.'
                });
                contactForm.reset();
            } else {
                showToast({
                    title: currentLang === 'fr' ? 'Envoi impossible' : 'Sending failed',
                    message: currentLang === 'fr'
                        ? 'Une erreur est survenue. Vous pouvez ecrire directement a : jmakeke6@mail.com'
                        : 'An error occurred. You can also write directly to: jmakeke6@mail.com'
                });
            }
        } catch (error) {
            showToast({
                title: currentLang === 'fr' ? 'Connexion echouee' : 'Connection failed',
                message: currentLang === 'fr'
                    ? 'Impossible de contacter le serveur. Ecrivez directement a : jmakeke6@mail.com'
                    : 'Unable to contact the server. Write directly to: jmakeke6@mail.com'
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
(function() {
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
(function() {
    'use strict';

    const downloadCVBtn = document.getElementById('downloadCV');

    if (downloadCVBtn) {
        // Only enhance, don't prevent default behavior
        downloadCVBtn.addEventListener('click', function(e) {
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