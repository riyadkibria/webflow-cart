// Select the cart container, total price element, and cart count element
const cartDiv = document.getElementById('my-cart');
const totalPriceElement = document.getElementById('product-total');
const cartCountElement = document.getElementById('cart-count'); // Select cart count element

// Initialize variables to store the total price and the number of items
let totalPrice = 0;
let cartItemCount = 0; // Track the number of items in the cart

// Add event listener to all Add-to-Cart buttons
document.querySelectorAll('.add-to-cart-button').forEach(button => {
  button.addEventListener('click', function () {
    // Get product name and price from the button's data attributes
    const productName = this.getAttribute('data-name');
    const productPrice = parseFloat(this.getAttribute('data-price'));

    // Create a new product div for the cart
    const productDiv = document.createElement('div');
    productDiv.classList.add('my-product'); // Optional: Add a class for styling

    // Create and set the product name element
    const productNameElement = document.createElement('div');
    productNameElement.id = 'product-name';
    productNameElement.textContent = productName;

    // Create and set the input field for quantity
    const quantityDiv = document.createElement('div');
    quantityDiv.id = 'quantity-div';

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = '1';
    quantityInput.value = '1'; // Default quantity
    quantityInput.classList.add('quantity-input'); // Optional: Add a class for styling

    // Append quantity input to the quantity div
    quantityDiv.appendChild(quantityInput);

    // Create and set the product price element
    const productPriceElement = document.createElement('div');
    productPriceElement.id = 'product-price';
    productPriceElement.textContent = `$${productPrice.toFixed(2)}`;

    // Add an event listener to the quantity input to update the price dynamically
    quantityInput.addEventListener('input', function () {
      const quantity = parseInt(this.value) || 1; // Default to 1 if input is invalid
      const updatedPrice = productPrice * quantity;

      // Update the price display for this product
      productPriceElement.textContent = `$${updatedPrice.toFixed(2)}`;

      // Recalculate the total price
      recalculateTotal();
    });

    // Append all elements to the new product div
    productDiv.appendChild(productNameElement);
    productDiv.appendChild(quantityDiv);
    productDiv.appendChild(productPriceElement);

    // Append the new product div to the cart
    cartDiv.appendChild(productDiv);

    // Update the total price and item count
    totalPrice += productPrice;
    cartItemCount++;

    // Update the total price element with the new total
    recalculateTotal();

    // Update the cart count element with the new item count
    cartCountElement.textContent = cartItemCount;
  });
});

// Function to recalculate the total price
function recalculateTotal() {
  totalPrice = 0;

  // Loop through all products in the cart and sum up their prices
  document.querySelectorAll('.my-product').forEach(product => {
    const priceElement = product.querySelector('#product-price');
    const price = parseFloat(priceElement.textContent.replace('$', '')) || 0;
    totalPrice += price;
  });

  // Update the total price element
  totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

