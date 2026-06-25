import { auth } from "./firebase.js";
import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

const authButtons =
    document.getElementById("authButtons");

const profile =
    document.getElementById("profile");

const profileHeader =
    document.getElementById("profileHeader");

const profileEmail =
    document.getElementById("profileEmail");

const dropdownEmail =
    document.getElementById("dropdownEmail");

const profileImg =
    document.getElementById("profileImg");

const profileDropdown =
    document.getElementById("profileDropdown");

const logoutBtn =
    document.getElementById("logoutBtn");

onAuthStateChanged(auth, (user) => {
    if (user) {
        authButtons.style.display = "none";

        profile.style.display = "block";

        profileEmail.textContent = user.email;
        dropdownEmail.textContent = user.email;

        profileImg.src =
            `https://ui-avatars.com/api/?name=${user.email[0]}&background=c9a227&color=fff`;
    }
    else {
        authButtons.style.display = "flex";
        profile.style.display = "none";
    }
});
profileHeader.addEventListener("click", () => {
    profileDropdown.classList.toggle("show");
});

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {


        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You'll need to sign in again to continue shopping on CCollection.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#c9a227",
            cancelButtonColor: "#555",
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "No, Stay Here",
            reverseButtons: true
        });

        if (result.isConfirmed) {
            await signOut(auth);

            await Swal.fire({
                icon: "success",
                title: "👋 See You Soon!",
                html: `
          Thank you for visiting <b>CCollection</b>.<br>
          You've been signed out securely.
        `,
                confirmButtonColor: "#c9a227"
            });

            window.location.href = "/index.html";
        }
    });
}


