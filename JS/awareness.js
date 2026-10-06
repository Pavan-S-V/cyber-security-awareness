/* =========================================================
   CYBERSAFE — AWARENESS PAGE CONTROLLER
   Handles:
   - Awareness category tabs
   - Threat cards
   - Hash navigation
   - Smooth scrolling
   - Keyboard accessibility
   - Active state management
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const tabs =
        document.querySelectorAll(".awareness-tab");

    const panels =
        document.querySelectorAll(".awareness-panel");

    const threatCards =
        document.querySelectorAll(".threat-category");

    const learningSection =
        document.querySelector(".learning-section");


    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const VALID_TARGETS = [
        "phishing",
        "arrest",
        "apps",
        "safety"
    ];


    /* =====================================================
       GET TARGET
    ===================================================== */

    function isValidTarget(target) {
        return VALID_TARGETS.includes(target);
    }


    /* =====================================================
       ACTIVATE TAB
    ===================================================== */

    function activateTab(target) {

        tabs.forEach(tab => {

            const tabTarget =
                tab.dataset.target;

            const isActive =
                tabTarget === target;

            tab.classList.toggle(
                "active",
                isActive
            );

            tab.setAttribute(
                "aria-selected",
                String(isActive)
            );

        });

    }


    /* =====================================================
       ACTIVATE PANEL
    ===================================================== */

    function activatePanel(target) {

        panels.forEach(panel => {

            const isActive =
                panel.id === target;

            panel.classList.toggle(
                "active",
                isActive
            );

            panel.setAttribute(
                "aria-hidden",
                String(!isActive)
            );

        });

    }


    /* =====================================================
       UPDATE URL HASH
    ===================================================== */

    function updateHash(target) {

        if (
            !history.pushState ||
            window.location.hash === `#${target}`
        ) {
            return;
        }

        history.pushState(
            {
                awareness: target
            },
            "",
            `#${target}`
        );

    }


    /* =====================================================
       SCROLL TO LEARNING SECTION
    ===================================================== */

    function scrollToLearning() {

        if (!learningSection) {
            return;
        }

        const navbar =
            document.querySelector(".main-navbar");

        const navbarHeight =
            navbar
                ? navbar.offsetHeight
                : 0;

        const targetPosition =
            learningSection.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight -
            15;

        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: "smooth"
        });

    }


    /* =====================================================
       OPEN AWARENESS CATEGORY
    ===================================================== */

    function openCategory(
        target,
        options = {}
    ) {

        if (!isValidTarget(target)) {
            return;
        }

        const {
            scroll = true,
            updateUrl = true
        } = options;


        /* Activate tab */

        activateTab(target);


        /* Activate panel */

        activatePanel(target);


        /* Update URL */

        if (updateUrl) {
            updateHash(target);
        }


        /* Scroll */

        if (scroll) {
            scrollToLearning();
        }

    }


    /* =====================================================
       TAB CLICK EVENTS
    ===================================================== */

    tabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                const target =
                    tab.dataset.target;

                openCategory(target);

            }
        );

    });


    /* =====================================================
       THREAT CARD EVENTS
    ===================================================== */

    threatCards.forEach(card => {

        const target =
            card.dataset.target;


        /* Accessibility */

        card.setAttribute(
            "role",
            "button"
        );

        card.setAttribute(
            "tabindex",
            "0"
        );


        /* Click */

        card.addEventListener(
            "click",
            () => {

                openCategory(target);

            }
        );


        /* Keyboard */

        card.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openCategory(target);

                }

            }
        );

    });


    /* =====================================================
       HASH NAVIGATION
    ===================================================== */

    function handleHashNavigation() {

        const hash =
            window.location.hash
                .replace("#", "")
                .trim()
                .toLowerCase();


        if (!isValidTarget(hash)) {
            return;
        }


        /*
         * Small delay allows the page to finish rendering
         * before smooth scrolling begins.
         */

        setTimeout(() => {

            openCategory(
                hash,
                {
                    scroll: true,
                    updateUrl: false
                }
            );

        }, 100);

    }


    /* =====================================================
       BROWSER BACK / FORWARD
    ===================================================== */

    window.addEventListener(
        "popstate",
        () => {

            const hash =
                window.location.hash
                    .replace("#", "")
                    .trim()
                    .toLowerCase();


            if (isValidTarget(hash)) {

                openCategory(
                    hash,
                    {
                        scroll: true,
                        updateUrl: false
                    }
                );

            }

        }
    );


    /* =====================================================
       HASH CHANGE
    ===================================================== */

    window.addEventListener(
        "hashchange",
        () => {

            const hash =
                window.location.hash
                    .replace("#", "")
                    .trim()
                    .toLowerCase();


            if (isValidTarget(hash)) {

                openCategory(
                    hash,
                    {
                        scroll: true,
                        updateUrl: false
                    }
                );

            }

        }
    );


    /* =====================================================
       INITIAL TAB STATE
    ===================================================== */

    function initializeAwarenessPage() {

        const hash =
            window.location.hash
                .replace("#", "")
                .trim()
                .toLowerCase();


        /*
         * If URL contains a valid category,
         * open that category.
         */

        if (isValidTarget(hash)) {

            openCategory(
                hash,
                {
                    scroll: true,
                    updateUrl: false
                }
            );

            return;
        }


        /*
         * Otherwise use the first available tab.
         */

        const firstTab =
            document.querySelector(
                ".awareness-tab"
            );


        if (firstTab) {

            const defaultTarget =
                firstTab.dataset.target;

            openCategory(
                defaultTarget,
                {
                    scroll: false,
                    updateUrl: false
                }
            );

        }

    }


    /* =====================================================
       ACTIVE CARD FEEDBACK
    ===================================================== */

    function updateActiveThreatCard(target) {

        threatCards.forEach(card => {

            card.classList.toggle(
                "selected",
                card.dataset.target === target
            );

        });

    }


    /*
     * Keep selected card synchronized with
     * the active category.
     */

    tabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                updateActiveThreatCard(
                    tab.dataset.target
                );

            }
        );

    });


    threatCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                updateActiveThreatCard(
                    card.dataset.target
                );

            }
        );

    });


    /* =====================================================
       ACCESSIBILITY — TAB ATTRIBUTES
    ===================================================== */

    tabs.forEach((tab, index) => {

        tab.setAttribute(
            "role",
            "tab"
        );

        tab.setAttribute(
            "aria-selected",
            index === 0
                ? "true"
                : "false"
        );

    });


    panels.forEach(panel => {

        panel.setAttribute(
            "role",
            "tabpanel"
        );

        panel.setAttribute(
            "aria-hidden",
            panel.classList.contains("active")
                ? "false"
                : "true"
        );

    });


    /* =====================================================
       INITIALIZE
    ===================================================== */

    initializeAwarenessPage();


    /* =====================================================
       LOG
    ===================================================== */

    console.log(
        "CyberSafe Awareness Center initialized."
    );

});