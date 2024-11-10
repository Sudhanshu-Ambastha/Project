document.addEventListener('DOMContentLoaded', async function () {
    console.log('Book page loaded');

    const booksContainer = document.getElementById('books-container');
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('toggle-sidebar');

    // Function to fetch books and prices
    const fetchBooks = async () => {
        try {
            // Fetch books from Open Library API
            const bookResponse = await fetch('https://openlibrary.org/subjects/fantasy.json?limit=12');
            if (!bookResponse.ok) {
                throw new Error('Failed to fetch books');
            }
            const bookData = await bookResponse.json();

            // Fetch prices from pricing.json
            const priceResponse = await fetch('./pricing.json');
            if (!priceResponse.ok) {
                throw new Error('Failed to fetch pricing data');
            }
            const priceData = await priceResponse.json();

            // Merge book data with prices using index
            const booksWithPricing = bookData.works.map((book, index) => {
                const priceInfo = priceData.find(item => item.id === index + 1);
                return { ...book, price: priceInfo ? priceInfo.price : "N/A" };
            });

            displayBooks(booksWithPricing);
        } catch (error) {
            console.error('Error fetching books or prices:', error);
            booksContainer.innerHTML = '<p>Error fetching books. Please try again later.</p>';
        }
    };

    // Function to display books with pricing
    const displayBooks = (books) => {
        booksContainer.innerHTML = '';
        books.forEach((book) => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');
            bookDiv.innerHTML = `
                <img src="https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>Author: ${book.authors[0].name}</p>
                <p>First Published: ${book.first_publish_year}</p>
                <p>Price: $${book.price}</p>
                <button onclick="addToCart('${book.key}', '${book.title}', '${book.price}', '${book.cover_id}')">Add to Cart</button>
            `;
            booksContainer.appendChild(bookDiv);
        });
    };

    // Toggle Sidebar Functionality
    toggleButton.addEventListener('click', () => {
        if (sidebar.style.left === '0px') {
            sidebar.style.left = '-250px'; // Hide sidebar
        } else {
            sidebar.style.left = '0'; // Show sidebar
        }
    });

    // Fetch books when page loads
    await fetchBooks();
});

// Function to add an item to the cart
window.addToCart = (id, title, price, cover_id) => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if the item already exists in the cart
    const existingItem = cartItems.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if already in cart
    } else {
        const newItem = {
            id: id,
            title: title,
            price: parseFloat(price),
            quantity: 1,
            image: `https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`,
        };
        cartItems.push(newItem);
    }

    // Save updated cart items to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    console.log('Added to cart:', id);
};
