const toggleBtn = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateButton(savedTheme);

toggleBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateButton(next);
});

function updateButton(theme) {
  toggleBtn.textContent = theme === 'light' ? '🌙' : '☀️';
}
// Автовоспроизведение + включение звука
const video = document.getElementById('promo-video');
const unmuteBtn = document.getElementById('unmute-btn');

if (video && unmuteBtn) {
  video.addEventListener('play', () => {
    // Пробуем запустить со звуком через JS — сработает,
    // если браузер разрешит (после взаимодействия)
    video.muted = false;
  }, { once: true });

  unmuteBtn.addEventListener('click', () => {
    video.muted = false;
    video.volume = 1;
    unmuteBtn.classList.add('hidden');
  });
}
// === Анимированный космос ===
const canvas = document.getElementById('stars');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let w, h;
  let stars = [];
  let nebulae = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;

    // Звёзды: два слоя — дальние (медленные, тусклые) и ближние (быстрые, яркие)
    stars = [];
    const farCount = Math.floor((w * h) / 9000);
    const nearCount = Math.floor((w * h) / 20000);

    for (let i = 0; i < farCount; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.15 + 0.03,
        alpha: Math.random() * 0.4 + 0.2
      });
    }

    for (let i = 0; i < nearCount; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.8,
        speed: Math.random() * 0.5 + 0.15,
        alpha: Math.random() * 0.5 + 0.5
      });
    }

    // Туманности: большие цветные пятна
    nebulae = [
      { x: w * 0.2, y: h * 0.3, r: 300, color: '120, 60, 180', speedX: 0.05, speedY: 0.02, phase: 0 },
      { x: w * 0.8, y: h * 0.6, r: 250, color: '40, 100, 200', speedX: -0.04, speedY: 0.03, phase: 2 },
      { x: w * 0.5, y: h * 0.8, r: 220, color: '180, 60, 120', speedX: 0.03, speedY: -0.02, phase: 4 }
    ];
  }

  let t = 0;
  function draw() {
    // Заливаем фон почти чёрным
    ctx.fillStyle = '#090a0f';
    ctx.fillRect(0, 0, w, h);

    // Рисуем туманности
    for (const n of nebulae) {
      n.x += n.speedX;
      n.y += n.speedY;
      if (n.x < -n.r) n.x = w + n.r;
      if (n.x > w + n.r) n.x = -n.r;
      if (n.y < -n.r) n.y = h + n.r;
      if (n.y > h + n.r) n.y = -n.r;

      const pulse = 0.5 + 0.3 * Math.sin(t * 0.01 + n.phase);
      const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      gradient.addColorStop(0, `rgba(${n.color}, ${pulse * 0.4})`);
      gradient.addColorStop(1, `rgba(${n.color}, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Рисуем звёзды
    for (const s of stars) {
      s.y += s.speed;
      if (s.y > h) {
        s.y = 0;
        s.x = Math.random() * w;
      }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
      ctx.fill();
    }

    t++;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}
