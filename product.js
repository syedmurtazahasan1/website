document.addEventListener('DOMContentLoaded', () => {
    // Get product ID from URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    // Demo product data - In a real website, this would come from an API/database/backend
    const productData = {
        '1': {
            name: 'Sample Product',
            price: 99.99,
            description: 'Product description goes here...',
            images: [
                'images/placeholder.png',
                'images/placeholder.png',
                'images/placeholder.png',
                'images/placeholder.png'
            ]
        }
        // Add more products as needed
    };

    // Load product data if ID exists
    if (productId && productData[productId]) {
        const product = productData[productId];
        document.querySelector('.product-details h1').textContent = product.name;
        document.querySelector('.product-price').textContent = `$${product.price.toFixed(2)}`;
        document.querySelector('.product-description p').textContent = product.description;
        
        // Update main image and thumbnails
        const mainImage = document.getElementById('mainImage');
        mainImage.src = product.images[0];
        
        const thumbnails = document.querySelectorAll('.thumbnail-list img');
        thumbnails.forEach((thumb, index) => {
            thumb.src = product.images[index] || product.images[0];
        });
    }

    // Product Gallery
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail-list img');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            mainImage.src = thumb.src;
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    // Size Selection
    const sizeButtons = document.querySelectorAll('.size-btn');
    let selectedSize = null;

    sizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedSize = btn.dataset.size;
        });
    });

    // Color Selection
    const colorButtons = document.querySelectorAll('.color-btn');
    let selectedColor = null;

    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            colorButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedColor = btn.dataset.color;
        });
    });

    // Add to Cart
    const addToCartBtn = document.querySelector('#addToCart');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            if (!selectedSize) {
                alert('Please select a size');
                return;
            }

            const product = {
                id: new URLSearchParams(window.location.search).get('id'),
                name: document.querySelector('.product-details h1').textContent,
                price: parseFloat(document.querySelector('.product-price').textContent.replace('$', '')),
                size: selectedSize,
                color: selectedColor,  // Add selected color
                quantity: 1,
                image: mainImage.src
            };

            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));

            addToCartBtn.textContent = 'Added to Cart!';
            setTimeout(() => {
                addToCartBtn.textContent = 'Add to Cart';
            }, 2000);
        });
    }
});
