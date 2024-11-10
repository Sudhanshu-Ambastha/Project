document.addEventListener('DOMContentLoaded', async function () {
    const productsContainer = document.querySelector('#product-container');
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleBtn');

    // Sidebar Toggle Logic
    toggleBtn.addEventListener('click', function () {
        sidebar.classList.toggle('sidebar-active');
        document.querySelector('main').classList.toggle('content-shift');
    });

    // Fetch and display products
    const fetchProducts = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products/category/home-decoration');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const products = await response.json();
            displayProducts(products.products);
        } catch (error) {
            console.error('Error fetching products:', error);
            productsContainer.innerHTML = '<p>Error fetching products. Please try again later.</p>';
        }
    };

    const displayProducts = (products) => {
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

// Mock function for adding to cart
window.addToCart = (id) => {
    console.log('Added to cart:', id);
};
