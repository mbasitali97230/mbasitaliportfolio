import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  collection,
  getDocs,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const usersTable = document.getElementById("usersTable");
const totalUsersEl = document.getElementById("totalUsers");
const totalAdminsEl = document.getElementById("totalAdmins");
const totalNormalEl = document.getElementById("totalNormal");
const logoutBtn = document.getElementById("logoutBtn");

/* AUTH + ADMIN CHECK */
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "login.html";
    return;
  }

  const snap = await getDoc(doc(db, "users", user.uid));
  if (!snap.exists() || snap.data().role !== "admin") {
    location.href = "/";
    return;
  }

  loadUsers();
});

/* LOAD USERS */
async function loadUsers() {
  const querySnapshot = await getDocs(collection(db, "users"));

  let total = 0;
  let admins = 0;
  let normal = 0;

  usersTable.innerHTML = "";

  querySnapshot.forEach(docSnap => {
    const data = docSnap.data();
    total++;

    if (data.role === "admin") admins++;
    else normal++;

    // ✅ DATE FIX (OLD + NEW USERS BOTH)
    const createdDate =
      data.createdAt?.toDate
        ? data.createdAt.toDate()
        : new Date(data.createdAt);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${data.email}</td>
      <td>${data.role}</td>
      <td>${createdDate.toLocaleDateString()}</td>
    `;
    usersTable.appendChild(tr);
  });

  totalUsersEl.textContent = total;
  totalAdminsEl.textContent = admins;
  totalNormalEl.textContent = normal;
}

/* LOGOUT */
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    location.href = "login.html";
  });
});
