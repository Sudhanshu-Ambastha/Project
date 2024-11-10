import { fetchProductsByCategory } from '../main/api.js';

document.addEventListener('DOMContentLoaded', async function () {
    const mainContainer = document.querySelector('#product-container'); // Get product container directly

    const displayProducts = (products) => {
        mainContainer.innerHTML = ''; // Clear previous content
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
        const products = await fetchProductsByCategory('electronics'); 
        if (products && products.length > 0) {
            displayProducts(products);
        } else {
            console.log('No products found in this category.');
            mainContainer.innerHTML = '<p>No products available in this category.</p>';
        }
    } catch (error) {
        console.error('Error displaying products:', error);
        mainContainer.innerHTML = '<p>Error fetching products. Please try again later.</p>';
    }
});

// Sidebar toggle logic
document.getElementById('toggleBtn').addEventListener('click', function() {  
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    sidebar.classList.toggle('sidebar-active');
    content.classList.toggle('content-shift');
});

