# Hub Osteogênese Imperfeita — Unidos pela OI Brasil

![Status](https://img.shields.io/badge/status-ativo-success)
![Versão](https://img.shields.io/badge/versão-4.0-blue)
![Deploy](https://img.shields.io/badge/deploy-Cloudflare%20Pages-orange)
![Licença](https://img.shields.io/badge/licença-educacional-green)

🌐 **Site:** https://unidospelaoi.com.br  
📦 **Repositório:** https://github.com/Silviosb88/hub-osteogeneseimperfeita  
🚀 **Deploy automático:** Cloudflare Pages — push em `main` → publicado em ~1 min

---

## 📋 Sobre o Projeto

O **Hub Osteogênese Imperfeita** é um centro de conhecimento técnico e recursos sobre Osteogênese Imperfeita (OI), desenvolvido para:

- 👨‍⚕️ **Profissionais de Saúde** — protocolos, dosagens, exames
- 🎓 **Pesquisadores** — referências bibliográficas científicas
- 👨‍👩‍👧 **Pacientes e Familiares** — informações acessíveis e confiáveis
- 🏛️ **Gestores de Saúde Pública** — dados para políticas e protocolos
- ♿ **Usuários com deficiência** — site com acessibilidade WCAG 2.1 AA

---

## 📂 Estrutura do Projeto

```
hub-osteogeneseimperfeita/
│
├── index.html                        # Página inicial
├── hub-index.html                    # Hub de conteúdos (índice geral)
├── pamidronato.html                  # Pamidronato dissódico
├── acido-zoledronico.html            # Ácido Zoledrônico
├── alendronato.html                  # Alendronato
├── denosumabe-resumo.html            # Denosumabe
├── setrusumabe-resumo.html           # Setrusumabe
├── centros-referencia.html           # Centros de referência no Brasil
├── advocacy-cidadania.html           # Direitos, BPC, CONITEC, acessibilidade
├── comunidade-apoio.html             # Grupos de apoio e saúde mental
├── oi-brasil.html / oi-mundo.html    # OI no Brasil e no mundo
├── nossa-historia.html               # História da associação
├── busca.html                        # Busca interna
├── referencias.html                  # Referências bibliográficas
├── lista-exames-impressao.html       # Lista de exames para impressão
├── bibliografia-*.html               # Bibliografias por medicação (5 páginas)
├── *-resumo.html                     # Resumos de medicações
├── 404.html                          # Página de erro
│
├── assets/
│   ├── css/
│   │   └── global.css                # CSS global unificado (~1.700 linhas)
│   ├── js/
│   │   ├── hub-partials.js           # ⭐ Menus centralizados (HTML inline)
│   │   └── global.js                 # Módulos JS: sidebar, a11y, busca, etc.
│   ├── partials/                     # Referência visual dos partials
│   │   ├── header.html
│   │   ├── sidebar-left.html
│   │   └── sidebar-right.html
│   └── img/                          # Imagens e favicon
```

---

## ⭐ Como Editar os Menus (IMPORTANTE)

Os menus são centralizados — **um único arquivo controla todas as 25 páginas:**

```
assets/js/hub-partials.js
```

| O que editar | Variável no arquivo |
|---|---|
| Header (logo, busca, botões de acessibilidade) | `const HTML_HEADER` |
| Menu esquerdo ☰ (navegação principal) | `const HTML_SIDEBAR_LEFT` |
| Menu direito 🛟 (Ajuda Rápida) | `const HTML_SIDEBAR_RIGHT` |

> Os arquivos em `assets/partials/*.html` são apenas referência visual — não afetam o site.

Cada página `.html` contém apenas três placeholders:
```html
<div id="partial-header"></div>
<div id="partial-sidebar-left"></div>
<div id="partial-sidebar-right"></div>
```

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 semântico | Estrutura das 25 páginas |
| CSS3 (variáveis, Grid, Flexbox) | `assets/css/global.css` |
| JavaScript ES6+ (módulos) | `assets/js/global.js` + `hub-partials.js` |
| Font Awesome 6.4.0 (CDN) | Ícones |
| Google Fonts — Inter (CDN) | Tipografia |
| Cloudflare Pages | Deploy automático via GitHub |

---

## ♿ Acessibilidade (WCAG 2.1 AA)

| Recurso | Descrição |
|---|---|
| `skip-link` | "Pular para o conteúdo" — primeiro item lido pelo screen reader |
| `lang="pt-BR"` | Pronúncia correta em leitores de tela |
| `aria-label` / `aria-hidden` | Botões e ícones descritos corretamente |
| `aria-expanded` / `aria-controls` | Estado dos menus comunicado ao screen reader |
| `trapFocus` | Tab/Shift+Tab circula apenas dentro do menu aberto |
| `lastFocus` | Ao fechar menu, foco retorna ao botão que o abriu |
| `.sr-only` | Textos visíveis apenas para leitores de tela |
| Links `target="_blank"` | Aviso automático "(abre em nova aba)" em 249 links |
| Alto contraste / Texto grande / Modo escuro | Widget de acessibilidade no header |
| Navegação por teclado (ESC, Tab, Shift+Tab) | Todos os menus e modais |

---

## 🔖 Backups — Pontos de Restauração

Os backups são **tags Git anotadas** — marcos estáveis fixados no histórico.  
Para restaurar: `git checkout <nome-do-backup>`

| Tag | Data | Estado |
|---|---|---|
| `backup-v2-pre-fixes-20260509` | 09/05/2026 | Antes das correções de menus |
| `backup-v3-pre-sidebar-quicknav-fix-202605090355` | 09/05/2026 | Antes do redesign do quicknav |
| `backup-v4-menus-estabilizados-20260511` | 11/05/2026 | ✅ **ESTÁVEL** — menus PC+mobile funcionando |

> **Política de backup:** criar nova tag antes de qualquer mudança grande e após estabilização confirmada.

---

## 📜 Histórico de Desenvolvimento

### Versão 4.0 — 11/05/2026 — Menus Estabilizados + Acessibilidade
**Commits:** `e8ae420` → `650be2a` | **Tag:** `backup-v4-menus-estabilizados-20260511`

**Problemas resolvidos:**
- ✅ Menus não funcionavam em nenhuma página (PC e mobile) após análise do Copilot GitHub
- ✅ Race condition: `fetch()` assíncrono completava depois do `global.js` inicializar → `menuToggle = null`

**Soluções implementadas:**
- ✅ **Sistema de partials centralizado** — HTML dos 3 menus embutido diretamente em `hub-partials.js` como template literals (sem `fetch`, sem timing issues)
- ✅ **Fix mobile** — `.site-sidebar.is-open { left: 0 }` sobrescrevia `left: unset` no sidebar direito; corrigido com `:not(.quick-nav-sidebar)`
- ✅ **`trapFocus`** — Tab não vaza para a página ao navegar dentro do menu aberto
- ✅ **`lastFocus`** — foco retorna ao botão ☰ ou 🛟 ao fechar o menu
- ✅ **Aviso "abre em nova aba"** — 249 links `target="_blank"` recebem `aria-label` e `span.sr-only` automaticamente via JS

---

### Versão 3.0 — 09-10/05/2026 — Sistema QuickNav + Partials Iniciais
**Commits:** `3b25278` → `e8ae420`

**Problemas resolvidos:**
- ✅ Menu "Ajuda Rápida" só funcionava em `index.html` — `<nav id="quickNavSidebar">` ausente nas outras 24 páginas
- ✅ `inert` attribute bloqueava toque no Chrome Android — substituído por `pointer-events: none; visibility: hidden`
- ✅ Ambos sidebars compartilhavam `sidebarOverlay` — conflito de listeners; criado `quickNavOverlay` dedicado
- ✅ `</div>` do `header-a11y` faltando em várias páginas — `quickNavToggle` ficava dentro do grupo errado
- ✅ `close()` chamava `toggle.focus()` re-disparando o click — removido

**Implementações:**
- ✅ Botão ☰ direito (ícone 🛟) no header — abre sidebar "Ajuda Rápida" da direita
- ✅ Primeira versão do sistema de partials com `fetch()` (depois substituída)
- ✅ Script Python para padronizar estrutura HTML em todas as 25 páginas

---

### Versão 2.0 — 09/05/2026 — Correções de Layout e Conteúdo
**Tag:** `backup-v3-pre-sidebar-quicknav-fix-202605090355`

- ✅ Removida seção "Como Citar Este Hub" de `referencias.html`
- ✅ Ícone de seringa em `hub-index.html` muito grande — corrigido para 3rem com `flex-wrap`
- ✅ PageSpeed analisado (mobile 81, desktop 99)
- ✅ Conceito de sidebar direito redesenhado: de FAB/bottom-sheet para botão no header

---

### Versão 1.0 — Março/2026 — Criação do Hub
**Tag:** `backup-v2-pre-fixes-20260509`

- ✅ 25 páginas HTML criadas
- ✅ CSS global unificado (`global.css`)
- ✅ JS modular (`global.js`) com 8 módulos: HubSidebar, HubA11y, HubPageIndex, HubBackToTop, HubSmoothScroll, HubSearch, HubVisitorCount, HubQuickNav
- ✅ Deploy no Cloudflare Pages configurado
- ✅ Conteúdo médico: pamidronato, ácido zoledrônico, alendronato, denosumabe, setrusumabe
- ✅ Centros de referência, advocacy, comunidade, bibliografias

---

## 🧩 Módulos JavaScript (`global.js`)

| Módulo | Função |
|---|---|
| `HubSidebar` | Menu lateral esquerdo — open/close/trapFocus/submenu/activeLink |
| `HubA11y` | Alto contraste, texto grande, modo escuro (localStorage) |
| `HubPageIndex` | Destaca seção atual no índice ao rolar a página |
| `HubBackToTop` | Botão "voltar ao topo" (aparece após 400px de scroll) |
| `HubSmoothScroll` | Scroll suave para links âncora `#` |
| `HubSearch` | Busca no header → redireciona para `busca.html?q=` |
| `HubVisitorCount` | Contador de visualizações por dispositivo (localStorage) |
| `HubQuickNav` | Menu lateral direito "Ajuda Rápida" — open/close/trapFocus |

---

## 📌 Pendências e Sugestões Futuras

### Técnicas
- [ ] Implementar `sitemap.xml` para SEO
- [ ] Minificar CSS e JS para produção (Cloudflare Workers ou build step)
- [ ] Adicionar PWA manifest para instalação no celular
- [ ] Implementar modo offline com Service Worker

### Conteúdo
- [ ] FAQ — Perguntas Frequentes sobre OI
- [ ] Página sobre tipos de OI (I a V)
- [ ] Calculadora de dosagem (ferramenta para profissionais)
- [ ] Área de downloads (PDFs, infográficos)
- [ ] Vídeos educativos integrados

### Acessibilidade
- [ ] Auditoria completa com NVDA + Firefox
- [ ] Auditoria com VoiceOver + Safari (iOS)
- [ ] Teste com axe DevTools

---

## ⚠️ Avisos Legais

> Este conteúdo é **educativo e informativo**.  
> ❌ Não substitui consulta médica profissional.  
> ❌ Não deve ser usado para autodiagnóstico.  
> ✅ A decisão terapêutica cabe exclusivamente ao médico assistente.  
> ✅ Baseado em publicações da CONITEC, estudos revisados por pares e diretrizes internacionais.

---

## 📞 Contato

- 🌐 Site: https://unidospelaoi.com.br
- 📘 Facebook: https://facebook.com/unidospelaoi
- 📦 GitHub: https://github.com/Silviosb88/hub-osteogeneseimperfeita

---

**Desenvolvido com 💙 para a comunidade de Osteogênese Imperfeita**  
*Última atualização: 11 de maio de 2026*
