(function () {
    "use strict";

    // script.js loaded fine: cancel the "show everything" safety net
    if (window.__etmFallback) clearTimeout(window.__etmFallback);

    var root = document.documentElement;

    /* ---------------- Theme ---------------- */
    var themeBtn = document.getElementById("theme-toggle");

    function updateThemeLabel() {
        if (!themeBtn) return;
        themeBtn.setAttribute(
            "aria-label",
            root.getAttribute("data-theme") === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
        );
    }
    updateThemeLabel();

    if (themeBtn) {
        themeBtn.addEventListener("click", function () {
            var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            root.setAttribute("data-theme", next);
            try { localStorage.setItem("etm-theme", next); } catch (e) {}
            updateThemeLabel();
        });
    }

    /* ---------------- Mobile menu ---------------- */
    var menuBtn = document.querySelector(".mobile-menu-btn");
    var navLinks = document.getElementById("nav-links");

    function setMenu(open) {
        if (!menuBtn || !navLinks) return;
        navLinks.classList.toggle("active", open);
        menuBtn.setAttribute("aria-expanded", String(open));
    }

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", function () {
            setMenu(!navLinks.classList.contains("active"));
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () { setMenu(false); });
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") setMenu(false);
        });

        document.addEventListener("click", function (e) {
            if (navLinks.classList.contains("active") &&
                !navLinks.contains(e.target) &&
                !menuBtn.contains(e.target)) {
                setMenu(false);
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 900) setMenu(false);
        });
    }

    /* ---------------- Scroll reveal ---------------- */
    var items = document.querySelectorAll(".fade-in");

    function revealAll() {
        items.forEach(function (el) { el.classList.add("visible"); });
    }

    try {
        if ("IntersectionObserver" in window) {
            var observer = new IntersectionObserver(function (entries, obs) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0, rootMargin: "0px 0px -6% 0px" });

            items.forEach(function (el) { observer.observe(el); });
        } else {
            revealAll();
        }
    } catch (e) {
        revealAll();
    }

    /* ---------------- Year ---------------- */
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
})();
