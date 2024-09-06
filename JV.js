
// Products array
let products = [
  { id: 1, name: "Product 1", price: 10.99, quantity: 1 },
  { id: 2, name: "Product 2", price: 9.99, quantity: 1 },
  { id: 3, name: "Product 3", price: 12.99, quantity: 1 }
];

// Cart array
let cart = [];

// Function to add product to cart
function addToCart(productId) {
  const product = products.find(p => (link unavailable) === productId);
  cart.push(product);
  updateCart();
}

// Function to remove product from cart
function removeFromCart(productId) {
  cart = cart.filter(p => (link unavailable) !== productId);
  updateCart();
}

// Function to update cart display and calculations
function updateCart() {
  const cartTable = document.getElementById("cart-table");
  cartTable.innerHTML = "";
  cart.forEach(product => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.quantity}</td>
      <td><button onclick="removeFromCart(${(link unavailable)})">Remove</button></td>
    `;
    cartTable.appendChild(row);
  });
  const totalCost = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
  document.getElementById("total-cost").innerText = `Total: $${totalCost.toFixed(2)}`;
}


