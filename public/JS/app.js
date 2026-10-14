
/* ==========================================
   CYBERSAFE - MOBILE MENU CONTROLLER
   ========================================== */

(function () {
    "use strict";

    function initializeCyberSafeMenu() {
        const navbar = document.querySelector(".navbar");
        const menuButton = navbar?.querySelector(".menu-btn");
        const navLinks = navbar?.querySelector(".nav-links");
        const profileMenu = document.querySelector("#profileMenu");
        const profileButton = document.querySelector("#profileButton");
        const profileDropdown = document.querySelector("#profileDropdown");
        const myProfileButton = document.querySelector("#myProfileButton");

        if (myProfileButton) {
            myProfileButton.addEventListener("click", function (event) {
                event.stopPropagation();
                window.location.href = "profile.html";
            });
        }
        if (!navbar) return;

        /* Mobile hamburger button */
        if (menuButton && navLinks) {
            menuButton.setAttribute("aria-expanded", "false");

            menuButton.addEventListener("click", function (event) {
                event.preventDefault();
                event.stopPropagation();

                const isOpen = navLinks.classList.toggle("mobile-menu-open");

                menuButton.setAttribute("aria-expanded", String(isOpen));

                if (profileDropdown) {
                    profileDropdown.classList.remove("open");
                }
                if (profileButton) {
                    profileButton.setAttribute("aria-expanded", "false");
                }
            });

            navLinks.querySelectorAll("a").forEach(function (link) {
                link.addEventListener("click", function () {
                    navLinks.classList.remove("mobile-menu-open");
                    menuButton.setAttribute("aria-expanded", "false");
                });
            });
        }

        /* Profile dropdown — homepage only */
        if (profileMenu && profileButton && profileDropdown) {
            profileButton.addEventListener("click", function (event) {
                event.preventDefault();
                event.stopPropagation();

                const isOpen = profileDropdown.classList.toggle("open");

                if (isOpen) {
                    profileDropdown.style.setProperty("display", "block", "important");
                } else {
                    profileDropdown.style.setProperty("display", "none", "important");
                }

                profileButton.setAttribute("aria-expanded", String(isOpen));
            });

            profileDropdown.addEventListener("click", function (event) {
                event.stopPropagation();
            });

            document.addEventListener("click", function (event) {
                if (!profileMenu.contains(event.target)) {
                    profileDropdown.classList.remove("open");
                    profileButton.setAttribute("aria-expanded", "false");
                }

                if (
                    navLinks &&
                    !navLinks.contains(event.target) &&
                    menuButton &&
                    !menuButton.contains(event.target)
                ) {
                    navLinks.classList.remove("mobile-menu-open");
                    menuButton.setAttribute("aria-expanded", "false");
                }
            });
        }

        console.log("CyberSafe navigation initialized.");
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeCyberSafeMenu,
            { once: true }
        );
    } else {
        initializeCyberSafeMenu();
    }
})();