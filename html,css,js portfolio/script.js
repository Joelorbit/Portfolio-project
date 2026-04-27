const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const form = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");
const year = document.querySelector("#year");
const bwToggle = document.querySelector("#bw-toggle");

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

        const nameInput = form.querySelector("#name");
        const emailInput = form.querySelector("#email");
        const messageInput = form.querySelector("#message");

        const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : "";
        const email = emailInput && emailInput.value.trim() ? emailInput.value.trim() : "";
        const message = messageInput && messageInput.value.trim() ? messageInput.value.trim() : "";

        if (!name || !email || !message) {
            formNote.classList.remove("success");
            formNote.classList.add("error");
            formNote.textContent = "Please complete all fields before sending your message.";
            return;
        }

        const subject = encodeURIComponent(`Portfolio message from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const gmailCompose = `https://mail.google.com/mail/?view=cm&fs=1&to=abitieyuel@gmail.com&su=${subject}&body=${body}`;
        const mailto = `mailto:abitieyuel@gmail.com?subject=${subject}&body=${body}`;

        formNote.classList.remove("error");
        formNote.classList.add("success");
        formNote.innerHTML =
            "Opening Gmail compose with your message... " +
            `<a href="${mailto}" target="_blank" rel="noopener noreferrer">Use this link if Gmail does not open automatically.</a>`;

        const tempLink = document.createElement("a");
        tempLink.href = gmailCompose;
        tempLink.target = "_blank";
        tempLink.rel = "noopener noreferrer";
        tempLink.style.display = "none";
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);

        window.setTimeout(() => form.reset(), 500);
    });
}

if (bwToggle) {
    const applyBwState = (enabled) => {
        document.body.classList.toggle("bw-mode", enabled);
        bwToggle.setAttribute("aria-pressed", String(enabled));
    };

    let saved = false;
    try {
        saved = localStorage.getItem("bw-mode") === "on";
    } catch (error) {
        saved = false;
    }
    applyBwState(saved);

    bwToggle.addEventListener("click", () => {
        const next = !document.body.classList.contains("bw-mode");
        applyBwState(next);
        try {
            localStorage.setItem("bw-mode", next ? "on" : "off");
        } catch (error) {
        }
    });
}

// Add fade-in animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
