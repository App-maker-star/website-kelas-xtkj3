// ================================
// NAVIGASI WEBSITE
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

  document.getElementById("loginMessage").textContent = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}


// Tutup modal jika klik area luar kotak

document.getElementById("loginModal").addEventListener("click", function(event) {

  if (event.target === this) {
    closeLogin();
  }

});


// ================================
// LOGIN SEMENTARA
// ================================

// PERHATIAN:
// Ini hanya untuk mengetes tampilan.
// Jangan gunakan username/password ini untuk website asli.
//
// Setelah Firebase dipasang, fungsi ini akan diganti
// dengan Firebase Authentication.

function loginAdmin() {

  const username =
    document.getElementById("username").value.trim();

  const password =
    document.getElementById("password").value;

  const message =
    document.getElementById("loginMessage");


  if (!username || !password) {

    message.textContent =
      "Username dan password wajib diisi.";

    message.style.color = "#ff6b6b";

    return;
  }


  message.textContent =
    "Login berhasil (mode demo). Firebase akan dipasang berikutnya.";

  message.style.color = "#00e5ff";


  setTimeout(() => {

    closeLogin();

    alert(
      "Panel Admin akan kita aktifkan setelah Firebase terhubung."
    );

  }, 1000);

}


// ================================
// TOMBOL ENTER UNTUK LOGIN
// ================================

document
  .getElementById("password")
  .addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
      loginAdmin();
    }

  });


// ================================
// DATA DEMO
// ================================

const demoStudents = [
  {
    name: "Siswa Contoh 1",
    role: "Siswa XT-KJ 3"
  },
  {
    name: "Siswa Contoh 2",
    role: "Siswa XT-KJ 3"
  },
  {
    name: "Siswa Contoh 3",
    role: "Siswa XT-KJ 3"
  }
];


function loadDemoStudents() {

  const list =
    document.getElementById("studentList");

  if (!list) return;


  list.innerHTML = "";


  demoStudents.forEach((student, index) => {

    const card =
      document.createElement("div");

    card.className = "student-card";

    card.innerHTML = `
      <div class="student-number">
        ${String(index + 1).padStart(2, "0")}
      </div>

      <h3>${student.name}</h3>

      <p>${student.role}</p>
    `;

    list.appendChild(card);

  });

}


// Jalankan data demo

loadDemoStudents();


// ================================
// TAHUN FOOTER OTOMATIS
// ================================

const year =
  document.querySelector(".copyright");

if (year) {

  year.textContent =
    `© ${new Date().getFullYear()} XT-KJ 3`;

}
