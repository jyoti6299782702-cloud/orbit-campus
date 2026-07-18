const reportForm = document.getElementById("reportForm");

reportForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    // Complaint ID
    let complaintId = "OC-" + String(complaints.length + 1).padStart(3, "0");

    // Current Date & Time
    let now = new Date();

    let date = now.toLocaleDateString("en-GB");

    let time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    // Image Name
    let imageInput = document.getElementById("image");
    let imageName = "";

    if (imageInput.files.length > 0) {
        imageName = imageInput.files[0].name;
    }

    const complaint = {

        id: complaintId,

        name: document.getElementById("name").value,

        roll: document.getElementById("roll").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        department: document.getElementById("department").value,

        semester: document.getElementById("semester").value,

        category: document.getElementById("category").value,

        building: document.getElementById("building").value,

        room: document.getElementById("room").value,

        priority: document.getElementById("priority").value,

        description: document.getElementById("description").value,

        image: imageName,

        date: date,

        time: time,

        status: "Pending"

    };

    complaints.push(complaint);

    localStorage.setItem("complaints", JSON.stringify(complaints));

    showToast("✅ Complaint Submitted Successfully!");

    reportForm.reset();

    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 1500);

});

// Toast Notification
function showToast(message) {

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {
        toast.remove();
    }, 3000);

}