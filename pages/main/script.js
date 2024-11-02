document.addEventListener('DOMContentLoaded', function () {
    const landingText = document.getElementById("landingText");
    const productList = document.getElementById('product-list');


    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        landingText.style.transform = `translateY(-${scrollY * 0.5}px)`;
    });


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
                <button data-id="${product.id}" class="btn">Add to Cart</button>
            `;
            productList.appendChild(productDiv);
        });
    };


    const addToCart = (id) => {
        console.log('Added to cart:', id);
    };


    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn')) {
            const productId = event.target.getAttribute('data-id');
            addToCart(productId);
        }
    });

    fetchProducts();
});

const scrollContainer = document.getElementById('product-list-container');
let scrollAmount = 0;

const scrollHorizontally = () => {
    scrollAmount += 1; 
    scrollContainer.scrollLeft = scrollAmount;


    if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollAmount = 0;
    }

    requestAnimationFrame(scrollHorizontally);
};


scrollHorizontally();

