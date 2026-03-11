/**
 * main.js — ARQUIVO LEGADO (mantido para compatibilidade)
 * 
 * Este arquivo foi substituído por assets/js/global.js na versão 2.0
 * Mantido apenas para não quebrar referências antigas em páginas não migradas.
 * 
 * O novo JS global está em: assets/js/global.js
 */

// Carrega o novo JS global se ainda não foi carregado
if (!window.HubSidebar) {
    const script = document.createElement('script');
    script.src = 'assets/js/global.js';
    document.head.appendChild(script);
}
