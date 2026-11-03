// Theme Toggle Functionality
const themeBtn = document.getElementById('themeBtn');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  themeBtn.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
}

themeBtn.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme');
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    themeBtn.textContent = '🌙';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    themeBtn.textContent = '☀️';
  }
});

// Interactive Meow & Headpat Counter
const meowBtn = document.getElementById('meowBtn');
const patCount = document.getElementById('patCount');
let count = 0;

// Web Audio API Synthesizer for Meow Sound
function playMeowSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.15);
  osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.45);

  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.45);
}

meowBtn.addEventListener('click', () => {
  count++;
  patCount.textContent = count;
  playMeowSound();

  // Button Bounce Effect
  meowBtn.style.transform = 'scale(0.95)';
  setTimeout(() => {
    meowBtn.style.transform = 'scale(1.05)';
  }, 100);
});
