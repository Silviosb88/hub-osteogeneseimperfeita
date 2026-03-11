/**
 * Hub Osteogênese Imperfeita - Main JavaScript
 */

// Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

if (menuToggle && sidebar && sidebarOverlay) {
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
    });

    sidebarOverlay.addEventListener('click', function() {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    });
}

// Submenu Toggle (função global para ser chamada do HTML)
window.toggleSubmenu = function(id) {
    const submenu = document.getElementById('submenu-' + id);
    const toggle = document.getElementById('toggle-' + id);
    
    if (submenu && toggle) {
        submenu.classList.toggle('open');
        toggle.classList.toggle('rotated');
    }
}

// Suporte para submenus com classe .has-submenu
document.addEventListener('DOMContentLoaded', function() {
    const submenuToggles = document.querySelectorAll('.has-submenu > a.submenu-toggle');
    
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            const icon = this.querySelector('.fa-chevron-down');
            
            if (submenu && submenu.classList.contains('submenu')) {
                submenu.classList.toggle('open');
                if (icon) {
                    icon.style.transform = submenu.classList.contains('open') ? 'rotate(180deg)' : '';
                }
            }
        });
    });
});


// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#' || href === '') {
            return;
        }
        
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
