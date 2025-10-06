// Sample product data
const products = [
  { id: 1, name: "Wireless Headphones", price: 1999, img: "https://via.placeholder.com/200" },
  { id: 2, name: "Smart Watch", price: 2999, img: "https://via.placeholder.com/200" },
  { id: 3, name: "Bluetooth Speaker", price: 1499, img: "https://via.placeholder.com/200" },
  { id: 4, name: "Gaming Mouse", price: 999, img: "https://via.placeholder.com/200" }
];

const container = document.getElementById("product-container");
const cartCount = document.getElementById("cart-count");
const cartSidebar = document.getElementById("cart-sidebar");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

let cart = [];

// Load products dynamically
products.forEach(product => {
  const card = document.createElement("div");
  card.classList.add("product-card");

  card.innerHTML = `
    <img src="${product.img}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>₹${product.price}</p>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  `;
  
  container.appendChild(card);
});

// Add to cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const item = cart.find(c => c.id === id);

  if (item) {
    item.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

// Update cart display
function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x${item.quantity} - ₹${item.price * item.quantity}
      <button onclick="removeFromCart(${item.id})">❌</button>
    `;
    cartItemsContainer.appendChild(li);
  });

  cartTotal.textContent = `Total: ₹${total}`;
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Remove from cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// Toggle cart sidebar
function toggleCart() {
  cartSidebar.classList.toggle("active");
}

// Checkout (dummy)
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Thank you for your purchase! 🛍️");
    cart = [];
    updateCart();
    toggleCart();
  }
}
