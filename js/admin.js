// Load Complaints
let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

const adminTable = document.getElementById("adminTable");
const search = document.getElementById("search");

const total = document.getElementById("total");
const pending = document.getElementById("pending");
const resolved = document.getElementById("resolved");

// Dashboard Load
function loadTable(data = complaints){

    adminTable.innerHTML = "";

    data.forEach((complaint,index)=>{

        adminTable.innerHTML += `

        <tr>

        <td>${complaint.id}</td>

        <td>${complaint.name}</td>

        <td>${complaint.category}</td>

        <td>${complaint.priority}</td>

        <td>${complaint.status}</td>

        <td>

        <button class="viewBtn" onclick="viewComplaint(${index})">
        View
        </button>

        <button class="editBtn" onclick="editComplaint(${index})">
        Edit
        </button>

        <button class="resolveBtn" onclick="resolveComplaint(${index})">
        Resolve
        </button>

        <button class="deleteBtn" onclick="deleteComplaint(${index})">
        Delete
        </button>

        </td>

        </tr>

        `;

    });

    updateCards();

}

// Statistics
function updateCards(){

    total.innerText = complaints.length;

    pending.innerText =
    complaints.filter(c=>c.status==="Pending").length;

    resolved.innerText =
    complaints.filter(c=>c.status==="Resolved").length;

}

// Search
search.addEventListener("keyup",()=>{

    let value = search.value.toLowerCase();

    let filtered = complaints.filter(c=>

        c.name.toLowerCase().includes(value) ||

        c.id.toLowerCase().includes(value) ||

        c.category.toLowerCase().includes(value)

    );

    loadTable(filtered);

});

// View Complaint
function viewComplaint(index){

    let c = complaints[index];

    document.getElementById("details").innerHTML = `

    <p><b>Complaint ID:</b> ${c.id}</p>

    <p><b>Name:</b> ${c.name}</p>

    <p><b>Roll No:</b> ${c.roll}</p>

    <p><b>Email:</b> ${c.email}</p>

    <p><b>Phone:</b> ${c.phone}</p>

    <p><b>Department:</b> ${c.department}</p>

    <p><b>Semester:</b> ${c.semester}</p>

    <p><b>Category:</b> ${c.category}</p>

    <p><b>Building:</b> ${c.building}</p>

    <p><b>Room:</b> ${c.room}</p>

    <p><b>Priority:</b> ${c.priority}</p>

    <p><b>Status:</b> ${c.status}</p>

    <p><b>Date:</b> ${c.date}</p>

    <p><b>Time:</b> ${c.time}</p>

    <p><b>Description:</b> ${c.description}</p>

    <p><b>Image:</b> ${c.image || "No Image"}</p>

    `;

    document.getElementById("modal").style.display="block";

}

// Close Modal
document.getElementById("close").onclick=function(){

    document.getElementById("modal").style.display="none";

}

// Resolve Complaint
function resolveComplaint(index){

    complaints[index].status="Resolved";

    localStorage.setItem("complaints",JSON.stringify(complaints));

    loadTable();

}

// Delete Complaint
function deleteComplaint(index){

    if(confirm("Are you sure?")){

        complaints.splice(index,1);

        localStorage.setItem("complaints",JSON.stringify(complaints));

        loadTable();

    }

}

// Edit Complaint
function editComplaint(index){

    let newDescription = prompt(
        "Edit Complaint Description",
        complaints[index].description
    );

    if(newDescription){

        complaints[index].description = newDescription;

        localStorage.setItem("complaints",JSON.stringify(complaints));

        loadTable();

    }

}

// Initial Load
loadTable();