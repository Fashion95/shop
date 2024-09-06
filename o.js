document.addEventListener('DOMContentLoaded', function () {

    // Search Products Function
    function searchProducts() {
        const searchInput = document.getElementById('search-input').value.toLowerCase();
        const products = document.querySelectorAll('.product');

        products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(searchInput)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Filter Products Function
    function filterProducts() {
        const selectedCategory = document.getElementById('category-filter').value.toLowerCase();
        const products = document.querySelectorAll('.product');

        products.forEach(product => {
            const productCategory = product.getAttribute('data-category');
            if (selectedCategory === '' || productCategory === selectedCategory) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Attach event listeners
    document.querySelector('.cta-button').addEventListener('click', searchProducts);
    document.getElementById('category-filter').addEventListener('change', filterProducts);

});
