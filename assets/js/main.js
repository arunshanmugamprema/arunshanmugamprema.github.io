/**
 * Arun S. Prema — Executive Portfolio Core JS
 * Lightweight, zero-dependency ES6 module for navigation, interactions, and metrics
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initMobileNav();
  initScrollSpy();
  initFadeInObserver();
});

// ─── 1. Scroll Progress Bar ───
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

// ─── 2. Mobile Navigation Drawer ───
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.innerHTML = isOpen ? '✕' : '☰';
  });

  // Close drawer on link click
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = '☰';
    });
  });
}

// ─── 3. ScrollSpy for Navigation ───
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], div[id="top"]');
  const navLinks = document.querySelectorAll('.header-nav a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.25, rootMargin: '-70px 0px -40% 0px' });

  sections.forEach(section => observer.observe(section));
}

// ─── 4. Fade-in on Scroll ───
function initFadeInObserver() {
  const fadeElements = document.querySelectorAll('.fade-in');
  if (!fadeElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  fadeElements.forEach(el => observer.observe(el));
}

// ─── 5. Inline Accordion Toggle ───
window.toggleDetail = function(btn) {
  const isOpen = btn.classList.toggle('open');
  const drawer = btn.nextElementSibling;
  if (!drawer) return;

  drawer.classList.toggle('show');
  btn.setAttribute('aria-expanded', isOpen);

  const arrow = btn.querySelector('.arrow-icon');
  if (arrow) {
    arrow.style.transform = isOpen ? 'rotate(90deg)' : 'rotate(0)';
  }

  const labelSpan = btn.querySelector('.toggle-label') || btn.childNodes[1];
  if (labelSpan) {
    labelSpan.textContent = isOpen ? ' Hide summary' : ' See the detail';
  }
};

// ─── 6. Copy to Clipboard Helper ───
window.copyToClipboard = function(text, event) {
  if (event) event.preventDefault();
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied "${text}" to clipboard`);
  }).catch(() => {
    showToast(`Contact: ${text}`);
  });
};

// ─── 7. Toast Notification ───
function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// ─── 8. Case Study View Switcher (Cards vs. List) ───
window.setWorkView = function(view) {
  const cardsGrid = document.querySelector('.case-studies-grid');
  const listView = document.querySelector('.case-studies-list');
  const btnCards = document.getElementById('btn-view-cards');
  const btnList = document.getElementById('btn-view-list');

  if (view === 'list') {
    if (cardsGrid) cardsGrid.style.display = 'none';
    if (listView) listView.style.display = 'flex';
    if (btnCards) {
      btnCards.classList.remove('active');
      btnCards.setAttribute('aria-selected', 'false');
    }
    if (btnList) {
      btnList.classList.add('active');
      btnList.setAttribute('aria-selected', 'true');
    }
  } else {
    if (cardsGrid) cardsGrid.style.display = 'grid';
    if (listView) listView.style.display = 'none';
    if (btnCards) {
      btnCards.classList.add('active');
      btnCards.setAttribute('aria-selected', 'true');
    }
    if (btnList) {
      btnList.classList.remove('active');
      btnList.setAttribute('aria-selected', 'false');
    }
  }
};

