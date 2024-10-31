const FAKE_STORE_API_URL = 'https://fakestoreapi.com/products';
const DUMMY_JSON_API_URL = 'https://dummyjson.com/products';

// Fetching all products from Fake Store API
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

// Fetching products by category (if needed)
const fetchProductsByCategory = async (category) => {
  try {
    const url = `${FAKE_STORE_API_URL}/category/${category}`;
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

// Fetching all products from Dummy JSON API
const fetchDummyJsonProducts = async () => {
  try {
    const response = await fetch(DUMMY_JSON_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: **${response.status}**`); // Improved error logging
    }
    const data = await response.json();
    return data.products; // Assumes "products" key in response
  } catch (error) {
    console.error('Error fetching Dummy JSON products:', error);
    return [];
  }
};

// Fetching all products from both APIs, handling potential structural differences
const fetchAllProducts = async () => {
  const fakeStoreProducts = await fetchFakeStoreProducts();
  const dummyJsonProducts = await fetchDummyJsonProducts();

  // Handle potential structural differences (e.g., key names) in response data
  const combinedProducts = fakeStoreProducts.concat(
    dummyJsonProducts.map((product) => ({
      // Adapt product object structure if necessary (e.g., rename keys)
      title: product.title,
      price: product.price,
      image: product.image || product.thumbnail, // Use image if available
    }))
  );

  return combinedProducts;
};

// Export the fetch functions (select as needed)
export { fetchAllProducts, fetchProductsByCategory };