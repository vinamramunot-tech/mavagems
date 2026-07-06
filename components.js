class MavaHeader extends HTMLElement {
    connectedCallback() {
        const theme = this.getAttribute('theme') || 'dark';
        const isLight = theme === 'light';
        const textColorClass = isLight ? 'text-white' : 'text-on-surface';
        const textOpacityClass = isLight ? 'text-white/70' : 'text-on-surface/70';
        
        // Handle active navigation link dynamically
        const currentPath = window.location.pathname.split('/').pop() || '';
        const isMfg     = currentPath === 'manufacturing.html' || currentPath === 'manufacturing';
        const isAbout   = currentPath === 'about-us.html'      || currentPath === 'about-us';
        const isContact = currentPath === 'contact-us.html'    || currentPath === 'contact-us';
        const isShop    = currentPath === 'shop.html'          || currentPath === 'shop';

        const getNavLinkClass = (isActive) => {
            return isActive 
                ? "font-label uppercase tracking-[0.1rem] text-sm text-primary font-bold"
                : "font-label uppercase tracking-[0.1rem] text-sm text-on-surface/60 hover:text-primary transition-colors";
        };

        this.innerHTML = `
    <!-- TopAppBar -->
    <header class="fixed top-0 w-full z-50 transition-all duration-500 bg-white/10 backdrop-blur-sm border-b border-white/5" id="header-nav">
        <nav class="flex items-center justify-between px-8 py-6 w-full max-w-none relative">
            <div class="flex items-center gap-6">
                <button class="${textColorClass} hover:text-primary transition-colors" id="menu-btn">
                    <span class="material-symbols-outlined transition-colors duration-600" data-icon="menu">menu</span>
                </button>
            </div>
            <!-- Centered Logo with Scroll Animation -->
            <a href="/" class="absolute left-1/2 -translate-x-1/2 flex flex-col items-center" id="nav-logo-container" style="transform: translateX(-50%) scale(1.2);">
                <span class="text-xl md:text-2xl font-headline tracking-[0.2em] uppercase font-light leading-tight ${textColorClass}" id="nav-logo-mava">MAVA</span>
                <span class="text-[10px] md:text-[12px] font-headline tracking-[0.4em] uppercase font-light -mt-1 ${textOpacityClass}" id="nav-logo-gems">GEMS</span>
            </a>
            <div class="flex items-center gap-6">
                <a href="/shop" class="${textColorClass} hover:text-primary transition-colors" id="shop-btn" aria-label="Shop">
                    <span class="material-symbols-outlined transition-colors duration-600" data-icon="store">store</span>
                </a>
            </div>
        </nav>
    </header>

    <!-- Side Navigation Drawer & Overlay -->
    <div class="fixed inset-0 z-[60] pointer-events-none" id="nav-overlay">
        <!-- Clickable background overlay -->
        <div class="fixed inset-0 bg-black/20 backdrop-blur-sm opacity-0 transition-opacity duration-500 pointer-events-none" id="overlay-bg"></div>
        
        <div class="fixed inset-y-0 left-0 flex flex-col p-10 bg-[#FDF8F5] dark:bg-[#1C1B1A] h-full w-[320px] border-r border-[#ECE7E4]/20 shadow-2xl transition-transform -translate-x-full pointer-events-auto" id="nav-drawer">
            <div class="flex justify-between items-center mb-20">
                <a href="/" class="font-headline text-xl tracking-widest text-[#1C1B1A] dark:text-[#FDF8F5] hover:text-primary transition-colors cursor-pointer">MAVA GEMS</a>
                <button class="text-[#1C1B1A] dark:text-[#FDF8F5]" id="close-menu-btn">
                    <span class="material-symbols-outlined" data-icon="close">close</span>
                </button>
            </div>
            <div class="space-y-12">
                <div>
                    <nav class="flex flex-col gap-6">
                        <a class="${getNavLinkClass(isAbout)}" href="/about-us">About Us</a>
                        <a class="${getNavLinkClass(isMfg)}" href="/manufacturing">Manufacturing</a>
                        <a class="${getNavLinkClass(isContact)}" href="/contact-us">Contact Us</a>
                        <a class="${getNavLinkClass(isShop)}" href="/shop">Shop</a>
                    </nav>
                </div>
            </div>
            <div class="mt-auto">
                <p class="font-headline text-sm italic text-[#1C1B1A]/40 dark:text-[#FDF8F5]/40">Exquisite Zambian Emeralds</p>
            </div>
        </div>
    </div>
        `;
    }
}
customElements.define('mava-header', MavaHeader);

class MavaFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<footer class="bg-[#ECE7E4] dark:bg-[#121110] w-full py-16 border-t border-[#1C1B1A]/5">
<div class="flex flex-col items-center gap-8 px-8 w-full">
<div class="flex flex-col items-center">
<span class="text-2xl font-headline tracking-[0.2em] uppercase text-[#1C1B1A] dark:text-[#FDF8F5] font-light leading-tight">MAVA</span>
<span class="text-[12px] font-headline tracking-[0.4em] uppercase text-[#1C1B1A] dark:text-[#FDF8F5] font-light -mt-1">GEMS</span>
</div>
<div class="flex flex-wrap justify-center gap-12 mt-4">
<a class="font-label uppercase tracking-[0.05rem] text-[10px] text-[#1C1B1A]/50 dark:text-[#FDF8F5]/40 hover:text-[#1C1B1A] dark:hover:text-[#FDF8F5] transition-opacity" href="#">Privacy Policy</a>
<a class="font-label uppercase tracking-[0.05rem] text-[10px] text-[#1C1B1A]/50 dark:text-[#FDF8F5]/40 hover:text-[#1C1B1A] dark:hover:text-[#FDF8F5] transition-opacity" href="#">Terms of Service</a>
<a class="font-label uppercase tracking-[0.05rem] text-[10px] text-[#1C1B1A]/50 dark:text-[#FDF8F5]/40 hover:text-[#1C1B1A] dark:hover:text-[#FDF8F5] transition-opacity" href="#">Sustainability</a>
</div>
<div class="flex gap-6 mt-6 items-center">
<span class="font-label uppercase tracking-[0.1rem] text-[10px] text-[#1C1B1A]/50 dark:text-[#FDF8F5]/40 mr-2">Follow Us</span>
<a aria-label="LinkedIn" class="text-[#1C1B1A] dark:text-[#FDF8F5] hover:text-primary transition-colors" href="https://www.linkedin.com/company/mava-gems" target="_blank" rel="noopener noreferrer">
<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
</a>
<a aria-label="Instagram" class="text-[#1C1B1A] dark:text-[#FDF8F5] hover:text-primary transition-colors" href="https://www.instagram.com/mavagems" target="_blank" rel="noopener noreferrer">
<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path></svg>
</a>
</div>
<p class="font-label uppercase tracking-[0.05rem] text-[10px] text-[#1C1B1A]/30 mt-8">© 2026 MAVA GEMS. ALL RIGHTS RESERVED.</p>
</div>
</footer>
        `;
    }
}
customElements.define('mava-footer', MavaFooter);
