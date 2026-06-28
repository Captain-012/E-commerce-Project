import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword,

} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

let signIn = document.getElementById("signin");
signIn.addEventListener("click", () => {
    let userEmail = document.getElementById("email").value.trim();
    let userPassword = document.getElementById("password").value.trim();

    signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
            const user = userCredential.user;

            localStorage.setItem("currentUser", JSON.stringify({
                uid : user.uid,
                email : user.email
            }));



            // Signed in 
            Swal.fire({
                title: "Welcome Back!",
                text: "Login Successful",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = "./index.html";
            });

        })
        .catch((error) => {

            if (error.code === "auth/invalid-credential") {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: "Incorrect email or password."
                });
            }

            else if (error.code === "auth/network-request-failed") {
                Swal.fire({
                    icon: "error",
                    title: "No Internet",
                    text: "Please check your connection."
                });
            }

            else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.message
                });
            }
        });


})


