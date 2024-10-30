import { fetchProductsByCategory } from '../main/api.js';

document.addEventListener('DOMContentLoaded', async function () {
    const mainContainer = document.querySelector('main');
    
    const displayProducts = (products) => {
        mainContainer.innerHTML = '';
        products.forEach((product) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            mainContainer.appendChild(productDiv);
        });
    };

    try {
        const products = await fetchProductsByCategory('jewelery'); 
        if (products && products.length > 0) {
            displayProducts(products);
        } else {
            console.warn('No products found or category mismatch.');
            mainContainer.innerHTML = '<p>No products available in this category.</p>';
        }
    } catch (error) {
        console.error('Error displaying products:', error);
        mainContainer.innerHTML = '<p>Error fetching products. Please try again later.</p>';
    }
});

window.addToCart = (id) => {
    console.log('Added to cart:', id);
};
