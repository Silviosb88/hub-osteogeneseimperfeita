/**
 * Hub Osteogênese Imperfeita — Loader de Partials Centralizados
 * Versão 1.0
 *
 * Carrega header, sidebar esquerdo e sidebar direito a partir de
 * assets/partials/*.html e injeta nos placeholders de cada página.
 *
 * Placeholders esperados no HTML:
 *   <div id="partial-header"></div>
 *   <div id="partial-sidebar-left"></div>
 *   <div id="partial-sidebar-right"></div>
 *
 * Após injetar os partials, dispara o evento "partials:ready" no document,
 * que o global.js aguarda para inicializar HubSidebar, HubQuickNav etc.
 */

'use strict';

(function () {
    /* Detecta o caminho base relativo à página atual.
       Todas as páginas ficam na raiz, então o caminho é sempre o mesmo. */
    const BASE = 'assets/partials/';

    const PARTIALS = [
        { id: 'partial-header',        file: BASE + 'header.html' },
        { id: 'partial-sidebar-left',  file: BASE + 'sidebar-left.html' },
        { id: 'partial-sidebar-right', file: BASE + 'sidebar-right.html' },
    ];

    /**
     * Busca um arquivo HTML e retorna o texto.
     * Usa cache: 'no-store' durante dev; em produção o CDN controla o cache.
     */
    async function fetchPartial(url) {
        const res = await fetch(url, { cache: 'default' });
        if (!res.ok) throw new Error(`Partial não encontrado: ${url} (${res.status})`);
        return res.text();
    }

    /**
     * Injeta o HTML do partial no placeholder, substituindo o elemento inteiro
     * pelo conteúdo real (não apenas o innerHTML, para manter semântica).
     */
    function inject(placeholder, html) {
        /* Cria um fragment temporário para parsear o HTML */
        const tpl = document.createElement('template');
        tpl.innerHTML = html.trim();
        /* Insere todos os nós filhos antes do placeholder e remove o placeholder */
        placeholder.replaceWith(tpl.content);
    }

    /**
     * Ponto de entrada — chamado assim que o script é carregado (antes de
     * DOMContentLoaded para minimizar layout shift).
     */
    async function loadPartials() {
        /* Aguarda DOM estar parseado (pode ser chamado antes de DOMContentLoaded) */
        if (document.readyState === 'loading') {
            await new Promise(resolve =>
                document.addEventListener('DOMContentLoaded', resolve, { once: true })
            );
        }

        /* Filtra só os placeholders que existem nesta página */
        const targets = PARTIALS
            .map(p => ({ ...p, el: document.getElementById(p.id) }))
            .filter(p => p.el !== null);

        if (targets.length === 0) {
            /* Nenhum placeholder → página não usa partials → dispara ready mesmo assim */
            document.dispatchEvent(new CustomEvent('partials:ready'));
            return;
        }

        try {
            /* Busca todos em paralelo */
            const results = await Promise.all(
                targets.map(p => fetchPartial(p.file).then(html => ({ ...p, html })))
            );

            /* Injeta em ordem */
            results.forEach(({ el, html }) => inject(el, html));

        } catch (err) {
            console.error('[HubPartials]', err);
            /* Mesmo com erro, dispara ready para não travar a página */
        }

        /* Sinaliza que os partials estão no DOM e os módulos podem inicializar */
        document.dispatchEvent(new CustomEvent('partials:ready'));
    }

    /* Executa imediatamente */
    loadPartials();

})();
