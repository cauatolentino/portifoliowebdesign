# Portfólio

Portfólio pessoal desenvolvido como trabalho da disciplina de **Web Design**. O site é feito só com **HTML, CSS e JavaScript puros**: não usa framework, biblioteca, nem etapa de build.

O projeto funciona como um modelo. Os textos pessoais estão como exemplo (`Coloque nome`, `Coloque seu cargo`...) para que qualquer pessoa possa preencher com os próprios dados.

## Sumário

- [Como rodar](#como-rodar)
- [Funcionalidades](#funcionalidades)
- [Páginas](#páginas)
- [Tecnologias](#tecnologias)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Organização do CSS](#organização-do-css)
- [Organização do JavaScript](#organização-do-javascript)
- [Identidade visual](#identidade-visual)
- [Responsividade](#responsividade)
- [Acessibilidade](#acessibilidade)
- [Como personalizar](#como-personalizar)
- [Versionamento](#versionamento)
- [Integrantes](#integrantes)

## Como rodar

Não há nada para instalar.

1. Clone o repositório:

   ```bash
   git clone https://github.com/cauatolentino/portifoliowebdesign.git
   ```

2. Abra o arquivo `index.html` no navegador.

Todos os caminhos são relativos, então o site funciona direto pelo arquivo, sem servidor. Quem preferir um servidor local pode usar a extensão **Live Server** do VS Code.

## Funcionalidades

- **Tema claro e escuro**, com a escolha salva no navegador e aplicada antes de a página ser desenhada.
- **Menu responsivo**: navegação em linha no desktop e menu que abre e fecha no celular (fecha também com `Esc`).
- **Hero com painel de log** animado linha a linha e um **gráfico em SVG** que é desenhado da esquerda para a direita.
- **Animação de entrada ao rolar** nos blocos de conteúdo.
- **Listagem de projetos e de cases** com **filtro por categoria** e contador de resultados.
- **Página de detalhe** de cada projeto e case, com faixa de metadados, capítulos numerados e **índice lateral que acompanha a leitura**.
- **Abas** para alternar arquivos de código e comparações, com navegação pelas setas do teclado.
- **Formulário de contato** com validação campo a campo e mensagens de erro.
- **Página 404** própria.

## Páginas

| Página | Arquivo | O que mostra |
| --- | --- | --- |
| Home | `index.html` | Hero, "O que eu faço", habilidades, projetos e cases em destaque e "Quem sou eu" |
| Projetos | `projetos.html` | Todos os projetos, com filtro por categoria |
| Projeto | `projetos/*.html` | Um projeto em capítulos: problema, solução, resultado |
| Cases | `cases.html` | Todos os cases, com filtro por categoria |
| Case | `cases/*.html` | Um relato de trabalho anonimizado, em capítulos |
| Sobre | `sobre.html` | Apresentação, currículo, experiência, habilidades e formação |
| Stack | `stack.html` | Tecnologias e práticas, agrupadas em cards |
| Contato | `contato.html` | Canais diretos e formulário |
| 404 | `404.html` | Aviso de página não encontrada |

## Tecnologias

| Tecnologia | Uso no projeto |
| --- | --- |
| HTML5 | Estrutura semântica (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`) |
| CSS3 | Variáveis, Flexbox, Grid, media queries, `color-mix()`, animações com `@keyframes` |
| JavaScript (ES5+) | Comportamentos: tema, menu, filtros, abas, índice e validação |
| SVG | Ícones em linha e o gráfico do hero |
| Google Fonts | Fontes Manrope e IBM Plex Mono |
| Git e GitHub | Versionamento, com commits pequenos e tags por versão |

## Estrutura de pastas

```text
.
├── index.html              # Home
├── projetos.html           # Listagem de projetos
├── cases.html              # Listagem de cases
├── sobre.html              # Sobre
├── stack.html              # Stack
├── contato.html            # Contato
├── 404.html                # Página não encontrada
├── projetos/               # Uma página por projeto
│   ├── api-de-pedidos.html
│   ├── painel-de-chamados.html
│   └── portfolio.html
├── cases/                  # Uma página por case
│   ├── fila-travada.html
│   ├── integracao-instavel.html
│   └── relatorio-lento.html
├── css/
│   ├── tokens.css          # Cores, fontes e medidas (variáveis)
│   ├── base.css            # Reset e utilitários
│   ├── componentes.css     # Botão, tag, janela, seção, skills e card
│   ├── layout.css          # Cabeçalho, menu e rodapé
│   ├── home.css            # Só da home
│   ├── listagem.css        # Listagens e filtros
│   ├── entrada.css         # Página de projeto e de case
│   ├── sobre.css
│   ├── stack.css
│   ├── contato.css
│   └── erro.css            # Página 404
├── js/
│   ├── tema.js             # Tema claro e escuro
│   ├── menu.js             # Menu mobile
│   ├── rodape.js           # Ano no rodapé
│   ├── revelar.js          # Animação de entrada ao rolar
│   ├── listagem.js         # Filtro por categoria
│   ├── indice.js           # Índice "Nesta página"
│   ├── abas.js             # Abas
│   └── contato.js          # Validação do formulário
└── assets/
    ├── favicon.svg
    └── curriculos/         # PDFs de exemplo
```

## Organização do CSS

O CSS é dividido em camadas, e cada página carrega só os arquivos de que precisa, nesta ordem:

1. **`tokens.css`**: todas as variáveis (cores, fontes, raios, larguras). Nenhuma cor é escrita direto nos componentes.
2. **`base.css`**: reset, estilos do `html` e do `body` e classes utilitárias (`.container`, `.rotulo`, `.divisor`, `.malha`, `.icone`, `.so-leitor`).
3. **`componentes.css`**: peças usadas em mais de uma página.
4. **`layout.css`**: cabeçalho e rodapé.
5. **Um arquivo por página** (`home.css`, `sobre.css`...).

As classes seguem o padrão **BEM** em português: `bloco`, `bloco__elemento` e `bloco--variacao` (por exemplo, `card`, `card__titulo` e `card--destaque`).

O layout é **mobile first**: os estilos de base são os do celular, e as media queries adicionam o que muda em telas maiores.

## Organização do JavaScript

Cada arquivo cuida de um comportamento e é carregado só nas páginas que o usam. Nenhum script gera conteúdo: **todo o texto está no HTML**, e o site continua legível com o JavaScript desligado.

| Arquivo | Responsabilidade |
| --- | --- |
| `tema.js` | Lê o tema salvo no `localStorage`, aplica em `<html data-tema>` e liga os botões de sol e lua. É o único script carregado no `<head>`, para o tema certo aparecer desde o primeiro quadro |
| `menu.js` | Abre e fecha o menu mobile e mantém o `aria-expanded` do botão |
| `revelar.js` | Usa `IntersectionObserver` para marcar como visível o que entra na tela |
| `listagem.js` | Filtra os cards pelo atributo `data-categorias` e atualiza o contador |
| `indice.js` | Destaca no índice o capítulo que está na faixa de leitura |
| `abas.js` | Troca de aba por clique e pelas setas, seguindo o padrão de abas da WAI-ARIA |
| `contato.js` | Valida os campos e monta a mensagem |
| `rodape.js` | Atualiza o ano dos direitos autorais |

### Sobre o formulário de contato

O site é estático, sem servidor para receber a mensagem. Por isso, depois de validar os campos, o formulário abre o aplicativo de e-mail da pessoa com a mensagem já preenchida (link `mailto:`). O endereço de destino fica no atributo `data-destino` do `<form>`, em `contato.html`.

## Identidade visual

- **Tipografia**: Manrope nos textos e títulos; IBM Plex Mono nos rótulos, no logo e nas "janelas" de código.
- **Cores**: âmbar como destaque principal sobre um fundo azul-escuro, com verde, azul e violeta de apoio. O tema claro troca os neutros e escurece os destaques para manter o contraste.
- **Cor por seção**: a variável `--tom` define o destaque de cada área. Projetos usam âmbar e cases usam verde, pelo atributo `data-tom`.
- **Assinatura**: elementos que lembram o dia a dia de quem programa, como o log de investigação no hero, a ficha em formato de JSON e as capas com malha de blueprint.

| Token | Tema escuro | Tema claro |
| --- | --- | --- |
| `--fundo` | `#0b0e13` | `#f5f6f8` |
| `--superficie` | `#11151c` | `#ffffff` |
| `--texto` | `#e9edf3` | `#12161d` |
| `--texto-suave` | `#98a2b3` | `#556070` |
| `--ambar` | `#f2b155` | `#a45a00` |
| `--verde` | `#5cc8b8` | `#0b7468` |
| `--azul` | `#7fa8f8` | `#2b5bd0` |
| `--violeta` | `#b5a0f5` | `#6547cc` |

## Responsividade

O site usa três faixas de largura:

| Faixa | Largura | O que muda |
| --- | --- | --- |
| Celular | até 639px | Uma coluna, menu recolhido, botão de contato dentro do menu |
| Tablet | a partir de 640px (`40rem`) | Grades em duas colunas, botão de contato no cabeçalho |
| Desktop | a partir de 1024px (`64rem`) | Navegação em linha, hero em duas colunas com o gráfico, índice lateral fixo |

## Acessibilidade

- HTML semântico, com um único `h1` por página e hierarquia de títulos.
- Link **"Pular para o conteúdo"** como primeiro elemento focável.
- Foco visível em todos os elementos interativos.
- `aria-current` na página atual do menu e no capítulo atual do índice.
- `aria-expanded`, `aria-pressed` e `aria-selected` nos controles que têm estado.
- Erros do formulário ligados ao campo por `aria-describedby` e anunciados com `role="alert"`.
- Ícones decorativos com `aria-hidden` e aviso para leitores de tela nos links que abrem em nova aba.
- Respeito a `prefers-reduced-motion`: quem pede menos movimento não recebe animações.

## Como personalizar

| O que trocar | Onde |
| --- | --- |
| Nome (`Coloque nome`) e logo (`coloque.nome`) | Cabeçalho e rodapé de todas as páginas, `<title>` e textos da home e do Sobre. Use o "Localizar e substituir" do editor na pasta inteira |
| Cargo (`Coloque seu cargo`) | Hero da home, rodapé e página Sobre |
| Textos de apresentação | `index.html` e `sobre.html` |
| Links de contato | `contato.html` e rodapé |
| E-mail que recebe o formulário | Atributos `action` e `data-destino` do `<form>` em `contato.html` |
| Currículos | Substitua os PDFs em `assets/curriculos/`, mantendo os nomes |
| Cores e fontes | `css/tokens.css` |
| Novo projeto ou case | Copie uma página de `projetos/` ou `cases/`, edite o conteúdo e adicione um card na listagem e na home |

## Versionamento

O histórico segue o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/), com um commit para cada parte entregue (um componente, uma seção ou uma página):

| Prefixo | Uso |
| --- | --- |
| `feat` | Nova funcionalidade, componente ou página |
| `fix` | Correção |
| `docs` | Documentação |
| `chore` | Configuração do projeto |

As versões são marcadas com **tags** do Git, seguindo o [Versionamento Semântico](https://semver.org/lang/pt-BR/):

| Tag | Entrega |
| --- | --- |
| `v0.1.0` | Estrutura base, tokens, cabeçalho, tema, menu mobile e rodapé |
| `v0.2.0` | Home completa |
| `v0.3.0` | Listagens e páginas de projetos e cases |
| `v0.4.0` | Páginas Sobre e Stack |
| `v0.5.0` | Página de contato com formulário validado e página 404 |
| `v1.0.0` | Revisão de acessibilidade e documentação |

Para ver as versões e voltar a uma delas:

```bash
git tag -n          # lista as tags com a descrição
git checkout v0.2.0 # abre o projeto como estava nessa versão
```

## Integrantes

| Integrante | GitHub |
| --- | --- |
| Cauã Tolentino | [@cauatolentino](https://github.com/cauatolentino) |
| Caio Eduardo | [@Caio-Eduardo-00](https://github.com/Caio-Eduardo-00) |
| Felipe Araujo Bueno | [@Felipeabueno](https://github.com/Felipeabueno) |
| Ivan Erick Bueno Dias | [@Ivanerickdias](https://github.com/Ivanerickdias) |
| Vinicius Amaral | [@MolhoCru](https://github.com/MolhoCru) |
