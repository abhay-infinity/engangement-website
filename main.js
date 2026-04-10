const EVENT_INFO = {
  couple: "Jaydeep and Dinal",
  eventDateTime: "April 29, 2026 10:00:00",
  venue: "Gurukul Banquet Hall, Dhebar Road, opposite Jimmy Tower, Rajkot, Gujarat - 360002"
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
    loader: "Preparing a Shubh Beginning...",
    timeDays: "Days", timeHours: "Hours", timeMins: "Minutes left",
    ceremonyStarted: "Ceremony started - welcome to the celebration!",
    btnText: "ગુજરાતી",
    langToggleAria: "Open this invitation in Gujarati",
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
    btnText: "English",
    langToggleAria: "આ આમંત્રણ અંગ્રેજીમાં ખોલો",
    mapFallback: "જો નકશો ન ખૂલે, તો આ સીધી લિંકનો ઉપયોગ કરો:",
    openMaps: "Google Maps ખોલો",
    openMapsBtn: "Google Maps માં ખોલો"
  }
};

function isGujaratiPath() {
  try {
    const segments = (window.location.pathname || "")
      .toLowerCase()
      .split("/")
      .filter(Boolean);
    return segments.includes("gujarati");
  } catch {
    return false;
  }
}

let currentLang = isGujaratiPath() ? "gu" : "en";

const countdownElement = document.getElementById("countdown");
const pageLoader = document.getElementById("page-loader");
const parallaxLayers = Array.from(document.querySelectorAll(".parallax-layer"));
const petalContainer = document.getElementById("petal-container");
const fireworksCanvas = document.getElementById("fireworks-canvas");
const langToggleButton = document.getElementById("lang-toggle");
const musicToggleButton = document.getElementById("music-toggle");
const bgMusic = document.getElementById("bg-music");
const cornerLottieTopLeft = document.getElementById("corner-lottie-tl");
const cornerLottieBottomRight = document.getElementById("corner-lottie-br");

const PREFERS_REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)");
const OPENING_TIMELINE = {
  introEndMs: 1400,
  highlightStartMs: 1400,
  interlockEndMs: 2800,
  loaderExitStartMs: 2800,
  totalMs: 3400
};

class FireworksShow {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext("2d") : null;
    this.rockets = [];
    this.particles = [];
    this.launchTimer = 0;
    this.startTime = 0;
    this.lastFrame = 0;
    this.rafId = null;
    this.isRunning = false;
    this.launchDurationMs = options.launchDurationMs ?? 3000;
    this.launchIntervalMs = options.launchIntervalMs ?? 220;
    this.doubleLaunchChance = options.doubleLaunchChance ?? 0.35;
    this.finishTimeout = 900;
    this.colors = ["#caa27a", "#e2c9ad", "#7a1f2f", "#a64555"];
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
    const isMobile = window.matchMedia("(max-width: 700px)").matches;
    const xBase = isMobile
      ? (fromLeft ? this.canvas.width * 0.16 : this.canvas.width * 0.84)
      : (fromLeft ? this.canvas.width * 0.12 : this.canvas.width * 0.88);
    const xSpread = isMobile
      ? (fromLeft ? this.canvas.width * 0.05 : -this.canvas.width * 0.05)
      : (fromLeft ? this.canvas.width * 0.08 : -this.canvas.width * 0.08);
    const x = xBase + Math.random() * xSpread;
    const y = this.canvas.height + 8;
    const vx = isMobile
      ? (fromLeft ? 0.18 + Math.random() * 0.38 : -0.18 - Math.random() * 0.38)
      : (fromLeft ? 0.9 + Math.random() * 1.2 : -0.9 - Math.random() * 1.2);
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
      if (this.launchTimer > this.launchIntervalMs) {
        const isMobile = window.matchMedia("(max-width: 700px)").matches;

        if (isMobile) {
          // Keep one firework stream on each side in mobile view.
          this.launchRocket(true);
          this.launchRocket(false);
        } else {
          this.launchRocket(Math.random() > 0.5);
          if (Math.random() < this.doubleLaunchChance) {
            this.launchRocket(Math.random() > 0.5);
          }
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

  document.documentElement.lang = currentLang === "gu" ? "gu" : "en";

  if (langToggleButton && dictionary.langToggleAria) {
    langToggleButton.setAttribute("aria-label", dictionary.langToggleAria);
  }
}

function navigateToAlternateLanguage() {
  const targetUrl = isGujaratiPath()
    ? new URL("../", window.location.href).href
    : new URL("gujarati/", window.location.href).href;
  window.location.assign(targetUrl);
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
    return 0;
  }

  if (pageLoader) {
    pageLoader.classList.add("phase-intro");
  }

  window.setTimeout(() => {
    if (pageLoader) {
      pageLoader.classList.remove("phase-intro");
      pageLoader.classList.add("phase-highlight");
    }
  }, OPENING_TIMELINE.highlightStartMs);

  window.setTimeout(() => {
    if (pageLoader) {
      pageLoader.classList.add("exit");
    }
  }, OPENING_TIMELINE.loaderExitStartMs);

  window.setTimeout(() => {
    if (pageLoader) {
      pageLoader.classList.add("hidden");
    }
    document.body.classList.add("is-ready");
  }, OPENING_TIMELINE.totalMs);

  return OPENING_TIMELINE.totalMs;
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
      radial-gradient(circle at ${x}% ${y}%, rgba(0, 0, 0, 0.035), transparent 26%),
      linear-gradient(145deg, #ffffff, #f7f6f8)
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

function initCornerLotties() {
  if (typeof window.lottie === "undefined") {
    return;
  }

  const targets = [cornerLottieTopLeft, cornerLottieBottomRight].filter(Boolean);
  if (!targets.length) {
    return;
  }

  const autoplay = !PREFERS_REDUCED_MOTION.matches;
  targets.forEach((container) => {
    const animationData = window.CORNER_LOTTIE_DATA;
    const animation = window.lottie.loadAnimation({
      container,
      renderer: "svg",
      loop: true,
      autoplay,
      ...(animationData ? { animationData } : { path: "top-left.json" }),
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet"
      }
    });

    animation.setSpeed(0.65);
  });
}

function initFallingPetals() {
  const reducedMotion = PREFERS_REDUCED_MOTION.matches;
  if (reducedMotion || !petalContainer) {
    return;
  }

  const petalCount = 18;
  const petalColors = ["#efd8df", "#e4ccd6", "#e2c9ad", "#caa27a"];

  for (let i = 0; i < petalCount; i += 1) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${9 + Math.random() * 8}s`;
    petal.style.animationDelay = `${Math.random() * 7}s`;
    petal.style.opacity = `${0.5 + Math.random() * 0.45}`;
    petal.style.background = petalColors[Math.floor(Math.random() * petalColors.length)];
    petal.style.filter = "drop-shadow(0 2px 2px rgba(122, 31, 47, 0.16))";
    petalContainer.appendChild(petal);
  }
}

function initOpeningFireworks(options = {}) {
  const {
    startDelayMs = 0,
    launchDurationMs = 3000,
    launchIntervalMs = 220,
    doubleLaunchChance = 0.35
  } = options;

  window.setTimeout(() => {
    if (PREFERS_REDUCED_MOTION.matches || !fireworksCanvas) {
      return;
    }

    const show = new FireworksShow(fireworksCanvas, {
      launchDurationMs,
      launchIntervalMs,
      doubleLaunchChance
    });
    show.start();
  }, startDelayMs);
}

function initLanguageToggle() {
  if (!langToggleButton) {
    return;
  }
  langToggleButton.addEventListener("click", navigateToAlternateLanguage);
  applyTranslations();
}

const BG_MUSIC_VOLUME = 0.22;

function initBackgroundMusic() {
  if (!bgMusic) {
    return;
  }

  bgMusic.volume = BG_MUSIC_VOLUME;
  bgMusic.loop = true;

  const tryPlay = () => {
    const result = bgMusic.play();
    if (result && typeof result.catch === "function") {
      result.catch(() => {});
    }
  };

  tryPlay();

  const resumeIfPaused = () => {
    if (bgMusic.paused && !bgMusic.muted) {
      tryPlay();
    }
  };
  document.addEventListener("click", resumeIfPaused, { passive: true });
  document.addEventListener("touchstart", resumeIfPaused, { passive: true });
  document.addEventListener("keydown", resumeIfPaused);

  if (!musicToggleButton) {
    return;
  }

  musicToggleButton.addEventListener("click", (event) => {
    event.stopPropagation();
    bgMusic.muted = !bgMusic.muted;
    const muted = bgMusic.muted;
    musicToggleButton.setAttribute("aria-pressed", muted ? "true" : "false");
    musicToggleButton.setAttribute(
      "aria-label",
      muted ? "Unmute background music" : "Mute background music"
    );
    musicToggleButton.classList.toggle("is-muted", muted);
    if (!muted) {
      tryPlay();
    }
  });
}

const openingDurationMs = initPremiumOpening();
initOpeningFireworks({
  startDelayMs: openingDurationMs + 120,
  launchDurationMs: 2500,
  launchIntervalMs: 260,
  doubleLaunchChance: 0.22
});
startCountdown();
initLanguageToggle();
initActiveNav();
initRevealAnimations();
initCursorGlow();
initParallaxBackground();
initCornerLotties();
initFallingPetals();
initBackgroundMusic();
