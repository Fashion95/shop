// Helper function to update the cart display
function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.querySelector('.cart-items');
    const cartSummary = document.querySelector('.cart-summary h3');
    
    // Clear the existing cart items
    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty!</p>';
        cartSummary.textContent = 'Total: $0.00';
        return;
    }

    let total = 0;

    // Render each cart item
    cartItems.forEach(item => {
        total += item.price;
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <button class="cta-button" onclick="removeFromCart('${item.id}')">Remove</button>
            </div>
        `;
        cartContainer.appendChild(cartItemElement);
    });

    // Update cart summary
    cartSummary.textContent = `Total: $${total.toFixed(2)}`;
}

// Add item to cart
function addToCart() {
    const productId = new URLSearchParams(window.location.search).get('id');
    const product = getProductById(productId);

    if (!product) return;

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert(`${product.name} has been added to your cart!`);
    
}

// Remove item from cart
function removeFromCart(itemId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCart();
}

// Get product by ID (mock function)
function getProductById(id) {
    // This should ideally be fetched from a server or a database
    const products = [
        { id: '1', name: 'Elegant Watch', price: 299.99, image: '68.jpg' },
        {id: '1', name: 'Skelton dial quartez watch', price:150, image: '68.jpg' },
        // Add more products as needed
    ];
    return products.find(product => product.id === id);
}

// Basic form validation
function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    if (!name || !email || !address) {
        alert('Please fill out all fields.');
        return false;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    return true;
}

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('cart')) {
        updateCart();
    }

    if (document.body.classList.contains('checkout')) {
        document.querySelector('form').addEventListener('submit', (e) => {
            if (!validateForm()) {
                e.preventDefault();
            }
        });
    }
});
