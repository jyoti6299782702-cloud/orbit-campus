// Load Complaints
let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

const table = document.getElementById("complaintTable");
const total = document.getElementById("totalComplaints");
const pending = document.getElementById("pendingComplaints");
const resolved = document.getElementById("resolvedComplaints");
const search = document.getElementById("search");

// Dashboard Update Function
function loadComplaints(data){

    table.innerHTML = "";

    total.innerText = data.length;

    let pendingCount = 0;
    let resolvedCount = 0;

    data.forEach((complaint)=>{

        if(complaint.status === "Pending"){
            pendingCount++;
        }

        if(complaint.status === "Resolved"){
            resolvedCount++;
        }

        table.innerHTML += `
        <tr>
            <td>${complaint.name}</td>
            <td>${complaint.category}</td>
            <td>${complaint.priority}</td>
            <td>${complaint.status}</td>
        </tr>
        `;

    });

    pending.innerText = pendingCount;
    resolved.innerText = resolvedCount;

}

// First Time Load
loadComplaints(complaints);

// Search Function
search.addEventListener("keyup", function(){

    let value = this.value.toLowerCase();

    let filtered = complaints.filter((item)=>{

        return(
            item.name.toLowerCase().includes(value) ||
            item.category.toLowerCase().includes(value) ||
            item.priority.toLowerCase().includes(value) ||
            item.status.toLowerCase().includes(value)
        );

    });

    loadComplaints(filtered);

});