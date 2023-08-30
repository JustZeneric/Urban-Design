// Function to toggle the navigation menu
function toggleMenu() {
  const nav = document.querySelector('nav');
  const burgerIcon = document.querySelector('.burger-icon');
  nav.classList.toggle('active');
  burgerIcon.classList.toggle('active');
}

// Function to toggle dropdown menus
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', () => {
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    const isActive = dropdown.classList.contains('active');

    dropdown.classList.toggle('active');
    dropdownContent.style.maxHeight = isActive ? 0 : dropdownContent.scrollHeight + 'px';
  });
});


// Filter and Sort variables
const filterButton = document.getElementById('openFilter');
const filterMenu = document.getElementById('filter-menu');
const applyFiltersButton = document.getElementById('applyFilters');
const productsContainer = document.getElementById('products');
const categoryFilter = document.getElementById('categoryFilter');
const colorFilter = document.getElementById('colorFilter');
const materialFilter = document.getElementById('materialFilter');
const closeFilterButton = document.getElementById('closeFilter');
const sortDropdown = document.getElementById('sortInline');
const sortLabel = document.getElementById('sortLabel');
const filterOptions = document.querySelectorAll('.filter-option');
const sortButton = document.querySelector('.sortby');

// Sample product data (replace with your actual data)
const products = [{
    id: 1,
    name: 'Plush Comfort Sofa',
    price: 2000,
    discountedPrice: 1800,
    category: 'Chairs',
    color: 'Red',
    material: 'Wood',
    image: './Assests/001-removebg-preview.png',
    description: 'trest'
  },
  {
    id: 2,
    name: 'Plush Comfort Sofa',
    price: 3000,
    discountedPrice: 1800,
    category: 'Tables',
    color: 'Red',
    material: 'Wood',
    image: './Assests/pexels-max-rahubovskiy-6588592-removebg-preview.png'
  },
  {
    id: 3,
    name: 'Plush Comfort Sofa',
    price: 3000,
    discountedPrice: 1800,
    category: 'Tables',
    color: 'Red',
    material: 'Wood',
    image: './Assests/pexels-max-rahubovskiy-6588592-removebg-preview.png'
  },
  // Add more products with image URLs
];


const sortOptions = {
  'price-low': (a, b) => a.price - b.price,
  'price-high': (a, b) => b.price - a.price
  // Add more sorting options as needed
};
// Apply sort function
function applySort(selectedSorting, products) {
  if (sortOptions[selectedSorting]) {
    products.sort(sortOptions[selectedSorting]);
    renderProducts(products);
  }
}

// Event listener for sort button
sortLabel.addEventListener('click', () => {
  sortButton.classList.toggle('active');
});

// Event listener for inline "Sort by" dropdown
sortDropdown.addEventListener('change', () => {
  const selectedSorting = sortDropdown.value;
  applySort(selectedSorting, products);
  sortButton.classList.remove('active');
});

function applyFiltersAndSorting() {
  // Get selected options for each filter
  const selectedCategories = Array.from(categoryFilter.querySelectorAll('.option.selected')).map(option => option.textContent);
  const selectedColors = Array.from(colorFilter.querySelectorAll('.option.selected')).map(option => option.textContent);
  const selectedMaterials = Array.from(materialFilter.querySelectorAll('.option.selected')).map(option => option.textContent);

  // Filter products based on selected options
  const filteredProducts = products.filter(product =>
    (selectedCategories.includes('All') || selectedCategories.includes(product.category)) &&
    (selectedColors.includes('All') || selectedColors.includes(product.color)) &&
    (selectedMaterials.includes('All') || selectedMaterials.includes(product.material))
  );

  applySort(sortDropdown.value, filteredProducts);

  // Render filtered products
  renderProducts(filteredProducts);
}



// Event listeners
filterButton.addEventListener('click', () => {
  filterMenu.style.left = '0';
});

applyFiltersButton.addEventListener('click', () => {
  applyFiltersAndSorting();
  filterMenu.style.left = '-300px';
});

closeFilterButton.addEventListener('click', () => {
  filterMenu.style.left = '-300px';
});

// Toggle filter options visibility and highlight options
filterOptions.forEach(filterOption => {
  const label = filterOption.querySelector('label');
  const optionList = filterOption.querySelector('.option-list');
  const optionListItems = optionList.querySelectorAll('.option');

  label.addEventListener('click', () => {
    optionList.classList.toggle('show-options');
  });

  optionListItems.forEach(option => {
    option.addEventListener('click', () => {
      option.classList.toggle('selected'); // Toggle 'selected' class on click
    });
  });
});


// Function to create product cards
function createProductCard(product) {
  const productCard = document.createElement('div');
  productCard.classList.add('product');

  const productLink = document.createElement('a');
  productLink.href = `product_template.html?id=${product.id}`; // Include the product ID in the link

  const productImage = document.createElement('div');
  productImage.classList.add('product-image');
  productImage.style.backgroundImage = `url('${product.image}')`;

  productLink.appendChild(productImage);
  productCard.appendChild(productLink);

  const productContent = document.createElement('div');
  productContent.classList.add('product-content');

  const productNameLink = document.createElement('a');
  productNameLink.href = 'product_template.html'; // Replace with the actual link

  const productName = document.createElement('h2');
  productName.textContent = product.name;

  productNameLink.appendChild(productName);
  productContent.appendChild(productNameLink);

  const priceContainer = document.createElement('div');
  priceContainer.classList.add('price-container');

  const price = document.createElement('p');
  price.classList.add('price');
  price.textContent = `From R ${product.price.toFixed(2)}`;

  priceContainer.appendChild(price);

  if (product.discountedPrice !== undefined) {
    const discountedPrice = document.createElement('p');
    discountedPrice.classList.add('discounted-price');
    discountedPrice.textContent = `Now R ${product.discountedPrice.toFixed(2)}`;
    priceContainer.appendChild(discountedPrice);
  }

  productContent.appendChild(priceContainer);

  const optionsDiv = document.createElement('div');
  optionsDiv.classList.add('options');

  const optionsButton = document.createElement('button');
  optionsButton.textContent = 'View Options';

  optionsDiv.appendChild(optionsButton);
  productContent.appendChild(optionsDiv);

  productCard.appendChild(productContent);

  return productCard;
}


function renderProducts(products) {
  productsContainer.innerHTML = '';

  products.forEach(product => {
    const productCard = createProductCard(product);
    productsContainer.appendChild(productCard);
  });
}

// Initial rendering
renderProducts(products);