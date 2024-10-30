import { fetchProductsByCategory } from '../main/api';

document.addEventListener('DOMContentLoaded', async function () {
    const mainContainer = document.querySelector('main');

    const displayToys = (toys) => {
        toys.forEach(toy => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${toy.image}" alt="${toy.title}">
                <h3>${toy.title}</h3>
                <p>$${toy.price}</p>
                <button onclick="addToCart(${toy.id})">Add to Cart</button>
            `;
            mainContainer.appendChild(productDiv);
        });
    };

    try {
        const toys = await fetchProductsByCategory('toys'); 
        displayToys(toys);
    } catch (error) {
        console.error('Error displaying toys:', error);
    }
});

window.addToCart = (id) => {
    console.log('Added to cart:', id);
};