import { initializeApp } from "[gstatic.com](https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js)";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword
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

  window.scrollTo({ top: 0, behavior: "smooth" });
}
window.showSection = showSection;

// ================================
// LOGIN MODAL
// ================================

window.openLogin = function () {
  document.getElementById("loginModal").classList.add("show");

  setTimeout(() => {
    document.getElementById("username").focus();
  }, 100);
};

window.closeLogin = function () {
  document.getElementById("loginModal").classList.remove("show");
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("loginMessage").textContent = "";
};

// Tutup modal ketika klik di luar kotak
document.getElementById("loginModal").addEventListener("click", function (event) {
  if (event.target === this) {
    closeLogin();
  }
});

// ================================
// FIREBASE LOGIN
// ================================

window.loginAdmin = async function () {
  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const message = document.getElementById("loginMessage");

  if (!email || !password) {
    message.textContent = "Email dan password wajib diisi.";
    message.style.color = "#ff6b6b";
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);

    message.textContent = "Login berhasil!";
    message.style.color = "#00e5ff";

    setTimeout(() => {
      closeLogin();
      openAdminPanel();
    }, 700);

  } catch (error) {
    console.error(error);
    message.textContent = "Email atau password salah.";
    message.style.color = "#ff6b6b";
  }
};

// ================================
// TAHUN FOOTER
// ================================

const year = document.querySelector(".copyright");
if (year) {
  year.textContent = `© ${new Date().getFullYear()} XT-KJ 3`;
}

// =================================
// TAMBAH SISWA
// =================================

async function addStudent() {
  const user = auth.currentUser;

  if (!user) {
    alert("Silakan login sebagai admin terlebih dahulu.");
    return;
  }

  const name = prompt("Nama siswa:");
  if (!name || !name.trim()) return;

  const number = prompt("Nomor absen:");
  if (!number || !number.trim()) return;

  const role = prompt("Keterangan siswa:", "Siswa XT-KJ 3");

  try {
    await addDoc(collection(db, "students"), {
      name: name.trim(),
      number: number.trim(),
      role: role?.trim() || "Siswa XT-KJ 3",
      createdAt: new Date()
    });

    alert("Siswa berhasil ditambahkan! 🎉");
    await loadStudents();

  } catch (error) {
    console.error(error);
    alert("Gagal menambahkan siswa. Cek koneksi Firebase dan Security Rules.");
  }
}
window.addStudent = addStudent;
