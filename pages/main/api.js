const FAKE_STORE_API_URL = 'https://fakestoreapi.com/products';
const DUMMY_JSON_API_URL = 'https://dummyjson.com/products';
const BOOK_API_URL = 'https://openlibrary.org/subjects/fantasy.json?limit=12';
const TOY_JSON_URL = './toys.json';

/**
 * Fetch products from Fake Store API.
 */
const fetchFakeStoreProducts = async () => {
    try {
        const response = await fetch(FAKE_STORE_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching Fake Store products:', error);
        return [];
    }
};

/**
 * Fetch products by category from Fake Store API.
 * @param {string} category - Category to fetch products for.
 */
const fetchProductsByCategory = async (category) => {
    try {
        // Ensure the category is included in the API request
        const url = category ? `${FAKE_STORE_API_URL}/category/${category}` : FAKE_STORE_API_URL;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching products in category "${category}":`, error);
        return [];
    }
};

/**
 * Fetch products from Dummy JSON API.
 */
const fetchDummyJsonProducts = async () => {
    try {
        const response = await fetch(DUMMY_JSON_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.products; // Assumes "products" key in response
    } catch (error) {
        console.error('Error fetching Dummy JSON products:', error);
        return [];
    }
};

/**
 * Fetch books from Open Library API.
 */
const fetchBookProducts = async () => {
    try {
        const response = await fetch(BOOK_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.works.map((book) => ({
            title: book.title,
            price: book.price || 'N/A', // Open Library doesn't provide prices
            image: book.cover_id
                ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
                : './default-book-cover.jpg', // Default image for books without covers
        }));
    } catch (error) {
        console.error('Error fetching book products:', error);
        return [];
    }
};

/**
 * Fetch toy products from local JSON.
 */
const fetchToyProducts = async () => {
    try {
        const response = await fetch(TOY_JSON_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching toy products:', error);
        return [];
    }
};

/**
 * Fetch all products combined from all sources or from a specific source.
 * @param {string} [source] - Optional parameter for specific API ("fakeStore", "dummyJson", "books", "toys").
 * @param {string} [category] - Optional category to filter products.
 */
const fetchAllProducts = async (source, category) => {
    switch (source) {
        case 'fakeStore':
            return await fetchProductsByCategory(category); // Ensure category is passed
        case 'dummyJson':
            return await fetchDummyJsonProducts(); // Dummy API does not support categories
        case 'books':
            return await fetchBookProducts(); // Book API does not support categories
        case 'toys':
            return await fetchToyProducts(); // Toy API does not support categories
        default:
            // Combine results from all sources
            const fakeStoreProducts = await fetchProductsByCategory(category); // Category included
            const dummyJsonProducts = await fetchDummyJsonProducts();
            const bookProducts = await fetchBookProducts();
            const toyProducts = await fetchToyProducts();

            return [
                ...fakeStoreProducts,
                ...dummyJsonProducts,
                ...bookProducts,
                ...toyProducts,
            ];
    }
};

// Exporting the functions for use in other files
export { fetchAllProducts, fetchProductsByCategory, fetchFakeStoreProducts, fetchDummyJsonProducts, fetchBookProducts, fetchToyProducts };
