'use strict';

const url = 'http://localhost:3000/api/cameras/';

// Variables for DOM
let productImage = document.querySelector(".singleProductImg");
let productTitle = document.querySelector(".singleProductTitle");
let productPrice = document.querySelector(".singleProductPrice");
let productDescription = document.querySelector(".singleProductDescription");
let productLenses = document.querySelector("#singleProductLenses");


function init() {
  let productId = getProductId();
  fetchSingleProduct(productId);
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
    const newOption = document.createElement("option");
    newOption.textContent = lenses[i];
    productLenses.appendChild(newOption);
  }
  console.log(lenses)
}


init()