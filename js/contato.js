/*
 * FORMULÁRIO DE CONTATO
 * Valida os campos no navegador e mostra o erro logo abaixo de cada um.
 * O site é estático, sem servidor: com tudo válido, a mensagem é aberta já
 * preenchida no aplicativo de e-mail da pessoa (link mailto:).
 * O endereço de destino fica no atributo data-destino do <form>.
 */
(function () {
  var formulario = document.querySelector(".formulario");
  if (!formulario) return;

  var resultado = formulario.querySelector(".formulario__resultado");

  var REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Cada regra devolve a mensagem de erro, ou "" quando o valor é válido.
  var regras = {
    nome: function (valor) {
      return valor.length >= 2 && valor.length <= 120
        ? ""
        : "Informe seu nome (mínimo de 2 caracteres).";
    },
    email: function (valor) {
      return REGEX_EMAIL.test(valor) && valor.length <= 200
        ? ""
        : "Informe um e-mail válido.";
    },
    assunto: function (valor) {
      return valor ? "" : "Selecione um assunto.";
    },
    link: function (valor) {
      if (valor === "") return "";
      try {
        var protocolo = new URL(valor).protocol;
        if (protocolo === "http:" || protocolo === "https:") return "";
      } catch (erro) {
        // Cai na mensagem abaixo.
      }
      return "Informe um link válido, começando com https://";
    },
    mensagem: function (valor) {
      if (valor.length < 10) return "Escreva uma mensagem com pelo menos 10 caracteres.";
      if (valor.length > 5000) return "A mensagem pode ter no máximo 5000 caracteres.";
      return "";
    },
  };

  function validarCampo(nome) {
    var campo = formulario.elements[nome];
    var erro = document.getElementById(nome + "-erro");
    var mensagem = regras[nome](campo.value.trim());

    erro.textContent = mensagem;
    erro.hidden = mensagem === "";

    if (mensagem) {
      campo.setAttribute("aria-invalid", "true");
      campo.setAttribute("aria-describedby", nome + "-erro");
    } else {
      campo.removeAttribute("aria-invalid");
      campo.removeAttribute("aria-describedby");
    }

    return mensagem === "";
  }

  function mostrarResultado(estado, texto) {
    resultado.dataset.estado = estado;
    resultado.textContent = texto;
  }

  // Depois do primeiro erro, o campo é revalidado enquanto a pessoa corrige.
  Object.keys(regras).forEach(function (nome) {
    formulario.elements[nome].addEventListener("input", function (evento) {
      if (evento.target.hasAttribute("aria-invalid")) validarCampo(nome);
    });
  });

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    mostrarResultado("", "");

    var invalidos = Object.keys(regras).filter(function (nome) {
      return !validarCampo(nome);
    });

    if (invalidos.length > 0) {
      formulario.elements[invalidos[0]].focus();
      return;
    }

    // Honeypot preenchido: é um robô. Finge sucesso e não faz nada.
    if (formulario.elements.site.value !== "") {
      mostrarResultado("sucesso", "Mensagem enviada. Respondo assim que possível!");
      return;
    }

    var dados = formulario.elements;
    var assunto = dados.assunto.options[dados.assunto.selectedIndex].text;
    var corpo = [
      "Nome: " + dados.nome.value.trim(),
      "E-mail: " + dados.email.value.trim(),
      dados.link.value.trim() ? "Link: " + dados.link.value.trim() : null,
      "",
      dados.mensagem.value.trim(),
    ]
      .filter(function (linha) {
        return linha !== null;
      })
      .join("\n");

    window.location.href =
      "mailto:" +
      formulario.dataset.destino +
      "?subject=" +
      encodeURIComponent(assunto) +
      "&body=" +
      encodeURIComponent(corpo);

    mostrarResultado(
      "sucesso",
      "Abri a mensagem no seu aplicativo de e-mail. É só conferir e enviar!",
    );
    formulario.reset();
  });
})();
