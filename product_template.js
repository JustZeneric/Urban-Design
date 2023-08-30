// Get the product ID from the URL or another source
const urlSearchParams = new URLSearchParams(window.location.search);
const productId = urlSearchParams.get('id');
const selectedProduct = products.find(product => product.id === parseInt(productId));

// Populate the product details template
document.getElementById('productImage').style.backgroundImage = `url('${selectedProduct.image}')`;
document.getElementById('productName').textContent = selectedProduct.name;
document.getElementById('productPrice').textContent = `From R ${selectedProduct.price.toFixed(2)}`;

if (selectedProduct.discountedPrice !== undefined) {
  document.getElementById('productDiscountedPrice').textContent = `Now R ${selectedProduct.discountedPrice.toFixed(2)}`;
}

document.getElementById('productDescription').textContent = selectedProduct.description; // Populate the description

const productImageElement = document.getElementById('product-image');
const productDescriptionElement = document.getElementById('product-description');
productDescriptionElement.textContent = selectedProduct.description;


productImageElement.style.backgroundImage = `url('${selectedProduct.image}')`;
productDescriptionElement.textContent = selectedProduct.description;

// Populate color options (assuming colors are stored in selectedProduct.colors array)
const colorOptionsContainer = document.getElementById('colorOptions');
selectedProduct.colors.forEach(color => {
  const colorOption = document.createElement('div');
  colorOption.classList.add('color-option');
  colorOption.style.backgroundColor = color;
  colorOptionsContainer.appendChild(colorOption);

  colorOption.addEventListener('click', () => {
    // Handle color selection
  });
});

// Add event listener for "Add to Cart" button
const addToCartButton = document.getElementById('addToCartButton');
addToCartButton.addEventListener('click', () => {
  // Handle adding the product to the cart
});