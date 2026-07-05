// Story navigation and interactive experience.
const slides = Array.from(document.querySelectorAll('.slide'));
const slidesContainer = document.getElementById('slides');
const progressIndicator = document.getElementById('progressIndicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const musicToggle = document.getElementById('musicToggle');
const themeToggle = document.getElementById('themeToggle');
const loadingScreen = document.getElementById('loadingScreen');
const cursorGlow = document.getElementById('cursorGlow');
const proposalText = document.getElementById('proposalText');
const birthdayMessage = document.getElementById('birthdayMessage');
const startStoryBtn = document.getElementById('startStoryBtn');
const heartBurstBtn = document.getElementById('heartBurstBtn');
const bgMusic = document.getElementById('bgMusic');
let currentSlide = 0;
let musicEnabled = false;
let typingTimer;
let birthdayTimer;

function initializeMusic() {
  if (!bgMusic || musicEnabled) return;
  bgMusic.volume = 0.18;
  bgMusic.autoplay = true;
  bgMusic.play().then(() => {
    musicEnabled = true;
    musicToggle.textContent = '🔈';
  }).catch(() => {
    musicEnabled = false;
    musicToggle.textContent = '🔊';
  });
}

// Create progress dots.
slides.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.className = 'progress-dot';
  if (index === 0) dot.classList.add('active');
  progressIndicator.appendChild(dot);
});

const progressDots = Array.from(document.querySelectorAll('.progress-dot'));

// Show the active slide.
function showSlide(index) {
  currentSlide = Math.max(0, Math.min(index, slides.length - 1));
  slidesContainer.style.transform = `translateX(-${currentSlide * 100}vw)`;
  progressDots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));

  if (currentSlide === 1) {
    typeProposal();
  }

  if (currentSlide === 9) {
    typeBirthdayMessage();
  }
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

// Keyboard navigation.
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'PageDown') {
    event.preventDefault();
    nextSlide();
  }
  if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
    event.preventDefault();
    prevSlide();
  }
});

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
startStoryBtn.addEventListener('click', nextSlide);

document.querySelectorAll('.reason-card').forEach((card) => {
  card.addEventListener('click', () => {
    sessionStorage.setItem('returnFromDetail', 'true');
    sessionStorage.setItem('returnSlide', String(currentSlide));
  });
});

// Wheel navigation for a cinematic feel.
let wheelLock = false;
document.addEventListener('wheel', (event) => {
  if (wheelLock) return;
  wheelLock = true;
  setTimeout(() => {
    wheelLock = false;
  }, 500);
  if (event.deltaY > 0) nextSlide();
  if (event.deltaY < 0) prevSlide();
}, { passive: true });

// Typing effect for proposal slide.
function typeProposal() {
  clearTimeout(typingTimer);
  proposalText.innerHTML = '';
  const message = `💖 Nanage aa dina ivattigu tumba chennagi nenapide... 💖 Aa dina yeno dodda adbhutha aagirlilla... aadre ninna modala naguva nodida kshanadinda nanna jeevanave bere tara aaythu. Ninna aa mugdha nagu, ninna olle manassu, ninna maatu... ivella nodta idre, nanna hrudaya nidhaanavaagi ninna kadeye hogta ittu. Ninna jothe maatadodu, ninna nagu kelodu, ninna jothe swalpa samaya kaleyodu... ivella nanna dinada atyanta sundara kshanagalu aagbitvu. Ninna presence idre saaku... yella kasta swalpa doora hoda haage anisodu. Gottaa...? Ninna mele preethi onde sala bandilla... adu dina dina swalpa swalpa jaasti aagta bandthu. Hange male hani bhoomige serida haage, nanna hrudaya kooda ninna preethiyalli karagta hoythu. Ninna banda mele nanna jeevana innu belaku thumbida haage aaythu. Nanna naguvige kaarana neenu... nanna kanasugalige banna neenu... nanna santoshakke artha neenu. Ninna jothe irbeku, ninna kai hidkondhu ella haadi nadibeku, ninna naguvanna prathi dina nodbeku... idu iga nanna dodda aase. Nijavaagi helbekandre... neenu nanna jeevanada atyanta sundaravaada gift. Ninna preethi nange dhairya kotthu, aase kotthu, mattu nijavaada preethi andre yenu anta kalisthu. Ninna jothe prathi kshana... nanna hrudayadalli sada iruva ondu amoolya nenapu.`;
  let index = 0;
  function step() {
    proposalText.innerHTML += message[index];
    index += 1;
    if (index < message.length) {
      typingTimer = setTimeout(step, 18);
    }
  }
  step();
}

// Typewriter message for final birthday slide.
function typeBirthdayMessage() {
  clearTimeout(birthdayTimer);
  birthdayMessage.innerHTML = '';
  const message = `Thank you for being the most beautiful part of my life. On this birthday, I want you to know how deeply I admire your heart, your grace, and the way you make every ordinary moment feel sacred. I am grateful for the past three years, for every smile shared, every dream carried, every tear softened, and every joy multiplied because of you. I pray for your happiness, your peace, and your endless light, because you deserve a life filled with beauty, laughter, and love. I am excited for all the beautiful years still waiting for us, for every sunrise we will witness together and every dream we will build as one. You are my home, my comfort, and the love I will choose again and again, forever.`;
  let index = 0;
  function step() {
    birthdayMessage.innerHTML += message[index];
    index += 1;
    if (index < message.length) {
      birthdayTimer = setTimeout(step, 16);
    }
  }
  step();
}

// Decorative petals and golden particles.
function createPetals() {
  for (let i = 0; i < 38; i += 1) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.top = `${-20 - Math.random() * 20}vh`;
    petal.style.animationDuration = `${6 + Math.random() * 8}s`;
    petal.style.animationDelay = `${Math.random() * 4}s`;
    document.body.appendChild(petal);
  }
}

function createParticles() {
  for (let i = 0; i < 26; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.animationDuration = `${4 + Math.random() * 6}s`;
    particle.style.animationDelay = `${Math.random() * 3}s`;
    document.body.appendChild(particle);
  }
}

function triggerFireworks() {
  for (let i = 0; i < 28; i += 1) {
    const firework = document.createElement('span');
    firework.className = 'firework';
    firework.style.left = `${50 + Math.random() * 35 - 17.5}vw`;
    firework.style.top = `${34 + Math.random() * 28}vh`;
    firework.style.background = ['#ff6f91', '#d9a24c', '#fff0b3', '#c68f7f'][Math.floor(Math.random() * 4)];
    firework.style.animationDuration = `${0.8 + Math.random() * 0.4}s`;
    document.body.appendChild(firework);
  }
}

function heartRain() {
  for (let i = 0; i < 24; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'heart-float';
    heart.textContent = '♥';
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = `${-10}vh`;
    heart.style.animationDuration = `${1.2 + Math.random() * 1.2}s`;
    document.body.appendChild(heart);
  }
}

function burstHearts() {
  for (let i = 0; i < 22; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'heart-float';
    heart.textContent = '♡';
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = `${Math.random() * 100}vh`;
    heart.style.animationDuration = `${1.4 + Math.random() * 0.8}s`;
    document.body.appendChild(heart);
  }
}

// Music control using the browser audio API with a small embedded sound file.
function toggleMusic() {
  if (!bgMusic) return;
  if (!musicEnabled) {
    initializeMusic();
  } else {
    bgMusic.pause();
    musicEnabled = false;
    musicToggle.textContent = '🔊';
  }
}

musicToggle.addEventListener('click', toggleMusic);
window.addEventListener('pointerdown', initializeMusic, { once: true });
window.addEventListener('keydown', initializeMusic, { once: true });

// Theme toggle.
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggle.textContent = document.body.classList.contains('light') ? '🌙' : '☀️';
});

// Create floating sparkle on hover for cards.
document.querySelectorAll('.quote-card, .challenge-card, .promise-card, .memory-card, .gallery-card').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    for (let i = 0; i < 6; i += 1) {
      const sparkle = document.createElement('span');
      sparkle.className = 'sparkle';
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      card.appendChild(sparkle);
    }
  });
});

// Final button creates floating hearts on demand.
heartBurstBtn.addEventListener('click', () => {
  burstHearts();
  triggerFireworks();
});

// Love timer.
const anniversaryDate = new Date('2024-05-08T00:00:00');
function updateLoveTimer() {
  const now = new Date();
  const diff = now - anniversaryDate;
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.2425));
  const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.2425)) / (1000 * 60 * 60 * 24 * 30.44));
  const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const timer = document.createElement('div');
  timer.className = 'love-timer';
  timer.innerHTML = `
    <h3>We've been together for:</h3>
    <div class="timer-row">
      <span>${years} Years</span>
      <span>${months} Months</span>
      <span>${days} Days</span>
      <span>${hours} Hours</span>
      <span>${minutes} Minutes</span>
      <span>${seconds} Seconds</span>
    </div>
  `;

  document.querySelectorAll('.love-timer').forEach((el) => el.remove());
  document.querySelector('.challenge-slide .slide-content')?.appendChild(timer);
}

setInterval(updateLoveTimer, 1000);
updateLoveTimer();

// Parallax effect and cursor movement.
document.addEventListener('mousemove', (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 12;
  const y = (event.clientY / window.innerHeight - 0.5) * 12;
  cursorGlow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
  document.querySelectorAll('.glass-card, .slide-content').forEach((card) => {
    if (card.classList.contains('cover-slide') || card.classList.contains('slide-content')) {
      card.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
    }
  });
});

// Initialize decorations and show first slide.
createPetals();
createParticles();
const shouldReturnToSavedSlide = sessionStorage.getItem('returnFromDetail') === 'true';
if (shouldReturnToSavedSlide) {
  const savedSlide = Number(sessionStorage.getItem('returnSlide') || 3);
  showSlide(savedSlide);
  sessionStorage.removeItem('returnFromDetail');
  sessionStorage.removeItem('returnSlide');
} else {
  showSlide(0);
}

window.addEventListener('load', () => {
  setTimeout(() => {
    loadingScreen.classList.add('hide');
  }, 2200);
});

// Add a subtle finale animation when the user reaches the final slide.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target.dataset.slide === '9') {
      triggerFireworks();
      heartRain();
    }
  });
}, { threshold: 0.6 });

observer.observe(document.querySelector('.finale-slide'));
