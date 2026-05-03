class MavaHeader extends HTMLElement {
    connectedCallback() {
        const theme = this.getAttribute('theme') || 'dark';
        const isLight = theme === 'light';
        const textColorClass = isLight ? 'text-white' : 'text-on-surface';
        const textOpacityClass = isLight ? 'text-white/70' : 'text-on-surface/70';
        
        // Handle active navigation link dynamically
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const isMfg = currentPath === 'manufacturing.html';
        const isAbout = currentPath === 'about-us.html';
        const isContact = currentPath === 'contact-us.html';

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
            <a href="index.html" class="absolute left-1/2 -translate-x-1/2 flex flex-col items-center" id="nav-logo-container" style="transform: translateX(-50%) scale(1.2);">
                <span class="text-xl md:text-2xl font-headline tracking-[0.2em] uppercase font-light leading-tight ${textColorClass}" id="nav-logo-mava">MAVA</span>
                <span class="text-[10px] md:text-[12px] font-headline tracking-[0.4em] uppercase font-light -mt-1 ${textOpacityClass}" id="nav-logo-gems">GEMS</span>
            </a>
            <div class="w-10"></div>
        </nav>
    </header>

    <!-- SideNavBar -->
    <div class="fixed inset-y-0 left-0 z-[60] flex flex-col p-10 bg-[#FDF8F5] dark:bg-[#1C1B1A] h-full w-[320px] border-r border-[#ECE7E4]/20 shadow-2xl transition-transform -translate-x-full" id="side-nav">
        <div class="flex justify-between items-center mb-20">
            <a href="index.html" class="font-headline text-xl tracking-widest text-[#1C1B1A] dark:text-[#FDF8F5] hover:text-primary transition-colors cursor-pointer">MAVA GEMS</a>
            <button class="text-[#1C1B1A] dark:text-[#FDF8F5]" id="close-menu-btn">
                <span class="material-symbols-outlined" data-icon="close">close</span>
            </button>
        </div>
        <div class="space-y-12">
            <div>
                <nav class="flex flex-col gap-6">
                    <a class="${getNavLinkClass(isMfg)}" href="manufacturing.html">Manufacturing</a>
                    <a class="${getNavLinkClass(isAbout)}" href="about-us.html">About Us</a>
                    <a class="${getNavLinkClass(isContact)}" href="contact-us.html">Contact Us</a>
                </nav>
            </div>
        </div>
        <div class="mt-auto">
            <p class="font-headline text-sm italic text-[#1C1B1A]/40 dark:text-[#FDF8F5]/40">Exquisite Zambian Emeralds</p>
        </div>
    </div>
        `;
    }
}

customElements.define('mava-header', MavaHeader);
