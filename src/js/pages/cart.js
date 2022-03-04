import { createElement } from '../pages/product.js';
import { formatMoney } from '../utils.js';

export function loadProductCart(){
    let products = JSON.parse(localStorage.getItem('products'));
    let productList = document.querySelector('.cart__products');

    if(!products){
        let text = document.querySelector('.cart__empty');
        let content = document.querySelector('.cart__content');
        let buy = document.querySelector('.cart__buy');
        text.style.display = 'block';
        content.style.display = 'none';
        buy.style.display = 'none';
    } else {
        let totalMoney = 0;
        products.map((product) => {
            let tr = createElement('tr');
            let stt = createElement('th', { scope: 'row', textContent: products.indexOf(product) + 1 });
            let itemImage = createElement('td', { className: 'cart__image'});
            let imageProduct = createElement('img', { src: `../assets/images/products/${product.image}`, alt: 'product image'});
            let nameProduct = createElement('td', {textContent: product.name});       
            let priceProduct = createElement('td', {textContent: formatMoney(product.price)});
            let amountProduct = createElement('td', {className: 'cart__amount'});
            let input = createElement('input', {type: 'number', min: 1, value: product.quantity});
            let money = createElement('td', {textContent: formatMoney(product.price * product.quantity)});  
            let itemDelete = createElement('td', {className: 'cart__delete'});
            let buttonDelete = createElement('button', {className: 'button', type: 'button'});
            let iconDelete = createElement('i', {className: 'fas fa-times'});
    
            productList && productList.appendChild(tr);
            tr.append(stt, itemImage, nameProduct, priceProduct, amountProduct, money, itemDelete)
            itemImage.appendChild(imageProduct);
            amountProduct.appendChild(input);
            itemDelete.appendChild(buttonDelete);
            buttonDelete.appendChild(iconDelete);

            input.addEventListener('change', () => {
                money.textContent = formatMoney(product.price * input.value);
                let newTotalMoney = totalMoney + product.price * (input.value - product.quantity);
                renderTotalMoney(newTotalMoney);
                
                let products = JSON.parse(localStorage.getItem('products'));
                let productIndex = products.findIndex((item) => item.id === product.id);
                products[productIndex] = {...products[productIndex], quantity: input.value};
                localStorage.setItem('products', JSON.stringify(products));
            }); 
            totalMoney += product.price * product.quantity;
        }); 
        renderTotalMoney(totalMoney);
    }
}

function renderTotalMoney(totalMoney){
    document.querySelector('.total-money').innerHTML = formatMoney(totalMoney);
    document.querySelector('.tax-money').innerHTML = formatMoney(totalMoney * 10 / 100);
    document.querySelector('.total-payment').innerHTML = formatMoney(totalMoney * 110 / 100);
}
