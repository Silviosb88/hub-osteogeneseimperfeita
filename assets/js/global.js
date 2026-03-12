/**
 * Hub Osteogênese Imperfeita — JavaScript Global Unificado
 * Versão 2.1 | Arquitetura de Componentes | WCAG 2.1 AA
 *
 * Módulos:
 * 1. HubSidebar      — Controle do menu lateral
 * 2. HubA11y         — Widget de acessibilidade
 * 3. HubPageIndex    — Índice ativo por scroll
 * 4. HubBackToTop    — Botão voltar ao topo
 * 5. HubSmoothScroll — Scroll suave
 * 6. HubSearch       — Busca no header
 * 7. HubVisitorCount — Contador de visitas (localStorage)
 * 8. HubInit         — Bootstrap geral
 */

'use strict';

/* ==========================================================
   1. HubSidebar — Menu lateral
   ========================================================== */
const HubSidebar = {
    sidebar: null,
    overlay: null,
    toggle: null,
    closeBtn: null,
    focusableSelectors:
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',

    init() {
        this.sidebar  = document.getElementById('hubSidebar');
        this.overlay  = document.getElementById('sidebarOverlay');
        this.toggle   = document.getElementById('menuToggle');
        this.closeBtn = document.getElementById('sidebarClose');

        if (!this.sidebar) return;

        this.toggle?.addEventListener('click', () => this.open());
        this.closeBtn?.addEventListener('click', () => this.close());
        this.overlay?.addEventListener('click', () => this.close());

        /* Fechar com ESC */
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) this.close();
        });

        /* Submenus */
        this.sidebar.querySelectorAll('[data-submenu-toggle]').forEach(btn => {
            btn.addEventListener('click', () => this.toggleSubmenu(btn));
        });

        /* Ativar link atual */
        this.setActiveLink();

        /* Fechar sidebar em mobile ao clicar em link */
        this.sidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) this.close();
            });
        });
    },

    open() {
        this.sidebar.classList.add('is-open');
        this.overlay?.classList.add('is-active');
        this.toggle?.setAttribute('aria-expanded', 'true');
        this.sidebar.setAttribute('aria-hidden', 'false');
        /* Foco no primeiro elemento focável */
        const firstFocusable = this.sidebar.querySelector(this.focusableSelectors);
        firstFocusable?.focus();
        /* Evitar scroll do body */
        document.body.style.overflow = 'hidden';
    },

    close() {
        this.sidebar.classList.remove('is-open');
        this.overlay?.classList.remove('is-active');
        this.toggle?.setAttribute('aria-expanded', 'false');
        this.sidebar.setAttribute('aria-hidden', 'true');
        this.toggle?.focus();
        document.body.style.overflow = '';
    },

    isOpen() {
        return this.sidebar.classList.contains('is-open');
    },

    toggleSubmenu(btn) {
        const targetId = btn.getAttribute('data-submenu-toggle');
        const submenu  = document.getElementById(targetId);
        if (!submenu) return;

        const isOpen = submenu.classList.contains('is-open');
        submenu.classList.toggle('is-open', !isOpen);
        btn.classList.toggle('is-rotated', !isOpen);
        btn.setAttribute('aria-expanded', String(!isOpen));
    },

    setActiveLink() {
        const current = window.location.pathname.split('/').pop() || 'index.html';
        this.sidebar.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === current || href === './' + current) {
                link.classList.add('is-active');
                link.setAttribute('aria-current', 'page');
                /* Abrir submenu pai se existir */
                const submenu = link.closest('.sidebar-submenu');
                if (submenu) {
                    submenu.classList.add('is-open');
                    const toggleBtn = document.querySelector(
                        `[data-submenu-toggle="${submenu.id}"]`
                    );
                    toggleBtn?.classList.add('is-rotated');
                    toggleBtn?.setAttribute('aria-expanded', 'true');
                }
            }
        });
    }
};

/* ==========================================================
   2. HubA11y — Widget de acessibilidade
   ========================================================== */
const HubA11y = {
    STORAGE_KEY: 'hubOI_a11y',

    defaults: {
        highContrast: false,
        largeText:    false,
        darkMode:     false,
    },

    prefs: {},

    init() {
        this.prefs = this.loadPrefs();
        this.applyAll();

        const widgetToggle = document.getElementById('a11yWidgetToggle');
        const widgetPanel  = document.getElementById('a11yWidgetPanel');

        widgetToggle?.addEventListener('click', () => {
            const open = widgetPanel.classList.toggle('is-open');
            widgetToggle.setAttribute('aria-expanded', String(open));
        });

        /* Botões do painel flutuante */
        document.getElementById('a11yBtnContrast')?.addEventListener('click', () => {
            this.toggle('highContrast');
        });
        document.getElementById('a11yBtnLargeText')?.addEventListener('click', () => {
            this.toggle('largeText');
        });
        document.getElementById('a11yBtnDark')?.addEventListener('click', () => {
            this.toggle('darkMode');
        });
        document.getElementById('a11yBtnReset')?.addEventListener('click', () => {
            this.reset();
        });

        /* Botões do header */
        document.getElementById('headerA11yContrast')?.addEventListener('click', () => {
            this.toggle('highContrast');
        });
        document.getElementById('headerA11yLargeText')?.addEventListener('click', () => {
            this.toggle('largeText');
        });
        document.getElementById('headerA11yDark')?.addEventListener('click', () => {
            this.toggle('darkMode');
        });
    },

    toggle(key) {
        this.prefs[key] = !this.prefs[key];
        this.savePrefs();
        this.apply(key, this.prefs[key]);
        this.updateButtons();
    },

    apply(key, value) {
        const classMap = {
            highContrast: 'a11y-high-contrast',
            largeText:    'a11y-large-text',
            darkMode:     'a11y-dark-mode',
        };
        document.body.classList.toggle(classMap[key], value);
    },

    applyAll() {
        Object.keys(this.prefs).forEach(key => this.apply(key, this.prefs[key]));
        this.updateButtons();
    },

    reset() {
        this.prefs = { ...this.defaults };
        this.savePrefs();
        this.applyAll();
    },

    updateButtons() {
        const map = {
            highContrast: ['a11yBtnContrast', 'headerA11yContrast'],
            largeText:    ['a11yBtnLargeText', 'headerA11yLargeText'],
            darkMode:     ['a11yBtnDark',      'headerA11yDark'],
        };
        Object.keys(map).forEach(key => {
            map[key].forEach(id => {
                const btn = document.getElementById(id);
                if (btn) {
                    btn.classList.toggle('is-active', this.prefs[key]);
                    btn.setAttribute('aria-pressed', String(this.prefs[key]));
                }
            });
        });
    },

    loadPrefs() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            return stored ? { ...this.defaults, ...JSON.parse(stored) } : { ...this.defaults };
        } catch {
            return { ...this.defaults };
        }
    },

    savePrefs() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.prefs));
        } catch {
            /* localStorage indisponível — ignorar */
        }
    }
};

/* ==========================================================
   3. HubPageIndex — Índice ativo por scroll
   ========================================================== */
const HubPageIndex = {
    links: [],
    sections: [],
    observer: null,

    init() {
        const pageIndex = document.querySelector('.page-index');
        if (!pageIndex) return;

        this.links = Array.from(pageIndex.querySelectorAll('.page-index__link'));
        this.sections = this.links
            .map(link => {
                const id = link.getAttribute('href')?.replace('#', '');
                return id ? document.getElementById(id) : null;
            })
            .filter(Boolean);

        if (!this.sections.length) return;

        this.observer = new IntersectionObserver(
            (entries) => this.onIntersect(entries),
            {
                root: null,
                rootMargin: `-${getComputedStyle(document.documentElement)
                    .getPropertyValue('--header-height').trim()} 0px -60% 0px`,
                threshold: 0,
            }
        );

        this.sections.forEach(s => this.observer.observe(s));
    },

    onIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                this.links.forEach(link => {
                    const isActive = link.getAttribute('href') === '#' + id;
                    link.classList.toggle('is-active', isActive);
                    if (isActive) link.setAttribute('aria-current', 'location');
                    else link.removeAttribute('aria-current');
                });
            }
        });
    }
};

/* ==========================================================
   4. HubBackToTop — Botão voltar ao topo
   ========================================================== */
const HubBackToTop = {
    btn: null,
    THRESHOLD: 400,

    init() {
        this.btn = document.getElementById('backToTop');
        if (!this.btn) return;

        window.addEventListener('scroll', () => this.onScroll(), { passive: true });
        this.btn.addEventListener('click', () => this.scrollToTop());
    },

    onScroll() {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        this.btn.classList.toggle('is-visible', scrolled > this.THRESHOLD);
    },

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        /* Colocar foco no início para acessibilidade */
        setTimeout(() => {
            const mainContent = document.getElementById('main-content');
            mainContent?.focus();
        }, 500);
    }
};

/* ==========================================================
   5. HubSmoothScroll — Scroll suave para links âncora
   ========================================================== */
const HubSmoothScroll = {
    init() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const headerHeight = parseInt(
                getComputedStyle(document.documentElement)
                    .getPropertyValue('--header-height')
            ) || 70;

            const y = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;

            window.scrollTo({ top: y, behavior: 'smooth' });

            /* Foco acessível no target */
            if (!target.hasAttribute('tabindex')) {
                target.setAttribute('tabindex', '-1');
            }
            target.focus({ preventScroll: true });
        });
    }
};

/* ==========================================================
   6. HubSearch — Busca simples no header
   ========================================================== */
const HubSearch = {
    form: null,
    input: null,

    init() {
        this.form  = document.getElementById('headerSearchForm');
        this.input = document.getElementById('headerSearchInput');
        if (!this.form || !this.input) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.search(this.input.value.trim());
        });
    },

    search(query) {
        if (!query) return;
        /* Redireciona para página de busca ou aplica lógica local */
        const params = new URLSearchParams({ q: query });
        window.location.href = 'busca.html?' + params.toString();
    }
};

/* ==========================================================
   7. HubVisitorCount — Contador de visitas (localStorage)
   ========================================================== */
const HubVisitorCount = {
    STORAGE_KEY: 'hubOI_pageviews',

    init() {
        const el = document.getElementById('visitorCount');
        if (!el) return;

        try {
            const stored  = localStorage.getItem(this.STORAGE_KEY);
            const data    = stored ? JSON.parse(stored) : {};
            const page    = window.location.pathname.split('/').pop() || 'index.html';

            /* Incrementa contador da página atual */
            data[page]    = (data[page] || 0) + 1;

            /* Total de visualizações de todas as páginas */
            const total   = Object.values(data).reduce((a, b) => a + b, 0);

            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));

            /* Exibe com formatação de milhar — contagem local neste dispositivo */
            el.textContent = total.toLocaleString('pt-BR') + ' visualizações (neste dispositivo)';
        } catch {
            el.textContent = '—';
        }
    }
};

/* ==========================================================
   8. HubInit — Bootstrap geral
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
    HubSidebar.init();
    HubA11y.init();
    HubPageIndex.init();
    HubBackToTop.init();
    HubSmoothScroll.init();
    HubSearch.init();
    HubVisitorCount.init();

    /* Fechar widget de acessibilidade ao clicar fora */
    document.addEventListener('click', (e) => {
        const widget      = document.getElementById('a11yWidget');
        const widgetPanel = document.getElementById('a11yWidgetPanel');
        const toggle      = document.getElementById('a11yWidgetToggle');

        if (widget && widgetPanel && !widget.contains(e.target)) {
            widgetPanel.classList.remove('is-open');
            toggle?.setAttribute('aria-expanded', 'false');
        }
    });

    /* Adicionar classe js-loaded para progressive enhancement */
    document.documentElement.classList.add('js-loaded');
});

/* Compatibilidade: expor toggleSubmenu globalmente (legado) */
window.toggleSubmenu = function(id) {
    const btn = document.querySelector(`[data-submenu-toggle="${id}"]`);
    if (btn) HubSidebar.toggleSubmenu(btn);
};
