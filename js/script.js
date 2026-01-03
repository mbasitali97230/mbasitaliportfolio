/* =====================================================
   MOBILE MENU TOGGLE + SCROLL LOCK
===================================================== */
const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("mobileMenu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    menu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  // menu link click par close
  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      toggle.classList.remove("active");
      menu.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });
}


// Preloader (CLEAN & RESPONSIVE SAFE)
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const whatsappBtn = document.getElementById('whatsappBtn');

  // hide WhatsApp during loading
  if (whatsappBtn) {
    whatsappBtn.style.display = 'none';
  }

  // remove loader after delay
  setTimeout(() => {
    if (preloader) {
      preloader.classList.add('hide');
    }

    document.body.classList.remove('preloading');

    // show WhatsApp again (CSS will control size)
    if (whatsappBtn) {
      whatsappBtn.style.display = 'flex';
    }

  }, 1200);
});

/* =====================================================
   HERO ROLE TEXT + PARAGRAPH ANIMATION
===================================================== */
const roles = [
  {
    text: "Web Developer",
    color: "#ff3b30",
    para: "I build modern, responsive, and high-performance websites."
  },
  {
    text: "Graphic Designer",
    color: "#7ddad6",
    para: "I create visually compelling thumbnails and posters."
  },
  {
    text: "Freelancer",
    color: "#000000",
    para: "I work with clients worldwide to deliver quality work."
  }
];

let roleIndex = 0;
const roleText = document.getElementById("roleText");
const paraText = document.getElementById("mbasitpara");

if (roleText && paraText) {
  setInterval(() => {
    roleText.style.opacity = 0;
    paraText.style.opacity = 0;

    setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleText.textContent = roles[roleIndex].text;
      roleText.style.color = roles[roleIndex].color;
      paraText.textContent = roles[roleIndex].para;

      roleText.style.opacity = 1;
      paraText.style.opacity = 1;
    }, 500);
  }, 3000);
}

/* =====================================================
   HERO MAIN TEXT LOOP
===================================================== */
const messages = [
  { text: "I’M Basit Ali", duration: 4000 },
  { text: "Want to create a Website?", duration: 4000 },
  { text: "Thumbnails, Posters & More", duration: 4000 }
];

let msgIndex = 0;
const heroText = document.getElementById("heroText");

function changeHeroText() {
  if (!heroText) return;

  heroText.style.opacity = 0;

  setTimeout(() => {
    heroText.textContent = messages[msgIndex].text;
    heroText.style.opacity = 1;

    setTimeout(() => {
      msgIndex = (msgIndex + 1) % messages.length;
      changeHeroText();
    }, messages[msgIndex].duration);

  }, 600);
}
changeHeroText();

/* =====================================================
   PROJECT CARD 3D HOVER (DESKTOP ONLY)
===================================================== */
if (window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".project-item").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `rotateY(${x / 25}deg) rotateX(${-y / 25}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateY(0) rotateX(0)";
    });
  });
}

/* =====================================================
   THUMBNAIL MOBILE TAP SUPPORT
===================================================== */
document.querySelectorAll(".thumbnail-item").forEach(item => {
  item.addEventListener("click", e => {
    if (!item.classList.contains("active")) {
      e.preventDefault();
    }

    document.querySelectorAll(".thumbnail-item").forEach(i => {
      if (i !== item) i.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});

/* =====================================================
   BACK TO TOP BUTTON
===================================================== */
const backBtn = document.querySelector(".back-to-top");

if (backBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backBtn.classList.add("show");
    } else {
      backBtn.classList.remove("show");
    }
  });

  backBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


/* =====================================================
   FOOTER YEAR AUTO UPDATE
===================================================== */
const yearEl = document.getElementById("footer-year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* =====================================================
   HIRE ME MODAL
===================================================== */
const hireBtn = document.querySelector(".hire-btn");
const hireModal = document.getElementById("hireModal");
const hireClose = document.querySelector(".hire-close");

if (hireBtn && hireModal) {
  hireBtn.addEventListener("click", e => {
    e.preventDefault();
    hireModal.classList.add("show");
    document.body.classList.add("no-scroll");
  });
}

if (hireClose) {
  hireClose.addEventListener("click", () => {
    hireModal.classList.remove("show");
    document.body.classList.remove("no-scroll");
  });
}

window.addEventListener("click", e => {
  if (e.target === hireModal) {
    hireModal.classList.remove("show");
    document.body.classList.remove("no-scroll");
  }
});


