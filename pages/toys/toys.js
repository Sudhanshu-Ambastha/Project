const fetchToyData = async () => {
    try {
        const response = await fetch('./toys.json'); 
        if (!response.ok) {
            throw new Error(`Failed to fetch toy data: ${response.statusText}`);
        }
        const toys = await response.json();
        displayToys(toys);
    } catch (error) {
        console.error('Error fetching toy data:', error);
    }
};

document.getElementById('toggle-sidebar').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active'); // Toggle 'active' class
});

// Function to add toy to cart
const addToCart = (toy) => {
    // Retrieve the existing cart from localStorage, or create a new array if empty
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the toy is already in the cart
    const existingToy = cart.find(item => item.id === toy.id);
    if (existingToy) {
        // Increment quantity if the toy already exists
        existingToy.quantity += 1;
    } else {
        // Add new toy to cart with an initial quantity of 1
        cart.push({ ...toy, quantity: 1 });
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${toy.label || toy.title} added to cart`);
};

const displayToys = (toys) => {
    const container = document.getElementById('product-container');
    container.innerHTML = ''; 

    toys.forEach((toy) => {
        console.log('Toy:', toy);  

        const toyDiv = document.createElement('div');
        toyDiv.classList.add('product');

        toyDiv.innerHTML = `
            <img src="${toy.image}" alt="${toy.label}">
            <h3>${toy.label}</h3>
            <p>${toy.description || 'A wonderful toy for kids!'}</p>
            <p>$${toy.price.toFixed(2)}</p>
            <button data-id="${toy.id}" class="add-to-cart-btn">Add to cart</button>
        `;

        // Add event listener to "Add to Cart" button
        toyDiv.querySelector('.add-to-cart-btn').addEventListener('click', () => {
            addToCart(toy);  // Add the toy to the cart when the button is clicked
        });

        container.appendChild(toyDiv);
    });


    // Event listener for Add to Cart buttons in the Toys section
    container.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn')) {
            const toyId = event.target.getAttribute('data-id');
            const toy = toys.find(t => t.id === parseInt(toyId));
            if (toy) {
                addToCart(toy);
            }
        }
    });
};

document.addEventListener('DOMContentLoaded', fetchToyData);
