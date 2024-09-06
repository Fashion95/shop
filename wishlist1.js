document.addEventListener('DOMContentLoaded', function () {

    // Example wishlist items
    const wishlistItems = [
        { id: 1, name: 'Elegant Watch', price: '$299.99', image: 'watch1.jpg' },
        { id: 2, name: 'Skeleton Dial Quartz Watch', price: '$399.99', image: '68.jpg' },
        { id: 3, name: 'Sporty Watch', price: '$249.99', image: '139.jpg' }
    ];

    // Function to render wishlist items
    function renderWishlist() {
        const wishlistContainer = document.getElementById('wishlist-items');
        wishlistContainer.innerHTML = ''; // Clear existing content

        wishlistItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'wishlist-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="wishlist-item-info">
                    <h3>${item.name}</h3>
                    <p>${item.price}</p>
                    <button class="cta-button" data-id="${item.id}">Remove</button>
                </div>
            `;
            wishlistContainer.appendChild(itemElement);
        });

        // Attach remove event listeners
        document.querySelectorAll('.wishlist-item .cta-button').forEach(button => {
            button.addEventListener('click', removeFromWishlist);
        });
    }

    // Function to handle item removal from wishlist
    function removeFromWishlist(event) {
        const itemId = parseInt(event.currentTarget.getAttribute('data-id'));
        // Filter out the removed item
        const updatedWishlist = wishlistItems.filter(item => item.id !== itemId);
        // Update the wishlist items array
        wishlistItems.length = 0; // Clear the array
        wishlistItems.push(...updatedWishlist);
        renderWishlist();
    }

    // Initial rendering of wishlist items
    renderWishlist();
});
