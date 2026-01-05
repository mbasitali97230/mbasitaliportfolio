import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* LIVE PASSWORD VALIDATION */
const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("passwordError");

if (passwordInput && passwordError) {
  passwordInput.addEventListener("input", () => {
    if (passwordInput.value.length < 6) {
      passwordError.classList.add("show");
    } else {
      passwordError.classList.remove("show");
    }
  });
}

/* SIGNUP */
window.signup = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (password.length < 6) {
    passwordError.classList.add("show");
    return;
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", cred.user.uid), {
      email: email,
      role: "user",
      createdAt: new Date()
    });

    window.location.href = "dashboard.html";
  } catch (e) {
    alert(e.message);
  }
};

/* LOGIN */
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (e) {
    alert(e.message);
  }
};

/* LOGOUT */
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};

/* FORGOT PASSWORD */
window.resetPassword = function () {
  const email = document.getElementById("email").value;

  if (!email) {
    alert("Please enter your email first");
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password reset email sent. Check your inbox.");
    })
    .catch(err => {
      alert(err.message);
    });
};
