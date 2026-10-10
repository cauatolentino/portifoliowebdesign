/*
 * ENTRADA AO ROLAR
 * Elementos com data-revelar ganham a classe .visivel quando entram na tela.
 * A animação em si fica no CSS (css/base.css).
 * data-atraso="0.1" atrasa a entrada em segundos, para escalonar itens de uma lista.
 */
(function () {
  var alvos = document.querySelectorAll("[data-revelar]");
  if (alvos.length === 0) return;

  // Navegador sem IntersectionObserver: mostra tudo de uma vez.
  if (!("IntersectionObserver" in window)) {
    alvos.forEach(function (alvo) {
      alvo.classList.add("visivel");
    });
    return;
  }

  var observador = new IntersectionObserver(
    function (registros) {
      registros.forEach(function (registro) {
        if (!registro.isIntersecting) return;
        registro.target.classList.add("visivel");
        // Cada elemento entra uma vez só.
        observador.unobserve(registro.target);
      });
    },
    { rootMargin: "0px 0px -60px 0px" },
  );

  alvos.forEach(function (alvo) {
    if (alvo.dataset.atraso) {
      alvo.style.transitionDelay = alvo.dataset.atraso + "s";
    }
    observador.observe(alvo);
  });
})();
