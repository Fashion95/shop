document.addEventListener('DOMContentLoaded', function () {

    // Function to handle Remove from Cart
    function removeFromCart(event) {
        const cartItem = event.currentTarget.closest('.cart-item');
        cartItem.remove();
        updateTotal();
    }

    // Function to update the total price
    function updateTotal() {
        let total = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            const priceText = item.querySelector('p').textContent;
            const price = parseFloat(priceText.replace('$', ''));
            total += price;
        });
        document.querySelector('.cart-summary h3').textContent = `Total: $${total.toFixed(2)}`;
    }

    // Attach removeFromCart function to all "Remove" buttons
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });

    // Update total on page load
    updateTotal();

});
