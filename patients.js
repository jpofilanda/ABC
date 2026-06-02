// ============================
// LOGIN PROTECTION
// ============================

if(localStorage.getItem("isLoggedIn") !== "true"){
    window.location.href = "login.html";
}

// ============================
// STORAGE
// ============================

let patients =
JSON.parse(
    localStorage.getItem("patients")
) || [];

// ============================
// SAVE TO LOCAL STORAGE
// ============================

function savePatients(){

    localStorage.setItem(
        "patients",
        JSON.stringify(patients)
    );

}

// ============================
// DISPLAY RECORDS
// ============================

function displayPatients(data = patients){

    const table =
    document.getElementById("historyTable");

    table.innerHTML = "";

    data.forEach((record,index)=>{

        table.innerHTML += `

        <tr>

            <td>${record.recordDate}</td>

            <td>
                ${record.lastName},
                ${record.firstName}
            </td>

            <td>${record.age}</td>

            <td>${record.contact}</td>

            <td>${record.biteSource}</td>

            <td>${record.category}</td>

            <td>

                <button
                class="edit-btn"
                onclick="editPatient(${index})">

                Edit

                </button>

                <button
                class="delete-btn"
                onclick="deletePatient(${index})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ============================
// ADD / UPDATE RECORD
// ============================

document
.getElementById("patientHistoryForm")
.addEventListener(
"submit",
function(e){

    e.preventDefault();

    const editIndex =
    document.getElementById(
        "editIndex"
    ).value;

    const patient = {

        recordDate:
        document.getElementById("recordDate").value,

        recordTime:
        document.getElementById("recordTime").value,

        lastName:
        document.getElementById("lastName").value,

        firstName:
        document.getElementById("firstName").value,

        middleInitial:
        document.getElementById("middleInitial").value,

        address:
        document.getElementById("address").value,

        gender:
        document.getElementById("gender").value,

        age:
        document.getElementById("age").value,

        weight:
        document.getElementById("weight").value,

        contact:
        document.getElementById("contact").value,

        allergy:
        document.getElementById("allergy").value,

        healthHistory:
        document.getElementById("healthHistory").value,

        pulseRate:
        document.getElementById("pulseRate").value,

        bloodPressure:
        document.getElementById("bloodPressure").value,

        cbg:
        document.getElementById("cbg").value,

        biteSource:
        document.getElementById("biteSource").value,

        dateExposure:
        document.getElementById("dateExposure").value,

        placeExposure:
        document.getElementById("placeExposure").value,

        category:
        document.getElementById("category").value,

        biteType:
        document.getElementById("biteType").value,

        remarks:
        document.getElementById("remarks").value,

        consent:
        document.getElementById("consent").value

    };

    if(editIndex === ""){

        patients.push(patient);

    }
    else{

        patients[editIndex] = patient;

    }

    savePatients();

    displayPatients();

    this.reset();

    document.getElementById(
        "editIndex"
    ).value = "";

});

// ============================
// EDIT PATIENT
// ============================

function editPatient(index){

    const patient =
    patients[index];

    document.getElementById("recordDate").value =
    patient.recordDate;

    document.getElementById("recordTime").value =
    patient.recordTime;

    document.getElementById("lastName").value =
    patient.lastName;

    document.getElementById("firstName").value =
    patient.firstName;

    document.getElementById("middleInitial").value =
    patient.middleInitial;

    document.getElementById("address").value =
    patient.address;

    document.getElementById("gender").value =
    patient.gender;

    document.getElementById("age").value =
    patient.age;

    document.getElementById("weight").value =
    patient.weight;

    document.getElementById("contact").value =
    patient.contact;

    document.getElementById("allergy").value =
    patient.allergy;

    document.getElementById("healthHistory").value =
    patient.healthHistory;

    document.getElementById("pulseRate").value =
    patient.pulseRate;

    document.getElementById("bloodPressure").value =
    patient.bloodPressure;

    document.getElementById("cbg").value =
    patient.cbg;

    document.getElementById("biteSource").value =
    patient.biteSource;

    document.getElementById("dateExposure").value =
    patient.dateExposure;

    document.getElementById("placeExposure").value =
    patient.placeExposure;

    document.getElementById("category").value =
    patient.category;

    document.getElementById("biteType").value =
    patient.biteType;

    document.getElementById("remarks").value =
    patient.remarks;

    document.getElementById("consent").value =
    patient.consent;

    document.getElementById(
        "editIndex"
    ).value = index;

}

// ============================
// DELETE PATIENT
// ============================

function deletePatient(index){

    if(confirm(
        "Delete patient record?"
    )){

        patients.splice(
            index,
            1
        );

        savePatients();

        displayPatients();

    }

}

// ============================
// SEARCH
// ============================

document
.getElementById("searchPatient")
.addEventListener(
"keyup",
function(){

    const keyword =
    this.value.toLowerCase();

    const filtered =
    patients.filter(patient =>

        patient.firstName
        .toLowerCase()
        .includes(keyword)

        ||

        patient.lastName
        .toLowerCase()
        .includes(keyword)

        ||

        patient.contact
        .toLowerCase()
        .includes(keyword)

    );

    displayPatients(filtered);

});

// ============================
// INITIAL LOAD
// ============================

displayPatients();