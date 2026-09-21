// Initialize Lucide Icons
lucide.createIcons();

// Set Dynamic Current Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// --- Dark Mode Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check local storage for saved theme, otherwise default to light
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
}

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// --- Scroll Reveal Effects ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// --- Mobile Navigation Toggle ---
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
        // Use CSS variables for seamless mobile menu theme switching
        navLinks.style.background = 'var(--color-bg)';
        navLinks.style.padding = '1.5rem 5%';
        navLinks.style.borderBottom = '1px solid var(--color-border)';
        navLinks.style.gap = '1.5rem';
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'row';
        navLinks.style.position = 'static';
        navLinks.style.padding = '0';
        navLinks.style.background = 'transparent';
        navLinks.style.borderBottom = 'none';
        navLinks.style.gap = '2rem';
    } else {
        navLinks.style.display = 'none';
    }
});
