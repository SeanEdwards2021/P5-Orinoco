'use strict';

// API URL  
const url = 'http://localhost:3000/api/cameras/';

// letiables for DOM
let productImage = document.querySelector(".singleProductImg");
let productTitle = document.querySelector(".singleProductTitle");
let productPrice = document.querySelector(".singleProductPrice");
let productDescription = document.querySelector(".singleProductDescription");
let productLenses = document.querySelector(".singleProductLenses");
const btnAddToCart = document.querySelector(".addToCart");
let product = {};

// Funtions to run when page is loading
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
  // Call fimction to get current cart num when page has loaded
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
  if(productQuantityCounterValue.counter !== 1) {
    productQuantityCounterValue.counter--
    document.getElementById('productCounterText').innerHTML = productQuantityCounterValue.counter
  }
}

// Get current cart item number for Navbar cart
function addNumCart() {
  const localStorageContent = localStorage.getItem('cart');
  let cartItemsArray = JSON.parse(localStorageContent);
  let cartNum = document.querySelector("#product-number");
  cartNum.innerHTML = cartItemsArray.length;
}

// ---------- CALLING PAGE FUNCTIONS ----------
init()