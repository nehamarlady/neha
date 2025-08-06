// main.js

// Initialize all functions when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initTypewriter();
  initSectionObserver();
  initShootingStars();
});

// Typewriter effect
function initTypewriter() {
  const text = "hi, neha here.|";
  const target = document.querySelector(".home-content h1");
  let index = 0;
  target.textContent = "";

  function typeWriter() {
    if (index < text.length) {
      target.textContent += text.charAt(index++);
      setTimeout(typeWriter, 100);
    }
  }

  typeWriter();
}

// Reveal sections on scroll
function initSectionObserver() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll(".section").forEach(section => {
    observer.observe(section);
  });
}

// Shooting Stars Animation
function initShootingStars() {
  const canvas = document.querySelector('.stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let shootingStars = [];
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function getRandomColor() {
    const colors = ['#ffffff', '#00bfff', '#ff69b4', '#ffff66'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function createShootingStar() {
    return {
      x: Math.random() * canvas.width,
      y: 0,
      length: 200 + Math.random() * 200,
      speed: 4 + Math.random() * 8,
      angle: Math.PI / 4,
      alpha: 1,
      decay: 0.01 + Math.random() * 0.02,
      color: getRandomColor(),
      exploded: false
    };
  }

  function createParticles(x, y, color) {
    for (let i = 0; i < 15; i++) {
      particles.push({
        x,
        y,
        radius: 1 + Math.random() * 2,
        color,
        speedX: (Math.random() - 0.5) * 6,
        speedY: (Math.random() - 0.5) * 6,
        alpha: 1,
        decay: 0.02 + Math.random() * 0.02
      });
    }
  }

  function drawStar(star) {
    const endX = star.x + Math.cos(star.angle) * star.length;
    const endY = star.y + Math.sin(star.angle) * star.length;

    const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
    gradient.addColorStop(0, `${star.color}${Math.floor(star.alpha * 255).toString(16).padStart(2, '0')}`);
    gradient.addColorStop(1, `${star.color}00`);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }

  function drawParticles() {
    particles = particles.filter(p => p.alpha > 0);
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `${p.color}${Math.floor(p.alpha * 255).toString(16).padStart(2, '0')}`;
      ctx.fill();
      p.x += p.speedX;
      p.y += p.speedY;
      p.alpha -= p.decay;
    }
  }

  function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shootingStars = shootingStars.filter(s => s.alpha > 0);
    for (const star of shootingStars) {
      drawStar(star);
      star.x += Math.cos(star.angle) * star.speed;
      star.y += Math.sin(star.angle) * star.speed;
      star.alpha -= star.decay;

      if (!star.exploded && (star.x > canvas.width || star.y > canvas.height)) {
        createParticles(star.x, star.y, star.color);
        star.exploded = true;
      }
    }

    drawParticles();

    if (Math.random() < 0.05) {
      shootingStars.push(createShootingStar());
    }

    requestAnimationFrame(animateStars);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  animateStars();
}

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll('.experience-tabs li');
  const details = document.querySelectorAll('.experience-details');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      details.forEach(d => d.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
    });
  });
});
