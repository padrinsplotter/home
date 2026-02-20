document.addEventListener('DOMContentLoaded', () => {
    // Project Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const galleries = document.querySelectorAll('.gallery');

    function switchTab(tabId) {
        const btn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        const targetGallery = document.getElementById(tabId);
        
        if (btn && targetGallery) {
            // Remove active class from all buttons and galleries
            tabBtns.forEach(b => b.classList.remove('active'));
            galleries.forEach(g => g.classList.remove('active'));

            // Add active class to clicked button and target gallery
            btn.classList.add('active');
            targetGallery.classList.add('active');
        }
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Deep link support
    function checkHash() {
        const hash = window.location.hash.replace('#', '');
        if (hash === 'residencial' || hash === 'automotivo') {
            switchTab(hash);
            
            // Scroll to portfolio section if a hash is present on load
            const portfolio = document.getElementById('portfolio');
            if (portfolio) {
                setTimeout(() => {
                    portfolio.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }

    window.addEventListener('load', checkHash);
    window.addEventListener('hashchange', checkHash);

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    // We need to dynamically get images from the active gallery
    let currentImages = [];
    let currentIndex = 0;

    function openLightbox(index, images) {
        currentImages = images;
        currentIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function updateLightboxImage() {
        const img = currentImages[currentIndex];
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateLightboxImage();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateLightboxImage();
    }

    // Attach click events to all images (even placeholders if they have img tags)
    // IMPORTANT: We need to re-query images or handle click delegation because tabs switch visibility
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG' && e.target.closest('.gallery-item')) {
            const gallery = e.target.closest('.gallery');
            // Get all images in the CURRENT gallery container
            const images = Array.from(gallery.querySelectorAll('img'));
            const index = images.indexOf(e.target);

            if (index !== -1) {
                e.stopPropagation(); // Prevent bubbling
                openLightbox(index, images);
            }
        }
    });

    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg && !e.target.closest('.lightbox-arrow')) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
    // Mobile Menu Toggle
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    }

    if (mobileMenuIcon) {
        mobileMenuIcon.addEventListener('click', toggleMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header Scroll Effect (Optional)
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
            header.style.boxShadow = 'none';
        }
    });
});
