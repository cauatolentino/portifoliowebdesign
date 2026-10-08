/*
 * TEMA CLARO E ESCURO
 * Este arquivo é carregado no <head>, sem defer, para aplicar o tema antes de
 * a página ser desenhada (evita o "piscar" do tema errado).
 * A escolha fica salva no localStorage; sem escolha, o padrão é o escuro.
 */
(function () {
  var CHAVE = "tema";
  var raiz = document.documentElement;

  function lerTema() {
    try {
      return localStorage.getItem(CHAVE) === "claro" ? "claro" : "escuro";
    } catch (erro) {
      // Navegação privada pode bloquear o localStorage.
      return "escuro";
    }
  }

  function definirTema(tema) {
    raiz.dataset.tema = tema;
    try {
      localStorage.setItem(CHAVE, tema);
    } catch (erro) {
      // Sem localStorage o tema vale só para esta página.
    }
  }

  raiz.dataset.tema = lerTema();
  // Avisa o CSS de que o JavaScript está ativo.
  raiz.classList.add("js");

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-definir-tema]").forEach(function (botao) {
      botao.addEventListener("click", function () {
        definirTema(botao.dataset.definirTema);
      });
    });
  });
})();
