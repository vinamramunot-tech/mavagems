document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation Drawer / Sidebar Toggle ---
    const menuBtn = document.getElementById('menu-btn');
    const closeNavBtn = document.getElementById('close-nav-btn'); // For contact-us overlay nav
    const closeMenuBtn = document.getElementById('close-menu-btn'); // For manufacturing side nav
    const navDrawer = document.getElementById('nav-drawer'); // For contact-us overlay nav
    const sideNav = document.getElementById('side-nav'); // For standard side nav
    const navOverlay = document.getElementById('nav-overlay');
    const overlayBg = document.getElementById('overlay-bg');

    function openNav() {
        if (navDrawer) {
            navDrawer.classList.add('open');
            navDrawer.classList.remove('-translate-x-full');
            if (navOverlay) navOverlay.classList.remove('pointer-events-none');
            if (overlayBg) overlayBg.classList.add('opacity-100');
        }
        if (sideNav) {
            sideNav.classList.remove('-translate-x-full');
        }
    }

    function closeNav() {
        if (navDrawer) {
            navDrawer.classList.remove('open');
            navDrawer.classList.add('-translate-x-full');
            if (overlayBg) overlayBg.classList.remove('opacity-100');
            if (navOverlay) navOverlay.classList.add('pointer-events-none');
        }
        if (sideNav) {
            sideNav.classList.add('-translate-x-full');
        }
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', openNav);
    }
    
    if (closeNavBtn) closeNavBtn.addEventListener('click', closeNav);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeNav);
    if (overlayBg) overlayBg.addEventListener('click', closeNav);

    // Some pages might just have a simple button that toggles classes manually inline,
    // but the above covers all patterns used in the pages.
    // If the close button inside side-nav doesn't have an ID (like in index.html and about-us.html),
    // we attach listener to it dynamically:
    if (sideNav) {
        const simpleCloseBtn = sideNav.querySelector('button');
        if (simpleCloseBtn && !simpleCloseBtn.id) {
            simpleCloseBtn.addEventListener('click', closeNav);
        }
    }


    // --- Scroll Transition Logic (Header/Logo/Menu Colors) ---
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const scrollThreshold = 150;
        const body = document.body;
        const logoContainer = document.getElementById('nav-logo-container');
        
        // Progress from 0 to 1 based on threshold
        let progress = Math.min(scrollY / scrollThreshold, 1);
        
        // Calculate scale from 1.5 to 1.0 (some pages had 1.2 to 1.0)
        let currentScale = 1.2 - (progress * 0.2);
        
        // Apply transform
        if (logoContainer) {
            logoContainer.style.transform = `translateX(-50%) scale(${currentScale})`;
        }
        
        if (scrollY > 50) {
            body.classList.add('scrolled');
        } else {
            body.classList.remove('scrolled');
        }
    });


    // --- Timeline Scroll Indicators Logic (index.html) ---
    const timelineScroll = document.getElementById('years-scroll-container');
    const yearsContainer = document.getElementById('years-container');
    
    if (timelineScroll && yearsContainer) {
        const updateIndicators = () => {
            const isAtTop = timelineScroll.scrollTop <= 5;
            const isAtBottom = timelineScroll.scrollHeight - timelineScroll.scrollTop <= timelineScroll.clientHeight + 5;
            
            if (isAtTop) yearsContainer.classList.add('scroll-at-top');
            else yearsContainer.classList.remove('scroll-at-top');
            
            if (isAtBottom) yearsContainer.classList.add('scroll-at-bottom');
            else yearsContainer.classList.remove('scroll-at-bottom');
        };
        
        timelineScroll.addEventListener('scroll', updateIndicators);
        // Initial check
        updateIndicators();
    }

});

// --- Timeline Toggle Function (index.html) ---
// Must be global because it is called via inline onclick attribute in HTML
window.showTimeline = function(year, btn) {
    // Update buttons
    document.querySelectorAll('.year-btn').forEach(b => {
        b.classList.remove('active', 'text-on-surface');
        b.classList.add('text-on-surface/30');
    });
    btn.classList.add('active', 'text-on-surface');
    btn.classList.remove('text-on-surface/30');

    // Update content panels
    document.querySelectorAll('.timeline-content').forEach(content => {
        content.classList.remove('active');
        content.classList.add('hidden');
    });
    
    const activeContent = document.getElementById('content-' + year);
    if(activeContent) {
        activeContent.classList.remove('hidden');
        // Small timeout to allow the 'hidden' display property to change before triggering opacity
        setTimeout(() => {
            activeContent.classList.add('active');
        }, 10);
    }

    // Smooth scroll the button into view in its container
    btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
};
