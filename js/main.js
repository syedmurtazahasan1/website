import { ThemeToggle } from './components/ThemeToggle.js';
import { ProductCard } from './components/ProductCard.js';
import { NavScroll } from './components/NavScroll.js';
import { $ } from './utils/dom.js';
import { Cart } from './components/Cart.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    const themeToggle = new ThemeToggle();
    const navScroll = new NavScroll();
    
    themeToggle.init();
    navScroll.init();
    
    // Initialize product cards
    const trendList = $('.trend-list');
    if (trendList) {
        const products = Array.from(trendList.children).map(card => ({
            id: card.dataset.productId,
            name: card.dataset.productName,
            price: parseFloat(card.dataset.productPrice),
            image: card.querySelector('img').src,
            category: card.querySelector('.trend-category').textContent
        }));
        
        products.forEach(product => {
            const productCard = new ProductCard(product);
            trendList.innerHTML += productCard.render();
        });
    }
});