// ---------- GLOBAL VARIABLES ----------
const localStorageContent = localStorage.getItem('cart');
const cartItems = JSON.parse(localStorageContent);
const cartContainer = document.querySelector('#cartContainer')
const removeItemComfirmation = document.querySelector('.removeItemComfirmation')

// ---------- FUNCTION TO RUN WHEN PAGE LOADS ----------
window.onload = function() {init()};

// Check status of local storage on page load
function init() {

  // Checks for any array in local storage
  if (!localStorageContent) {
    emptyCart()

  // Checks length of cart array
  } else if( cartItems.length === 0){
    emptyCart()
  } else { 
    cartProductList ()
    orderSubtotal()
    addNumCart()
  }
}

// ---------- FUNCTIONS CREATING HTML PAGE ELEMENTS ----------

// Remove item confirmation
function removeItemConfirmation(id) {
  removeItemComfirmation.innerHTML = `
  <div class="container d-flex justify-content-center">
    <div id="my-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content border-0">
          <div class="modal-body p-0">
            <div class="card border-0 p-sm-3 p-2 justify-content-center">
              <div class="card-header pb-0 bg-white border-0 ">
                <div class="row">
                  <div class="col ml-auto">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>
                <p class="font-weight-bold mb-2">Are you sure you wanna delete this product from the cart?</p>
              </div>
              <div class="card-body px-sm-4 mb-2 pt-1 pb-0">
                <div class="row justify-content-end no-gutters">
                  <div class="col-auto">
                    <button type="button" class="btn btn-light text-muted" data-dismiss="modal">Cancel</button>
                  </div>
                  <div class="col-auto">
                    <button type="button" id="${id}" class="btn btn-danger px-4" data-dismiss="modal" onClick="removeSingleProduct(this.id)">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

// Creates empty cart page
function emptyCart() {
  const emptyCart = document.querySelector('.cartSection')
  emptyCart.innerHTML = `
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
    
    let product = document.createElement('div');
    product.classList.add('row', 'productContainer', 'shadow');
    product.innerHTML = `
      <div id="${i}" class="productContainerImage col-md-5 col-11 mx-auto">
        <img src="${productImg}" class="productImage" alt="cart img">
      </div>
      <div class="productContainerDetails col-sm-12 col-md-7 mx-auto px-4 mt-2">
        <div class="row productContainerDetailsRow">
          <div class="col-sm-12col-md-6">
          <h4 class="mb-4 productTitle">${productName}</h4>
          <p class="mb-2 productLens">${productLens}</p>
        </div>
      </div>
      <div class="row productContainerMoreDetails">
        <div class="productContainerItemQuantity col-sm-12 col-md-4">
          <button class="productItemPlus btn btn-outline-primary" id="productCounterDecrease" onClick="quantityChange(${i}, 0)">-</button>
          <span id="${i}" class="productItemQuantity productCounterText">${productQuantity}</span>
          <button class="productItemMinus btn btn-outline-primary" id="productCounterIncrease" onClick="quantityChange(${i}, 1)">+</button>
        </div>
        <div class="productContainerItemPrice col-sm-12 col-md-4">
          <h3 class="productItemPrice">£<span>${totalProductPrice}</span></h3>
        </div>
        <div class="col-4 productContainerRemoveItem">
          <button id="${i}" class="productRemoveItemButton btn btn-danger btn-sm mt-3" onClick="removeItemConfirmation(this.id)" data-toggle="modal" data-target="#my-modal">Remove Item</button>
        </div>
      </div>`;
      cartContainer.appendChild(product);
  }
}

// ---------- FUNCTIONS FOR PRODUCT ITEMS SECTION ----------

// Removes all items currently saved on local storage and updates cart page
function removeAllItems() {
  localStorage.clear();
  emptyCart()
}

// Removes single item saved on local storage and updates cart page
function removeSingleProduct(productID) {
  cartItems.splice(productID, 1);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  init()
}

// Adjusts item quantities in local storage and updates cart page

// Increase  quantity function
function quantityChange(productID, increaseDecrease) {

  // Check local storage
  if (localStorageContent != null) {

    // Check to see what button has been pressed
    if (increaseDecrease === 1) {
      cartItems[productID].quantity = cartItems[productID].quantity + 1;
    } else {
      cartItems[productID].quantity = cartItems[productID].quantity - 1;
      if (cartItems[productID].quantity === 0){
        cartItems.splice(productID, 1);
      }
    }
    window.localStorage.setItem('cart', JSON.stringify(cartItems));
  }
  init()
}

// ---------- FUNCTIONS FOR ORDER SUBTOTAL SECTION ----------

// Gets the total price of all products saved in local storage
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
  }
  product_total.innerHTML = totalCartAmount.toFixed(2)
  orderDiscount(totalCartAmount)
}

// Gets the total price of all discounts applied through the discount codes used
function orderDiscount(totalCartAmount) {

  //Object with all available discount codes.
  let discountCodes = {
    GET25PERCENT: 0.25,
    GET40PERCENT: 0.40,
  }

  let discountedValue = 0

  //Variables used
  let discountCodeUsed =  document.querySelector('#discount_code1').value
  let orderDiscount = document.querySelector('#discount_applied')
  let confirmValid = document.querySelector('.confirmFeedback');
  let confirmInvalid = document.querySelector('.confirmFeedbackInvalid');

  // Check if any discount code has been entered
  if (discountCodeUsed === ""){
    orderTotal(totalCartAmount, discountedValue)

  // Check if discount code is in discountCodes object
  } else if (discountCodeUsed in discountCodes) {
    let discountPercent = discountCodes[discountCodeUsed]
    discountedValue = (discountPercent * totalCartAmount).toFixed(2)

  // Confirm message of discount code being applied to the price of products

  confirmValid.innerHTML = 'Discount Code Applied';
  confirmValid.classList.add('confirmFeedbackVisible');
  confirmValid.hideTimeout = setTimeout(() => {
    confirmValid.classList.remove('confirmFeedbackVisible');
  }, 3000);

  } else {

    // Confirm message of invalid discount code
    confirmInvalid.innerHTML = 'Invalid Discount Code';
    confirmInvalid.classList.add('confirmFeedbackVisible');
    confirmInvalid.hideTimeout = setTimeout(() => {
      confirmInvalid.classList.remove('confirmFeedbackVisible');
    }, 3000);
  }

  // Changes discount code value and calls orderTotal function
  orderDiscount.innerHTML = discountedValue
  orderTotal(totalCartAmount, discountedValue)
}

// Gets the total of the order with discount applied
function orderTotal(totalCartAmount, discountedValue) {
  let orderTotal = document.querySelector('#total_cart_amt')
  orderTotal.innerHTML = (totalCartAmount - discountedValue).toFixed(2)
}

// ---------- CREATE CUSTOMER ON LOCAL STORAGE ----------

function saveCustomerDetails() {

  let customers = []
  const localStorageContent = localStorage.getItem('customer');

  // Get current date for orderPlaced key in customerDetails object
  let today = new Date();
  let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

  // Check to see if there is already items in the cart
  if (localStorageContent === null) {
    customers = [];
  } else {
    customers = JSON.parse(localStorageContent);
  }

  // Creating customer object to push to customer
  let customerDetails = {
    firstName: document.querySelector('#firstName').value,
    lastName: document.querySelector('#lastName').value,
    emailAddress: document.querySelector('#email').value,
    address: document.querySelector('#address').value,
    country: document.querySelector('#country').value,
    county: document.querySelector('#state').value,
    postCode: document.querySelector('#zip').value,
    orderNumber: Math.random().toString(20).substr(2, 15),
    orderPlaced: date,
    paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value
  };

  // Push customer to customer list
  customers.push(customerDetails);
  localStorage.setItem('customer', JSON.stringify(customers));

  orderNumber = customerDetails.orderNumber
  orderDate = customerDetails.orderPlaced
  saveOrderDetails(orderNumber,orderDate )
}

// ---------- CREATE ORDER ON LOCAL STORAGE ----------

function saveOrderDetails(orderNumber, orderDate) {

  let orders = []
  const localStorageContent = localStorage.getItem('orders');
  let productTotal = document.querySelector('#product_total_amt')
  let shippingFee = document.querySelector('#shipping_charge')
  let discount = document.querySelector('#discount_applied')
  let subtotal = document.querySelector('#total_cart_amt')
  
  // Check to see if there is already orders in local storage
  if (localStorageContent === null) {
    orders = [];
  } else {
    orders = JSON.parse(localStorageContent);
  }

  // Creating order object to push to orders
  let orderDetails = {
    productTotal: productTotal.innerHTML,
    shippingFee: shippingFee.innerHTML,
    discount: discount.innerHTML,
    subtotal: subtotal.innerHTML,
    orderNumber: orderNumber,
    orderPlaced: orderDate
  };

  // Push order to orders list
  orders.push(orderDetails);
  localStorage.setItem('orders', JSON.stringify(orders));
}

// ---------- GET THE CURRENT CART ITEM NUMBER FOR THE NAVBAR CART ----------

function addNumCart() {
  const localStorageContent = localStorage.getItem('cart');
  let cartItemsArray = JSON.parse(localStorageContent);
  let totalQuantityOfProducts = 0

  // Loop through cart array and adds up all the quantities 
  for(let i=0; i < cartItemsArray.length; i++) {
    let productQuantity = cartItemsArray[i].quantity
    totalQuantityOfProducts += productQuantity
  }

  // Applies current quantity to HTML file
  let cartNum = document.querySelector("#product-number");
  cartNum.innerHTML = totalQuantityOfProducts;
}