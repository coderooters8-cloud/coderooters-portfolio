const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Reveal sections smoothly as they enter the viewport.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$('.reveal').forEach((element) => revealObserver.observe(element));

// Mobile navigation.
const menuToggle = $('#menuToggle');
const navLinks = $('#navLinks');
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Reading progress and back-to-top control.
const progress = $('#scrollProgress');
const backTop = $('#backTop');
function updateScrollUI() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const percent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  progress.style.width = `${percent}%`;
  backTop.classList.toggle('visible', window.scrollY > 500);
}
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Dynamic copyright year.
$('#year').textContent = new Date().getFullYear();

// Small pointer glow on the hero artwork (disabled for touch-first devices).
const heroArt = $('.hero-art');
if (window.matchMedia('(pointer: fine)').matches) {
  heroArt.addEventListener('pointermove', (event) => {
    const rect = heroArt.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    heroArt.style.setProperty('--pointer-x', `${x}%`);
    heroArt.style.setProperty('--pointer-y', `${y}%`);
    heroArt.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(0,153,255,.08), transparent 35%)`;
  });
  heroArt.addEventListener('pointerleave', () => { heroArt.style.background = ''; });
}
