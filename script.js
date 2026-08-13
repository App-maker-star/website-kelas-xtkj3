import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBPEF6zlD1JpmrYKR--KZYpAKu-kM6IlWM",
  authDomain: "xt-kj-3.firebaseapp.com",
  projectId: "xt-kj-3",
  storageBucket: "xt-kj-3.firebasestorage.app",
  messagingSenderId: "380649197606",
  appId: "1:380649197606:web:e980d3eff76c3c8c8116e7"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app); 
// ================================
// NAVIGASI
// ================================

function showSection(sectionId) {
  document.querySelectorAll(".section").forEach(section => {
    section.classList.remove("active");
  });

  const target = document.getElementById(sectionId);

  if (target) {
    target.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ================================
// LOGIN MODAL
// ================================

function openLogin() {
  document.getElementById("loginModal").classList.add("show");

  setTimeout(() => {
    document.getElementById("username").focus();
  }, 100);
}

function closeLogin() {
  document.getElementById("loginModal").classList.remove("show");

  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("loginMessage").textContent = "";
}


// Tutup modal ketika klik di luar kotak

document.getElementById("loginModal").addEventListener("click", function (event) {
  if (event.target === this) {
    closeLogin();
  }
});


// ================================
// FIREBASE LOGIN
// ================================
//
// Login asli akan dipasang setelah
// Firebase project dibuat.
//
// TIDAK ADA username/password demo
// di dalam website.
//

function loginAdmin() {
  const message = document.getElementById("loginMessage");

  message.textContent =
    "Firebase belum terhubung. Kita sambungkan pada langkah berikutnya.";

  message.style.color = "#00e5ff";
}


// ================================
// TAHUN FOOTER
// ================================

const year = document.querySelector(".copyright");

if (year) {
  year.textContent =
    `© ${new Date().getFullYear()} XT-KJ 3`;
}
