import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* =====================================
   ACCOUNT MENU HANDLING
===================================== */

const loginLink = document.getElementById("loginLink");
const signupLink = document.getElementById("signupLink");
const logoutLink = document.getElementById("logoutLink");
const dashboardLink = document.getElementById("dashboardLink");

const mLogin = document.getElementById("mLogin");
const mSignup = document.getElementById("mSignup");
const mLogout = document.getElementById("mLogout");
const mDashboard = document.getElementById("mDashboard");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // hide login / signup
    loginLink && (loginLink.style.display = "none");
    signupLink && (signupLink.style.display = "none");
    mLogin && (mLogin.style.display = "none");
    mSignup && (mSignup.style.display = "none");

    // show logout
    logoutLink && (logoutLink.style.display = "block");
    mLogout && (mLogout.style.display = "block");

    // admin check
    const snap = await getDoc(doc(db, "users", user.uid));
    if (snap.exists() && snap.data().role === "admin") {
      dashboardLink && (dashboardLink.style.display = "block");
      mDashboard && (mDashboard.style.display = "block");
    }
  }
});

/* LOGOUT */
logoutLink?.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth);
});
mLogout?.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth);
});

/* =====================================
   RESUME DOWNLOAD (LOGIN REQUIRED)
===================================== */
document.getElementById("resumeBtn")?.addEventListener("click", (e) => {
  e.preventDefault();
  if (auth.currentUser) {
    window.location.href = "/resume/Muhammad-Basit-Ali-Resume.pdf";
  } else {
    window.location.href = "login.html";
  }
});

/* =====================================
   PSD DOWNLOAD (LOGIN REQUIRED)
===================================== */
document.querySelectorAll("[data-psd]").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    if (auth.currentUser) {
      window.location.href = btn.dataset.psd;
    } else {
      window.location.href = "login.html";
    }
  });
});

/* =====================================
   WHATSAPP (LOGIN REQUIRED)
===================================== */
const whatsappBtn = document.getElementById("whatsappBtn");
whatsappBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  if (auth.currentUser) {
    window.open(
      "https://wa.me/923367297230?text=Hi%20Basit%2C%20I%20visited%20your%20portfolio",
      "_blank"
    );
  } else {
    window.location.href = "login.html";
  }
});
