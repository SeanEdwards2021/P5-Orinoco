const localStorageContent = localStorage.getItem('cart');
const cartItems = JSON.parse(localStorageContent);
const cartContainer = document.querySelector('#cartContainer')

window.onload = function() {init()};

function init() {
  cartProductList ()
  numberItemsInCart ()
  orderSubtotal()
  addNumCart()
}

function numberItemsInCart() {

  let numberItemsInCart = document.querySelector('.numberItemsInCart')
  let totalNumberItemsInCart = 0

  // Loops through each object of API and extract the product data
  for (let i = 0; i < cartItems.length; i++) {

    // Product Value Variables
    let productQuantity = cartItems[i].quantity
    totalNumberItemsInCart += productQuantity
  }
  numberItemsInCart.innerHTML = "Total Items: " + totalNumberItemsInCart
}

function cartProductList() {

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
    let product = document.createElement('div');
    product.classList.add('row');

    product.innerHTML = `
      <div class="col-md-5 col-11 mx-auto bg-light d-flex justify-content-center align-items-center shadow product_img">
        <img src="${productImg}" class="img-fluid" alt="cart img">
      </div>
      <div class="col-md-7 col-11 mx-auto px-4 mt-2">
        <div class="row">
          <div class="col-6 card-title">
          <h4 class="mb-4 product_name">${productName}</h4>
          <p class="mb-2">${productLens}</p>
        </div>
        <div class="col-6">
          <div id="productCounter">
            <p><i class="fas fa-trash-alt"></i>Remove Product</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-8 d-flex justify-content-between remove_wish">
          <button class="btn btn-outline-primary" id="productCounterDecrease">-</button>
          <span id="productCounterText" class="counter-text">${productQuantity}</span>
          <button class="btn btn-outline-primary" id="productCounterIncrease">+</button>
        </div>
        <div class="col-4 d-flex justify-content-end price_money">
          <h3>£<span id="itemval">${totalProductPrice}</span></h3>
        </div>
      </div>`;
      cartContainer.appendChild(product);
  }
}

function orderSubtotal() {

  let product_total = document.querySelector('#product_total_amt')
  let totalCartAmount = 0

  // Loops through each object of API and extract the product data
  for (let i = 0; i < cartItems.length; i++) {

    // Product Value Variables
    let productPriceString = cartItems[i].price.toString();
    let productPrice = productPriceString.substring(0, 3);
    let productQuantity = cartItems[i].quantity
    let totalProductPrice = (productPrice * productQuantity);

    totalCartAmount += totalProductPrice
    console.log(totalCartAmount)
  }
  product_total.innerHTML = totalCartAmount
  orderDiscount(totalCartAmount)
}

function orderDiscount(totalCartAmount) {
  let orderDiscount = document.querySelector('#discount_applied')
  orderDiscount = orderDiscount.innerHTML = 0
  orderTotal(totalCartAmount, orderDiscount)
}

function orderTotal(totalCartAmount, orderDiscount) {
  let orderTotal = document.querySelector('#total_cart_amt')

  orderTotal.innerHTML = totalCartAmount - orderDiscount
}

// SCROLL TO TOP OF PAGE FEATURE

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

// Get current cart item number for Navbar cart
function addNumCart() {
  const localStorageContent = localStorage.getItem('cart');
  let cartItemsArray = JSON.parse(localStorageContent);
  let totalQuantityOfProducts = 0

  for(let i=0; i < cartItemsArray.length; i++) {
    let productQuantity = cartItemsArray[i].quantity
    totalQuantityOfProducts += productQuantity
  }

  let cartNum = document.querySelector("#product-number");
  cartNum.innerHTML = totalQuantityOfProducts;
}


