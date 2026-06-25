import { auth, db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
const colref = collection (db, "users");

let signup = document.getElementById("signup");
signup.addEventListener("click", async (e) => {


    let userName = document.getElementById("username").value.trim();
    let userEmail = document.getElementById("email").value.trim();
    let userPassword = document.getElementById("password").value.trim();


    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
        const querysnapshot = await addDoc(colref, {
            uid: userCredentials.user.uid,
            username: userName,
            email: userEmail,
            password: userPassword,
        })
        // console.log(userCredentials);
        console.log(querysnapshot);




        await sendEmailVerification(auth.currentUser);

        console.log("Email verified");


        window.location.href = "./login.html";



    } catch (error) {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
            console.log("Email already exist");
            
        }
        else if (error.code === "auth/invalid-email") {
            console.log("Invalid email address.");
        }
        else if (error.code === "auth/weak-password") {
            alert("Password should be at least 6 characters.");
        }
        else {
            alert(error.message);
            console.log(error);
        }

        console.log(error.message);

    }



})


let passwordInput = document.getElementById('password');
let showIcon = document.getElementById('showIcon');
let hideIcon = document.getElementById('hideIcon');

window.togglePassword = function () {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        hideIcon.style.display = "none"
        showIcon.style.display = "block"

    } else {
        passwordInput.type = "password"
        hideIcon.style.display = "block"
        showIcon.style.display = "none"

    }

}




