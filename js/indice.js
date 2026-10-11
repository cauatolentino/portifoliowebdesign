/*
 * ÍNDICE "NESTA PÁGINA"
 * Destaca no índice o capítulo que está sendo lido (scroll-spy).
 * Cada capítulo é uma <section class="capitulo" id="...">.
 */
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll(".indice a"));
  var capitulos = document.querySelectorAll(".capitulo");
  if (links.length === 0 || capitulos.length === 0) return;
  if (!("IntersectionObserver" in window)) return;

  var visiveis = {};

  function marcar(id) {
    links.forEach(function (link) {
      if (link.getAttribute("href") === "#" + id) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  var observador = new IntersectionObserver(
    function (registros) {
      registros.forEach(function (registro) {
        visiveis[registro.target.id] = registro.isIntersecting;
      });

      // O capítulo atual é o primeiro, na ordem da página, dentro da faixa de leitura.
      for (var i = 0; i < capitulos.length; i += 1) {
        if (visiveis[capitulos[i].id]) {
          marcar(capitulos[i].id);
          break;
        }
      }
    },
    // Faixa de leitura: logo abaixo do cabeçalho até 55% da altura da tela.
    { rootMargin: "-96px 0px -45% 0px", threshold: 0 },
  );

  capitulos.forEach(function (capitulo) {
    observador.observe(capitulo);
  });
})();
