/**
 * Hub Osteogênese Imperfeita — Partials Centralizados (inline, sem fetch)
 * Versão 2.0 — HTML embutido diretamente, injeção síncrona no DOMContentLoaded.
 *
 * Para editar menus: altere as strings HTML_HEADER, HTML_SIDEBAR_LEFT, HTML_SIDEBAR_RIGHT.
 * Os arquivos em assets/partials/*.html servem apenas como referência visual — este
 * arquivo é o que realmente controla o que aparece em todas as páginas.
 */

'use strict';

/* ── HTML DO HEADER ─────────────────────────────────────────────────────── */
const HTML_HEADER = `
<header class="site-header" role="banner">
    <div class="site-header__inner">
        <button class="menu-toggle" id="menuToggle"
            aria-controls="hubSidebar" aria-expanded="false"
            aria-label="Abrir menu de navegação">
            <i class="fas fa-bars" aria-hidden="true"></i>
        </button>
        <a class="site-logo" href="index.html" aria-label="Unidos pela OI — Página inicial">
            <img src="assets/img/logo-unidos.png" alt="" class="site-logo__img" width="47" height="60" aria-hidden="true" loading="lazy" decoding="async">
            <span class="site-logo__text">
                Unidos pela OI - Brasil
                <span>Osteogênese Imperfeita</span>
            </span>
        </a>
        <div class="header-search" role="search">
            <form class="header-search__form" id="headerSearchForm" action="busca.html" method="get">
                <label for="headerSearchInput" class="sr-only">Buscar no site</label>
                <input type="search" class="header-search__input" id="headerSearchInput"
                    name="q" placeholder="Buscar..." autocomplete="off" aria-label="Buscar no Hub OI">
                <button type="submit" class="header-search__btn" aria-label="Buscar">
                    <i class="fas fa-search" aria-hidden="true"></i>
                </button>
            </form>
        </div>
        <div class="header-a11y" role="group" aria-label="Acessibilidade">
            <button class="header-a11y__btn" id="headerA11yContrast" title="Alto contraste" aria-label="Alternar alto contraste" aria-pressed="false">
                <i class="fas fa-adjust" aria-hidden="true"></i>
            </button>
            <button class="header-a11y__btn" id="headerA11yLargeText" title="Texto grande" aria-label="Alternar texto grande" aria-pressed="false">
                <i class="fas fa-text-height" aria-hidden="true"></i>
            </button>
            <button class="header-a11y__btn" id="headerA11yDark" title="Modo escuro" aria-label="Alternar modo escuro" aria-pressed="false">
                <i class="fas fa-moon" aria-hidden="true"></i>
            </button>
        </div>
        <button class="menu-toggle quick-nav-toggle" id="quickNavToggle"
            aria-controls="quickNavSidebar" aria-expanded="false"
            aria-label="Abrir menu Ajuda Rápida">
            <i class="fas fa-life-ring" aria-hidden="true"></i>
        </button>
    </div>
</header>`;

/* ── HTML DO SIDEBAR ESQUERDO ───────────────────────────────────────────── */
const HTML_SIDEBAR_LEFT = `
<nav class="site-sidebar" id="hubSidebar" aria-label="Menu de navegação principal" aria-hidden="true">
    <div class="sidebar-header">
        <span class="sidebar-header__title"><i class="fas fa-sitemap" aria-hidden="true"></i> Navegação</span>
        <button class="sidebar-close" id="sidebarClose" aria-label="Fechar menu">
            <i class="fas fa-times" aria-hidden="true"></i>
        </button>
    </div>
    <nav class="sidebar-nav" role="navigation" aria-label="Menu principal">
        <div class="sidebar-nav__item">
            <a class="sidebar-nav__link" href="index.html">
                <i class="fas fa-home sidebar-nav__icon" aria-hidden="true"></i>
                <span class="sidebar-nav__text">Início</span>
            </a>
        </div>
        <div class="sidebar-nav__item">
            <a class="sidebar-nav__link" href="hub-index.html">
                <i class="fas fa-th-large sidebar-nav__icon" aria-hidden="true"></i>
                <span class="sidebar-nav__text">Hub de Conteúdos</span>
            </a>
        </div>
        <div class="sidebar-nav__item">
            <div class="sidebar-nav__link">
                <i class="fas fa-pills sidebar-nav__icon" aria-hidden="true"></i>
                <span class="sidebar-nav__text">Medicações de Uso</span>
                <button class="sidebar-submenu-toggle" id="toggle-medicacoes"
                    data-submenu-toggle="submenu-medicacoes"
                    aria-expanded="false" aria-controls="submenu-medicacoes"
                    aria-label="Expandir Medicações">
                    <i class="fas fa-chevron-down" aria-hidden="true"></i>
                </button>
            </div>
            <ul class="sidebar-submenu" id="submenu-medicacoes" role="list">
                <li class="sidebar-submenu__item"><a class="sidebar-submenu__link" href="pamidronato.html"><i class="fas fa-star" style="color:#f39c12;font-size:.8em" aria-hidden="true"></i> Pamidronato</a></li>
                <li class="sidebar-submenu__item"><a class="sidebar-submenu__link" href="acido-zoledronico.html">Ácido Zoledrônico</a></li>
                <li class="sidebar-submenu__item"><a class="sidebar-submenu__link" href="alendronato.html">Alendronato</a></li>
                <li class="sidebar-submenu__item"><a class="sidebar-submenu__link" href="setrusumabe-resumo.html">Setrusumabe</a></li>
                <li class="sidebar-submenu__item"><a class="sidebar-submenu__link" href="denosumabe-resumo.html">Denosumabe</a></li>
                <li class="sidebar-submenu__item"><a class="sidebar-submenu__link" href="bibliografia-medicacoes.html"><i class="fas fa-book" aria-hidden="true"></i> Ver Todas</a></li>
            </ul>
        </div>
        <div class="sidebar-nav__item"><a class="sidebar-nav__link" href="centros-referencia.html"><i class="fas fa-hospital sidebar-nav__icon" aria-hidden="true"></i><span class="sidebar-nav__text">Centros de Referência</span></a></div>
        <div class="sidebar-nav__item"><a class="sidebar-nav__link" href="advocacy-cidadania.html"><i class="fas fa-balance-scale sidebar-nav__icon" aria-hidden="true"></i><span class="sidebar-nav__text">Advocacy e Cidadania</span></a></div>
        <div class="sidebar-nav__item"><a class="sidebar-nav__link" href="comunidade-apoio.html"><i class="fas fa-hands-helping sidebar-nav__icon" aria-hidden="true"></i><span class="sidebar-nav__text">Comunidade e Apoio</span></a></div>
        <div class="sidebar-nav__item"><a class="sidebar-nav__link" href="oi-brasil.html"><i class="fas fa-map-marked-alt sidebar-nav__icon" aria-hidden="true"></i><span class="sidebar-nav__text">OI no Brasil</span></a></div>
        <div class="sidebar-nav__item"><a class="sidebar-nav__link" href="oi-mundo.html"><i class="fas fa-globe-americas sidebar-nav__icon" aria-hidden="true"></i><span class="sidebar-nav__text">OI no Mundo</span></a></div>
        <div class="sidebar-nav__item"><a class="sidebar-nav__link" href="lista-exames-impressao.html"><i class="fas fa-book-medical sidebar-nav__icon" aria-hidden="true"></i><span class="sidebar-nav__text">Recursos e Exames</span></a></div>
        <div class="sidebar-nav__item"><a class="sidebar-nav__link" href="nossa-historia.html"><i class="fas fa-heart sidebar-nav__icon" aria-hidden="true"></i><span class="sidebar-nav__text">Nossa História</span></a></div>
        <div class="sidebar-nav__item"><a class="sidebar-nav__link" href="busca.html"><i class="fas fa-search sidebar-nav__icon" aria-hidden="true"></i><span class="sidebar-nav__text">Busca</span></a></div>
        <div class="sidebar-nav__item"><a class="sidebar-nav__link" href="referencias.html"><i class="fas fa-bookmark sidebar-nav__icon" aria-hidden="true"></i><span class="sidebar-nav__text">Referências Bibliográficas</span></a></div>
    </nav>
</nav>`;

/* ── HTML DO SIDEBAR DIREITO + OVERLAYS ─────────────────────────────────── */
const HTML_SIDEBAR_RIGHT = `
<div class="sidebar-overlay" id="sidebarOverlay" aria-hidden="true"></div>
<div class="sidebar-overlay" id="quickNavOverlay" aria-hidden="true"></div>
<nav class="site-sidebar quick-nav-sidebar" id="quickNavSidebar"
     aria-label="Menu Ajuda Rápida" aria-hidden="true">
    <div class="sidebar-header">
        <span class="sidebar-header__title"><i class="fas fa-life-ring" aria-hidden="true"></i> Ajuda Rápida</span>
        <button class="sidebar-close" id="quickNavClose" aria-label="Fechar menu Ajuda Rápida">
            <i class="fas fa-times" aria-hidden="true"></i>
        </button>
    </div>
    <ul class="sidebar-nav" role="list">
        <li class="sidebar-nav__item"><a class="sidebar-nav__link" href="comunidade-apoio.html#precisa-ajuda"><i class="fas fa-hands-helping" aria-hidden="true"></i><span class="sidebar-nav__text">Precisa de Ajuda?</span></a></li>
        <li class="sidebar-nav__item"><a class="sidebar-nav__link" href="comunidade-apoio.html#grupos"><i class="fas fa-users" aria-hidden="true"></i><span class="sidebar-nav__text">Grupos de Apoio</span></a></li>
        <li class="sidebar-nav__item"><a class="sidebar-nav__link" href="advocacy-cidadania.html#direitos-pcd"><i class="fas fa-balance-scale" aria-hidden="true"></i><span class="sidebar-nav__text">Direitos PcD</span></a></li>
        <li class="sidebar-nav__item"><a class="sidebar-nav__link" href="advocacy-cidadania.html#bpc"><i class="fas fa-hand-holding-usd" aria-hidden="true"></i><span class="sidebar-nav__text">BPC e Assistência</span></a></li>
        <li class="sidebar-nav__item"><a class="sidebar-nav__link" href="advocacy-cidadania.html#educacao"><i class="fas fa-graduation-cap" aria-hidden="true"></i><span class="sidebar-nav__text">Educação Inclusiva</span></a></li>
        <li class="sidebar-nav__item"><a class="sidebar-nav__link" href="advocacy-cidadania.html#transporte"><i class="fas fa-bus" aria-hidden="true"></i><span class="sidebar-nav__text">Transporte e Mobilidade</span></a></li>
        <li class="sidebar-nav__item"><a class="sidebar-nav__link" href="advocacy-cidadania.html#conitec"><i class="fas fa-flask" aria-hidden="true"></i><span class="sidebar-nav__text">PCDT / CONITEC</span></a></li>
        <li class="sidebar-nav__item"><a class="sidebar-nav__link" href="advocacy-cidadania.html#acessibilidade"><i class="fas fa-wheelchair" aria-hidden="true"></i><span class="sidebar-nav__text">Acessibilidade</span></a></li>
        <li class="sidebar-nav__item"><a class="sidebar-nav__link" href="advocacy-cidadania.html#outros-direitos"><i class="fas fa-star" aria-hidden="true"></i><span class="sidebar-nav__text">Outros Direitos</span></a></li>
        <li class="sidebar-nav__item"><a class="sidebar-nav__link" href="comunidade-apoio.html#saude-mental"><i class="fas fa-heart" aria-hidden="true"></i><span class="sidebar-nav__text">Apoio Emocional</span></a></li>
    </ul>
</nav>`;

/* ── INJEÇÃO ─────────────────────────────────────────────────────────────── */
(function injectPartials() {
    const map = {
        'partial-header':        HTML_HEADER,
        'partial-sidebar-left':  HTML_SIDEBAR_LEFT,
        'partial-sidebar-right': HTML_SIDEBAR_RIGHT,
    };

    function doInject() {
        Object.entries(map).forEach(function(entry) {
            var id  = entry[0];
            var html = entry[1];
            var el  = document.getElementById(id);
            if (!el) return;
            var tpl = document.createElement('template');
            tpl.innerHTML = html.trim();
            el.replaceWith(tpl.content);
        });
        /* Sinaliza para global.js que os elementos estão no DOM */
        document.dispatchEvent(new CustomEvent('partials:ready'));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', doInject, { once: true });
    } else {
        doInject();
    }
})();
