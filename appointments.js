// =============================
// LOGIN PROTECTION
// =============================

if(localStorage.getItem("isLoggedIn") !== "true"){
    window.location.href = "login.html";
}

// =============================
// STORAGE
// =============================

let appointments =
JSON.parse(
    localStorage.getItem("appointments")
) || [];

// =============================
// SAVE
// =============================

function saveAppointments(){

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );

}

// =============================
// DISPLAY
// =============================

function displayAppointments(data = appointments){

    const table =
    document.getElementById(
        "appointmentTable"
    );

    table.innerHTML = "";

    data.forEach((appointment,index)=>{

        let statusClass =
        appointment.status.toLowerCase();

        table.innerHTML += `

        <tr>

            <td>${appointment.patient}</td>
            <td>${appointment.date}</td>
            <td>${appointment.time}</td>
            <td>${appointment.purpose}</td>

            <td class="${statusClass}">
                ${appointment.status}
            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editAppointment(${index})"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteAppointment(${index})"
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
.getElementById("appointmentForm")
.addEventListener("submit",function(e){

    e.preventDefault();

    const patient =
    document.getElementById(
        "patientName"
    ).value;

    const date =
    document.getElementById(
        "appointmentDate"
    ).value;

    const time =
    document.getElementById(
        "appointmentTime"
    ).value;

    const purpose =
    document.getElementById(
        "purpose"
    ).value;

    const status =
    document.getElementById(
        "status"
    ).value;

    const editIndex =
    document.getElementById(
        "editIndex"
    ).value;

    const appointment = {

        patient,
        date,
        time,
        purpose,
        status

    };

    if(editIndex === ""){

        appointments.push(
            appointment
        );

    }
    else{

        appointments[editIndex] =
        appointment;

    }

    saveAppointments();

    displayAppointments();

    this.reset();

    document.getElementById(
        "editIndex"
    ).value = "";

});

// =============================
// EDIT
// =============================

function editAppointment(index){

    const appointment =
    appointments[index];

    document.getElementById(
        "patientName"
    ).value = appointment.patient;

    document.getElementById(
        "appointmentDate"
    ).value = appointment.date;

    document.getElementById(
        "appointmentTime"
    ).value = appointment.time;

    document.getElementById(
        "purpose"
    ).value = appointment.purpose;

    document.getElementById(
        "status"
    ).value = appointment.status;

    document.getElementById(
        "editIndex"
    ).value = index;

}

// =============================
// DELETE
// =============================

function deleteAppointment(index){

    if(confirm(
        "Delete appointment?"
    )){

        appointments.splice(
            index,
            1
        );

        saveAppointments();

        displayAppointments();

    }

}

// =============================
// SEARCH
// =============================

document
.getElementById(
    "searchAppointment"
)
.addEventListener(
    "keyup",
    function(){

        const keyword =
        this.value.toLowerCase();

        const filtered =
        appointments.filter(
            appointment =>

            appointment.patient
            .toLowerCase()
            .includes(keyword)

            ||

            appointment.purpose
            .toLowerCase()
            .includes(keyword)

        );

        displayAppointments(
            filtered
        );

    }
);

// =============================
// INITIAL LOAD
// =============================

displayAppointments();