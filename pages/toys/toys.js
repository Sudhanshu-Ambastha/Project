const fetchToyData = async () => {
    try {
        const response = await fetch('../../assets/toys/toys.json'); 
        if (!response.ok) {
            throw new Error(`Failed to fetch toy data: ${response.statusText}`);
        }
        const toys = await response.json();
        displayToys(toys);
    } catch (error) {
        console.error('Error fetching toy data:', error);
    }
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
            <button>Add to cart</button>
        `;

        container.appendChild(toyDiv);
    });
};
document.addEventListener('DOMContentLoaded', fetchToyData);