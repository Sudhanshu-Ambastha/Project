document.addEventListener('DOMContentLoaded', async function() {
    console.log('Book page loaded');

    const booksContainer = document.getElementById('books-container');
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('toggle-sidebar');

    // Function to fetch books
    const fetchBooks = async () => {
        try {
            const response = await fetch('https://openlibrary.org/subjects/fantasy.json?limit=12');
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const data = await response.json();
            displayBooks(data.works);
        } catch (error) {
            console.error('Error fetching books:', error);
            booksContainer.innerHTML = '<p>Error fetching books. Please try again later.</p>';
        }
    };

    // Function to display books
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
                <button onclick="addToCart('${book.key}')">Add to Cart</button>
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

window.addToCart = (id) => {
    console.log('Added to cart:', id);
};
