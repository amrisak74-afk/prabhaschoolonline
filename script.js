const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const backToTop = document.querySelector(".back-to-top");
const sections = document.querySelectorAll("section[id]");
const revealItems = document.querySelectorAll(".section-reveal");

const fallbackSvgs = {
  "images/logo.png": "PGJPS",
  "images/hero.jpg": "Prabha Gyan Jyoti Public School",
  "images/principal.jpg": "Principal — Mrs. Shalu Chaudhary",
  "images/main-event.jpg": "House Oath Ceremony",
  "images/primary-students.jpg": "Primary Students",
  "images/sports-day.jpg": "Sports Day",
  "images/earth-day.jpg": "Earth Day",
  "images/school-ritual.jpg": "Culture & Values",
  "images/yoga-assembly.jpg": "Yoga & Discipline",
  "images/achievement-day.jpg": "Student Achievements",
  "images/farewell.jpg": "Farewell Celebration",
  "images/gallery1.jpg": "Campus Life",
  "images/gallery2.jpg": "Learning Activities",
  "images/gallery3.jpg": "School Events",
  "images/gallery4.jpg": "Student Growth"
};

document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => {
    const label = fallbackSvgs[image.getAttribute("src")] || "School Image";
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
        <defs>
          <linearGradient id="brand" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#07145a"/>
            <stop offset="58%" stop-color="#d83a2e"/>
            <stop offset="100%" stop-color="#f7bd20"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#brand)"/>
        <circle cx="1080" cy="120" r="190" fill="rgba(255,255,255,.12)"/>
        <circle cx="120" cy="700" r="240" fill="rgba(255,255,255,.10)"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
          font-family="Arial, sans-serif" font-size="58" font-weight="800" fill="#fff">${label}</text>
      </svg>`;
    image.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  });
});

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -48% 0px" }
);

sections.forEach((section) => activeObserver.observe(section));

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 520);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Photo slideshow
const slideshowEl = document.getElementById("mainSlideshow");
if (slideshowEl) {
  const dots = document.querySelectorAll(".slide-dot");
  let current = 0;
  let timer;
  const total = slideshowEl.querySelectorAll(".slide").length;

  function goTo(n) {
    current = (n + total) % total;
    slideshowEl.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 4500);
  }

  document.querySelector(".slide-next").addEventListener("click", () => { goTo(current + 1); startTimer(); });
  document.querySelector(".slide-prev").addEventListener("click", () => { goTo(current - 1); startTimer(); });
  dots.forEach(d => d.addEventListener("click", () => { goTo(+d.dataset.index); startTimer(); }));
  startTimer();
}

/* ── MOVE TOPPERS AFTER HERO ────────────────────────────────────── */
(function() {
  const toppers = document.getElementById('toppers');
  const hero = document.querySelector('.hero');
  if (toppers && hero) {
    hero.parentNode.insertBefore(toppers, hero.nextSibling);
  }
})();

/* ── TOPPER FILTERS ─────────────────────────────────────────────── */
const tfBtns = document.querySelectorAll(".tf-btn");
if (tfBtns.length) {
  tfBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tfBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      document.querySelectorAll(".topper-card").forEach(card => {
        card.style.display = (filter === "all" || card.dataset.group === filter) ? "" : "none";
      });
    });
  });
}

const enquiryForm = document.querySelector(".enquiry-form");

if (enquiryForm) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = event.currentTarget.querySelector("button");
    const originalText = button.textContent;
    button.textContent = "Enquiry Sent";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      event.currentTarget.reset();
    }, 1800);
  });
}
