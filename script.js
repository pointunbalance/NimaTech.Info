document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');

  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', () => {
      const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
      mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenuToggle.setAttribute('aria-label', isExpanded ? 'فتح القائمة' : 'إغلاق القائمة');
      nav.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.setAttribute('aria-label', 'فتح القائمة');
        nav.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.setAttribute('aria-label', 'فتح القائمة');
        nav.classList.remove('active');
      }
    });
  }

  // Scroll Reveal
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  // Add reveal class to elements
  const revealElements = document.querySelectorAll('.card, .milestone, .pricing-card, .panel__header, .contact-card, .panel__cta');
  revealElements.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
  });

  // Smooth scroll for nav links
  document.querySelectorAll('.nav a, .button, .card__link, .pill').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Add ripple effect to buttons
  document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add keyframe for ripple
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to { transform: scale(4); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // Parallax effect on scroll
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
      const heroContent = hero.querySelector('.hero__content');
      const heroCard = hero.querySelector('.hero__card');
      
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
      if (heroCard) {
        heroCard.style.transform = `translateY(${scrolled * 0.15}px)`;
      }
    }
  });

  // Add typing effect to hero title
  const heroTitle = document.querySelector('.hero__content h1');
  if (heroTitle) {
    heroTitle.style.borderRight = '3px solid var(--brand)';
    heroTitle.style.animation = 'blink 1s step-end infinite';
    setTimeout(() => {
      heroTitle.style.borderRight = 'none';
      heroTitle.style.animation = 'none';
    }, 3000);
  }
});