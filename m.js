// Mock data for products
const products = [
    { id: '1', name: 'Elegant Watch', price: 299.99, image: 'watch1.jpg', category: 'luxury', rating: 4 },
    { id: '2', name: 'Sport Watch', price: 199.99, image: 'watch2.jpg', category: 'sport', rating: 5 },
    { id: '3', name: 'Casual Watch', price: 149.99, image: 'watch3.jpg', category: 'casual', rating: 3 },
    // Add more products as needed
];

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
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.some(item => item.id === product.id)) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert(`${product.name} has been added to your wishlist!`);
    } else {
        alert(`${product.name} is already in your wishlist.`);
    }
