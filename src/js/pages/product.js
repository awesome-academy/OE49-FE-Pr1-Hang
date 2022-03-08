import { formatMoney } from "../utils.js";

const cart = document.querySelector('.header__cart');
const cartLink = cart.querySelector('a');
cartLink.href = './cart.html';

const products = JSON.parse(localStorage.getItem('products'));
const sum = products && (products.reduce((sum, product) => sum + parseInt(product.quantity), 0))
cart.setAttribute('data-total-cart', sum || 0);

let limit, sort, order

export function showProducts(){
  let sortOptions  = document.getElementById('sort-options')
  let showOptions  = document.getElementById('show-options')

  sortOptions && sortOptions.addEventListener('change', () => {
    let options = {
      'price-asc': {
        sortBy: 'price'
      },
      'price-desc': {
        sortBy: 'price',
        order: 'desc'
      },
      'featured-product': {
        sortBy: 'rating',
        order: 'desc'
      },
    }
    sort = options[sortOptions.value].sortBy
    order = options[sortOptions.value].order
    return loadData()
  })

  showOptions && showOptions.addEventListener('change', () => {
    limit = showOptions.value
    return loadData()
  })
  return loadData()
}

function loadData() {
  let PRODUCT_API_URL = new URL("http://localhost:4000/products"),
    params = {
      _page: 1,
      _limit: limit || 18,
      _sort: sort || 'name',
      _order: order || 'asc'
    }
    Object.keys(params).forEach(key => PRODUCT_API_URL.searchParams.append(key, params[key]))

  fetch(PRODUCT_API_URL)
    .then((response) => response.json())
    .then((data) => {
      let productGrid = document.querySelector('.product-grid');
      if(productGrid) productGrid.innerHTML = ''

      data.map((product) => {
        let productItem = createElement('div', { className: "product-item transition"});
        let productImage = createElement('img', { src: `../assets/images/products/${product.image}`, alt: "product image"})
        let productInfo = createElement('div', { className: "product__info"});
        let productPrice = createElement('span', { className: "product__price", textContent: formatMoney(product.price)});
        let productTitle = createElement('h2', { className: "product__title", textContent: product.name});       
        let productRate = createElement('span', { className: "product__rate"});
        let productButton = createElement('div', { className: "product__btn"});
        let buttonBuyNow = createElement('button', { className: "button button--yellow transition", textContent: "Mua ngay"});
        buttonBuyNow.addEventListener("click", () => addToCart({id: product.id, image: product.image, name: product.name, price: product.price, quantity: 1}));
        let buttonDetail = createElement('button', { className: "button button--black transition", textContent: "Xem chi tiết"});
    
        let stars = rating( product.rating );
        stars.forEach( star => productRate.appendChild(star));
        productRate.innerHTML  += '(12 đánh giá)';

        productGrid && productGrid.appendChild(productItem);
        productItem.append(productImage, productInfo, productButton);
        productInfo.append(productPrice, productTitle, productRate);
        productButton.append(buttonBuyNow, buttonDetail);
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

function addToCart(product){
  let totalCart = cart.getAttribute('data-total-cart');
  cart.setAttribute('data-total-cart', parseInt(totalCart) + 1);

  let products = JSON.parse(localStorage.getItem('products')) || [];
  let productIndex = products.findIndex((item) => item.id === product.id);

  if(productIndex !== -1){
    let newProduct = {...products[productIndex], quantity: products[productIndex].quantity + 1};
    products[productIndex] = newProduct;
  } else {
    products.push(product);
  }

  localStorage.setItem('products', JSON.stringify(products));
}

export function createElement(tagName, props) {
  return Object.assign(document.createElement(tagName), props || {});
}
