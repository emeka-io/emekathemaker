document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LUCIDE ICONS
    ===================================================== */

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }


    /* =====================================================
       THEME
    ===================================================== */

    const root = document.documentElement;
    const themeToggle = document.getElementById("theme-toggle");

    const savedTheme = localStorage.getItem("etm-theme");

    if (savedTheme === "dark" || savedTheme === "light") {

        root.setAttribute("data-theme", savedTheme);

    } else {

        const prefersDark =
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;

        root.setAttribute(
            "data-theme",
            prefersDark ? "dark" : "light"
        );
    }


    function updateThemeAccessibility() {

        const currentTheme =
            root.getAttribute("data-theme");

        if (!themeToggle) return;

        themeToggle.setAttribute(
            "aria-label",
            currentTheme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
        );
    }


    updateThemeAccessibility();


    themeToggle?.addEventListener("click", () => {

        const currentTheme =
            root.getAttribute("data-theme");

        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        root.setAttribute(
            "data-theme",
            newTheme
        );

        localStorage.setItem(
            "etm-theme",
            newTheme
        );

        updateThemeAccessibility();

    });


    /* =====================================================
       MENU
    ===================================================== */

    const menuToggle =
        document.getElementById("menu-toggle");

    const menuPanel =
        document.getElementById("menu-panel");

    const menuIcon =
        menuToggle?.querySelector(".menu-icon");


    function openMenu() {

        if (!menuPanel || !menuToggle) return;

        menuPanel.classList.add("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        if (menuIcon) {

            menuIcon.setAttribute(
                "data-lucide",
                "x"
            );

            lucide.createIcons();
        }
    }


    function closeMenu() {

        if (!menuPanel || !menuToggle) return;

        menuPanel.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        if (menuIcon) {

            menuIcon.setAttribute(
                "data-lucide",
                "menu"
            );

            lucide.createIcons();
        }
    }


    menuToggle?.addEventListener("click", () => {

        const isOpen =
            menuPanel.classList.contains("open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    /* =====================================================
       CLOSE MENU WHEN LINK IS CLICKED
    ===================================================== */

    document
        .querySelectorAll(".menu-link")
        .forEach((link) => {

            link.addEventListener("click", () => {
                closeMenu();
            });

        });


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", (event) => {

        if (!menuPanel || !menuToggle) return;

        const clickedInsideMenu =
            menuPanel.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);

        if (
            menuPanel.classList.contains("open") &&
            !clickedInsideMenu &&
            !clickedMenuButton
        ) {
            closeMenu();
        }

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".fade-in");


    const observer =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
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


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElement =
        document.getElementById("year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

});
