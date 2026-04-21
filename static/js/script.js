const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

function observeAnimatedElements() {
  document.querySelectorAll('.brand-card, .section, .premios-card, .region-card, .contact-card, .company-card').forEach((el) => {
    if (!el.classList.contains('animate-fade')) {
      el.classList.add('animate-fade');
    }
    revealObserver.observe(el);
  });
}

// Mobile menu toggle
menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

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

function truncateText(text, limit = 130) {
  if (!text) return '';
  return text.length > limit ? `${text.slice(0, limit).trim()}...` : text;
}

function getBrandsData() {
  const brandsDataElement = document.getElementById('brands-data');
  if (!brandsDataElement) return [];

  try {
    const parsedData = JSON.parse(brandsDataElement.textContent || '[]');
    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error('Erro ao ler os dados das marcas:', error);
    return [];
  }
}

function createPlaceholderMarkup() {
  return `
    <div class="company-card__placeholder" aria-hidden="true">
      <div class="company-card__placeholder-inner">
        <div class="company-card__placeholder-icon">⌂</div>
        <div class="company-card__placeholder-text">Imagem da empresa</div>
      </div>
    </div>
  `;
}

function attachCardImageFallback(article, brand) {
  const cardImage = article.querySelector('.company-card__image');
  if (!cardImage) return;

  cardImage.addEventListener('error', () => {
    const media = article.querySelector('.company-card__media');
    if (!media) return;

    cardImage.remove();
    if (!media.querySelector('.company-card__placeholder')) {
      media.insertAdjacentHTML('beforeend', createPlaceholderMarkup());
    }
  }, { once: true });
}

function createCompanyCard(brand, index) {
  const article = document.createElement('article');
  article.className = 'company-card';
  article.setAttribute('tabindex', '0');
  article.setAttribute('role', 'button');
  article.setAttribute('aria-label', `Abrir detalhes de ${brand.name}`);
  article.dataset.index = String(index);

  const badgeLabel = `Empresa ${index + 1}`;
  const previewText = truncateText(brand.description, 145);

  article.innerHTML = `
    <div class="company-card__media">
      <span class="company-card__badge">${badgeLabel}</span>
      ${
        brand.image
          ? `<img class="company-card__image" src="${brand.image}" alt="${brand.name}" loading="lazy">`
          : createPlaceholderMarkup()
      }
    </div>
    <div class="company-card__content">
      <h3 class="company-card__title">${brand.name}</h3>
      <p class="company-card__description">${previewText}</p>
      <span class="company-card__button">Abrir Catálogo <span aria-hidden="true">→</span></span>
    </div>
  `;

  attachCardImageFallback(article, brand);

  return article;
}

function initCompaniesSection() {
  const companiesGrid = document.getElementById('companiesGrid');
  const modal = document.getElementById('companyModal');
  const modalTitle = document.getElementById('companyModalTitle');
  const modalDescription = document.getElementById('companyModalDescription');
  const modalLink = document.getElementById('companyModalLink');
  const modalBanner = document.getElementById('companyModalBanner');
  const modalClose = document.getElementById('companyModalClose');

  if (!companiesGrid || !modal || !modalTitle || !modalDescription || !modalLink || !modalBanner || !modalClose) {
    return;
  }

  const brands = getBrandsData();
  if (!brands.length) {
    companiesGrid.innerHTML = '<p class="company-card__description">Nenhuma empresa disponível no momento.</p>';
    return;
  }

  companiesGrid.innerHTML = '';
  let activeIndex = -1;

  function fillModal(brand) {
    modalTitle.textContent = brand.name;
    modalDescription.textContent = brand.description;
    modalLink.href = brand.link;

    if (brand.image) {
      modalBanner.classList.add('has-image');
      modalBanner.style.background = `linear-gradient(to top, rgba(0,0,0,0.7), transparent), url('${brand.image}') center/cover`;
    } else {
      modalBanner.classList.remove('has-image');
      modalBanner.style.background = '';
    }
  }

  function openModal(index) {
    const brand = brands[index];
    if (!brand) return;

    activeIndex = index;
    fillModal(brand);
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeIndex = -1;
  }

  brands.forEach((brand, index) => {
    const card = createCompanyCard(brand, index);

    card.addEventListener('click', () => openModal(index));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(index);
      }
    });

    companiesGrid.appendChild(card);
  });

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.dataset.closeModal === 'true') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }

    if (!modal.classList.contains('is-open')) return;

    if (event.key === 'ArrowRight') {
      const nextIndex = activeIndex >= brands.length - 1 ? 0 : activeIndex + 1;
      openModal(nextIndex);
    }

    if (event.key === 'ArrowLeft') {
      const prevIndex = activeIndex <= 0 ? brands.length - 1 : activeIndex - 1;
      openModal(prevIndex);
    }
  });

  observeAnimatedElements();
}

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
  alert('Configurações avançadas de cookies em desenvolvimento. Por enquanto, aceite ou recuse.');
}

document.addEventListener('DOMContentLoaded', () => {
  initCookies();
  initCompaniesSection();
  observeAnimatedElements();
});
