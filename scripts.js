// Mock data for products
const products = [
    { id: '1', name: 'Elegant Watch', price: 299.99, image: 'watch1.jpg', category: 'luxury', rating: 4 },
    { id: '2', name: 'Sport Watch', price: 199.99, image: 'watch2.jpg', category: 'sport', rating: 5 },
    { id: '3', name: 'Casual Watch', price: 149.99, image: 'watch3.jpg', category: 'casual', rating: 3 },
    {id: '4', name: ''}
    // Add more products as need
];

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
        total += item.price * item.quantity;
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
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
    return products.find(product => product.id === id);
}

// Display products
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <a href="product-detail.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <p>Rating: ${'⭐'.repeat(product.rating)}</p>
                <button class="cta-button" onclick="addToCart('${product.id}')">Add to Cart</button>
                <button class="cta-button" onclick="addToWishlist('${product.id}')">Add to Wishlist</button>
            </a>
        `;
        productList.appendChild(productElement);
    });
}

// Search products
function searchProducts() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchInput)
    );
    displayProducts(filteredProducts);
}

// Filter products by category
function filterProducts() {
    const category = document.getElementById('category-filter').value;
    const filteredProducts = category
        ? products.filter(product => product.category === category)
        : products;
    displayProducts(filteredProducts);
}

// Add item to wishlist
function addToWishlist(productId) {
    const product = getProductById(productId);
    if (!product) return;

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.some(item => item.id === product.id)) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert(`${product.name} has been added to your wishlist!`);
    } else {
        alert(`${product.name} is already in your wishlist.`);
    }
}

// Update wishlist display
function updateWishlist() {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistContainer = document.getElementById('wishlist-items');
    
    // Clear the existing wishlist items
    wishlistContainer.innerHTML = '';

    if (wishlistItems.length === 0) {
        wishlistContainer.innerHTML = '<p>Your wishlist is empty!</p>';
        return;
    }

    // Render each wishlist item
    wishlistItems.forEach(item => {
        const wishlistItemElement = document.createElement('div');
        wishlistItemElement.className = 'wishlist-item';
        wishlistItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="wishlist-item-info">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <button class="cta-button" onclick="removeFromWishlist('${item.id}')">Remove</button>
            </div>
        `;
        wishlistContainer.appendChild(wishlistItemElement);
    });
}

// Remove item from wishlist
function removeFromWishlist(itemId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(item => item.id !== itemId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlist();
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

// Initialize cart and wishlist on page load
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

    if (document.body.classList.contains('products')) {
        displayProducts(products);
    }

    if (document.body.classList.contains('wishlist')) {
        updateWishlist();
    }
});
