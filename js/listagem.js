/*
 * FILTRO DA LISTAGEM
 * Filtra os cards por categoria e atualiza o contador.
 * Cada card informa as suas categorias em data-categorias (separadas por "|").
 */
(function () {
  var listagem = document.querySelector("[data-listagem]");
  if (!listagem) return;

  var botoes = listagem.querySelectorAll("[data-filtro]");
  var itens = listagem.querySelectorAll("[data-categorias]");
  var contador = listagem.querySelector(".listagem__contador");

  // O texto do contador vem do HTML: data-singular, data-plural e data-vazio.
  function textoContador(total) {
    if (total === 0) return contador.dataset.vazio;
    var modelo = total === 1 ? contador.dataset.singular : contador.dataset.plural;
    return modelo.replace("#", total);
  }

  function filtrar(categoria) {
    var total = 0;

    itens.forEach(function (item) {
      var categorias = item.dataset.categorias.split("|");
      var visivel = categoria === "" || categorias.indexOf(categoria) !== -1;
      item.hidden = !visivel;
      if (visivel) total += 1;
    });

    botoes.forEach(function (botao) {
      botao.setAttribute("aria-pressed", String(botao.dataset.filtro === categoria));
    });

    contador.textContent = textoContador(total);
  }

  botoes.forEach(function (botao) {
    botao.addEventListener("click", function () {
      filtrar(botao.dataset.filtro);
    });
  });
})();
