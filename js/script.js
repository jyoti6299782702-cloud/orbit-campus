// =========================
// Orbit Campus - Home Page
// =========================

// Active Navbar Link
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
    link.addEventListener("click", function () {
        navLinks.forEach(item => item.classList.remove("active"));
        this.classList.add("active");
    });
});

// Card Hover Effect
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
    });
});

// Category Hover Shadow
const items = document.querySelectorAll(".item");

items.forEach(item => {
    item.addEventListener("mouseenter", () => {
        item.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
    });

    item.addEventListener("mouseleave", () => {
        item.style.boxShadow = "none";
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Welcome Message
window.addEventListener("load", () => {
    console.log("Welcome to Orbit Campus");
});