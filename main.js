const EVENT_INFO = {
  couple: "Jaydeep and Dinal",
  eventDateTime: "April 29, 2026 10:00:00",
  venue: "Gurukul Banquet Hall, Rajkot, Gujarat"
};

const translations = {
  en: {
    navHome: "Home", navInv: "Invitation", navSched: "Schedule", navVenue: "Venue", navRsvp: "RSVP",
    eyebrow: "Shubh Vivah Sankalp",
    title: "Engagement Ceremony",
    date: "29 April 2026 | Muhurat: 10:00 AM",
    hindiLine: "Aap sabke aashirwad se humari khushi aur badhegi.",
    invTitle: "With Great Joy, We Invite You",
    invMsg: "We cordially invite you and your family to celebrate the engagement of our children. Your gracious presence and blessings will make this day truly memorable.",
    groomFam: "Groom's Family", brideFam: "Bride's Family", dressCode: "Dress Code",
    dressDesc: "Traditional Indian / Festive Ethnic Wear",
    schedTitle: "Ceremony Schedule",
    act1: "Guest Welcome & Ganesh Vandana", act2: "Ring Exchange Ceremony", act3: "Family Blessings & Photography", act4: "Lunch",
    venueTitle: "Venue",
    rsvpMsg: "Kindly confirm your presence by 22 April 2026.",
    contact: "Contact Person", phone: "Phone", waTitle: "WhatsApp RSVP", waBtn: "Send Confirmation",
    footer: "Made with love for our special day.",
    loader: "Preparing Celebration Experience",
    timeDays: "Days", timeHours: "Hours", timeMins: "Minutes left",
    ceremonyStarted: "Ceremony started - welcome to the celebration!",
    btnText: "અંગ્રેજી (English)",
    mapFallback: "If the map does not load, use this direct link:",
    openMaps: "Open Google Maps",
    openMapsBtn: "Open in Google Maps"
  },
  gu: {
    navHome: "મુખ્ય પૃષ્ઠ", navInv: "આમંત્રણ", navSched: "કાર્યક્રમ", navVenue: "સ્થળ", navRsvp: "આરએસવીપી",
    eyebrow: "શુભ વિવાહ સંકલ્પ",
    title: "સગાઈ સમારંભ",
    date: "૨૯ એપ્રિલ ૨૦૨૬ | મુહૂર્ત: સવારે ૧૦:૦૦",
    hindiLine: "આપ સૌના આશીર્વાદથી અમારી ખુશીમાં વધારો થશે.",
    invTitle: "અમે તમને આનંદપૂર્વક આમંત્રિત કરીએ છીએ",
    invMsg: "અમારા બાળકોની સગાઈ નિમિત્તે અમે તમને અને તમારા પરિવારને હાર્દિક આમંત્રણ આપીએ છીએ. તમારી સ્નેહપૂર્ણ હાજરી અને આશીર્વાદ આ દિવસને ખરેખર યાદગાર બનાવશે.",
    groomFam: "વરપક્ષ", brideFam: "કન્યાપક્ષ", dressCode: "પહેરવેશ",
    dressDesc: "ભારતીય પારંપરિક / એથનિક વેર",
    schedTitle: "કાર્યક્રમની રૂપરેખા",
    act1: "મહેમાનોનું સ્વાગત અને ગણેશ વંદના", act2: "રિંગ સેરેમની", act3: "આશીર્વાદ અને ફોટોગ્રાફી", act4: "ભોજન સમારંભ",
    venueTitle: "સ્થળ",
    rsvpMsg: "કૃપા કરીને ૨૨ એપ્રિલ ૨૦૨૬ સુધીમાં તમારી હાજરીની પુષ્ટિ કરો.",
    contact: "સંપર્ક વ્યક્તિ", phone: "મોબાઈલ નંબર", waTitle: "વોટ્સએપ આરએસવીપી", waBtn: "પુષ્ટિ મોકલો",
    footer: "અમારા ખાસ દિવસ માટે પ્રેમથી બનાવેલ.",
    loader: "ઉજવણીની તૈયારી થઈ રહી છે",
    timeDays: "દિવસ", timeHours: "કલાક", timeMins: "મિનિટ બાકી",
    ceremonyStarted: "સમારંભ શરૂ થઈ ગયો છે - ઉજવણીમાં તમારું સ્વાગત છે!",
    btnText: "ગુજરાતી (Gujarati)",
    mapFallback: "જો નકશો ન ખૂલે, તો આ સીધી લિંકનો ઉપયોગ કરો:",
    openMaps: "Google Maps ખોલો",
    openMapsBtn: "Google Maps માં ખોલો"
  }
};

let currentLang = "en";

const countdownElement = document.getElementById("countdown");
const pageLoader = document.getElementById("page-loader");
const parallaxLayers = Array.from(document.querySelectorAll(".parallax-layer"));
const petalContainer = document.getElementById("petal-container");
const fireworksCanvas = document.getElementById("fireworks-canvas");
const langToggleButton = document.getElementById("lang-toggle");

const PREFERS_REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)");

class FireworksShow {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext("2d") : null;
    this.rockets = [];
    this.particles = [];
    this.launchTimer = 0;
    this.startTime = 0;
    this.lastFrame = 0;
    this.rafId = null;
    this.isRunning = false;
    this.launchDurationMs = 3600;
    this.finishTimeout = 900;
    this.colors = ["#FFD700", "#FDB931", "#7A1F2F", "#FF9933"];
    this.resizeHandler = this.resize.bind(this);
  }

  resize() {
    if (!this.canvas) {
      return;
    }
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  start() {
    if (!this.canvas || !this.ctx || this.isRunning) {
      return;
    }
    this.isRunning = true;
    this.canvas.classList.add("active");
    this.resize();
    window.addEventListener("resize", this.resizeHandler, { passive: true });

    this.rockets = [];
    this.particles = [];
    this.startTime = performance.now();
    this.lastFrame = this.startTime;
    this.launchTimer = 0;
    this.rafId = requestAnimationFrame(this.tick.bind(this));
  }

  stop() {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    window.removeEventListener("resize", this.resizeHandler);
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.canvas.classList.remove("active");
    }
  }

  launchRocket(fromLeft) {
    const xBase = fromLeft ? this.canvas.width * 0.12 : this.canvas.width * 0.88;
    const xSpread = fromLeft ? this.canvas.width * 0.08 : -this.canvas.width * 0.08;
    const x = xBase + Math.random() * xSpread;
    const y = this.canvas.height + 8;
    const vx = fromLeft ? 0.9 + Math.random() * 1.2 : -0.9 - Math.random() * 1.2;
    const vy = -(8.3 + Math.random() * 1.9);

    this.rockets.push({
      x,
      y,
      vx,
      vy,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      exploded: false
    });
  }

  explode(rocket) {
    const particleCount = 34 + Math.floor(Math.random() * 22);
    for (let i = 0; i < particleCount; i += 1) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const speed = 1.4 + Math.random() * 4.1;
      this.particles.push({
        x: rocket.x,
        y: rocket.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.011 + Math.random() * 0.015,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        radius: 1.3 + Math.random() * 2.1
      });
    }
  }

  updateRockets(dt) {
    const gravity = 0.055;
    for (let i = this.rockets.length - 1; i >= 0; i -= 1) {
      const rocket = this.rockets[i];
      rocket.vy += gravity * dt;
      rocket.x += rocket.vx * dt;
      rocket.y += rocket.vy * dt;

      const shouldExplode = rocket.vy > -0.65 || rocket.y < this.canvas.height * (0.25 + Math.random() * 0.2);
      if (shouldExplode && !rocket.exploded) {
        rocket.exploded = true;
        this.explode(rocket);
        this.rockets.splice(i, 1);
      }
    }
  }

  updateParticles(dt) {
    const gravity = 0.045;
    const friction = 0.988;
    for (let i = this.particles.length - 1; i >= 0; i -= 1) {
      const particle = this.particles[i];
      particle.vx *= friction;
      particle.vy *= friction;
      particle.vy += gravity * dt;
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.life -= particle.decay * dt;

      if (particle.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.rockets.length; i += 1) {
      const rocket = this.rockets[i];
      this.ctx.beginPath();
      this.ctx.fillStyle = rocket.color;
      this.ctx.arc(rocket.x, rocket.y, 2.2, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < this.particles.length; i += 1) {
      const particle = this.particles[i];
      this.ctx.beginPath();
      this.ctx.fillStyle = `${particle.color}${Math.round(Math.max(0, particle.life) * 255).toString(16).padStart(2, "0")}`;
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.globalCompositeOperation = "source-over";
  }

  tick(now) {
    if (!this.isRunning) {
      return;
    }
    const elapsed = now - this.startTime;
    const delta = Math.min(1.8, (now - this.lastFrame) / 16.6667);
    this.lastFrame = now;

    if (elapsed < this.launchDurationMs) {
      this.launchTimer += now - (this.lastLaunchTime || now);
      this.lastLaunchTime = now;
      if (this.launchTimer > 180) {
        this.launchRocket(Math.random() > 0.5);
        if (Math.random() > 0.55) {
          this.launchRocket(Math.random() > 0.5);
        }
        this.launchTimer = 0;
      }
    }

    this.updateRockets(delta);
    this.updateParticles(delta);
    this.draw();

    const finishedLaunching = elapsed >= this.launchDurationMs;
    const done = finishedLaunching && this.rockets.length === 0 && this.particles.length === 0;
    if (done || elapsed > this.launchDurationMs + 8000) {
      window.setTimeout(() => this.stop(), this.finishTimeout);
      return;
    }

    this.rafId = requestAnimationFrame(this.tick.bind(this));
  }
}

function formatRemainingTime(milliseconds) {
  const totalMinutes = Math.floor(milliseconds / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  const dictionary = translations[currentLang] || translations.en;
  return `${days} ${dictionary.timeDays} ${hours} ${dictionary.timeHours} ${minutes} ${dictionary.timeMins}`;
}

function startCountdown() {
  if (!countdownElement) {
    return;
  }

  const eventTimestamp = new Date(EVENT_INFO.eventDateTime).getTime();
  if (Number.isNaN(eventTimestamp)) {
    countdownElement.textContent = "Event date unavailable";
    return;
  }

  const timer = setInterval(() => {
    const now = Date.now();
    const difference = eventTimestamp - now;

    if (difference <= 0) {
      const dictionary = translations[currentLang] || translations.en;
      countdownElement.textContent = dictionary.ceremonyStarted;
      clearInterval(timer);
      return;
    }

    countdownElement.textContent = formatRemainingTime(difference);
  }, 1000);
}

function applyTranslations() {
  const dictionary = translations[currentLang] || translations.en;
  const translatableElements = document.querySelectorAll("[data-i18n-key]");

  translatableElements.forEach((element) => {
    const key = element.getAttribute("data-i18n-key");
    if (!key || !(key in dictionary)) {
      return;
    }
    element.textContent = dictionary[key];
  });
}

function toggleLanguage() {
  currentLang = currentLang === "en" ? "gu" : "en";
  applyTranslations();
}

function initActiveNav() {
  const links = Array.from(document.querySelectorAll(".nav-links a"));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const currentId = `#${entry.target.id}`;
        links.forEach((link) => {
          const isActive = link.getAttribute("href") === currentId;
          link.classList.toggle("active", isActive);
          if (isActive) {
            link.setAttribute("aria-current", "page");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0.01
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function initPremiumOpening() {
  const reducedMotion = PREFERS_REDUCED_MOTION.matches;

  if (reducedMotion) {
    document.body.classList.add("is-ready");
    if (pageLoader) {
      pageLoader.classList.add("hidden");
    }
    return;
  }

  window.setTimeout(() => {
    if (pageLoader) {
      pageLoader.classList.add("hidden");
    }
    document.body.classList.add("is-ready");
  }, 1300);
}

function initRevealAnimations() {
  const revealElements = Array.from(document.querySelectorAll(".reveal, .reveal-stagger"));
  if (!revealElements.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries, io) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("revealed");
        io.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealElements.forEach((element, index) => {
    if (element.classList.contains("reveal-stagger")) {
      element.style.transitionDelay = `${(index % 6) * 70}ms`;
    }
    observer.observe(element);
  });
}

function initCursorGlow() {
  const reducedMotion = PREFERS_REDUCED_MOTION.matches;
  if (reducedMotion) {
    return;
  }

  document.addEventListener("pointermove", (event) => {
    const x = Math.round((event.clientX / window.innerWidth) * 100);
    const y = Math.round((event.clientY / window.innerHeight) * 100);
    document.body.style.background = `
      radial-gradient(circle at ${x}% ${y}%, rgba(255, 226, 232, 0.42), transparent 28%),
      radial-gradient(circle at 10% 20%, var(--bg-saffron), transparent 30%),
      radial-gradient(circle at 90% 10%, #ffe2e8, transparent 28%),
      linear-gradient(145deg, var(--bg-light), var(--bg-ivory))
    `;
  });
}

function initParallaxBackground() {
  const reducedMotion = PREFERS_REDUCED_MOTION.matches;
  if (reducedMotion || !parallaxLayers.length) {
    return;
  }

  const onScroll = () => {
    const offset = window.scrollY;
    parallaxLayers.forEach((layer, index) => {
      const speed = index === 0 ? 0.08 : -0.06;
      layer.style.transform = `translateY(${offset * speed}px)`;
    });
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initFallingPetals() {
  const reducedMotion = PREFERS_REDUCED_MOTION.matches;
  if (reducedMotion || !petalContainer) {
    return;
  }

  const petalCount = 18;
  const petalColors = ["#f6b9ba", "#f09aa8", "#f2c35f", "#ffdb8a"];

  for (let i = 0; i < petalCount; i += 1) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${9 + Math.random() * 8}s`;
    petal.style.animationDelay = `${Math.random() * 7}s`;
    petal.style.opacity = `${0.5 + Math.random() * 0.45}`;
    petal.style.background = petalColors[Math.floor(Math.random() * petalColors.length)];
    petal.style.filter = "drop-shadow(0 2px 2px rgba(122, 31, 47, 0.18))";
    petalContainer.appendChild(petal);
  }
}

function initOpeningFireworks() {
  if (PREFERS_REDUCED_MOTION.matches || !fireworksCanvas) {
    return;
  }

  const show = new FireworksShow(fireworksCanvas);
  show.start();
}

function initLanguageToggle() {
  if (!langToggleButton) {
    return;
  }
  langToggleButton.addEventListener("click", toggleLanguage);
  applyTranslations();
}

initPremiumOpening();
initOpeningFireworks();
startCountdown();
initLanguageToggle();
initActiveNav();
initRevealAnimations();
initCursorGlow();
initParallaxBackground();
initFallingPetals();
