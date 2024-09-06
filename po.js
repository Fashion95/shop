document.addEventListener('DOMContentLoaded', function () {

    // Function to handle Add to Cart button
    function addToCart() {
        alert('Item added to cart!');
        console.log('Item added to cart.');
    }

    // Attach addToCart function to all "Add to Cart" buttons
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Example of additional functionality (if needed)
    // For example, you could add functionality to display a modal or update cart count

});
