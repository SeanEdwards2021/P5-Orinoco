// ---------- HTML CONTAINER FOR PRODUCT SECTION ON HOME PAGE ----------
const productsContainer = document.querySelector("#productContainer");

// ---------- API URL ----------
const url = 'http://localhost:3000/api/cameras';


// ---------- GET PRODUCTS FROM API AND CREATE PRODUCT SECTION ON HTML DOCUMENT
async function getProducts() {
  const response = await fetch(url);
  const data = await response.json();

  // Loops through each object of API and exctract the product data
  for (let i = 0; i < data.length; i++) {

    // Product Value Variables
    let productId = data[i]._id;
    let name = data[i].name;
    let description = data[i].description;
    let priceString = data[i].price.toString();
    let price = priceString.substring(0, 3);
    let imageUrl = data[i].imageUrl;

    // Create & Append New Product
    let product = document.createElement('div');
    product.classList.add('col-sm', 'col-product');

    product.innerHTML = `
      <a href="assets/html/product.html?id=${productId}">
        <div  class="product">
          <div class="productCard">
            <div class="productImgBox">
              <img class="productImg" src="${imageUrl}" alt="Product Image">
              <button class="productImgButton">
                <img class="productImgAdd" src="./assets/images/add-cart.png" alt="add-to-cart">
              </button>
            </div>
            <div class="productContentBox">
              <h2>${name}</h2>
              <div class="productPrice">
                <h3>£ ${price}</h3>
              </div>
              <div class="productDescription">
                <h3>${description}</h3>
              </div>
            </div>
          </div>
        </div>
      </a>`;
    productsContainer.appendChild(product);
  }
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