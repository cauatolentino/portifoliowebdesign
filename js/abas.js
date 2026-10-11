/*
 * ABAS
 * Troca de painel por clique ou pelas setas do teclado, seguindo o padrão
 * de abas da WAI-ARIA (role="tablist", "tab" e "tabpanel").
 */
(function () {
  document.querySelectorAll("[data-abas]").forEach(function (grupo) {
    var abas = Array.prototype.slice.call(grupo.querySelectorAll('[role="tab"]'));

    function selecionar(escolhida, focar) {
      abas.forEach(function (aba) {
        var ativa = aba === escolhida;
        aba.setAttribute("aria-selected", String(ativa));
        // Só a aba ativa entra na ordem do Tab; as outras ficam nas setas.
        aba.tabIndex = ativa ? 0 : -1;
        document.getElementById(aba.getAttribute("aria-controls")).hidden = !ativa;
      });
      if (focar) escolhida.focus();
    }

    abas.forEach(function (aba, indice) {
      aba.addEventListener("click", function () {
        selecionar(aba, false);
      });

      aba.addEventListener("keydown", function (evento) {
        var destino = null;
        if (evento.key === "ArrowRight") destino = abas[(indice + 1) % abas.length];
        if (evento.key === "ArrowLeft") destino = abas[(indice - 1 + abas.length) % abas.length];
        if (evento.key === "Home") destino = abas[0];
        if (evento.key === "End") destino = abas[abas.length - 1];
        if (!destino) return;

        evento.preventDefault();
        selecionar(destino, true);
      });
    });
  });
})();
