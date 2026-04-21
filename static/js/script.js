const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Mobile menu toggle
menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('a[href^=\"#\"]').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (window.scrollY > 16) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
});

// Smooth fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all animate-fade elements
document.querySelectorAll('.brand-card, .section, .premios-card, .region-card, .contact-card').forEach(el => {
  el.classList.add('animate-fade');
  observer.observe(el);
});

// Cookie consent logic
function initCookies() {
  if (localStorage.getItem('cookiesAccepted')) {
    document.getElementById('cookieBanner')?.classList.remove('show');
    return;
  }
  setTimeout(() => {
    document.getElementById('cookieBanner')?.classList.add('show');
  }, 2000);
}

function acceptCookies() {
  localStorage.setItem('cookiesAccepted', 'true');
  document.getElementById('cookieBanner')?.classList.remove('show');
}

function rejectCookies() {
  localStorage.setItem('cookiesAccepted', 'false');
  document.getElementById('cookieBanner')?.classList.remove('show');
  // Optional: disable non-essential features
}

function cookieSettings() {
  alert('Configurações avançadas de cookies em desenvolvimento. Por enquanto, aceite ou recuse.');
  // Future: modal with toggles
}

document.addEventListener('DOMContentLoaded', initCookies);

// WhatsApp already has onclick, but add analytics if needed

