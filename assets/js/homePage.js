let productsContainer = document.querySelector("#productContainer");
let url = 'https://orinoco-op.herokuapp.com/api/cameras';


async function getProducts() {
  const response = await fetch(url);
  const data = await response.json();

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
    product.classList.add('col-sm', "col-xl-3", 'col-product');

    product.innerHTML = `
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
              <div class="productSize">
                <h3>£ ${price}</h3>
              </div>
              <div class="productColor">
                <h3>${description}</h3>
              </div>
              <a href="${productId}">Buy Now</a>
            </div>
          </div>
        </div>`;
    productsContainer.appendChild(product);
  }
}