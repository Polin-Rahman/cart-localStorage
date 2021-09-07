const addItems = () => {
    const inputItem = document.getElementById('input-item');
    const inputPrice = document.getElementById('input-price');
    const name = inputItem.value;
    const price = inputPrice.value;

    if (!name && !price) {
        return;
    }


    //diplay on UI
    displayProduct(name, price);

    //add to local storage
    addProductToCart(name, price);

    inputItem.value = '';
    inputPrice.value = '';

}

const displayProduct = (name, price) => {
    const tbody = document.getElementById('t-body');
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const td2 = document.createElement('td');

    td.innerText = name;
    td2.innerText = price;
    tr.appendChild(td);
    tr.appendChild(td2);
    tbody.appendChild(tr);

}

const getCart = () => {
    const cart = localStorage.getItem('cart');
    let cartObj;
    if (cart) {
        cartObj = JSON.parse(cart);
    }
    else {
        cartObj = [];
    }
    return cartObj;
}

const addProductToCart = (name, price) => {
    const cart = getCart();
    let update = 0;
    for (const product of cart) {
        if (product['name'].toLowerCase() == name.toLowerCase()) {
            product['price'] = price;
            product['quantity'] += 1;
            update++;
        }
    }
    if (update == 0) {
        const product = {};
        product['name'] = name;
        product['price'] = price;
        product['quantity'] = 1;

        cart.push(product);
    }
    const cartStringified = JSON.stringify(cart);
    localStorage.setItem('cart', cartStringified);
}

function displayLocalStorageCart() {
    const cart = getCart();
    for (const product of cart) {
        displayProduct(product.name, product.price);
    }
}

displayLocalStorageCart();

const placeOrder = () => {
    document.getElementById('t-body').textContent = '';
    localStorage.removeItem('cart');
}