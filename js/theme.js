const themeToggle = document.getElementById("themeToggle");
const toast = document.getElementById("toast");

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){
    document.body.classList.add("dark-theme");
}

function showToast(message){

    if(!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },2500);
}

if(themeToggle){

    themeToggle.addEventListener("click",()=>{

        document.body.classList.toggle("dark-theme");

        if(document.body.classList.contains("dark-theme")){

            localStorage.setItem("theme","dark");

            showToast("🌙 Dark Mode Activated");

        }else{

            localStorage.setItem("theme","light");

            showToast("☀️ Light Mode Activated");

        }

    });

}

function goToCart() {
    window.location.href = "/HTML/cart.html";
}