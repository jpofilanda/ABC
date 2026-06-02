// ===========================
// LOGIN PROTECTION
// ===========================

if(localStorage.getItem("isLoggedIn") !== "true"){
    window.location.href = "login.html";
}

// ===========================
// ADMIN NAME
// ===========================

document.getElementById("adminName").textContent =
    localStorage.getItem("adminName");

// ===========================
// SAMPLE STORAGE
// ===========================

let patients =
    JSON.parse(localStorage.getItem("patients")) || [];

let appointments =
    JSON.parse(localStorage.getItem("appointments")) || [];

let bills =
    JSON.parse(localStorage.getItem("bills")) || [];

let vaccines =
    JSON.parse(localStorage.getItem("vaccines")) || [];

// ===========================
// DASHBOARD COUNTS
// ===========================

document.getElementById("totalPatients").textContent =
    patients.length;

document.getElementById("totalAppointments").textContent =
    appointments.length;

document.getElementById("totalBills").textContent =
    bills.filter(
        bill => bill.status === "Unpaid"
    ).length;

document.getElementById("totalVaccinated").textContent =
    vaccines.filter(
        vaccine => vaccine.status === "Fully Vaccinated"
    ).length;

// ===========================
// TABLE COUNTS
// ===========================

document.getElementById("patientRecords").textContent =
    patients.length;

document.getElementById("appointmentRecords").textContent =
    appointments.length;

document.getElementById("billingRecords").textContent =
    bills.length;

document.getElementById("vaccinationRecords").textContent =
    vaccines.length;

// ===========================
// LOGOUT
// ===========================

document
.getElementById("logoutBtn")
.addEventListener("click", () => {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("adminName");

    window.location.href = "login.html";
});