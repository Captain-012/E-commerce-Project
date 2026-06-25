let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];

const totalPrice =
    document.getElementById("totalPrice");

let total = cart.reduce(
    (sum, product) => {
        return sum +
        (product.price * product.quantity);
    },
    0
);

totalPrice.textContent =
    `$${total.toFixed(2)}`;


    const form =
    document.getElementById(
        "checkoutForm"
    );

form.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();

        showToast(
            "🎉 Order Placed Successfully"
        );

        localStorage.removeItem("cart");

        setTimeout(() => {

            window.location.href =
                "success.html";

        }, 2000);

    }
);

function showToast(message){

    const toast =
        document.getElementById(
            "toast"
        );

    toast.textContent = message;
    toast.style.display = "block";

    setTimeout(() => {
        toast.style.display = "none";
    }, 2500);

}

