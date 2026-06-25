let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cartContainer");
const total = document.getElementById("total");
function displayCart() {
    cartContainer.innerHTML = "";
    let totalPrice = 0;
    cart.forEach(product => {
        totalPrice +=
            product.price *
            product.quantity;

        cartContainer.innerHTML += `

        <div class="cart-card">

            <img
            src="${product.thumbnail}">

            <div>

                <h3>
                    ${product.title}
                </h3>

                <h4>
                    $${product.price}
                </h4>

                <p>

                    Quantity:
                    ${product.quantity}

                </p>

                <button
                onclick="increaseQuantity(${product.id})">

                    +

                </button>

                <button
                onclick="decreaseQuantity(${product.id})">

                    -

                </button>

                <button
                onclick="removeItem(${product.id})">

                    Remove

                </button>


            </div>

        </div>

        `;
    });

    total.textContent =
        "$" + totalPrice.toFixed(2);
};


function goToCheckout() {
    window.location.href = "checkout.html"

}

function increaseQuantity(id) {

    const product =
        cart.find(
            item =>
                item.id === id
        );

    product.quantity++;

    saveCart();

}


function decreaseQuantity(id) {

    const product =
        cart.find(
            item =>
                item.id === id
        );

    if (product.quantity > 1) {

        product.quantity--;

    }

    saveCart();


}

function removeItem(id) {

    cart = cart.filter((product) => {
        return product.id !== id;
    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}



function saveCart() {

    displayCart();
}



displayCart();

