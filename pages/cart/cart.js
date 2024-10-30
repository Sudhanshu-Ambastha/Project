let cart = [];

const addToCart = (id) => {
    cart.push(id);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart');
};

document.addEventListener('DOMContentLoaded', () => {
    const cartList = document.getElementById('cart-list');
    const proceedCheckout = document.getElementById('proceed-checkout');
    cart = JSON.parse(localStorage.getItem('cart')) || [];

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.in/api/products');
            const products = await response.json();
            displayCart(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const displayCart = (products) => {
        cartList.innerHTML = '';
        cart.forEach(id => {
            const product = products.find(p => p.id === id);
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p class="price">$${product.price}</p>
                <button onclick="removeFromCart(${product.id})">Remove from Cart</button>
            `;
            cartList.appendChild(productDiv);
        });
    };

    const removeFromCart = (id) => {
        cart = cart.filter(productId => productId !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        fetchProducts();
    };

    proceedCheckout.addEventListener('click', () => {
        alert('Proceeding to checkout');
        // Here, add your checkout logic
    });

    fetchProducts();
});
