document.addEventListener("DOMContentLoaded", () => {

```
/* --------------------------------
   Lucide Icons
-------------------------------- */

if (typeof lucide !== "undefined") {
    lucide.createIcons();
}


/* --------------------------------
   Theme
-------------------------------- */

const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("etm-theme");

if (savedTheme === "dark" || savedTheme === "light") {
    root.setAttribute("data-theme", savedTheme);
} else {
    const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    root.setAttribute(
        "data-theme",
        prefersDark ? "dark" : "light"
    );
}

function updateThemeLabel() {
    const currentTheme = root.getAttribute("data-theme");

    if (themeToggle) {
        themeToggle.setAttribute(
            "aria-label",
            currentTheme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
        );
    }
}

updateThemeLabel();

themeToggle?.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    const newTheme =
        currentTheme === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("etm-theme", newTheme);

    updateThemeLabel();
});


/* --------------------------------
   Mobile Navigation
-------------------------------- */

const mobileMenuButton =
    document.querySelector(".mobile-menu-btn");

const navLinks =
    document.querySelector(".nav-links");

mobileMenuButton?.addEventListener("click", () => {

    const isOpen =
        navLinks.classList.toggle("active");

    mobileMenuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    const icon = mobileMenuButton.querySelector("svg");

    if (icon) {
        icon.setAttribute(
            "data-lucide",
            isOpen ? "x" : "menu"
        );

        lucide.createIcons();
    }
});


/* --------------------------------
   Close mobile menu after click
-------------------------------- */

document
    .querySelectorAll(".nav-links a")
    .forEach((link) => {

        link.addEventListener("click", () => {
            navLinks?.classList.remove("active");

            mobileMenuButton?.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon =
                mobileMenuButton?.querySelector("svg");

            if (icon) {
                icon.setAttribute(
                    "data-lucide",
                    "menu"
                );

                lucide.createIcons();
            }
        });
    });


/* --------------------------------
   Scroll reveal
-------------------------------- */

const revealElements =
    document.querySelectorAll(".fade-in");

const observer =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

revealElements.forEach((element) => {
    observer.observe(element);
});


/* --------------------------------
   Current year
-------------------------------- */

const yearElement =
    document.getElementById("year");

if (yearElement) {
    yearElement.textContent =
        new Date().getFullYear();
}


/* --------------------------------
   Keyboard accessibility
-------------------------------- */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        navLinks?.classList.remove("active");

        mobileMenuButton?.setAttribute(
            "aria-expanded",
            "false"
        );

        const icon =
            mobileMenuButton?.querySelector("svg");

        if (icon) {
            icon.setAttribute(
                "data-lucide",
                "menu"
            );

            lucide.createIcons();
        }
    }
});
```

});
