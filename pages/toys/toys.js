import { BrownTeddy, Car, FireTruck, Minion, Optimus, Pikachu, Rabit, RemoteControlCar, Rings, Robot, RobotSet, Teddy, ToySet, Train, TransparentCar, Truck } from '../../Assets/toys/export';

const toys = [
    { label: 'Toy Truck', image: Truck },
    { label: 'Toy Car', image: Car },
    { label: 'Pikachu Plush', image: Pikachu },
    { label: 'Robot Toy', image: Robot },
    { label: 'Teddy Bear', image: Teddy },
    { label: 'Optimus Prime', image: Optimus },
    { label: 'Toy Set', image: ToySet },
    { label: 'Toy Train', image: Train },
    { label: 'Transparent Car', image: TransparentCar },
    { label: 'Fire Truck', image: FireTruck },
    { label: 'Robot Set', image: RobotSet },
    { label: 'Minion Toy', image: Minion },
    { label: 'Rabit Plush', image: Rabit },
    { label: 'Remote Control Car', image: RemoteControlCar },
    { label: 'Rings Set', image: Rings },
    { label: 'Brown Teddy', image: BrownTeddy },
];

const getRandomPrice = () => (Math.random() * (50 - 5) + 5).toFixed(2);

function displayToys() {
    console.log('displayToys function called');
    
    const container = document.getElementById('product-container');
    if (!container) {
        console.error('Product container not found');
        return;
    }

    container.innerHTML = '<h2>Find the Perfect Toy for Every Age</h2>';
    const productGrid = document.createElement('div');
    productGrid.className = 'product-grid';
    container.appendChild(productGrid);

    const shuffledToys = [...toys].sort(() => Math.random() - 0.5);
    const toysToShow = shuffledToys.slice(0, 8);

    toysToShow.forEach((toy) => {
        const toyDiv = document.createElement('div');
        toyDiv.className = 'product-card';

        const price = getRandomPrice();

        toyDiv.innerHTML = `
            <div class="product-image">
                <img src="${toy.image}" alt="${toy.label}">
            </div>
            <div class="product-info">
                <h3>${toy.label}</h3>
                <p class="price">$${price}</p>
                <button class="add-to-cart">Add to cart</button>
            </div>
        `;

        productGrid.appendChild(toyDiv);
    });
}

document.addEventListener('DOMContentLoaded', displayToys);