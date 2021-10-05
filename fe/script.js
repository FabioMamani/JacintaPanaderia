let productList = [];
let carrito = [];
let total = 0;

function add(productId, price) {
    const product = productList.find(p => p.id === productId);
    product.stock--;
    console.log(productId, price);
    carrito.push(productId);
    total = total + price;
    document.getElementById("checkout").innerHTML = `Pagar $${total}`;
    displayProducts()
}

async function pay(product, price) {
    try {
        const productList = await (await fetch("/api/pay", {
            method: "post",
            body: JSON.stringify(carrito),
            headers: {
                "content-type": "application/json"
            }
        })).json();
        console.log(product, price);
    } catch {
        window.alert("Sin stock");
    }

    carrito = [];
    total = 0;
    await fetchProducts();
    document.getElementById("checkout").innerHTML = `Pagar $${total}`;


}
//LA LISTA DE PRODUCTOS EN  VEZ DE HARDCODEAR EN EL INDEX , LO VAMOS A PASAR AL BACKEND
function displayProducts() {
    let productsHTML = '';
    productList.forEach(p => {
        let buttonHTML = `<a href="#" class="button-add btn btn-primary" onclick="add(${p.id},${p.price})">Comprar</a>`;
        if (p.stock <= 0) {
            buttonHTML = `<a href="#" class="button-add btn btn-primary disabled" onclick="add(${p.id},${p.price})">Sin stock</a>`;
        }
        productsHTML +=
            `<div class="col">
    <div class="card">
        <img src="${p.image} ">
        <div class="card-body">
            <h5 class="card-title">${p.nombre} </h5>
            <p class="card-text"><small class="text-muted">$${p.price} </small></p>
            ${buttonHTML}  
        </div>
    </div>
</div>`

    });
    document.getElementById('products-content').innerHTML = productsHTML;
}

async function fetchProducts() {
    productList = await (await fetch("/api/productos")).json();
    displayProducts();
}
//--HACEMOS UN FETCH PARA CUANDO ARRANQUE LA APP (CUANDO ARRANQUE EN EL INDEX) SE HAGA FETCH DE LOS PRODUCT
window.onload = async() => {


    await fetchProducts();

};