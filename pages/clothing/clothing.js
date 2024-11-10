import { fetchProductsByCategory } from '../main/api.js';

// Toggle sidebar functionality
document.getElementById('toggle-sidebar').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
});

// Close sidebar functionality
document.getElementById('close-sidebar').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('active');
});

// Close sidebar when clicking outside of it
document.addEventListener('click', (event) => {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('toggle-sidebar');
    if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});

// Fetch and display clothing items
document.addEventListener('DOMContentLoaded', async function () {
    const productsContainer = document.getElementById('products-container');

    // Function to display products
    const displayClothing = (clothingItems) => {
        clothingItems.forEach(item => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>$${item.price}</p>
                <button onclick="addToCart(${item.id})">Add to Cart</button>
            `;
            productsContainer.appendChild(productDiv);
        });
    };

    // Fetch clothing items from API
    try {
        const menClothing = await fetchProductsByCategory("men's clothing"); 
        const womenClothing = await fetchProductsByCategory("women's clothing");
        const allClothing = [...menClothing, ...womenClothing]; 
        displayClothing(allClothing);
    } catch (error) {
        console.error('Error displaying clothing:', error);
    }
});

// Add to Cart function
window.addToCart = (id) => {
    console.log('Added to cart:', id);
};
