const randomNumber =
    Math.trunc(
        Math.random() * 90000
    ) + 10000;

document.getElementById(
    "orderNumber"
).textContent =
    `Order #CC-${randomNumber}`;

function goHome() {
    window.location.href =
        "product.html";
}