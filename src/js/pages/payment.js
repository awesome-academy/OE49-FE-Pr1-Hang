export function payment(){
    let name = document.getElementById("input-name");
    let email = document.getElementById("input-email");
    let phone = document.getElementById("input-phone");
    let address = document.getElementById("input-address");
    let customer = JSON.parse(localStorage.getItem('customer'));

    if(customer && name && email && phone && address) {
        name.value = customer.name
        email.value = customer.email
        phone.value = customer.phone
        address.value = customer.address
    }

    let paymentForm = document.querySelector('#payment-form');
    paymentForm && paymentForm.addEventListener('submit', () => {
        let customerInformation = {
            name: name.value, 
            email: email.value, 
            phone: phone.value, 
            address: address.value
        };
        let isValidate = Object.values(customerInformation).some((item) => item.trim())
        if(isValidate) {
            let newCustomer = customerInformation;
            localStorage.setItem('customer', JSON.stringify(newCustomer));
            return paymentForm.action = "./confirm-order.html";
        }
        return document.querySelector('.error-message').style.setProperty("display", "block", "important");
    });
}
