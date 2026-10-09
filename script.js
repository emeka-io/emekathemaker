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

    /* ---------------- Deep link: /#socials ---------------- */
    // Re-scroll once fonts and layout have settled, so the link
    // lands exactly on the social icons even on slow connections.
    function goToHash() {
        if (window.location.hash !== "#socials") return;
        var target = document.getElementById("socials");
        if (target) target.scrollIntoView({ block: "center" });
    }
    window.addEventListener("load", function () {
        goToHash();
        setTimeout(goToHash, 400);
    });

    /* ---------------- ROVIE link: highlight target card ---------------- */
    var rovieCard = document.getElementById("rovie-project");
    var highlightTimer;

    function highlightRovie() {
        if (!rovieCard) return;
        rovieCard.classList.add("is-highlighted");
        clearTimeout(highlightTimer);
        highlightTimer = setTimeout(function () {
            rovieCard.classList.remove("is-highlighted");
        }, 2200);
    }

    document.querySelectorAll('a[href="#rovie-project"]').forEach(function (link) {
        link.addEventListener("click", function () {
            // Works even if the hash is already #rovie-project
            highlightRovie();
        });
    });

    window.addEventListener("load", function () {
        if (window.location.hash === "#rovie-project") highlightRovie();
    });

    /* ---------------- Year ---------------- */
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
})();
