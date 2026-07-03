const reportForm = document.getElementById("reportForm");

reportForm.addEventListener("submit", function(e){

    e.preventDefault();

    const complaint = {

        id: Date.now(),

        name: document.getElementById("name").value,

        roll: document.getElementById("roll").value,

        department: document.getElementById("department").value,

        category: document.getElementById("category").value,

        priority: document.getElementById("priority").value,

        description: document.getElementById("description").value,

        status: "Pending"

    };

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    complaints.push(complaint);

    localStorage.setItem("complaints", JSON.stringify(complaints));

    alert("Complaint Submitted Successfully!");

    reportForm.reset();

    window.location.href = "dashboard.html";

});