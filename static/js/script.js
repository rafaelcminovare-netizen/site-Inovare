const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Mobile menu toggle
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
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
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all animate-fade elements
document.querySelectorAll('.brand-card, .section, .premios-card, .region-card, .contact-card').forEach((el) => {
  el.classList.add('animate-fade');
  observer.observe(el);
});

// COMPANY CARDS - Render brands from JSON data
function renderBrands() {
  const brandsDataEl = document.getElementById('brands-data');
  const grid = document.getElementById('companiesGrid');

  if (!brandsDataEl || !grid) return;

  let brandsData = [];
  try {
    brandsData = JSON.parse(brandsDataEl.textContent || '[]');
  } catch (error) {
    console.error('Erro ao ler dados das marcas:', error);
    return;
  }

  if (!Array.isArray(brandsData) || brandsData.length === 0) return;

  grid.innerHTML = brandsData.map((brand) => `
    <a class="company-card" href="${brand.link}" target="_blank" rel="noopener noreferrer" aria-label="Abrir catálogo da marca ${brand.name}">
      <div class="company-card__media">
        ${brand.image ? `<img src="${brand.image}" alt="${brand.name} logo" class="company-card__image">` : `
          <div class="company-card__placeholder">
            <div class="company-card__placeholder-inner">
              <div class="company-card__placeholder-icon">🏢</div>
              <span class="company-card__placeholder-text">${brand.name}</span>
            </div>
          </div>
        `}
        <div class="company-card__badge">Representada</div>
      </div>
      <div class="company-card__content">
        <h3 class="company-card__title">${brand.name}</h3>
        <p class="company-card__description">${brand.description}</p>
        <span class="company-card__button">Ver Catálogo ↗</span>
      </div>
    </a>
  `).join('');
}

// Cookie consent logic
function initCookies() {
  const cookiesAccepted = localStorage.getItem('cookiesAccepted');

  if (cookiesAccepted === 'true') {
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
}

function cookieSettings() {
  alert('Configurações avançadas em desenvolvimento.');
}

document.addEventListener('DOMContentLoaded', () => {
  initCookies();
  renderBrands();
});
