const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if(email === "" || password === ""){

        alert("Please fill all fields");
        return;

    }

    // Login Session
    localStorage.setItem("loggedInUser", email);

    // Optional: User Email
    localStorage.setItem("userEmail", email);

    alert("Login Successful");

    window.location.href = "dashboard.html";

});
const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

togglePassword.addEventListener("click", function(){

    if(password.type === "password"){

        password.type = "text";

        this.classList.remove("fa-eye");

        this.classList.add("fa-eye-slash");

    }else{

        password.type = "password";

        this.classList.remove("fa-eye-slash");

        this.classList.add("fa-eye");

    }

});