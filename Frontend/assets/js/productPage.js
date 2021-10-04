'use strict';

// ---------- API URL ----------
const url = 'http://localhost:3000/api/cameras/';

// ---------- Variables for DOM ----------
let productImage = document.querySelector(".singleProductImg");
let productTitle = document.querySelector(".singleProductTitle");
let productPrice = document.querySelector(".singleProductPrice");
let productDescription = document.querySelector(".singleProductDescription");
let productLenses = document.querySelector(".singleProductLenses");
let productQuantity = document.querySelector("#productCounterText");
const btnAddToCart = document.querySelector(".addToCart");
let product = {};

// ---------- Funtions to run when page is loading ----------
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
  document.getElementById('productCounterIncrease').addEventListener('click', function () {
    increase()
  })
  
  document.getElementById('productCounterDecrease').addEventListener('click', function () {
    decrease()
  }) 
}

// Increase/Decrease functions
let increase = function () {
  productQuantityCounterValue.counter++
  document.getElementById('productCounterText').innerHTML = productQuantityCounterValue.counter
}

let decrease = function () {

  // Stop decreasing to anything <1
  if(productQuantityCounterValue.counter !== 1) {
    productQuantityCounterValue.counter--
    document.getElementById('productCounterText').innerHTML = productQuantityCounterValue.counter
  }
}

// ---------- Adding item to cart in Local Storage ----------

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
    selectLenses: productLenses.value,
    quantity: productQuantity.innerHTML
  };

  // Push singleProduct to cart list
  cartItems.push(singleProduct);
  localStorage.setItem('cart', JSON.stringify(cartItems));

  // Update cart number on Navbar cart
  addNumCart()
});

// Get current cart item number for Navbar cart
function addNumCart() {
  const localStorageContent = localStorage.getItem('cart');
  let cartItemsArray = JSON.parse(localStorageContent);
  let cartNum = document.querySelector("#product-number");
  cartNum.innerHTML = cartItemsArray.length;
}

// ---------- CALLING PAGE FUNCTIONS ----------
init()