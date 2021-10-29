// ---------- GLOBAL VARIABLES ----------
const orders = JSON.parse(localStorage.getItem('orders'));
const cartContainer = document.querySelector('#confirmProductContainer')

// ---------- VARIABLES FOR DOM ----------
let firstName = document.querySelector(".firstName");
let orderDate = document.querySelector(".orderDate");
let orderNumber = document.querySelector(".orderNumber");
let shippingAddress = document.querySelector(".shippingAddress");
let paymentMethod = document.querySelector(".paymentMethod");
let emailConfirmation = document.querySelector(".email");

let productPrice = document.querySelector(".confirmationProductTotal");
let shippingFee = document.querySelector(".confirmationShippingFee");
let discount = document.querySelector(".confirmationDiscount");
let subtotal = document.querySelector(".confirmationSubtotal");


window.onload = function() {init()};

function init() {
  formDetails()
  cartProductList()
  removeAllItems()
}

function formDetails() {
  firstName.innerHTML = "Hello, " + orders[0].contact.firstName
  orderDate.innerHTML = orders[0].contact.orderPlaced
  orderNumber.innerHTML = sessionStorage.getItem('orderId')
  shippingAddress.innerHTML = orders[0].contact.address
  paymentMethod.innerHTML = orders[0].contact.paymentMethod
  emailConfirmation.innerHTML = "We will be sending shipping confirmation email to " + orders[0].contact.email + " when the item shipped successfully!"
  productPrice.innerHTML = "£" + orders[0].orderTotals.productTotal
  shippingFee.innerHTML = orders[0].orderTotals.shippingFee
  discount.innerHTML = "£" +  orders[0].orderTotals.discount
  subtotal.innerHTML = "£" +  orders[0].orderTotals.subtotal
}

// Creates cart page with the items from local storage
function cartProductList() {
  cartContainer.innerHTML = ''

  // Loops through each object of API and extract the product data
  for (let i = 0; i < orders[0].products.length; i++) {

    // Product Value Variables
    let productImg = orders[0].products[i].imageUrl
    let productName = orders[0].products[i].name
    let productPriceString = orders[0].products[i].price.toString();
    let productPrice = productPriceString.substring(0, 3);
    let productLens = orders[0].products[i].selectLenses
    let productQuantity = orders[0].products[i].quantity
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
  sessionStorage.clear();
}
