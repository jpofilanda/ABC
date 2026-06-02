// =============================
// LOGIN PROTECTION
// =============================

if(localStorage.getItem("isLoggedIn") !== "true"){
    window.location.href = "login.html";
}

// =============================
// STORAGE
// =============================

let vaccines =
JSON.parse(
    localStorage.getItem("vaccines")
) || [];

// =============================
// SAVE
// =============================

function saveVaccines(){

    localStorage.setItem(
        "vaccines",
        JSON.stringify(vaccines)
    );

}

// =============================
// DISPLAY
// =============================

function displayVaccines(data = vaccines){

    const table =
    document.getElementById(
        "vaccineTable"
    );

    table.innerHTML = "";

    data.forEach((record,index)=>{

        let statusClass =
        record.status
        .toLowerCase()
        .replaceAll(" ","-");

        table.innerHTML += `

        <tr>

            <td>${record.patient}</td>
            <td>${record.vaccine}</td>
            <td>${record.dose}</td>
            <td>${record.date}</td>

            <td class="${statusClass}">
                ${record.status}
            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editVaccine(${index})"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteVaccine(${index})"
                >
                    Delete
                </button>

            </td>

        </tr>

        `;

    });

}

// =============================
// ADD / UPDATE
// =============================

document
.getElementById("vaccineForm")
.addEventListener(
    "submit",
    function(e){

        e.preventDefault();

        const patient =
        document.getElementById(
            "patientName"
        ).value;

        const vaccine =
        document.getElementById(
            "vaccineType"
        ).value;

        const dose =
        document.getElementById(
            "doseNumber"
        ).value;

        const date =
        document.getElementById(
            "vaccinationDate"
        ).value;

        const status =
        document.getElementById(
            "vaccinationStatus"
        ).value;

        const editIndex =
        document.getElementById(
            "editIndex"
        ).value;

        const record = {

            patient,
            vaccine,
            dose,
            date,
            status

        };

        if(editIndex === ""){

            vaccines.push(record);

        }
        else{

            vaccines[editIndex] =
            record;

        }

        saveVaccines();

        displayVaccines();

        this.reset();

        document.getElementById(
            "editIndex"
        ).value = "";

    }
);

// =============================
// EDIT
// =============================

function editVaccine(index){

    const record =
    vaccines[index];

    document.getElementById(
        "patientName"
    ).value = record.patient;

    document.getElementById(
        "vaccineType"
    ).value = record.vaccine;

    document.getElementById(
        "doseNumber"
    ).value = record.dose;

    document.getElementById(
        "vaccinationDate"
    ).value = record.date;

    document.getElementById(
        "vaccinationStatus"
    ).value = record.status;

    document.getElementById(
        "editIndex"
    ).value = index;

}

// =============================
// DELETE
// =============================

function deleteVaccine(index){

    if(confirm(
        "Delete vaccination record?"
    )){

        vaccines.splice(
            index,
            1
        );

        saveVaccines();

        displayVaccines();

    }

}

// =============================
// SEARCH
// =============================

document
.getElementById(
    "searchVaccine"
)
.addEventListener(
    "keyup",
    function(){

        const keyword =
        this.value.toLowerCase();

        const filtered =
        vaccines.filter(
            record =>

            record.patient
            .toLowerCase()
            .includes(keyword)

            ||

            record.vaccine
            .toLowerCase()
            .includes(keyword)

        );

        displayVaccines(
            filtered
        );

    }
);

// =============================
// INITIAL LOAD
// =============================

displayVaccines();