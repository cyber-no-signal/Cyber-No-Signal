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
