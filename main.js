// script.js

// Typewriter effect for home section
document.addEventListener("DOMContentLoaded", () => {
  const text = "Frontend Engineer | Minimalist | Problem Solver";
  const target = document.querySelector(".home-content p");
  let index = 0;

  function typeWriter() {
    if (index < text.length) {
      target.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, 60);
    }
  }

  target.textContent = "";
  typeWriter();

  // Scroll-triggered reveal
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1
    }
  );

  document.querySelectorAll(".section").forEach(section => {
    observer.observe(section);
  });

  // Dark/light mode toggle
  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "🌙";
  toggleBtn.className = "theme-toggle";
  document.body.appendChild(toggleBtn);

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    toggleBtn.textContent =
      document.body.classList.contains("light-mode") ? "🌞" : "🌙";
  });
});
