document.addEventListener('DOMContentLoaded', async function() {
    console.log('Book page loaded');

    const booksContainer = document.getElementById('books-container');

    const fetchBooks = async () => {
        try {
            const response = await fetch('https://openlibrary.org/subjects/fantasy.json?limit=10');
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

    await fetchBooks();
});

window.addToCart = (id) => {
    console.log('Added to cart:', id);
    // Handle adding book to cart
};
