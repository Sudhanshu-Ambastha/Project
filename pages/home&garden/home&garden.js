document.addEventListener('DOMContentLoaded', async function() {
    console.log('Home & Garden page loaded');
    const productsContainer = document.querySelector('#product-container');

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products/category/home-decoration'); 
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const products = await response.json();
            displayProducts(products.products); // Ensure you access the correct data structure
        } catch (error) {
            console.error('Error fetching products:', error);
            productsContainer.innerHTML = '<p>Error fetching products. Please try again later.</p>';
        }
    };

    const displayProducts = (products) => {
        productsContainer.innerHTML = '<h2>Transform Your Home with Our Garden Collection</h2>';
        products.forEach((product) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <p>${product.description}</p>
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
