document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.querySelector('i').className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // Navbar scroll behavior
    let lastScroll = 0;
    const nav = document.querySelector('.nav');
    const scrollThreshold = 100; // Amount of scroll before navbar hides

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.classList.remove('nav--hidden');
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            // Scrolling down & past threshold
            nav.classList.add('nav--hidden');
        } else if (currentScroll < lastScroll) {
            // Scrolling up
            nav.classList.remove('nav--hidden');
        }
        lastScroll = currentScroll;
    });

    // Sliders
    document.querySelectorAll('.scroll-container').forEach(slider => {
        const next = slider.parentElement.querySelector('.scroll-btn.next');
        const prev = slider.parentElement.querySelector('.scroll-btn.prev');
        
        if (!next || !prev) return;

        next.addEventListener('click', () => {
            slider.scrollBy({ left: 300, behavior: 'smooth' });
        });

        prev.addEventListener('click', () => {
            slider.scrollBy({ left: -300, behavior: 'smooth' });
        });
    });
});