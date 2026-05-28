// O script principal agora está em static/js/script.js
document.addEventListener("DOMContentLoaded", function () {
  const elementos = document.querySelectorAll(
    ".sobre-inner, .section-header, .catalogo-drive-grid a, .pdf-card, .acao-card, .region-copy, .region-map-container, .contato-card, .redes-grid a"
  );

  elementos.forEach(function (el) {
    el.classList.add("reveal");
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  elementos.forEach(function (el) {
    observer.observe(el);
  });
});