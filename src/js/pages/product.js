import { formatMoney } from "../utils.js";

export function loadData() {
  const PRODUCT_API_URL = "http://localhost:4000/products";

  fetch(PRODUCT_API_URL)
    .then((response) => response.json())
    .then((data) => {
      let productGrid = document.querySelector('.product-grid');
      data.map((product) => {
        let productItem = createElement('div', { className: "product-item transition"});
        let productImage = createElement('img', { src: `../assets/images/products/${product.image}`, alt: "product image"})
        let productInfo = createElement('div', { className: "product__info"});
        let productPrice = createElement('span', { className: "product__price", textContent: formatMoney(product.price)});
        let productTitle = createElement('h2', { className: "product__title", textContent: product.name});       
        let productRate = createElement('span', { className: "product__rate"});
        
        let stars = rating( product.rating );
        stars.forEach( star => productRate.appendChild(star));
        productRate.innerHTML  += '(12 đánh giá)';

        productGrid.appendChild(productItem);
        productItem.appendChild(productImage);
        productItem.appendChild(productInfo);
        productItem.appendChild(productButton());
        productInfo.appendChild(productPrice);
        productInfo.appendChild(productTitle);
        productInfo.appendChild(productRate);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function rating(rating){
    let ratingInfo = new Array();
    for (let i = 0; i < rating; i++)
        ratingInfo[i] = createElement('i', { className: 'fas fa-star'});
        
    for (let i = rating; i < 5; i++)
        ratingInfo[i] = createElement('i', { className: 'far fa-star'});

    return ratingInfo;
}

function productButton(){
    let productButton = createElement('div', { className: "product__btn"});
    let buttonBuyNow = createElement('button', { className: "button button--yellow transition", textContent: "Mua ngay"});
    let buttonDetail = createElement('button', { className: "button button--black transition", textContent: "Xem chi tiết"});
    
    productButton.appendChild(buttonBuyNow);
    productButton.appendChild(buttonDetail);
    
    return productButton;
}

function createElement(tagName, props) {
  return Object.assign(document.createElement(tagName), props || {});
}
