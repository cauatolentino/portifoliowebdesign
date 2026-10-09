/*
 * MENU MOBILE
 * Abre e fecha a navegação em telas menores que 1024px.
 * O estado fica no aria-expanded do botão, que também troca o ícone via CSS.
 */
(function () {
  var botao = document.querySelector(".menu-botao");
  var menu = document.getElementById("menu-mobile");
  if (!botao || !menu) return;

  function alternar(aberto) {
    menu.hidden = !aberto;
    botao.setAttribute("aria-expanded", String(aberto));
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  }

  botao.addEventListener("click", function () {
    alternar(menu.hidden);
  });

  // Fecha com Esc e devolve o foco ao botão.
  window.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && !menu.hidden) {
      alternar(false);
      botao.focus();
    }
  });

  // Fecha ao escolher um link (útil nas âncoras da própria página).
  menu.addEventListener("click", function (evento) {
    if (evento.target.closest("a")) alternar(false);
  });
})();
