'use strict';

// ---------- API URL ----------
const url = 'http://localhost:3000/api/cameras/';

// ---------- VARIABLES FOR DOM ----------
let productImage = document.querySelector(".singleProductImg");
let productTitle = document.querySelector(".singleProductTitle");
let productPrice = document.querySelector(".singleProductPrice");
let productDescription = document.querySelector(".singleProductDescription");
let productLenses = document.querySelector(".singleProductLenses");
let productQuantity = document.querySelector("#productCounterText");
const btnAddToCart = document.querySelector(".addToCart");
let product = {};

window.onload = function() {init()};

// ---------- FUNCTIONS TO RUN WHEN PAGE IS LOADING ----------
function init() {
  let productId = getProductId();
  fetchSingleProduct(productId);
  bindEvents()  
}

// ---------- DYNAMICALLY GET PRODUCT INFORMATION FOR PRODUCT PAGE ----------

// Get product ID from URL ID Parameter
function getProductId() {
  const queryString = window.location.search;
  const urlParam = new URLSearchParams(queryString);
  const id = urlParam.get("id");
  return id;
}

// Get individual product information from API and ID
function fetchSingleProduct(id) {
  fetch(url + id)
    .then(response => response.json())
    .then(data => {
      product = data;
      showProduct(data);
    })
    .catch(err => console.log(err))
}

// Use individual product information to create product page
function showProduct(data) {

  // Cache Data Values
  let name = data.name;
  let description = data.description;
  let priceString = data.price.toString();
  let price = priceString.substring(0, 3);
  let imageUrl = data.imageUrl;
  let lenses = data.lenses;

  // Changing the values of innerHTML to product information
  productTitle.innerHTML = name 
  productPrice.innerHTML = "£" + price 
  productDescription.innerHTML = description
  productImage.src = imageUrl

  // For loop to create a dropdown for all lenses for each individual product
  for (let i in lenses) {
    const newOLens = document.createElement("option");
    newOLens.textContent = lenses[i];
    productLenses.appendChild(newOLens);
  }

  // Call function to get current cart num when page has loaded
  addNumCart()
}

// ---------- QUANTITY COUNTER ----------

// Variables  
let productQuantityCounterValue = {
  counter: 1  
}

// Event Listeners for + - buttons 
let bindEvents = function () {
  document.querySelector('#productCounterIncrease').addEventListener('click', function () {
    increase()
  })
  
  document.querySelector('#productCounterDecrease').addEventListener('click', function () {
    decrease()
  }) 
}

// Increase/Decrease functions
let increase = function () {
  productQuantityCounterValue.counter++
  document.querySelector('#productCounterText').innerHTML = productQuantityCounterValue.counter
}

let decrease = function () {

  // Stop decreasing to anything <1
  if(productQuantityCounterValue.counter !== 1) {
    productQuantityCounterValue.counter--
    document.querySelector('#productCounterText').innerHTML = productQuantityCounterValue.counter
  }
}

// ---------- ADDING ITEM TO CART IN LOCAL STORAGE ----------

// Event listener on addToCart button
btnAddToCart.addEventListener('click', () => {
  let cartItems = []
  const localStorageContent = localStorage.getItem('cart');

  // Check to see if there is already items in the cart
  if (localStorageContent === null) {
    cartItems = [];
  } else {
    cartItems = JSON.parse(localStorageContent);
  }

  // Creating product object to push to cart
  let singleProduct = {
    prodId: product._id,
    imageUrl: product.imageUrl,
    name: product.name,
    selectLenses: productLenses.value,
    price: product.price,
    quantity: parseInt(productQuantity.innerHTML)
  };

  // Push singleProduct to cart list
  cartItems.push(singleProduct);
  localStorage.setItem('cart', JSON.stringify(cartItems));

  // Add confirmation message
  let confirm = document.querySelector('.confirmFeedback');
  confirm.innerHTML = 'Item Added to cart.';
  confirm.classList.add('confirmFeedbackVisible');
  console.log("Done")
  confirm.hideTimeout = setTimeout(() => {
    confirm.classList.remove('confirmFeedbackVisible');
  }, 3000);

  // Update cart number on Navbar cart
  addNumCart()
});

// ---------- GET THE CURRENT CART ITEM NUMBER FOR THE NAVBAR CART ----------

function addNumCart() {
  const localStorageContent = localStorage.getItem('cart');
  let cartItemsArray = JSON.parse(localStorageContent);
  let totalQuantityOfProducts = 0

  if (cartItemsArray.length > 0) {
    for(let i=0; i < cartItemsArray.length; i++) {
      let productQuantity = cartItemsArray[i].quantity
      totalQuantityOfProducts += productQuantity
    }
  } else {
    let currentOrder = cartItemsArray.length - 1
    let productQuantity = cartItemsArray[currentOrder].quantity
    totalQuantityOfProducts += productQuantity
  }

  let cartNum = document.querySelector("#product-number");
  cartNum.innerHTML = totalQuantityOfProducts;
}