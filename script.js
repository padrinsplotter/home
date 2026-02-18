document.addEventListener('DOMContentLoaded', () => {
    // Project Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const galleries = document.querySelectorAll('.gallery');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and galleries
            tabBtns.forEach(b => b.classList.remove('active'));
            galleries.forEach(g => g.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding gallery
            const tabId = btn.getAttribute('data-tab');
            const targetGallery = document.getElementById(tabId);
            if (targetGallery) {
                targetGallery.classList.add('active');
            }
        });
    });

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
