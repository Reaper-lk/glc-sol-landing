const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

window.addEventListener('load', () => {
  setTimeout(() => $('#pageLoader')?.classList.add('hidden'), 350);
});

$('#year').textContent = new Date().getFullYear();

const header = $('#siteHeader');
const progress = $('#scrollProgress');
const backToTop = $('#backToTop');
function handleScroll() {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 20);
  backToTop.classList.toggle('visible', y > 650);
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
}
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const menuButton = $('#menuButton');
const siteNav = $('#siteNav');
menuButton.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
$$('#siteNav a').forEach(a => a.addEventListener('click', () => {
  siteNav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -45px' });
$$('.reveal').forEach(el => revealObserver.observe(el));

const copyButton = $('#copyContract');
copyButton.addEventListener('click', async () => {
  const text = $('#contractText').textContent.trim();
  try {
    await navigator.clipboard.writeText(text);
    copyButton.textContent = 'Copied';
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
    copyButton.textContent = 'Copied';
  }
  setTimeout(() => copyButton.textContent = 'Copy', 1600);
});

const cursorGlow = $('#cursorGlow');
if (matchMedia('(pointer:fine)').matches) {
  addEventListener('mousemove', e => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
    cursorGlow.style.opacity = '1';
  });
  addEventListener('mouseleave', () => cursorGlow.style.opacity = '0');
}

const coinStage = $('#coinStage');
const coinWrap = $('#coinWrap');
if (matchMedia('(pointer:fine)').matches) {
  coinStage.addEventListener('mousemove', e => {
    const r = coinStage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    coinWrap.style.animation = 'none';
    coinWrap.style.transform = `translateY(-16px) rotateY(${x * 22}deg) rotateX(${-y * 16}deg)`;
  });
  coinStage.addEventListener('mouseleave', () => {
    coinWrap.style.transform = '';
    coinWrap.style.animation = '';
  });
}

const canvas = $('#particles');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId;
function resizeCanvas() {
  const ratio = Math.min(devicePixelRatio || 1, 2);
  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  const count = Math.min(95, Math.floor(innerWidth / 14));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 1.8 + .25,
    vx: (Math.random() - .5) * .12,
    vy: Math.random() * -.16 - .03,
    a: Math.random() * .6 + .12,
    tw: Math.random() * Math.PI * 2
  }));
}
function drawParticles() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.tw += .018;
    if (p.y < -10) { p.y = innerHeight + 10; p.x = Math.random() * innerWidth; }
    if (p.x < -10) p.x = innerWidth + 10;
    if (p.x > innerWidth + 10) p.x = -10;
    const alpha = p.a * (.72 + Math.sin(p.tw) * .28);
    const glow = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*5);
    glow.addColorStop(0, `rgba(255,194,39,${alpha})`);
    glow.addColorStop(1, 'rgba(255,184,0,0)');
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r*5,0,Math.PI*2); ctx.fill();
  });
  animationId = requestAnimationFrame(drawParticles);
}
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  resizeCanvas(); drawParticles();
  addEventListener('resize', resizeCanvas);
}
