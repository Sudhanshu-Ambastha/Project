

    
document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const displayProducts = (products) => {
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-card');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-description">${product.description}</p>
            <p class="price">$${product.price}</p>
            <button onclick="addToCart(${product.id})" class="btn">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
};


    fetchProducts();
});

const addToCart = (id) => {
    console.log('Added to cart:', id);
};
    
const landingText = document.getElementById("landingText");
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        landingText.style.transform = `translateY(-${scrollY * 0.5}px)`;
    });
