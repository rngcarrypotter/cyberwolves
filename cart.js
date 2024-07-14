document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('cart-button');
    const closeCartButton = document.getElementById('close-cart-button');
    const cartPanel = document.getElementById('cart-panel');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItems = document.querySelector('.cart-items');
    const itemCount = document.getElementById('item-count');
    const totalPrice = document.getElementById('total-price');
    const cartCount = document.getElementById('cart-count');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <button onclick="removeItem(${index})">Remove</button>
                </div>
                <div class="cart-item-price">
                    <p>CHF ${item.price.toFixed(2)}</p>
                </div>
            `;

            cartItems.appendChild(cartItem);
            total += item.price;
        });

        itemCount.textContent = cart.length;
        totalPrice.textContent = total.toFixed(2);
        cartCount.textContent = cart.length;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    window.addItemToCart = (item) => {
        cart.push(item);
        updateCart();
        showNotification('Item added to cart!');
    };

    window.removeItem = (index) => {
        cart.splice(index, 1);
        updateCart();
        showNotification('Item removed from cart!');
    };

    updateCart();

    cartButton.addEventListener('click', () => {
        cartPanel.style.right = '0';
        cartOverlay.style.display = 'block';
    });

    closeCartButton.addEventListener('click', () => {
        cartPanel.style.right = '-100%';
        cartOverlay.style.display = 'none';
    });

    cartOverlay.addEventListener('click', () => {
        cartPanel.style.right = '-100%';
        cartOverlay.style.display = 'none';
    });

    document.getElementById('checkout-button').addEventListener('click', async () => {
        const response = await fetch('/api/cart/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart)
        });

        if (response.ok) {
            alert('Order placed successfully!');
            cart = [];
            updateCart();
        } else {
            alert('Error placing order.');
        }
    });

    document.getElementById('guest-checkout-button').addEventListener('click', async () => {
        const response = await fetch('/api/cart/checkout/guest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart)
        });

        if (response.ok) {
            alert('Order placed successfully!');
            cart = [];
            updateCart();
        } else {
            alert('Error placing order.');
        }
    });
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}
