// Initialize Lucide Icons for clean line art visuals
lucide.createIcons();

// Set Dynamic Current Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Intersection Observer for Scroll Reveal Effects
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once visible for performance
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Mobile Navigation Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(255, 255, 255, 0.98)';
        navLinks.style.backdropFilter = 'blur(12px)';
        navLinks.style.padding = '1.5rem 5%';
        navLinks.style.borderBottom = '1px solid #E2E8F0';
        navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
        navLinks.style.gap = '1.5rem';
    }
});

// Reset menu layout on screen resize to prevent layout bugs
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'row';
        navLinks.style.position = 'static';
        navLinks.style.padding = '0';
        navLinks.style.background = 'transparent';
        navLinks.style.borderBottom = 'none';
        navLinks.style.boxShadow = 'none';
        navLinks.style.gap = '2rem';
    } else {
        navLinks.style.display = 'none';
    }
});
