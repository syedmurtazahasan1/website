document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.querySelector('.cart-items');
    if (!cartContainer) return;

    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <p>Your cart is empty</p>
                    <a href="index.html" class="btn btn--primary">Continue Shopping</a>
                </div>`;
            updateTotals(0, 0);
            return;
        }

        cartContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="item-price">$${item.price.toFixed(2)}</p>
                    <div class="item-options">
                        ${item.size ? `<span class="item-size">Size: ${item.size}</span>` : ''}
                        ${item.color ? `<span class="item-color">Color: ${item.color}</span>` : ''}
                    </div>
                    <div class="item-quantity">
                        <button class="quantity-btn minus">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus">+</button>
                    </div>
                    <button class="remove-item">Remove</button>
                </div>
                <div class="item-total">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `).join('');

        // Calculate totals
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = cart.length > 0 ? 9.99 : 0;
        updateTotals(subtotal, shipping);

        // Add event listeners for quantity buttons and remove buttons
        setupCartInteractions();
    }

    function updateTotals(subtotal, shipping) {
        const total = subtotal + shipping;
        document.querySelector('.subtotal .amount').textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector('.shipping .amount').textContent = `$${shipping.toFixed(2)}`;
        document.querySelector('.total .amount').textContent = `$${total.toFixed(2)}`;
    }

    function setupCartInteractions() {
        // Handle quantity changes
        document.querySelectorAll('.minus, .plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cartItem = e.target.closest('.cart-item');
                const id = cartItem.dataset.id;
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                const itemIndex = cart.findIndex(item => item.id === id);
                
                if (itemIndex > -1) {
                    if (e.target.classList.contains('plus')) {
                        cart[itemIndex].quantity++;
                    } else if (e.target.classList.contains('minus') && cart[itemIndex].quantity > 1) {
                        cart[itemIndex].quantity--;
                    }
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                }
            });
        });

        // Handle remove item - using event delegation
        document.querySelector('.cart-items').addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item')) {
                const cartItem = e.target.closest('.cart-item');
                const id = cartItem.dataset.id;
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                const newCart = cart.filter(item => item.id !== id);
                localStorage.setItem('cart', JSON.stringify(newCart));
                renderCart();
            }
        });
    }

    // Initialize cart
    renderCart();
});
