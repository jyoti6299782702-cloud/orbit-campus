// Load Complaints
let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

const complaintTable = document.getElementById("complaintTable");
const search = document.getElementById("search");

const totalComplaints = document.getElementById("totalComplaints");
const pendingComplaints = document.getElementById("pendingComplaints");
const resolvedComplaints = document.getElementById("resolvedComplaints");
const progressComplaints = document.getElementById("progressComplaints");
const highComplaints = document.getElementById("highComplaints");

const categoryFilter = document.getElementById("categoryFilter");
const priorityFilter = document.getElementById("priorityFilter");
const statusFilter = document.getElementById("statusFilter");

// Load Dashboard
function loadDashboard(data = complaints){

    complaintTable.innerHTML = "";

    data.forEach((complaint,index)=>{

        let row = `
        <tr>

        <td>${complaint.id || "-"}</td>

        <td>${complaint.name}</td>

        <td>${complaint.roll}</td>

        <td>${complaint.department}</td>

        <td>${complaint.category}</td>

        <td>${complaint.priority}</td>

        <td>${complaint.date}</td>

        <td class="${getStatusClass(complaint.status)}">
        ${complaint.status}
        </td>

        <td>
            <button class="viewBtn" onclick="viewComplaint(${index})">
            View
            </button>

            <button class="deleteBtn" onclick="deleteComplaint(${index})">
            Delete
            </button>
        </td>

        </tr>
        `;

        complaintTable.innerHTML += row;

    });

    updateCards();
}

// Status Color
function getStatusClass(status){

    if(status==="Pending") return "pending-status";

    if(status==="Resolved") return "resolved-status";

    if(status==="In Progress") return "progress-status";

    return "";

}

// Cards
function updateCards(){

    totalComplaints.innerText = complaints.length;

    pendingComplaints.innerText =
    complaints.filter(c=>c.status==="Pending").length;

    resolvedComplaints.innerText =
    complaints.filter(c=>c.status==="Resolved").length;

    progressComplaints.innerText =
    complaints.filter(c=>c.status==="In Progress").length;

    highComplaints.innerText =
    complaints.filter(c=>c.priority==="High").length;

}

// Search
search.addEventListener("keyup",()=>{

    let value = search.value.toLowerCase();

    let filtered = complaints.filter(c=>

        (c.name && c.name.toLowerCase().includes(value)) ||

        (c.roll && c.roll.toLowerCase().includes(value)) ||

        (c.id && c.id.toLowerCase().includes(value))

    );

    loadDashboard(filtered);

});

// Filters
function applyFilters(){

    let filtered = complaints.filter(c=>{

        return (
            (categoryFilter.value==="" || c.category===categoryFilter.value) &&
            (priorityFilter.value==="" || c.priority===priorityFilter.value) &&
            (statusFilter.value==="" || c.status===statusFilter.value)
        );

    });

    loadDashboard(filtered);

}

categoryFilter.addEventListener("change",applyFilters);
priorityFilter.addEventListener("change",applyFilters);
statusFilter.addEventListener("change",applyFilters);

// View Complaint
function viewComplaint(index){

    const complaint = complaints[index];

    document.getElementById("complaintDetails").innerHTML = `
        <p><b>ID:</b> ${complaint.id}</p>
        <p><b>Name:</b> ${complaint.name}</p>
        <p><b>Roll:</b> ${complaint.roll}</p>
        <p><b>Department:</b> ${complaint.department}</p>
        <p><b>Category:</b> ${complaint.category}</p>
        <p><b>Priority:</b> ${complaint.priority}</p>
        <p><b>Date:</b> ${complaint.date}</p>
        <p><b>Status:</b> ${complaint.status}</p>
        <p><b>Description:</b> ${complaint.description}</p>
    `;

    document.getElementById("viewModal").style.display="block";

}

// Close Modal
document.querySelector(".close").onclick=function(){

    document.getElementById("viewModal").style.display="none";

}

// Delete
function deleteComplaint(index){

    if(confirm("Delete this complaint?")){

        complaints.splice(index,1);

        localStorage.setItem("complaints",JSON.stringify(complaints));

        loadDashboard();

    }

}

// Initial Load
loadDashboard();