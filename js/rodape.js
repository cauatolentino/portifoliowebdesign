/*
 * RODAPÉ
 * Mantém o ano dos direitos autorais atualizado.
 */
(function () {
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
})();
