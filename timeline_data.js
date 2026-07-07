// Edit this file to easily add, remove, or update timeline events on the website.
// To display a year on the timeline, set "showOnWebsite: true".
// To hide a year, set "showOnWebsite: false".

const timelineData = [
    {
        year: "1982",
        title: "The First Extraction",
        subtitle: "A discovery that shaped our future in the Muzo district.",
        description: "The foundation of MAVA Gems begins in the Muzo district of Colombia, discovering one of the most significant emerald veins of the decade.",
        showOnWebsite: false
    },
    {
        year: "1996",
        title: "Sourcing from Kagem",
        subtitle: "Discovering the vibrance of Zambian emeralds.",
        description: "We secured our first parcels of Kagem emeralds, captivated by their deep, bluish-green hue. This acquisition laid the groundwork for our future specialization in Zambian stones.",
        showOnWebsite: true
    },
    {
        year: "2005",
        title: "Artisanal Workshop Expansion",
        subtitle: "Mastering the craft from raw stone to brilliant gem.",
        description: "Transitioning from raw supply to a full vertically integrated manufacturing house, ensuring unparalleled cut quality in our state-of-the-art lapidary center.",
        showOnWebsite: false
    },
    {
        year: "2008",
        title: "The Gemfields Partnership",
        subtitle: "A strategic alliance rooted in ethical sourcing.",
        description: "We established a direct relationship with Gemfields, the world's leading supplier of responsibly sourced colored gemstones, securing access to premium Zambian rough material.",
        showOnWebsite: true
    },
    {
        year: "2019",
        title: "Founding MAVA Gems",
        subtitle: "Taking our family's legacy to the global stage.",
        description: "MAVA Gems Private Limited was formally established. This incorporation marked a new era for our business, allowing us to expand our international footprint and share our craftsmanship with the world.",
        showOnWebsite: true
    },
    {
        year: "2020",
        title: "Sustainability Initiative",
        subtitle: "Setting new standards for ethical sourcing.",
        description: "We launched our comprehensive 'Emerald Earth' program, ensuring that every stone is sourced with the highest regard for environmental and community impact.",
        showOnWebsite: false
    },
    {
        year: "2021",
        title: "Sourcing Innovation",
        subtitle: "Direct-to-mine transparency redefined.",
        description: "Implementation of real-time provenance tracking at the source, allowing our clients to trace the journey of their gem from the moment it leaves the earth.",
        showOnWebsite: false
    },
    {
        year: "2022",
        title: "Bespoke Digital Atelier",
        subtitle: "A virtual gateway to the world's finest emeralds.",
        description: "Introduction of our high-definition digital viewing platform, enabling private collectors to examine rare stones in microscopic detail from anywhere in the world.",
        showOnWebsite: false
    },
    {
        year: "2023",
        title: "Digital Transparency",
        subtitle: "Leading the industry with blockchain-backed heritage.",
        description: "Launching the world's first blockchain-backed emerald tracking system. Now, every MAVA emerald comes with a digital passport securing its unique provenance.",
        showOnWebsite: false
    },
    {
        year: "2024",
        title: "New Digital Frontiers",
        subtitle: "The future of verdant luxury is here.",
        description: "Expanding into immersive VR showrooms and AI-driven curation, MAVA Gems continues to define the pinnacle of the modern gemstone experience.",
        showOnWebsite: false
    }
];

// This function runs automatically to build the timeline on the page
function renderTimeline() {
    const yearsContainer = document.getElementById('years-scroll-container');
    const contentContainer = document.getElementById('timeline-content-container');
    
    if (!yearsContainer || !contentContainer) return;

    yearsContainer.innerHTML = '';
    contentContainer.innerHTML = '';

    const visibleData = timelineData.filter(item => item.showOnWebsite);
    
    visibleData.forEach((item, index) => {
        const isActive = index === 0;
        
        // Build Button
        const btn = document.createElement('button');
        btn.className = `year-btn snap-center shrink-0 w-auto md:w-full text-center md:text-left font-headline text-3xl md:text-5xl tracking-tight transition-all py-4 px-6 md:pr-12 md:pl-0 focus:outline-none whitespace-nowrap ${isActive ? 'active text-on-surface' : 'text-on-surface/30 hover:text-primary'}`;
        btn.onclick = function() { showTimeline(item.year, this); };
        btn.innerText = item.year;
        yearsContainer.appendChild(btn);

        // Build Content Panel
        const contentDiv = document.createElement('div');
        contentDiv.id = `content-${item.year}`;
        contentDiv.className = `timeline-content space-y-8 ${isActive ? 'active' : ''}`;
        
        contentDiv.innerHTML = `
            <div class="max-w-2xl">
                <h3 class="font-label text-xs font-bold tracking-[0.3em] uppercase text-primary mb-6">${item.title}</h3>
                <p class="font-headline text-3xl md:text-4xl font-light leading-snug text-on-surface mb-8">${item.subtitle}</p>
                <p class="font-body text-on-surface-variant text-lg leading-relaxed">${item.description}</p>
            </div>
        `;
        
        contentContainer.appendChild(contentDiv);
    });
}

// Render the timeline when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    renderTimeline();
});
