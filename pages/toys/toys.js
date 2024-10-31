document.addEventListener('DOMContentLoaded', async function() {
    console.log('Toys page loaded');
    const productsContainer = document.querySelector('#product-container');

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/categories/1/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            displayProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            productsContainer.innerHTML = '<p>Error fetching products. Please try again later.</p>';
        }
    };

    const displayProducts = (products) => {
        productsContainer.innerHTML = '<h2>Find the Perfect Toy for Every Age</h2>';
        products.forEach((product) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to cart</button>
            `;
            productsContainer.appendChild(productDiv);
        });
    };

    await fetchProducts();
});

window.addToCart = (id) => {
    console.log('Added to cart:', id);
    // Handle adding product to cart
};
