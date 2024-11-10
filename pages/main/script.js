document.addEventListener('DOMContentLoaded', function () {
    const landingText = document.getElementById("landingText");
    const productList = document.getElementById('product-list');
    const scrollContainer = document.getElementById('product-list-container'); 

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
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = Array.from(productList.querySelectorAll('.product-card'))
            .find(card => card.querySelector('.btn').getAttribute('data-id') === id);

        if (product) {
            const productData = {
                id,
                title: product.querySelector('.product-title').textContent,
                price: parseFloat(product.querySelector('.price').textContent.replace('$', '')),
                image: product.querySelector('.product-image').getAttribute('src'),
                quantity: 1
            };

            const existingProduct = cart.find(item => item.id === id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push(productData);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${productData.title} added to cart`);
        }
    };

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn')) {
            const productId = event.target.getAttribute('data-id');
            addToCart(productId);
        }
    });

    fetchProducts(); 

    const scrollHorizontally = () => {
        scrollContainer.scrollLeft += 1; 
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
            scrollContainer.scrollLeft = 0; 
        }
        requestAnimationFrame(scrollHorizontally);
    };
    scrollHorizontally(); 

    document.addEventListener('scroll', () => {
        const aboutImage = document.getElementById('aboutImage');
        const aboutText = document.getElementById('aboutText');
        const aboutSection = aboutImage.parentElement.getBoundingClientRect();
        if (aboutSection.top < window.innerHeight && aboutSection.bottom > 0) {
            const scrollEffect = Math.min(1, (window.innerHeight - aboutSection.top) / window.innerHeight);
            aboutImage.style.transform = `translateX(${scrollEffect * 100}%)`;
            aboutImage.style.opacity = `${scrollEffect}`;
            aboutText.style.transform = `translateX(${scrollEffect * -105}%)`;
            aboutText.style.opacity = `${scrollEffect}`;
        } else {
            aboutImage.style.transform = 'translateX(-100%)';
            aboutImage.style.opacity = '0';
            aboutText.style.transform = 'translateX(100%)';
            aboutText.style.opacity = '0';
        }
    });
});
