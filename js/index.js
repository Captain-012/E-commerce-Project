const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const hero = document.getElementById("hero");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("show");

    if (hero) {
      hero.style.marginTop =
        mobileMenu.classList.contains("show")
          ? `120px`
          : "0";
    }
  });
}

function goToCart() {
  window.location.href = "./cart.html"  
}



