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

// COMPANY CARDS - Render brands from JSON data
function renderBrands() {
  const brandsData = JSON.parse(document.getElementById('brands-data').textContent);
  const grid = document.getElementById('companiesGrid');
  
  if (!grid || brandsData.length === 0) return;

  grid.innerHTML = brandsData.map(brand => `
    <article class="company-card" tabindex="0" role="button">
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
        <button class="company-card__button">Ver Catálogo</button>
      </div>
    </article>
  `).join('');

  // Add event listeners to new cards
  document.querySelectorAll('.company-card').forEach((card, index) => {
    card.addEventListener('click', () => openCompanyModal(brandsData[index]));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCompanyModal(brandsData[index]);
      }
    });
  });
}

function openCompanyModal(brand) {
  const modal = document.getElementById('companyModal');
  const banner = document.getElementById('companyModalBanner');
  const title = document.getElementById('companyModalTitle');
  const description = document.getElementById('companyModalDescription');
  const link = document.getElementById('companyModalLink');
  
  title.textContent = brand.name;
  description.textContent = brand.description;
  link.href = brand.link;
  link.textContent = `Ver Catálogo ${brand.name}`;
  
  if (brand.image) {
    banner.classList.add('has-image');
    banner.style.backgroundImage = `url(${brand.image})`;
  } else {
    banner.classList.remove('has-image');
  }
  
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeCompanyModal() {
  const modal = document.getElementById('companyModal');
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

// Modal close events
document.addEventListener('click', (e) => {
  if (e.target.dataset.closeModal || e.target.closest('.company-modal__close')) {
    closeCompanyModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCompanyModal();
  }
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
}

function cookieSettings() {
  alert('Configurações avançadas em desenvolvimento.');
}

document.addEventListener('DOMContentLoaded', () => {
  initCookies();
  renderBrands();
});

