const API_BASE_URL = 'https://fakestoreapi.com/products';

const fetchAllProducts = async () => {
    try {
        const response = await fetch(API_BASE_URL);
        return await response.json();
    } catch (error) {
        console.error('Error fetching all products:', error);
        return [];
    }
};

const fetchProductsByCategory = async (category) => {
    try {
        const response = await fetch(`${API_BASE_URL}/category/${category}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching products in category "${category}":`, error);
        return [];
    }
};

export { fetchAllProducts, fetchProductsByCategory };
