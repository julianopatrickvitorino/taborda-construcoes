/* ============================================
   TABORDA Construções e Reformas - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    'use strict';

    // === INIT AOS ===
    AOS.init({
        duration: 800,
        once: true,
        offset: 80,
        easing: 'ease-out-cubic'
    });

    // === NAVBAR SCROLL EFFECT ===
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // === MOBILE NAV TOGGLE ===
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-menu a').forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // === ACTIVE NAV LINK ON SCROLL ===
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function updateActiveLink() {
        let current = '';
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // === HERO SLIDER ===
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.hero-indicators span');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        slides.forEach(function(slide) { slide.classList.remove('active'); });
        indicators.forEach(function(ind) { ind.classList.remove('active'); });
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    function startSlider() {
        if (slides.length > 1) {
            slideInterval = setInterval(nextSlide, 6000);
        }
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Click on indicators
    indicators.forEach(function(ind, idx) {
        ind.addEventListener('click', function() {
            stopSlider();
            goToSlide(idx);
            startSlider();
        });
    });

    startSlider();

    // === PORTFOLIO FILTER ===
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            portfolioItems.forEach(function(item) {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    setTimeout(function() { item.style.opacity = '1'; }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // === TESTIMONIALS SLIDER ===
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testDots = document.querySelectorAll('.test-dots span');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach(function(card) { card.classList.remove('active'); });
        testDots.forEach(function(dot) { dot.classList.remove('active'); });
        testimonialCards[index].classList.add('active');
        testDots[index].classList.add('active');
        currentTestimonial = index;
    }

    function nextTestimonial() {
        const next = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(next);
    }

    function prevTestimonial() {
        const prev = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(prev);
    }

    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);

    testDots.forEach(function(dot, idx) {
        dot.addEventListener('click', function() { showTestimonial(idx); });
    });

    // Auto-rotate testimonials
    let testInterval = setInterval(nextTestimonial, 7000);

    if (nextBtn) nextBtn.addEventListener('click', function() {
        clearInterval(testInterval);
        testInterval = setInterval(nextTestimonial, 7000);
    });

    if (prevBtn) prevBtn.addEventListener('click', function() {
        clearInterval(testInterval);
        testInterval = setInterval(nextTestimonial, 7000);
    });

    // === COUNTER ANIMATION ===
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateCounters() {
        statNumbers.forEach(function(el) {
            const target = parseInt(el.getAttribute('data-count'));
            const suffix = el.closest('.stat-item').querySelector('.stat-label') ? '%' : '';
            let current = 0;
            const increment = Math.ceil(target / 40);
            const timer = setInterval(function() {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = current;
            }, 30);
        });
    }

    // Trigger counters when stats section is visible
    const aboutSection = document.querySelector('.about');
    let countersTriggered = false;

    function checkCounters() {
        if (countersTriggered) return;
        const rect = aboutSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            // Reset to 0 first
            statNumbers.forEach(function(el) { el.textContent = '0'; });
            animateCounters();
            countersTriggered = true;
        }
    }

    window.addEventListener('scroll', checkCounters);
    // Also check on load
    setTimeout(checkCounters, 500);

    // === LIGHTBOX ===
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const lightboxPrev = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
    const lightboxNext = lightbox ? lightbox.querySelector('.lightbox-next') : null;
    let lightboxImages = [];
    let lightboxIndex = 0;

    // Collect all portfolio zoom links
    document.querySelectorAll('.portfolio-zoom').forEach(function(link, idx) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Collect all images
            lightboxImages = [];
            document.querySelectorAll('.portfolio-zoom').forEach(function(l) {
                lightboxImages.push(l.getAttribute('href'));
            });
            lightboxIndex = idx;
            openLightbox(lightboxImages[lightboxIndex]);
        });
    });

    function openLightbox(src) {
        if (!lightbox) return;
        lightboxImg.setAttribute('src', src);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
        lightboxIndex += direction;
        if (lightboxIndex < 0) lightboxIndex = lightboxImages.length - 1;
        if (lightboxIndex >= lightboxImages.length) lightboxIndex = 0;
        lightboxImg.setAttribute('src', lightboxImages[lightboxIndex]);
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', function() { navigateLightbox(-1); });
    if (lightboxNext) lightboxNext.addEventListener('click', function() { navigateLightbox(1); });

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // Close lightbox on backdrop click
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) closeLightbox();
        });
    }

    // === CONTACT FORM ===
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('.btn-submit');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            // Form submits natively to FormSubmit
        });
    }

    // === SMOOTH SCROLL FOR ANCHOR LINKS ===
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = navbar.offsetHeight + 10;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === PARALLAX EFFECT ON HERO (mouse move) ===
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth > 768) {
        hero.addEventListener('mousemove', function(e) {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            this.querySelector('.hero-overlay').style.transform =
                'translate(' + x + 'px, ' + y + 'px)';
        });
    }

    console.log('TABORDA Construções e Reformas - Site carregado com sucesso!');
});
