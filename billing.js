// =========================
// LOGIN PROTECTION
// =========================

if(localStorage.getItem("isLoggedIn") !== "true"){
    window.location.href = "login.html";
}

// =========================
// STORAGE
// =========================

let bills =
JSON.parse(
    localStorage.getItem("bills")
) || [];

// =========================
// SAVE
// =========================

function saveBills(){

    localStorage.setItem(
        "bills",
        JSON.stringify(bills)
    );

}

// =========================
// DISPLAY
// =========================

function displayBills(data = bills){

    const table =
    document.getElementById(
        "billingTable"
    );

    table.innerHTML = "";

    data.forEach((bill,index)=>{

        let statusClass =
        bill.status.toLowerCase();

        table.innerHTML += `

        <tr>

            <td>${bill.billId}</td>
            <td>${bill.patient}</td>
            <td>${bill.service}</td>
            <td>₱${bill.amount}</td>

            <td class="${statusClass}">
                ${bill.status}
            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editBill(${index})"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteBill(${index})"
                >
                    Delete
                </button>

            </td>

        </tr>

        `;

    });

}

// =========================
// ADD / UPDATE
// =========================

document
.getElementById("billingForm")
.addEventListener(
    "submit",
    function(e){

        e.preventDefault();

        const billId =
        document.getElementById(
            "billId"
        ).value;

        const patient =
        document.getElementById(
            "patientName"
        ).value;

        const service =
        document.getElementById(
            "service"
        ).value;

        const amount =
        document.getElementById(
            "amount"
        ).value;

        const status =
        document.getElementById(
            "status"
        ).value;

        const editIndex =
        document.getElementById(
            "editIndex"
        ).value;

        const bill = {

            billId,
            patient,
            service,
            amount,
            status

        };

        if(editIndex === ""){

            bills.push(bill);

        }
        else{

            bills[editIndex] = bill;

        }

        saveBills();

        displayBills();

        this.reset();

        document.getElementById(
            "editIndex"
        ).value = "";

    }
);

// =========================
// EDIT
// =========================

function editBill(index){

    const bill = bills[index];

    document.getElementById(
        "billId"
    ).value = bill.billId;

    document.getElementById(
        "patientName"
    ).value = bill.patient;

    document.getElementById(
        "service"
    ).value = bill.service;

    document.getElementById(
        "amount"
    ).value = bill.amount;

    document.getElementById(
        "status"
    ).value = bill.status;

    document.getElementById(
        "editIndex"
    ).value = index;

}

// =========================
// DELETE
// =========================

function deleteBill(index){

    if(confirm(
        "Delete bill record?"
    )){

        bills.splice(
            index,
            1
        );

        saveBills();

        displayBills();

    }

}

// =========================
// SEARCH
// =========================

document
.getElementById(
    "searchBill"
)
.addEventListener(
    "keyup",
    function(){

        const keyword =
        this.value.toLowerCase();

        const filtered =
        bills.filter(
            bill =>

            bill.patient
            .toLowerCase()
            .includes(keyword)

            ||

            bill.billId
            .toLowerCase()
            .includes(keyword)

            ||

            bill.service
            .toLowerCase()
            .includes(keyword)

        );

        displayBills(
            filtered
        );

    }
);

// =========================
// INITIAL LOAD
// =========================

displayBills();