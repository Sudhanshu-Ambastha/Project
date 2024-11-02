const API_BASE_URL = 'https://dummyjson.com/products';

const fetchAllProducts = async () => {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.products; 
    } catch (error) {
        console.error('Error fetching all products:', error);
        return [];
    }
};

const displayProducts = (products) => {
    const mainContainer = document.getElementById('product-container');
    mainContainer.innerHTML = ''; 

    products.forEach((product) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
        `;
        mainContainer.appendChild(productDiv);
    });
};

document.addEventListener('DOMContentLoaded', async () => {
    const products = await fetchAllProducts();
    displayProducts(products);
});
