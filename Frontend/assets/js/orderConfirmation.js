// ---------- GLOBAL VARIABLES ----------
const localStorageContent = localStorage.getItem('customer');
const customers = JSON.parse(localStorageContent);
const cartContainer = document.querySelector('#confirmProductContainer')
const localStorageContentCart = localStorage.getItem('cart');
const cartItems = JSON.parse(localStorageContentCart);

// ---------- VARIABLES FOR DOM ----------
let firstName = document.querySelector(".firstName");
let orderDate = document.querySelector(".orderDate");
let orderNumber = document.querySelector(".orderNumber");
let shippingAddress = document.querySelector(".shippingAddress");
let paymentMethod = document.querySelector(".paymentMethod");
let emailConfirmation = document.querySelector(".email");

let productLenses = document.querySelector(".singleProductLenses");
let productQuantity = document.querySelector("#productCounterText");
const btnAddToCart = document.querySelector(".addToCart");

window.onload = function() {init()};

function init() {
  formDetails()
  cartProductList()
}


function formDetails() {
  firstName.innerHTML = "Hello, " + customers[0].firstName
  orderDate.innerHTML = customers[0].orderPlaced
  orderNumber.innerHTML = customers[0].orderNumber
  shippingAddress.innerHTML = customers[0].address
  paymentMethod.innerHTML = customers[0].paymentMethod
  emailConfirmation.innerHTML = "We will be sending shipping confirmation email to " + customers[0].emailAddress + " when the item shipped successfully!"
}

// Creates cart page with the items from local storage
function cartProductList() {
  cartContainer.innerHTML = ''

  // Loops through each object of API and extract the product data
  for (let i = 0; i < cartItems.length; i++) {

    // Product Value Variables
    let productImg = cartItems[i].imageUrl
    let productName = cartItems[i].name
    let productPriceString = cartItems[i].price.toString();
    let productPrice = productPriceString.substring(0, 3);
    let productLens = cartItems[i].selectLenses
    let productQuantity = cartItems[i].quantity
    let totalProductPrice = (productPrice * productQuantity);

    // Create & Append New Product
    
    let product = document.createElement('tr');
    product.classList.add('confirmProductContainerRecord');
    product.innerHTML = `
    <td class="confirmProductContainerImage">
      <img src="${productImg}" width="90">
    </td>
    <td class="confirmProductContainerInfo" width="25%">
      <span class="font-weight-bold">${productName}</span>
      <div class="product-qty">
      <span>Lens: ${productLens}</span>
        <span class="d-block">Quantity: ${productQuantity}</span>
      </div>
    </td>
    <td class="confirmProductContainerPrice" width="40%">
      <div class="text-right">
        <span class="font-weight-bold">£${totalProductPrice}</span>
      </div>
    </td>`;
    cartContainer.appendChild(product);
  }
}






// Removes all items currently saved on local storage and updates cart page
function removeAllItems() {
  localStorage.clear();
  addNumCart()
}

// ---------- SCROLL TO TOP OF PAGE FEATURE ----------

//Scroll to top button
let myButton = document.querySelector("#scrollButton");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    myButton.style.display = "block";
  } else {
    myButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}