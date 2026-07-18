// Check Login
const user = localStorage.getItem("loggedInUser");

if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
}
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}