// ── Intro loader ──
window.addEventListener('load', () => {
  setTimeout(() => {
    const intro = document.getElementById('intro');
    if (intro) intro.classList.add('hide');
  }, 1400);
});

// ── Scroll reveal ──
const observer = new IntersectionObserver((els) => {
  els.forEach(el => { if (el.isIntersecting) el.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Scroll progress bar ──
const progress = document.getElementById('scrollProgress');
const fab = document.getElementById('fab');
const heroPhoto = document.getElementById('heroPhoto');
const parallaxEls = document.querySelectorAll('[data-parallax]');

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progress) progress.style.width = pct + '%';

  // Floating button appears after hero
  if (fab) {
    if (scrollTop > window.innerHeight * 0.6) fab.classList.add('show');
    else fab.classList.remove('show');
  }

  // Hero parallax
  if (heroPhoto && scrollTop < window.innerHeight) {
    heroPhoto.style.transform = 'translateY(' + (scrollTop * 0.25) + 'px)';
  }

  // Decorative parallax
  parallaxEls.forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0.1;
    const rect = el.getBoundingClientRect();
    const offset = (window.innerHeight - rect.top) * speed;
    el.style.transform = 'translate(-50%, calc(-50% + ' + offset + 'px))';
  });
}
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => { onScroll(); ticking = false; });
    ticking = true;
  }
}, { passive: true });
onScroll();

// ── Floating food particles in hero ──
const particlesBox = document.getElementById('heroParticles');
if (particlesBox && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const emojis = ['🍓','🥑','🍅','🍋','✨','🍽️','🌿','🥤'];
  const count = window.innerWidth < 600 ? 7 : 12;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.textContent = emojis[i % emojis.length];
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = '-40px';
    const dur = 12 + Math.random() * 12;
    p.style.animationDuration = dur + 's';
    p.style.animationDelay = (Math.random() * dur) + 's';
    p.style.fontSize = (1 + Math.random() * 1.2) + 'rem';
    particlesBox.appendChild(p);
  }
}

// ── Magnetic buttons ──
const isTouch = window.matchMedia('(hover: none)').matches;
if (!isTouch) {
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = 'translate(' + x * 0.25 + 'px,' + y * 0.35 + 'px)';
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  // ── 3D tilt cards ──
  document.querySelectorAll('.tilt').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (py - 0.5) * -14;
      const ry = (px - 0.5) * 14;
      el.style.transform = 'perspective(700px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-8px) scale(1.03)';
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}
