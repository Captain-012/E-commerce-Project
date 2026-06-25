import { auth } from "./firebase.js";
let allProducts = [];
let cart = JSON.parse(localStorage.getItem("cart"))
    || [];

async function getProducts() {
    try {

        const responses = await Promise.all([
            fetch("https://dummyjson.com/products/category/mens-shirts"),
            fetch("https://dummyjson.com/products/category/mens-shoes"),
            fetch("https://dummyjson.com/products/category/mens-watches"),
            fetch("https://dummyjson.com/products/category/sunglasses")
        ]);

        const data = await Promise.all(
            responses.map(response => response.json())
        );

        allProducts = data.flatMap(item => item.products);

        displayProducts(allProducts);

    } catch (error) {
        console.log(error);
    }
}








let display = document.getElementById("display");
const displayProducts = (products) => {
    display.innerHTML = ""
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'none';
    products.forEach(product => {
        display.innerHTML += `
                        <div class="product">
                            <div class="img-wrap">
                              <img src="${product.thumbnail}" alt="${product.title}">
                            </div>
                            <div class="card-body">
                                <span class="tag">${product.category}</span>
                                <h3>${product.title}</h3>
                                <p>
                                    <span class="short">${product.description.substring(0, 120)}...</span>
                                    <span class="full" style="display:none">${product.description}</span>
                                </p>

                                <button onclick="toggleDesc(this)" class="btn">Read More</button>
                            </div>

                            <div class="card-footer">
                                <h4>$${product.price}</h4>
                                <button
                                    class="add-cart" onclick="addToCart(${product.id})">Add to cart
                                </button>
                            </div>
                        </div>
            `
    });
}

function addToCart(productId) {
    const user = auth.currentUser;

    // User is not logged in
    if (!user) {
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "info",
            title: "Sign in to save this item to your CCollection cart.",
            background: "#111",
            color: "#fff",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true
        });

        // Redirect after the toast
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2500);

        return;
    }





    // Add product to cart here 
    const selectedProduct =
        allProducts.find(product =>
            product.id === productId
        );

    const existingProduct =
        cart.find(product =>
            product.id === productId
        );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...selectedProduct,
            quantity: 1
        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    showToast(
        "🛒 Product Added To Cart"
    );

    console.log(productId);



}

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) {
        console.log("cartcount not found");


    }


    if (cartCount) {

        const totalItems =
            cart.reduce((total, product) => {
                return total + product.quantity;
            }, 0);

        cartCount.textContent = totalItems;
    }
}

window.addToCart = addToCart;



function showToast(message) {

    const toast =
        document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


 const toggleDesc = (bt) => {
    // console.log(productDiv);
    let productDiv = bt.closest(".product")


    let shortText = productDiv.querySelector(".short")
    let fullText = productDiv.querySelector(".full")
    let btn = productDiv.querySelector(".btn")


    if (fullText.style.display === "none") {
        btn.textContent = "Read less";
        fullText.style.display = "block";
        shortText.style.display = "none"
    } else {
        btn.textContent = "Read more";
        fullText.style.display = "none";
        shortText.style.display = "block"
    }


}

window.toggleDesc = toggleDesc






let searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

    let searchUser = searchInput.value.toLowerCase();

    let filteredUser = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchUser)
    );

    displayProducts(filteredUser);

});

let selectedCategory = document.getElementById("categoryFilter");
selectedCategory.addEventListener("change", () => {
    let categoryValue = selectedCategory.value;

    if (categoryValue === "all") {
        displayProducts(allProducts);
    } else {
        let filteredCategory = allProducts.filter(product =>
            product.category.toLowerCase() === categoryValue.toLowerCase()
        );
        displayProducts(filteredCategory);
    }
})

getProducts();
updateCartCount();

