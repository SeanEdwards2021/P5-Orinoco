'use strict';

const url = 'http://localhost:3000/api/cameras/';

// letiables for DOM
let productImage = document.querySelector(".singleProductImg");
let productTitle = document.querySelector(".singleProductTitle");
let productPrice = document.querySelector(".singleProductPrice");
let productDescription = document.querySelector(".singleProductDescription");
let productLenses = document.querySelector(".singleProductLenses");


function init() {
  let productId = getProductId();
  fetchSingleProduct(productId);
  bindEvents()
  drawCounter()  
}

function getProductId() {
  const queryString = window.location.search;
  const urlParam = new URLSearchParams(queryString);
  const id = urlParam.get("id");
  return id;
}

function fetchSingleProduct(id) {
  fetch(url + id)
    .then(response => response.json())
    .then(data => {
      showProduct(data);
    })
    .catch(err => console.log(err))
}

function showProduct(data) {

  // Cache Data Values
  let name = data.name;
  let description = data.description;
  let priceString = data.price.toString();
  let price = priceString.substring(0, 3);
  let imageUrl = data.imageUrl;
  let lenses = data.lenses;

  productTitle.innerHTML = name 
  productPrice.innerHTML = "£" + price 
  productDescription.innerHTML = description
  productImage.src = imageUrl

  for (let i in lenses) {
    const newOLens = document.createElement("option");
    newOLens.textContent = lenses[i];
    productLenses.appendChild(newOLens);
  }
  
  console.log(lenses)
}

// Quantity Counter

let drawCounter = function () {
  document.getElementById('productCounterText').innerHTML = store.counter
}

let bindEvents = function () {
  document.getElementById('productCounterIncrease').addEventListener('click', function () {
    increase()
    drawCounter()
  })
  document.getElementById('productCounterDecrease').addEventListener('click', function () {
    decrease()
    drawCounter()
  }) 
}

let store = {
  counter: 1  
}

let increase = function () {
  store.counter++
}

let decrease = function () {
  store.counter--
}

init()