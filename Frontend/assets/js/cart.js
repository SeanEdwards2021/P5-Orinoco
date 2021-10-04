function cartProductList () {

  const localStorageContent = localStorage.getItem('cart');
  let cartItems = JSON.parse(localStorageContent);
  let cartContainer = document.querySelector('#cartContainer')

  // Loops through each object of API and exctract the product data
  for (let i = 0; i < cartItems.length; i++) {

    // Product Value Variables
    let productImg = cartItems[i].imageUrl
    let productName = cartItems[i].name
    let productPriceString = cartItems[i].price.toString();
    let productPrice = productPriceString.substring(0, 3);
    let productLens = cartItems[i].selectLenses
    let productQuantity = cartItems[i].quantity
    let totalProducPrice = (productPrice * productQuantity);

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
          <h3>$<span id="itemval">${totalProducPrice}</span></h3>
        </div>
      </div>`;
      cartContainer.appendChild(product);
  }
}
  
cartProductList()
 