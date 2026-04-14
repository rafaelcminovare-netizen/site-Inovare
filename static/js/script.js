const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (window.scrollY > 16) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
});
