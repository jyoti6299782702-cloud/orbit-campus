// Get Complaints from LocalStorage
let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

const table = document.getElementById("adminTable");

const total = document.getElementById("total");
const pending = document.getElementById("pending");
const resolved = document.getElementById("resolved");

// Load All Complaints
function loadComplaints() {

    table.innerHTML = "";

    let pendingCount = 0;
    let resolvedCount = 0;

    complaints.forEach((complaint, index) => {

        if (complaint.status === "Pending") {
            pendingCount++;
        }

        if (complaint.status === "Resolved") {
            resolvedCount++;
        }

        table.innerHTML += `
        <tr>
            <td>${complaint.name}</td>
            <td>${complaint.category}</td>
            <td>${complaint.priority}</td>
            <td>${complaint.status}</td>

            <td>

                <button class="resolve"
                onclick="resolveComplaint(${index})">

                Resolve

                </button>

                <button class="delete"
                onclick="deleteComplaint(${index})">

                Delete

                </button>

            </td>

        </tr>
        `;

    });

    total.innerText = complaints.length;
    pending.innerText = pendingCount;
    resolved.innerText = resolvedCount;

}

// Resolve Complaint
function resolveComplaint(index){

    complaints[index].status = "Resolved";

    localStorage.setItem(
        "complaints",
        JSON.stringify(complaints)
    );

    loadComplaints();

}

// Delete Complaint
function deleteComplaint(index){

    if(confirm("Delete this complaint?")){

        complaints.splice(index,1);

        localStorage.setItem(
            "complaints",
            JSON.stringify(complaints)
        );

        loadComplaints();

    }

}

// First Load
loadComplaints();