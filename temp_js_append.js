
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
        document.getElementById(tabId).classList.add('active');
    });
});
