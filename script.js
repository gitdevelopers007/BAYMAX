/**
 * Baymax Landing Page - Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
    const GOOGLE_FORM_URL = "https://forms.gle/pgsRtchLe53S1yRf7";

    // -------------------------------------------------------------
    // 1. Direct Click Handler for Fail-Safe Navigation
    // -------------------------------------------------------------
    document.querySelectorAll('.js-google-form-link').forEach(link => {
        link.setAttribute('href', GOOGLE_FORM_URL);
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
        });
    });

    // -------------------------------------------------------------
    // 2. Viewport Fade-In Animation (IntersectionObserver)
    // -------------------------------------------------------------
    const fadeSections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    fadeSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // -------------------------------------------------------------
    // 3. Scroll Progress Bar & Header Shrink & Back to Top
    // -------------------------------------------------------------
    const progressBar = document.getElementById('scroll-progress');
    const header = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('back-to-top');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.image-section');

    function onScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Progress bar percentage
        if (scrollHeight > 0 && progressBar) {
            const progress = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = progress + '%';
        }

        // Floating Header compact class
        if (header) {
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Back to top button visibility
        if (backToTopBtn) {
            if (scrollTop > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // Active navigation link highlighting
        let currentActiveSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentActiveSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + currentActiveSection) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // Run once on init

    // Back to top button click
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
