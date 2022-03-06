export function confirmOrder(){
    let customer = JSON.parse(localStorage.getItem('customer'));
    let name = document.querySelector('.shipping-address .name');
    let phone = document.querySelector('.shipping-address .phone');
    let address = document.querySelector('.shipping-address .address');
    if(name && phone && address) {
        name.innerHTML = customer.name;
        phone.innerHTML = customer.phone;
        address.innerHTML = customer.address;
    }

    let order = document.querySelector('.order');
    order && order.addEventListener('click', () => {
        localStorage.removeItem('products');
    })
}
