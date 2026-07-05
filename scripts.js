document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    //  1. HERO VIDEO — smooth fade-in once playback starts
    // ============================================================
    const indexHeroVideo = document.getElementById('indexHeroVideo');
    if (indexHeroVideo) {
        indexHeroVideo.playbackRate = 0.60;

        const revealVideo = () => indexHeroVideo.classList.add('loaded');

        // If already playable, reveal immediately; otherwise wait
        if (indexHeroVideo.readyState >= 3) {
            revealVideo();
        } else {
            indexHeroVideo.addEventListener('canplay', revealVideo, { once: true });
            // Fallback: reveal after 2s regardless
            setTimeout(revealVideo, 2000);
        }
    }


    // ============================================================
    //  2. SCROLL-REVEAL — IntersectionObserver for all .reveal* elems
    // ============================================================
    const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
    const revealElements = document.querySelectorAll(revealSelectors);

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        // Once revealed, stop watching to save resources
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,      // trigger when 12% of element is visible
                rootMargin: '0px 0px -40px 0px'  // slight negative bottom margin
            }
        );

        revealElements.forEach(el => revealObserver.observe(el));
    }


    // ============================================================
    //  3. NAVIGATION DRAWER / SIDEBAR TOGGLE
    // ============================================================
    const menuBtn      = document.getElementById('menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const navDrawer    = document.getElementById('nav-drawer');
    const navOverlay   = document.getElementById('nav-overlay');
    const overlayBg    = document.getElementById('overlay-bg');

    function openNav() {
        if (!navDrawer) return;
        navDrawer.classList.add('open');
        navDrawer.classList.remove('-translate-x-full');
        if (navOverlay) navOverlay.classList.remove('pointer-events-none');
        if (overlayBg) {
            overlayBg.classList.add('opacity-100');
            overlayBg.classList.remove('pointer-events-none');
        }
        document.body.style.overflow = 'hidden'; // prevent background scroll
    }

    function closeNav() {
        if (!navDrawer) return;
        navDrawer.classList.remove('open');
        navDrawer.classList.add('-translate-x-full');
        if (overlayBg) {
            overlayBg.classList.remove('opacity-100');
            overlayBg.classList.add('pointer-events-none');
        }
        if (navOverlay) navOverlay.classList.add('pointer-events-none');
        document.body.style.overflow = '';
    }

    if (menuBtn)      menuBtn.addEventListener('click', openNav);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeNav);
    if (overlayBg)    overlayBg.addEventListener('click', closeNav);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeNav();
    });


    // ============================================================
    //  4. SCROLL — Header colour + logo scale transition
    // ============================================================
    const scrollThreshold = 150;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const body = document.body;
        const logoContainer = document.getElementById('nav-logo-container');

        const progress = Math.min(scrollY / scrollThreshold, 1);
        const currentScale = 1.2 - (progress * 0.2); // 1.2 → 1.0

        if (logoContainer) {
            logoContainer.style.transform = `translateX(-50%) scale(${currentScale})`;
        }

        body.classList.toggle('scrolled', scrollY > 50);
    }, { passive: true });


    // ============================================================
    //  5. TIMELINE SCROLL INDICATORS (index.html)
    // ============================================================
    const timelineScroll = document.getElementById('years-scroll-container');
    const yearsContainer = document.getElementById('years-container');

    if (timelineScroll && yearsContainer) {
        const updateIndicators = () => {
            const isAtTop    = timelineScroll.scrollTop <= 5;
            const isAtBottom = timelineScroll.scrollHeight - timelineScroll.scrollTop <= timelineScroll.clientHeight + 5;
            yearsContainer.classList.toggle('scroll-at-top',    isAtTop);
            yearsContainer.classList.toggle('scroll-at-bottom', isAtBottom);
        };

        timelineScroll.addEventListener('scroll', updateIndicators, { passive: true });
        updateIndicators(); // initial check
    }


    // ============================================================
    //  6. CONTACT FORM (contact-us.html)
    // ============================================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const fullName     = document.getElementById('full_name').value;
            const email        = document.getElementById('email').value;
            const businessName = document.getElementById('business_name').value;
            const subject      = document.getElementById('subject').value;
            const message      = document.getElementById('message').value;
            const submitBtn    = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;

            submitBtn.innerText = 'Validating...';
            submitBtn.disabled  = true;

            // Format check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a properly formatted email address.');
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled  = false;
                return;
            }

            // MX record check
            const domain = email.split('@')[1];
            try {
                const dnsResponse = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
                const dnsData     = await dnsResponse.json();
                if (!dnsData.Answer || dnsData.Answer.length === 0) {
                    alert(`The domain "@${domain}" does not exist or cannot receive emails. Please enter a valid working email.`);
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled  = false;
                    return;
                }
            } catch (error) {
                console.warn('Domain verification failed, proceeding...', error);
            }

            submitBtn.innerText = 'Sending...';

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    access_key: '89b8d2d1-56c0-4a5b-aba0-829b6a58423c',
                    name:     fullName,
                    email:    email,
                    business: businessName,
                    subject:  `MAVA Gems Inquiry: ${subject}`,
                    message:  message,
                })
            })
            .then(async (response) => {
                const json = await response.json();
                if (response.status === 200) {
                    submitBtn.innerText = 'Message Sent!';
                    contactForm.reset();
                } else {
                    submitBtn.innerText = 'Error Sending';
                    alert('Something went wrong! Please try again later.');
                }
                setTimeout(() => {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled  = false;
                }, 3000);
            })
            .catch(error => {
                console.error(error);
                submitBtn.innerText = 'Error Sending';
                setTimeout(() => {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled  = false;
                }, 3000);
                alert('Something went wrong! Please check your internet connection.');
            });
        });
    }

});


// ============================================================
//  TIMELINE TOGGLE — smooth cross-fade without display:none hack
//  Must be global (called via onclick in timeline_data.js HTML)
// ============================================================
window.showTimeline = function(year, btn) {

    // --- Buttons ---
    document.querySelectorAll('.year-btn').forEach(b => {
        b.classList.remove('active', 'text-on-surface');
        b.classList.add('text-on-surface/30');
    });
    btn.classList.add('active', 'text-on-surface');
    btn.classList.remove('text-on-surface/30');

    // --- Content panels: cross-fade ---
    const all = document.querySelectorAll('.timeline-content');
    const next = document.getElementById('content-' + year);

    // Fade out current active panel
    all.forEach(content => {
        if (content.classList.contains('active')) {
            content.classList.remove('active');
        }
    });

    // Fade in new panel on next frame so CSS transition fires
    if (next) {
        requestAnimationFrame(() => {
            next.classList.add('active');
        });
    }

    // Smooth-scroll the button into view in its container
    btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
};
