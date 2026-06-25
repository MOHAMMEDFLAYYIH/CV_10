(function() {
  'use strict';

  /* ===== STATE ===== */
  let currentSlide = 0;
  let slideInterval = null;
  let isLight = false;

  /* ===== DOM REFS ===== */
  const html = document.documentElement;
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const darkToggle = document.getElementById('darkToggle');
  const phoneScreen = document.getElementById('phoneScreen');
  const phoneMockup = document.getElementById('phoneMockup');
  const phoneDots = document.querySelectorAll('.phone-dot');
  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.nav-item');
  const footerYear = document.getElementById('footerYear');

  /* ===== FOOTER YEAR ===== */
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  /* ===== TEXT SPLITTING ===== */
  function splitTextToLetters(selector, letterClass = 'split-letter') {
    document.querySelectorAll(selector).forEach(el => {
      const text = el.textContent;
      const letters = text.split('').map((char, i) => {
        if (char === ' ') {
          return `<span class="${letterClass} space" style="--i: ${i}">&nbsp;</span>`;
        }
        return `<span class="${letterClass}" style="--i: ${i}">${char}</span>`;
      }).join('');
      el.innerHTML = letters;
    });
  }

  /* ===== LIGHT MODE ===== */
  function setLight(light) {
    isLight = light;
    html.classList.toggle('light-mode', light);
    localStorage.setItem('lightMode', light ? 'true' : 'false');
  }

  function toggleLight() {
    setLight(!isLight);
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const storedLight = localStorage.getItem('lightMode');

  if (storedLight !== null) {
    setLight(storedLight === 'true');
  } else {
    setLight(!prefersDark.matches);
  }

  prefersDark.addEventListener('change', e => {
    if (localStorage.getItem('lightMode') === null) {
      setLight(!e.matches);
    }
  });

  /* ===== CURSOR FOLLOWER ===== */
  /* ===== PHONE MOCKUP ===== */
  function showSlide(index) {
    const slides = phoneScreen.querySelectorAll('.app-screen');
    const prev = slides[currentSlide];
    const next = slides[index];
    if (prev === next) return;

    if (prev) prev.classList.add('exit');
    setTimeout(() => {
      if (prev) prev.classList.remove('exit', 'active');
      next.classList.add('active');
      phoneDots.forEach((d, i) => d.classList.toggle('active', i === index));
      currentSlide = index;
    }, 300);
  }

  function nextSlide() {
    const slides = phoneScreen.querySelectorAll('.app-screen');
    showSlide((currentSlide + 1) % slides.length);
  }

  function startSlideshow() {
    stopSlideshow();
    slideInterval = setInterval(nextSlide, 4000);
  }

  function stopSlideshow() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  phoneDots.forEach(dot => {
    dot.addEventListener('click', () => {
      showSlide(parseInt(dot.dataset.index));
      startSlideshow();
    });
  });

  phoneMockup.addEventListener('mouseenter', stopSlideshow);
  phoneMockup.addEventListener('mouseleave', startSlideshow);
  phoneMockup.addEventListener('focusin', stopSlideshow);
  phoneMockup.addEventListener('focusout', startSlideshow);

  /* ===== SWIPE NAVIGATION ===== */
  let touchStartX = 0;
  let touchStartY = 0;

  phoneMockup.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    stopSlideshow();
  }, { passive: true });

  phoneMockup.addEventListener('touchend', (e) => {
    const deltaX = e.changedTouches[0].screenX - touchStartX;
    const deltaY = e.changedTouches[0].screenY - touchStartY;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) nextSlide();
      else {
        const slides = phoneScreen.querySelectorAll('.app-screen');
        showSlide((currentSlide - 1 + slides.length) % slides.length);
      }
    }
    startSlideshow();
  }, { passive: true });

  /* ===== KEYBOARD NAVIGATION ===== */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      const slides = phoneScreen.querySelectorAll('.app-screen');
      showSlide((currentSlide - 1 + slides.length) % slides.length);
      startSlideshow();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      startSlideshow();
    }
  });

  /* ===== ANIMATED COUNTERS ===== */
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    const hero = document.getElementById('hero');
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 0) return;
    countersAnimated = true;

    document.querySelectorAll('.stat-number').forEach(el => {
      const text = el.textContent.trim();
      const hasPlus = text.endsWith('+');
      const target = parseInt(text);
      if (isNaN(target)) return;

      let current = 0;
      const duration = 1200;
      const startTime = performance.now();

      function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        current = Math.round(eased * target);
        el.textContent = current + (hasPlus ? '+' : '');
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    });
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const heroSection = document.getElementById('hero');
  if (heroSection) counterObserver.observe(heroSection);

  /* ===== SKILL BARS ===== */
  let skillBarsAnimated = false;

  function animateSkillBars() {
    if (skillBarsAnimated) return;
    skillBarsAnimated = true;
    document.querySelectorAll('.skill-badge').forEach(badge => {
      const level = parseInt(badge.dataset.level);
      const bar = badge.querySelector('.skill-level-bar');
      if (bar && level) {
        bar.style.width = level + '%';
      }
    });
  }

  /* ===== STATS BANNER COUNTERS ===== */
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) skillObserver.observe(skillsSection);

  /* ===== SCROLL ANIMATIONS ===== */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(s => observer.observe(s));

  /* ===== ACTIVE NAV ===== */
  function updateActiveNav() {
    let current = '';
    sections.forEach(s => {
      const top = s.getBoundingClientRect().top;
      if (top <= 150) current = s.id;
    });
    navItems.forEach(item => {
      item.classList.toggle('active', item.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ===== SCROLL PROGRESS ===== */
  const scrollProgress = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  /* ===== BACK TO TOP ===== */
  const backToTop = document.getElementById('backToTop');

  function toggleBackToTop() {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }

  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ===== PARALLAX ORBS ===== */
  const orbs = document.querySelectorAll('.bg-orb');
  let orbPositions = [];

  orbs.forEach(orb => {
    const speed = parseFloat(orb.dataset.speed) || 0.3;
    orbPositions.push({
      el: orb,
      speed: speed,
      baseY: 0,
      baseX: 0
    });
  });

  function updateParallax() {
    const scrollY = window.scrollY;
    orbs.forEach((orb, i) => {
      if (orbPositions[i]) {
        const speed = orbPositions[i].speed;
        orb.style.transform = `translateY(${scrollY * speed * 0.1}px)`;
      }
    });
  }

  window.addEventListener('scroll', updateParallax, { passive: true });

  /* ===== SIDEBAR COLLAPSE ===== */
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
    });
  }

  /* ===== EVENTS ===== */
  darkToggle.addEventListener('click', toggleLight);

  /* ===== INIT ===== */
  document.body.style.overflow = 'hidden';
  splitTextToLetters('.hero-name', 'hero-letter');
  splitTextToLetters('.section-title', 'hero-letter');
  showSlide(1);
  startSlideshow();
  document.getElementById('hero').classList.add('visible');

  /* ===== PRELOADER HIDE ===== */
  window.addEventListener('load', function() {
    setTimeout(function() {
      document.getElementById('preloader').classList.add('hidden');
      document.body.style.overflow = '';
    }, 400);
  });

})();
