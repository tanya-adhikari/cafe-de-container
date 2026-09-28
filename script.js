/* =========================================================
   C.A.F.E DE' CONTAINER
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const mobileMenu =
    document.getElementById("mobileMenu");


function closeMobileMenu() {

    if (!menuToggle || !mobileMenu) return;


    mobileMenu.classList.remove("open");


    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );


    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );


    mobileMenu.setAttribute(
        "aria-hidden",
        "true"
    );


    menuToggle.innerHTML =
        '<span aria-hidden="true">☰</span>';

}


if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            mobileMenu.classList.toggle("open");


        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );


        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );


        mobileMenu.setAttribute(
            "aria-hidden",
            String(!isOpen)
        );


        menuToggle.innerHTML =
            isOpen
                ? '<span aria-hidden="true">✕</span>'
                : '<span aria-hidden="true">☰</span>';

    });


    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                mobileMenu.classList.contains("open")
            ) {

                closeMobileMenu();

            }

        }
    );

}


/* =========================================================
   AUTOMATIC CAFÉ OPEN / CLOSED STATUS
========================================================= */

/*

    C.A.F.E DE' CONTAINER

    EVERY DAY:
    OPEN  = 6:00 AM
    CLOSE = 10:00 PM

    TIME ZONE:
    Asia/Kathmandu

*/


function updateCafeStatus() {


    /* -----------------------------------------------
       ELEMENTS
    ----------------------------------------------- */

    const heroBox =
        document.getElementById("heroStatusBox");

    const heroText =
        document.getElementById("heroStatus");

    const heroNext =
        document.getElementById("heroStatusNext");


    const mainStatus =
        document.getElementById("mainCafeStatus");

    const mainStatusNext =
        document.getElementById("mainStatusNext");


    const visitStatus =
        document.getElementById("visitCafeStatus");

    const visitStatusText =
        document.getElementById("visitStatusText");

    const visitStatusNext =
        document.getElementById("visitStatusNext");


    /* -----------------------------------------------
       CURRENT NEPAL TIME
    ----------------------------------------------- */

    const now = new Date();


    const parts =
        new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone: "Asia/Kathmandu",

                hour: "2-digit",

                minute: "2-digit",

                hourCycle: "h23"
            }
        ).formatToParts(now);


    const time = {};


    parts.forEach(part => {

        if (part.type !== "literal") {

            time[part.type] =
                Number(part.value);

        }

    });


    const currentMinutes =
        (time.hour * 60) + time.minute;


    /* -----------------------------------------------
       CAFÉ HOURS
    ----------------------------------------------- */

    const openingMinutes =
        6 * 60;

    const closingMinutes =
        22 * 60;


    const isOpen =
        currentMinutes >= openingMinutes &&
        currentMinutes < closingMinutes;


    const isBeforeOpening =
        currentMinutes < openingMinutes;


    /* -----------------------------------------------
       STATUS CLASS HELPER
    ----------------------------------------------- */

    function setStatusClass(
        element,
        open
    ) {

        if (!element) return;


        element.classList.toggle(
            "is-open",
            open
        );


        element.classList.toggle(
            "is-closed",
            !open
        );

    }


    /* =================================================
       OPEN
    ================================================= */

    if (isOpen) {


        /* HERO */

        setStatusClass(
            heroBox,
            true
        );


        if (heroText) {

            heroText.textContent =
                "Open now";

        }


        if (heroNext) {

            heroNext.textContent =
                "Closes at 10:00 PM";

        }


        /* MAIN INFO */

        setStatusClass(
            mainStatus,
            true
        );


        const mainStatusText =
            mainStatus
                ? mainStatus.querySelector(
                    ".status-text"
                )
                : null;


        if (mainStatusText) {

            mainStatusText.textContent =
                "Open now";

        }


        if (mainStatusNext) {

            mainStatusNext.textContent =
                "Closes at 10:00 PM";

        }


        /* VISIT */

        setStatusClass(
            visitStatus,
            true
        );


        if (visitStatusText) {

            visitStatusText.textContent =
                "Open now";

        }


        if (visitStatusNext) {

            visitStatusNext.textContent =
                "Closes at 10:00 PM";

        }

    }


    /* =================================================
       CLOSED
    ================================================= */

    else {


        /* HERO */

        setStatusClass(
            heroBox,
            false
        );


        if (heroText) {

            heroText.textContent =
                "Closed now";

        }


        if (heroNext) {

            heroNext.textContent =
                isBeforeOpening
                    ? "Opens at 6:00 AM"
                    : "Opens tomorrow at 6:00 AM";

        }


        /* MAIN INFO */

        setStatusClass(
            mainStatus,
            false
        );


        const mainStatusText =
            mainStatus
                ? mainStatus.querySelector(
                    ".status-text"
                )
                : null;


        if (mainStatusText) {

            mainStatusText.textContent =
                "Closed now";

        }


        if (mainStatusNext) {

            mainStatusNext.textContent =
                isBeforeOpening
                    ? "Opens at 6:00 AM"
                    : "Opens tomorrow at 6:00 AM";

        }


        /* VISIT */

        setStatusClass(
            visitStatus,
            false
        );


        if (visitStatusText) {

            visitStatusText.textContent =
                "Closed now";

        }


        if (visitStatusNext) {

            visitStatusNext.textContent =
                isBeforeOpening
                    ? "Opens at 6:00 AM"
                    : "Opens tomorrow at 6:00 AM";

        }

    }

}


/* =========================================================
   RUN STATUS IMMEDIATELY
========================================================= */

updateCafeStatus();


/* =========================================================
   UPDATE EVERY 30 SECONDS
========================================================= */

setInterval(
    updateCafeStatus,
    30000
);


/* =========================================================
   UPDATE WHEN USER RETURNS TO TAB
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (!document.hidden) {

            updateCafeStatus();

        }

    }
);


/* =========================================================
   MENU FILTER
========================================================= */

const menuTabs =
    document.querySelectorAll(
        ".menu-tab"
    );


const menuCards =
    document.querySelectorAll(
        ".menu-card"
    );


menuTabs.forEach(tab => {

    tab.addEventListener(
        "click",
        () => {

            const category =
                tab.getAttribute(
                    "data-category"
                );


            /* -----------------------------------------
               ACTIVE BUTTON
            ----------------------------------------- */

            menuTabs.forEach(item => {

                item.classList.remove(
                    "active"
                );


                item.setAttribute(
                    "aria-pressed",
                    "false"
                );

            });


            tab.classList.add(
                "active"
            );


            tab.setAttribute(
                "aria-pressed",
                "true"
            );


            /* -----------------------------------------
               FILTER CARDS
            ----------------------------------------- */

            menuCards.forEach(card => {

                const cardCategory =
                    card.getAttribute(
                        "data-category"
                    );


                const shouldShow =
                    category === "all" ||
                    category === cardCategory;


                if (shouldShow) {

                    card.classList.remove(
                        "hidden"
                    );


                    card.removeAttribute(
                        "aria-hidden"
                    );

                }

                else {

                    card.classList.add(
                        "hidden"
                    );


                    card.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }

            });

        }
    );

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".desktop-nav a"
    );


function updateActiveNavigation() {

    if (!sections.length || !navLinks.length) {
        return;
    }


    let currentSection =
        "home";


    const scrollPosition =
        window.scrollY + 180;


    sections.forEach(section => {

        if (
            scrollPosition >=
            section.offsetTop
        ) {

            currentSection =
                section.id;

        }

    });


    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        const isActive =
            href ===
            `#${currentSection}`;


        link.classList.toggle(
            "active",
            isActive
        );


        if (isActive) {

            link.setAttribute(
                "aria-current",
                "page"
            );

        }

        else {

            link.removeAttribute(
                "aria-current"
            );

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


window.addEventListener(
    "resize",
    updateActiveNavigation
);


updateActiveNavigation();


/* =========================================================
   NAVBAR SHADOW
========================================================= */

const navbar =
    document.getElementById(
        "navbar"
    );


function updateNavbar() {

    if (!navbar) return;


    const isScrolled =
        window.scrollY > 20;


    navbar.classList.toggle(
        "scrolled",
        isScrolled
    );

}


window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
);


updateNavbar();


/* =========================================================
   REVEAL ANIMATION
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".section, .info-strip, .menu-card, .final-cta"
    );


if (
    "IntersectionObserver"
    in window
) {

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.08
            }

        );


    revealElements.forEach(
        element => {

            element.classList.add(
                "reveal"
            );


            revealObserver.observe(
                element
            );

        }
    );

}

else {

    revealElements.forEach(
        element => {

            element.classList.add(
                "revealed"
            );

        }
    );

}


/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear =
    document.getElementById(
        "currentYear"
    );


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

/*

    If an image cannot load, we prevent the browser from
    showing a broken-image icon.

    This keeps the layout clean while you are still
    replacing temporary images with the café's real photos.

*/

const images =
    document.querySelectorAll(
        "img"
    );


images.forEach(image => {

    image.addEventListener(
        "error",
        () => {

            image.classList.add(
                "image-load-error"
            );

        }
    );

});