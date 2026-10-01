const audio = document.getElementById("site-music-audio");
const playButton = document.getElementById("music-toggle");
const volumeButton = document.getElementById("music-volume");
const progress = document.getElementById("music-progress");
const timeLabel = document.getElementById("music-time");
const thoughtTriggers = [
  {
    trigger: document.getElementById("thought-trigger"),
    wrap: document.getElementById("ste-portrait-wrap"),
    balloon: document.getElementById("ste-thought")
  },
  {
    trigger: document.getElementById("thought-trigger-bruno"),
    wrap: document.getElementById("bruno-portrait-wrap"),
    balloon: document.getElementById("bruno-thought")
  }
];

function toggleThought({ trigger, wrap, balloon }) {
  if (!trigger || !wrap || !balloon) return;

  const open = wrap.classList.toggle("thought-open");
  balloon.setAttribute("aria-hidden", String(!open));
  trigger.setAttribute("aria-expanded", String(open));

  if (open) {
    thoughtTriggers.forEach((item) => {
      if (item.wrap !== wrap && item.wrap) {
        item.wrap.classList.remove("thought-open");
        item.balloon?.setAttribute("aria-hidden", "true");
        item.trigger?.setAttribute("aria-expanded", "false");
      }
    });
  }
}

thoughtTriggers.forEach((item) => {
  if (!item.trigger) return;
  item.trigger.setAttribute("aria-expanded", "false");
  item.trigger.addEventListener("click", () => toggleThought(item));
});

document.addEventListener("click", (event) => {
  if (thoughtTriggers.some((item) => item.wrap?.contains(event.target))) return;
  thoughtTriggers.forEach((item) => {
    item.wrap?.classList.remove("thought-open");
    item.balloon?.setAttribute("aria-hidden", "true");
    item.trigger?.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("resize", () => {
  // O balão pertence ao retrato; não precisa recalcular posição no scroll.
  // Apenas fecha em mudanças grandes de orientação/tamanho para evitar sobreposição.
  if (window.innerWidth <= 390) {
    thoughtTriggers.forEach((item) => item.wrap?.classList.remove("thought-open"));
  }
});

for (const button of document.querySelectorAll(".spoiler-click")) {
  button.addEventListener("click", () => {
    button.classList.add("revealed");
    button.textContent = "(minha sogra)";
  });
}

const heartCount = window.matchMedia("(max-width: 700px)").matches ? 18 : 34;
const hearts = document.getElementById("hearts");
for (let i = 0; i < heartCount; i++) {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.top = `${Math.random() * 100}%`;
  const size = 7 + Math.random() * 10;
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.animationDuration = `${5 + Math.random() * 7}s`;
  heart.style.animationDelay = `${Math.random() * -8}s`;
  hearts.appendChild(heart);
}

const sections = document.querySelectorAll(".chapter");
const dots = document.querySelectorAll(".progress-dot");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    dots.forEach((dot) => dot.classList.toggle("active", dot.dataset.target === entry.target.id));
  });
}, { threshold: 0.55 });
sections.forEach((section) => observer.observe(section));

dots.forEach((dot) => {
  dot.addEventListener("click", () => document.getElementById(dot.dataset.target)?.scrollIntoView({ behavior: "smooth" }));
});

updateMusic();
