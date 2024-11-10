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

document.getElementById('toggleBtn').addEventListener('click', function() {  
    const sidebar = document.getElementById('sidebar');  
    const content = document.getElementById('content');  
    
    sidebar.classList.toggle('sidebar-active');
    content.classList.toggle('content-shift');
});  

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
            <button data-id="${product.id}" class="btn">Add to Cart</button>
        `;
        mainContainer.appendChild(productDiv);
    });
};

const addToCart = (product) => {
    // Retrieve the existing cart from localStorage, or create a new array if empty
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        // Increment quantity if product already exists
        existingProduct.quantity += 1;
    } else {
        // Add new product to cart with an initial quantity of 1
        cart.push({ ...product, quantity: 1 });
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.title} added to cart`);
};

document.addEventListener('DOMContentLoaded', async () => {
    const products = await fetchAllProducts();
    displayProducts(products);

    // Event listener for "Add to Cart" button
    document.getElementById('product-container').addEventListener('click', (event) => {
        if (event.target.classList.contains('btn')) {
            const productId = event.target.getAttribute('data-id');
            const product = products.find(p => p.id === parseInt(productId));
            if (product) {
                addToCart(product);
            }
        }
    });
});
