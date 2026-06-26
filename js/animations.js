// Brainy Kings & Queens — Motion animation system
// Uses Motion (motion.dev) — the standalone Framer Motion for vanilla JS

document.addEventListener('DOMContentLoaded', () => {
  const { animate, inView, scroll, stagger } = Motion;

  // ── NAV: shrink + blur on scroll ────────────────────────────────────────
  const nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('py-2', 'shadow-lg', 'backdrop-blur-md');
        nav.style.background = 'rgba(251,250,238,0.93)';
        nav.classList.remove('py-4');
      } else {
        nav.classList.remove('py-2', 'shadow-lg', 'backdrop-blur-md');
        nav.style.background = '';
        nav.classList.add('py-4');
      }
    }, { passive: true });
  }

  // ── MOBILE MENU: animated toggle ────────────────────────────────────────
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        animate(mobileMenu, { opacity: [0, 1], y: [-12, 0] }, {
          duration: 0.28, easing: [0.22, 1, 0.36, 1]
        });
      } else {
        animate(mobileMenu, { opacity: [1, 0], y: [0, -12] }, {
          duration: 0.2, easing: 'ease-in'
        }).then(() => mobileMenu.classList.add('hidden'));
      }
    });
  }

  // ── HERO: staggered entrance ─────────────────────────────────────────────
  const heroItems = Array.from(document.querySelectorAll('[data-hero]'));
  if (heroItems.length) {
    animate(heroItems, { opacity: [0, 1], y: [48, 0] }, {
      delay: stagger(0.18, { start: 0.1 }),
      duration: 0.8,
      easing: [0.22, 1, 0.36, 1]
    });
  }

  // ── PARALLAX: hero background ────────────────────────────────────────────
  const heroBg = document.querySelector('.hero-parallax');
  if (heroBg) {
    const heroSection = heroBg.closest('section');
    if (heroSection) {
      scroll(({ y }) => {
        heroBg.style.transform = `translateY(${y.progress * 120}px) scale(1.12)`;
      }, { target: heroSection });
    }
  }

  // ── FADE UP: generic scroll reveal ──────────────────────────────────────
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    const delay = parseFloat(el.dataset.delay || 0);
    el.style.opacity = '0';
    el.style.transform = 'translateY(52px)';
    inView(el, () => {
      animate(el, { opacity: 1, y: 0 }, {
        duration: 0.78, delay, easing: [0.22, 1, 0.36, 1]
      });
    }, { margin: '-80px 0px' });
  });

  // ── SLIDE FROM LEFT ──────────────────────────────────────────────────────
  document.querySelectorAll('[data-reveal-left]').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-64px)';
    inView(el, () => {
      animate(el, { opacity: 1, x: 0 }, { duration: 0.85, easing: [0.22, 1, 0.36, 1] });
    }, { margin: '-60px 0px' });
  });

  // ── SLIDE FROM RIGHT ─────────────────────────────────────────────────────
  document.querySelectorAll('[data-reveal-right]').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(64px)';
    inView(el, () => {
      animate(el, { opacity: 1, x: 0 }, { duration: 0.85, easing: [0.22, 1, 0.36, 1] });
    }, { margin: '-60px 0px' });
  });

  // ── STAGGER: reveal child items ──────────────────────────────────────────
  document.querySelectorAll('[data-stagger]').forEach((parent) => {
    const children = Array.from(parent.querySelectorAll('[data-stagger-item]'));
    if (!children.length) return;
    children.forEach(c => {
      c.style.opacity = '0';
      c.style.transform = 'translateY(40px)';
    });
    inView(parent, () => {
      animate(children, { opacity: 1, y: 0 }, {
        delay: stagger(0.11),
        duration: 0.68,
        easing: [0.22, 1, 0.36, 1]
      });
    }, { margin: '-60px 0px' });
  });

  // ── SCALE IN: images / cards ─────────────────────────────────────────────
  document.querySelectorAll('[data-scale-in]').forEach((el) => {
    const delay = parseFloat(el.dataset.delay || 0);
    el.style.opacity = '0';
    el.style.transform = 'scale(0.88)';
    inView(el, () => {
      animate(el, { opacity: 1, scale: 1 }, {
        duration: 0.65, delay, easing: [0.22, 1, 0.36, 1]
      });
    }, { margin: '-60px 0px' });
  });

  // ── COUNTER: count-up numbers ────────────────────────────────────────────
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    el.textContent = prefix + '0' + suffix;

    inView(el, () => {
      animate(0, target, {
        duration: 2,
        easing: [0.22, 1, 0.36, 1],
        onUpdate: (v) => {
          const val = target % 1 === 0 ? Math.round(v) : v.toFixed(0);
          el.textContent = prefix + val + suffix;
        }
      });
    }, { margin: '-40px 0px' });
  });

  // ── SECTION HEADING: underline grow ──────────────────────────────────────
  document.querySelectorAll('[data-underline]').forEach((el) => {
    const line = document.createElement('span');
    line.style.cssText =
      'display:block;height:3px;background:currentColor;width:0;margin-top:10px;transition:width 0.9s cubic-bezier(0.22,1,0.36,1)';
    el.style.position = 'relative';
    el.appendChild(line);
    inView(el, () => { setTimeout(() => { line.style.width = '56px'; }, 250); }, { margin: '-40px 0px' });
  });

  // ── TIMELINE: sequential reveal ──────────────────────────────────────────
  document.querySelectorAll('[data-timeline-item]').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    inView(el, () => {
      animate(el, { opacity: 1, y: 0 }, {
        duration: 0.72, delay: i * 0.15, easing: [0.22, 1, 0.36, 1]
      });
    }, { margin: '-40px 0px' });
  });

  // ── CARD HOVER: lift + shadow ────────────────────────────────────────────
  document.querySelectorAll('[data-hover-lift]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      animate(el, { y: -6, boxShadow: '0 20px 40px rgba(0,83,212,0.15)' }, {
        duration: 0.3, easing: [0.22, 1, 0.36, 1]
      });
    });
    el.addEventListener('mouseleave', () => {
      animate(el, { y: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }, {
        duration: 0.35, easing: 'ease-out'
      });
    });
  });
});
