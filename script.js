const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const form = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");
const year = document.querySelector("#year");

if (year) {
    year.textContent = new Date().getFullYear();
}

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });
}

if (form && formNote) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        formNote.textContent = "Thanks. Your message has been prepared.";
        form.reset();
    });
}
