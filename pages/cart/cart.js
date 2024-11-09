document.addEventListener('DOMContentLoaded', () => {
    const cartList = document.getElementById('cart-list');
    const totalPriceElement = document.getElementById('total-price');
    
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    cartItems.forEach(item => {
        totalPrice += item.price * item.quantity;

        const productDiv = document.createElement('div');
        productDiv.classList.add('cart-item');
        productDiv.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}" class="product-image">
            <h2>${item.title}</h2>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})" class="remove-btn"><i class="fa-solid fa-trash-can"></i> Remove</button>
        `;

        cartList.appendChild(productDiv);
    });

    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
});

const removeFromCart = (id) => {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems = cartItems.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    location.reload(); 
};
