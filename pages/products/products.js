document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.in/api/products');
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const displayProducts = (products) => {
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p class="price">$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productList.appendChild(productDiv);
        });
    };

    fetchProducts();
});

const addToCart = (id) => {
    console.log('Added to cart:', id);
    // Here, add code to handle adding products to the cart
};
