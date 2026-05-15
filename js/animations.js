/* ============================================
   SCROLL REVEAL & INTERSECTION OBSERVER
   ============================================ */

class ScrollReveal {
    constructor() {
        this.observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        this.init();
    }

    init() {
        // Reveal Up elements
        const revealUpElements = document.querySelectorAll('.reveal-up');
        revealUpElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(60px)';
        });

        // Reveal Left elements
        const revealLeftElements = document.querySelectorAll('.reveal-left');
        revealLeftElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateX(-60px)';
        });

        // Reveal Right elements
        const revealRightElements = document.querySelectorAll('.reveal-right');
        revealRightElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateX(60px)';
        });

        // Skill Cards
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
        });

        this.createObserver();
    }

    createObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;

                    // Add stagger delay if specified
                    const delay = el.dataset.delay || 0;

                    setTimeout(() => {
                        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0) translateX(0)';
                    }, delay);

                    observer.unobserve(el);
                }
            });
        }, this.observerOptions);

        // Observe all reveal elements
        document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .skill-card').forEach(el => {
            observer.observe(el);
        });
    }
}

/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */

class NavbarScroll {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        this.lastScroll = currentScroll;
    }
}

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */

class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

/* ============================================
   PARALLAX EFFECT
   ============================================ */

class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('.vecna-float, .demogorgon-float');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            this.elements.forEach(el => {
                const speed = el.classList.contains('vecna-float') ? 0.3 : 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

/* ============================================
   INITIALIZE ALL ANIMATIONS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    new ScrollReveal();
    new NavbarScroll();
    new SmoothScroll();
    new ParallaxEffect();
});
