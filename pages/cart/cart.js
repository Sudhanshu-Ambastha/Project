document.addEventListener('DOMContentLoaded', () => {
    const cartList = document.getElementById('cart-list');
    const totalPriceElement = document.getElementById('total-price');
    
    // Retrieve cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    // Clear previous cart data and re-render cart items
    cartList.innerHTML = '';

    // Loop through the cart items and display them
    cartItems.forEach(item => {
        totalPrice += item.price * item.quantity;

        const productDiv = document.createElement('div');
        productDiv.classList.add('cart-item');
        productDiv.innerHTML = `
            <img src="${item.image || item.thumbnail}" alt="${item.label || item.title}" class="product-image">
            <h2>${item.label || item.title}</h2>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})" class="remove-btn"><i class="fa-solid fa-trash-can"></i> Remove</button>
        `;

        cartList.appendChild(productDiv);
    });

    // Update the total price
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
});

// Remove an item from the cart
const removeFromCart = (id) => {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems = cartItems.filter(item => item.id !== id);

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Reload the page to reflect changes
    location.reload();
};
