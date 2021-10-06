const localStorageContent = localStorage.getItem('cart');
const cartItems = JSON.parse(localStorageContent);
const cartContainer = document.querySelector('#cartContainer')

window.onload = function() {init()};

function init() {
  console.log("Working")

  if (!localStorageContent) {
    emptyCart()
  } else if( cartItems.length === 0){
    emptyCart()
  } else { 
    cartProductList ()
    orderSubtotal()
    addNumCart()
  }
}

function emptyCart() {
  let section = document.querySelector('.cartSection')
  section.innerHTML = `
    <div class="container card">
      <div class="row shadow">
        <div class="col-md-12 mt-5">
          <div id="cart-products">
            <div class="text-center">
              <i class="fas fa-shopping-basket h1" style="background:-webkit-linear-gradient(30deg, rgba(206,126,73,1) 32%, rgba(144,91,250,1) 100%);-webkit-background-clip: text;-webkit-text-fill-color:transparent;" aria-hidden="true"></i>
            </div>
            <h2 class="text-center font-weight-bold my-5">Your Cart Is Currently Empty</h2>
            <p class="text-center lead">Before proceed to checkout you must add some products to your shopping cart.<br>
            You will find a lot of interesting products on our Homepage.</p>
            <a href="../../index.html" style="text-decoration:none;">
              <button type="button" class="btn btn-outline-primary mx-auto d-block mb-5">Return to shop 
                <i class="fas fa-reply" aria-hidden="true"></i>
              </button>
            </a>
          </div>     
        </div>
      </div>
    </div>`;
}

function removeAllItems() {
  localStorage.clear();
  emptyCart()
}

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
    
    let product = document.createElement('div');
    product.classList.add('row', 'productContainer', 'shadow');
    product.innerHTML = `
      <div id="${i}" class="productContainerImage col-md-5 col-11 mx-auto">
        <img src="${productImg}" class="productImage" alt="cart img">
      </div>
      <div class="col-md-7 col-11 mx-auto px-4 mt-2">
        <div class="row">
          <div class="col-6">
          <h4 class="mb-4 productTitle">${productName}</h4>
          <p class="mb-2 productLens">${productLens}</p>
        </div>
      </div>
      <div class="row productContainerMoreDetails">
        <div class="productContainerItemQuantity col-4">
          <button class="productItemPlus btn btn-outline-primary" id="productCounterDecrease">-</button>
          <span id="productCounterText" class="productItemQuantity">${productQuantity}</span>
          <button class="productItemMinus btn btn-outline-primary" id="productCounterIncrease">+</button>
        </div>
        <div class="col-4 productContainerItemPrice">
          <h3 class="productItemPrice">£<span>${totalProductPrice}</span></h3>
        </div>
        <div id="col-4 productContainerRemoveItem">
          <button id="${i}" class="productRemoveItemButton btn btn-danger btn-sm mt-3" onClick="removeSingleProduct(this.id)">Remove Item</button>
        </div>
      </div>`;
      cartContainer.appendChild(product);
  }
}

function removeSingleProduct(productID) {
  console.log(cartItems)
  cartItems.splice(productID, 1);
  console.log(cartItems)
  localStorage.setItem('cart', JSON.stringify(cartItems));
  init()
}

function changeProductQuantity() {
  console.log("Hello")
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


