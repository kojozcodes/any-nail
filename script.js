document.addEventListener('DOMContentLoaded', () => {

  // ── Hero Swiper ──────────────────────────────────────────────
  if (document.querySelector('.hero.swiper')) {
    new Swiper('.hero.swiper', {
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.hero .swiper-pagination', clickable: true },
    });
  }

  // ── Mega menus ───────────────────────────────────────────────
  document.querySelectorAll('[data-mega]').forEach(trigger => {
    const mega = document.getElementById('mega-' + trigger.dataset.mega);
    if (!mega) return;
    let timeout;
    const open  = () => { clearTimeout(timeout); mega.classList.add('is-open'); trigger.classList.add('is-open'); };
    const close = () => { timeout = setTimeout(() => { mega.classList.remove('is-open'); trigger.classList.remove('is-open'); }, 100); };
    trigger.addEventListener('mouseenter', open);
    trigger.addEventListener('mouseleave', close);
    mega.addEventListener('mouseenter', open);
    mega.addEventListener('mouseleave', close);
  });

  // ── Hamburger menu ───────────────────────────────────────────
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.site-header__nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.classList.toggle('is-open', isOpen);
    });
  }

  // ── Mobile Category sub-menu ────────────────────────────────
  document.querySelectorAll('.nav-item--mega .nav-item__link').forEach(link => {
    link.addEventListener('click', e => {
      if (window.innerWidth < 768) {
        e.preventDefault();
        link.closest('.nav-item--mega').classList.toggle('is-open');
      }
    });
  });

  // ── Parallax – ranking images ────────────────────────────────
  const parallaxItems = document.querySelectorAll('.ranking-item__image-inner');
  if (parallaxItems.length) {
    const updateParallax = () => {
      parallaxItems.forEach(inner => {
        const rect   = inner.closest('.ranking-item__image').getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const ratio  = (center - window.innerHeight / 2) / window.innerHeight;
        inner.style.transform = `translateY(${ratio * 40}px)`;
      });
    };
    window.addEventListener('scroll', updateParallax, { passive: true });
    updateParallax();
  }

});
