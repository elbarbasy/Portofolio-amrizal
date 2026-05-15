/* ============================================
   MAIN INTERACTIONS
   Hologram Effects + Misc
   ============================================ */

/* ============================================
   HOLOGRAM 3D TILT EFFECT
   ============================================ */

class HologramTilt {
    constructor() {
        this.container = document.querySelector('.hologram-container');
        this.card = document.querySelector('.hologram-card');
        this.img = document.getElementById('profile-img');

        if (!this.container || !this.card) return;

        this.init();
    }

    init() {
        // Mouse move for desktop
        this.container.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.container.addEventListener('mouseleave', () => this.handleMouseLeave());

        // Touch for mobile
        this.container.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.container.addEventListener('touchend', () => this.handleMouseLeave());
    }

    handleMouseMove(e) {
        const rect = this.container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        this.card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

        // Add glow effect
        this.card.style.boxShadow = `
            0 0 30px rgba(229, 9, 20, 0.4),
            0 0 60px rgba(229, 9, 20, 0.2),
            ${rotateY * 0.5}px ${rotateX * 0.5}px 40px rgba(138, 43, 226, 0.3)
        `;
    }

    handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.container.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        this.card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    }

    handleMouseLeave() {
        this.card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
        this.card.style.boxShadow = '0 25px 50px -12px rgba(229, 9, 20, 0.25)';
    }
}

/* ============================================
   GLITCH EFFECT
   ============================================ */

function triggerGlitch() {
    const img = document.getElementById('profile-img');
    const overlay = document.getElementById('glitch-overlay');

    if (!img || !overlay) return;

    // Add glitch class
    img.classList.add('glitch-active');
    overlay.style.background = 'rgba(229, 9, 20, 0.3)';

    // Sound effect simulation (visual)
    document.body.style.animation = 'glitch-shake 0.3s ease-in-out';

    setTimeout(() => {
        img.classList.remove('glitch-active');
        overlay.style.background = 'rgba(229, 9, 20, 0)';
        document.body.style.animation = '';
    }, 300);

    // Secondary glitch
    setTimeout(() => {
        overlay.style.background = 'rgba(138, 43, 226, 0.2)';
        setTimeout(() => {
            overlay.style.background = 'rgba(229, 9, 20, 0)';
        }, 100);
    }, 150);
}

/* ============================================
   RANDOM NEON FLICKER
   ============================================ */

class RandomFlicker {
    constructor() {
        this.elements = document.querySelectorAll('.neon-title, .neon-red');
        this.init();
    }

    init() {
        setInterval(() => {
            const randomEl = this.elements[Math.floor(Math.random() * this.elements.length)];
            if (randomEl) {
                randomEl.style.opacity = '0.8';
                setTimeout(() => {
                    randomEl.style.opacity = '1';
                }, 100);
            }
        }, 5000 + Math.random() * 5000);
    }
}

/* ============================================
   FLOATING ANIMATION ENHANCEMENT
   ============================================ */

class FloatingEnhancement {
    constructor() {
        this.veca = document.querySelector('.vecna-float');
        this.demo = document.querySelector('.demogorgon-float');
        this.init();
    }

    init() {
        if (this.veca) {
            this.veca.style.animation = 'float-vecna 6s ease-in-out infinite, neon-flicker 4s ease-in-out infinite';
        }
        if (this.demo) {
            this.demo.style.animation = 'float-demogorgon 8s ease-in-out infinite';
        }
    }
}

/* ============================================
   KEYBOARD SHORTCUTS
   ============================================ */

class KeyboardShortcuts {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            // ESC to close admin modal
            if (e.key === 'Escape') {
                const modal = document.getElementById('admin-modal');
                if (!modal.classList.contains('hidden')) {
                    toggleAdmin();
                }
            }

            // Ctrl + A for admin (dev only)
            if (e.ctrlKey && e.key === 'a') {
                e.preventDefault();
                toggleAdmin();
            }
        });
    }
}

/* ============================================
   LOADING SCREEN
   ============================================ */

class LoadingScreen {
    constructor() {
        this.createLoader();
        this.init();
    }

    createLoader() {
        const loader = document.createElement('div');
        loader.id = 'loading-screen';
        loader.innerHTML = `
            <div class="fixed inset-0 bg-black z-[9999] flex items-center justify-center flex-col">
                <div class="font-anton text-4xl text-st-red neon-red mb-4 tracking-widest">LOADING</div>
                <div class="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div id="loading-bar" class="h-full bg-st-red rounded-full" style="width: 0%; transition: width 0.5s ease;"></div>
                </div>
                <p class="font-retro text-gray-500 mt-4 text-sm">ENTERING THE UPSIDE DOWN...</p>
            </div>
        `;
        document.body.appendChild(loader);
    }

    init() {
        const bar = document.getElementById('loading-bar');
        const screen = document.getElementById('loading-screen');

        // Simulate loading
        setTimeout(() => bar.style.width = '30%', 200);
        setTimeout(() => bar.style.width = '60%', 600);
        setTimeout(() => bar.style.width = '100%', 1000);

        setTimeout(() => {
            screen.style.opacity = '0';
            screen.style.transition = 'opacity 0.5s ease';
            setTimeout(() => screen.remove(), 500);
        }, 1500);
    }
}

/* ============================================
   CURSOR TRAIL (Optional)
   ============================================ */

class CursorTrail {
    constructor() {
        this.dots = [];
        this.dotCount = 8;
        this.init();
    }

    init() {
        // Skip on mobile
        if (window.matchMedia('(pointer: coarse)').matches) return;

        for (let i = 0; i < this.dotCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail-dot';
            dot.style.cssText = `
                position: fixed;
                width: ${4 - i * 0.3}px;
                height: ${4 - i * 0.3}px;
                background: rgba(229, 9, 20, ${0.5 - i * 0.05});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                transition: transform 0.1s ease;
            `;
            document.body.appendChild(dot);
            this.dots.push({ el: dot, x: 0, y: 0 });
        }

        document.addEventListener('mousemove', (e) => this.handleMove(e));
        this.animate();
    }

    handleMove(e) {
        this.dots[0].x = e.clientX;
        this.dots[0].y = e.clientY;
    }

    animate() {
        for (let i = 1; i < this.dots.length; i++) {
            this.dots[i].x += (this.dots[i - 1].x - this.dots[i].x) * 0.3;
            this.dots[i].y += (this.dots[i - 1].y - this.dots[i].y) * 0.3;
        }

        this.dots.forEach(dot => {
            dot.el.style.transform = `translate(${dot.x}px, ${dot.y}px)`;
        });

        requestAnimationFrame(() => this.animate());
    }
}

/* ============================================
   INITIALIZE ALL
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    new LoadingScreen();
    new HologramTilt();
    new RandomFlicker();
    new FloatingEnhancement();
    new KeyboardShortcuts();
    // new CursorTrail(); // Uncomment to enable cursor trail
});
