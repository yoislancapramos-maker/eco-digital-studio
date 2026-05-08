// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ── CANVAS FONDO ANIMADO ──
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let W, H, blobs;

const COLORS = [
  'rgba(184,240,96,',
  'rgba(96,212,240,',
  'rgba(192,96,240,',
  'rgba(240,96,168,',
  'rgba(240,160,96,',
];

function initCanvas() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  blobs = Array.from({ length: 6 }, (_, i) => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: 200 + Math.random() * 250,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    color: COLORS[i % COLORS.length],
    opacity: 0.07 + Math.random() * 0.08,
  }));
}

function drawBlobs() {
  ctx.clearRect(0, 0, W, H);
  blobs.forEach(b => {
    const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
    grad.addColorStop(0, b.color + b.opacity + ')');
    grad.addColorStop(1, b.color + '0)');
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    b.x += b.vx;
    b.y += b.vy;
    if (b.x < -b.r) b.x = W + b.r;
    if (b.x > W + b.r) b.x = -b.r;
    if (b.y < -b.r) b.y = H + b.r;
    if (b.y > H + b.r) b.y = -b.r;
  });
  requestAnimationFrame(drawBlobs);
}

window.addEventListener('resize', initCanvas);
initCanvas();
drawBlobs();

// ── CURSOR GLOW ──
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed; pointer-events: none; z-index: 9999;
  width: 300px; height: 300px; border-radius: 50%;
  background: radial-gradient(circle, rgba(184,240,96,0.06) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: opacity 0.3s;
`;
document.body.appendChild(cursor);

window.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});