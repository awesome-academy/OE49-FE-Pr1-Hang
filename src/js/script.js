import {loadData} from '/src/js/pages/product.js';
import {loadProductCart} from '/src/js/pages/cart.js';
import {payment} from '/src/js/pages/payment.js';
import {confirmOrder} from '/src/js/pages/confirm-order.js';

loadData();
loadProductCart();
payment();
confirmOrder();
