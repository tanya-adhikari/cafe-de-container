/* =====================================================
   C.A.F.E DE' CONTAINER
   MAIN JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       ELEMENTS
    ================================================= */

    const navbar =
        document.getElementById("navbar");

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const currentYear =
        document.getElementById("currentYear");


    /* =================================================
       CURRENT YEAR
    ================================================= */

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =================================================
       NAVBAR SCROLL EFFECT
    ================================================= */

    const handleNavbarScroll = () => {

        if (!navbar) return;

        if (window.scrollY > 20) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    };

    handleNavbarScroll();

    window.addEventListener(
        "scroll",
        handleNavbarScroll,
        { passive: true }
    );


    /* =================================================
       MOBILE MENU
    ================================================= */

    const closeMobileMenu = () => {

        if (!menuToggle || !mobileMenu) {
            return;
        }

        mobileMenu.classList.remove("open");

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        document.body.classList.remove(
            "mobile-menu-open"
        );

    };


    const openMobileMenu = () => {

        if (!menuToggle || !mobileMenu) {
            return;
        }

        mobileMenu.classList.add("open");

        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        document.body.classList.add(
            "mobile-menu-open"
        );

    };


    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileMenu.classList.contains("open");

                if (isOpen) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }

            }
        );


        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    closeMobileMenu
                );

            });

    }


    /* =================================================
       ESCAPE KEY
    ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeMobileMenu();

            }

        }
    );


    /* =================================================
       SMOOTH ANCHOR LINKS
    ================================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(targetId);

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =================================================
       ACTIVE NAVIGATION
    ================================================= */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".desktop-nav a"
        );


    const updateActiveNav = () => {

        if (!sections.length) return;

        const scrollPosition =
            window.scrollY + 140;

        let currentSection = "home";

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

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };

    updateActiveNav();

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );


    /* =================================================
       MENU FILTER
    ================================================= */

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
                    tab.dataset.category;

                menuTabs.forEach(item => {
                    item.classList.remove(
                        "active"
                    );
                });

                tab.classList.add("active");


                menuCards.forEach(card => {

                    const cardCategory =
                        card.dataset.category;

                    if (
                        category === "all" ||
                        cardCategory === category
                    ) {

                        card.classList.remove(
                            "hidden"
                        );

                    } else {

                        card.classList.add(
                            "hidden"
                        );

                    }

                });

            }
        );

    });


    /* =================================================
       OPENING HOURS
       HETAUDA / NEPAL
       06:00 — 22:00
    ================================================= */

    const OPEN_HOUR = 6;
    const CLOSE_HOUR = 22;

    const timeZone =
        "Asia/Kathmandu";


    const getKathmanduParts = () => {

        const formatter =
            new Intl.DateTimeFormat(
                "en-US",
                {
                    timeZone,
                    weekday: "long",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false
                }
            );

        const parts =
            formatter.formatToParts(
                new Date()
            );

        const result = {};

        parts.forEach(part => {
            result[part.type] =
                part.value;
        });

        return {
            weekday: result.weekday,
            hour: Number(result.hour),
            minute: Number(result.minute)
        };

    };


    const getOpeningStatus = () => {

        const now =
            getKathmanduParts();

        const currentMinutes =
            now.hour * 60 +
            now.minute;

        const openingMinutes =
            OPEN_HOUR * 60;

        const closingMinutes =
            CLOSE_HOUR * 60;


        if (
            currentMinutes >= openingMinutes &&
            currentMinutes < closingMinutes
        ) {

            return {
                open: true,
                label: "Open now",
                next: "Closes at 10:00 PM"
            };

        }


        if (
            currentMinutes < openingMinutes
        ) {

            return {
                open: false,
                label: "Closed",
                next: "Opens at 6:00 AM"
            };

        }


        return {
            open: false,
            label: "Closed",
            next: "Opens tomorrow at 6:00 AM"
        };

    };


    /* =================================================
       UPDATE STATUS
    ================================================= */

    const updateOpeningStatus = () => {

        const status =
            getOpeningStatus();


        /* HERO */

        const heroStatus =
            document.getElementById(
                "heroStatus"
            );

        const heroStatusText =
            document.getElementById(
                "heroStatusText"
            );

        const heroStatusNext =
            document.getElementById(
                "heroStatusNext"
            );


        if (heroStatus) {

            heroStatus.classList.toggle(
                "is-open",
                status.open
            );

            heroStatus.classList.toggle(
                "is-closed",
                !status.open
            );

        }


        if (heroStatusText) {

            heroStatusText.textContent =
                status.label;

        }


        if (heroStatusNext) {

            heroStatusNext.textContent =
                status.next;

        }


        /* MAIN INFO */

        const mainStatus =
            document.getElementById(
                "mainCafeStatus"
            );

        const mainStatusText =
            mainStatus
                ? mainStatus.querySelector(
                    ".status-text"
                )
                : null;

        const mainNext =
            document.getElementById(
                "mainCafeNext"
            );


        if (mainStatus) {

            mainStatus.classList.toggle(
                "is-open",
                status.open
            );

            mainStatus.classList.toggle(
                "is-closed",
                !status.open
            );

        }


        if (mainStatusText) {

            mainStatusText.textContent =
                status.label;

        }


        if (mainNext) {

            mainNext.textContent =
                status.next;

        }


        /* VISIT */

        const visitStatus =
            document.getElementById(
                "visitCafeStatus"
            );

        const visitStatusText =
            document.getElementById(
                "visitStatusText"
            );

        const visitStatusNext =
            document.getElementById(
                "visitStatusNext"
            );


        if (visitStatus) {

            visitStatus.classList.toggle(
                "is-open",
                status.open
            );

            visitStatus.classList.toggle(
                "is-closed",
                !status.open
            );

        }


        if (visitStatusText) {

            visitStatusText.textContent =
                status.label;

        }


        if (visitStatusNext) {

            visitStatusNext.textContent =
                status.next;

        }

    };


    updateOpeningStatus();


    /* Refresh every 30 seconds */

    setInterval(
        updateOpeningStatus,
        30000
    );


    /* Refresh when returning to tab */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.visibilityState ===
                "visible"
            ) {

                updateOpeningStatus();

            }

        }
    );


    /* =================================================
       GALLERY
    ================================================= */

    const galleryCards =
        document.querySelectorAll(
            ".gallery-card"
        );

    const lightbox =
        document.getElementById(
            "galleryLightbox"
        );

    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );

    const lightboxTitle =
        document.getElementById(
            "lightboxTitle"
        );

    const lightboxDescription =
        document.getElementById(
            "lightboxDescription"
        );

    const lightboxNumber =
        document.getElementById(
            "lightboxNumber"
        );

    const lightboxClose =
        document.getElementById(
            "lightboxClose"
        );

    const lightboxPrev =
        document.getElementById(
            "lightboxPrev"
        );

    const lightboxNext =
        document.getElementById(
            "lightboxNext"
        );

    const lightboxBackdrop =
        document.querySelector(
            ".lightbox-backdrop"
        );


    const galleryItems =
        Array.from(galleryCards)
            .map(card => {

                const image =
                    card.querySelector("img");

                return {
                    src: image
                        ? image.getAttribute("src")
                        : "",

                    alt: image
                        ? image.getAttribute("alt")
                        : "",

                    title:
                        card.dataset.title ||
                        "C.A.F.E DE' CONTAINER",

                    description:
                        card.dataset.description ||
                        ""
                };

            });


    let currentGalleryIndex = 0;


    const updateLightbox = () => {

        if (
            !galleryItems.length ||
            !lightboxImage
        ) {
            return;
        }

        const item =
            galleryItems[
                currentGalleryIndex
            ];


        lightboxImage.src =
            item.src;

        lightboxImage.alt =
            item.alt;


        if (lightboxTitle) {

            lightboxTitle.textContent =
                item.title;

        }


        if (lightboxDescription) {

            lightboxDescription.textContent =
                item.description;

        }


        if (lightboxNumber) {

            lightboxNumber.textContent =
                `${String(currentGalleryIndex + 1).padStart(2,"0")} / ${String(galleryItems.length).padStart(2,"0")}`;

        }

    };


    const openLightbox = index => {

        if (!lightbox) return;

        currentGalleryIndex =
            index;

        updateLightbox();

        lightbox.classList.add("open");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "lightbox-open"
        );

        if (lightboxClose) {
            lightboxClose.focus();
        }

    };


    const closeLightbox = () => {

        if (!lightbox) return;

        lightbox.classList.remove(
            "open"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "lightbox-open"
        );

    };


    const showPrevious = () => {

        if (!galleryItems.length) return;

        currentGalleryIndex =
            (
                currentGalleryIndex -
                1 +
                galleryItems.length
            ) %
            galleryItems.length;

        updateLightbox();

    };


    const showNext = () => {

        if (!galleryItems.length) return;

        currentGalleryIndex =
            (
                currentGalleryIndex +
                1
            ) %
            galleryItems.length;

        updateLightbox();

    };


    galleryCards.forEach(
        (card, index) => {

            card.addEventListener(
                "click",
                () => {

                    openLightbox(index);

                }
            );

        }
    );


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            showPrevious
        );

    }


    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            showNext
        );

    }


    if (lightboxBackdrop) {

        lightboxBackdrop.addEventListener(
            "click",
            closeLightbox
        );

    }


    /* =================================================
       LIGHTBOX KEYBOARD CONTROLS
    ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox ||
                !lightbox.classList.contains(
                    "open"
                )
            ) {
                return;
            }


            if (event.key === "Escape") {

                closeLightbox();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                showPrevious();

            }


            if (
                event.key === "ArrowRight"
            ) {

                showNext();

            }

        }
    );


    /* =================================================
       TOUCH / SWIPE FOR GALLERY
    ================================================= */

    let touchStartX = 0;
    let touchEndX = 0;


    if (lightbox) {

        lightbox.addEventListener(
            "touchstart",
            event => {

                if (
                    event.changedTouches.length
                ) {

                    touchStartX =
                        event
                            .changedTouches[0]
                            .screenX;

                }

            },
            { passive: true }
        );


        lightbox.addEventListener(
            "touchend",
            event => {

                if (
                    event.changedTouches.length
                ) {

                    touchEndX =
                        event
                            .changedTouches[0]
                            .screenX;

                    handleSwipe();

                }

            },
            { passive: true }
        );

    }


    const handleSwipe = () => {

        const difference =
            touchEndX -
            touchStartX;

        const minimumSwipe =
            50;


        if (
            Math.abs(difference) <
            minimumSwipe
        ) {
            return;
        }


        if (difference > 0) {

            showPrevious();

        } else {

            showNext();

        }

    };


    /* =================================================
       VIDEO
    ================================================= */

    const atmosphereVideo =
        document.querySelector(
            ".cafe-atmosphere-video"
        );


    if (atmosphereVideo) {

        atmosphereVideo
            .play()
            .catch(() => {
                /* Browser may block autoplay. */
            });

    }


    /* =================================================
       IMAGE ERROR HANDLING
    ================================================= */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-error"
                    );

                }
            );

        });


});