/* =========================================================
   C.A.F.E DE' CONTAINER
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   WAIT UNTIL HTML IS READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       MOBILE MENU
    ===================================================== */

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

        menuToggle.addEventListener(
            "click",
            () => {

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

            }
        );


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


    /* =====================================================
       AUTOMATIC CAFÉ OPEN / CLOSED STATUS
       
       LOCATION:
       Hetauda, Nepal

       TIMEZONE:
       Asia/Kathmandu

       OPEN:
       6:00 AM

       CLOSE:
       10:00 PM
    ===================================================== */

    const CAFE_TIME_ZONE =
        "Asia/Kathmandu";

    const OPENING_HOUR = 6;

    const CLOSING_HOUR = 22;


    function getKathmanduTime() {

        try {

            const formatter =
                new Intl.DateTimeFormat(
                    "en-US",
                    {
                        timeZone: CAFE_TIME_ZONE,
                        hour: "2-digit",
                        minute: "2-digit",
                        hourCycle: "h23"
                    }
                );


            const parts =
                formatter.formatToParts(
                    new Date()
                );


            let hour = 0;
            let minute = 0;


            parts.forEach(part => {

                if (part.type === "hour") {

                    hour =
                        Number(part.value);

                }


                if (part.type === "minute") {

                    minute =
                        Number(part.value);

                }

            });


            return {
                hour,
                minute
            };

        }

        catch (error) {

            console.error(
                "Could not read Kathmandu time:",
                error
            );


            return null;

        }

    }


    function setStatusClass(
        element,
        isOpen
    ) {

        if (!element) return;


        element.classList.toggle(
            "is-open",
            isOpen
        );


        element.classList.toggle(
            "is-closed",
            !isOpen
        );

    }


    function setCafeStatus(
        status,
        nextText,
        isOpen
    ) {

        /* ---------------------------------------------
           HERO
        --------------------------------------------- */

        const heroBox =
            document.getElementById(
                "heroStatusBox"
            );

        const heroText =
            document.getElementById(
                "heroStatus"
            );

        const heroNext =
            document.getElementById(
                "heroStatusNext"
            );


        setStatusClass(
            heroBox,
            isOpen
        );


        if (heroText) {

            heroText.textContent =
                status;

        }


        if (heroNext) {

            heroNext.textContent =
                nextText;

        }


        /* ---------------------------------------------
           MAIN INFO STRIP
        --------------------------------------------- */

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


        const mainStatusNext =
            document.getElementById(
                "mainStatusNext"
            );


        setStatusClass(
            mainStatus,
            isOpen
        );


        if (mainStatusText) {

            mainStatusText.textContent =
                status;

        }


        if (mainStatusNext) {

            mainStatusNext.textContent =
                nextText;

        }


        /* ---------------------------------------------
           VISIT SECTION
        --------------------------------------------- */

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


        setStatusClass(
            visitStatus,
            isOpen
        );


        if (visitStatusText) {

            visitStatusText.textContent =
                status;

        }


        if (visitStatusNext) {

            visitStatusNext.textContent =
                nextText;

        }

    }


    function updateCafeStatus() {

        const time =
            getKathmanduTime();


        /* ---------------------------------------------
           SAFETY FALLBACK
           
           If timezone detection fails, don't leave
           the website stuck on "Checking..."
        --------------------------------------------- */

        if (!time) {

            setCafeStatus(
                "Open daily",
                "6:00 AM — 10:00 PM",
                true
            );

            return;

        }


        const currentMinutes =
            (
                time.hour * 60
            ) +
            time.minute;


        const openingMinutes =
            OPENING_HOUR * 60;


        const closingMinutes =
            CLOSING_HOUR * 60;


        const isOpen =
            currentMinutes >= openingMinutes &&
            currentMinutes < closingMinutes;


        const isBeforeOpening =
            currentMinutes < openingMinutes;


        if (isOpen) {

            setCafeStatus(
                "Open now",
                "Closes at 10:00 PM",
                true
            );

        }

        else {

            setCafeStatus(
                "Closed now",
                isBeforeOpening
                    ? "Opens at 6:00 AM"
                    : "Opens tomorrow at 6:00 AM",
                false
            );

        }

    }


    /* Run immediately */

    updateCafeStatus();


    /* Refresh every 30 seconds */

    setInterval(
        updateCafeStatus,
        30000
    );


    /* Refresh when the tab becomes visible */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.visibilityState ===
                "visible"
            ) {

                updateCafeStatus();

            }

        }
    );


    /* =====================================================
       MENU FILTER
    ===================================================== */

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


    /* =====================================================
       PREMIUM GALLERY / LIGHTBOX
    ===================================================== */

    const galleryCards =
        Array.from(
            document.querySelectorAll(
                ".gallery-card"
            )
        );


    const galleryLightbox =
        document.getElementById(
            "galleryLightbox"
        );


    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );


    const lightboxCaption =
        document.getElementById(
            "lightboxCaption"
        );


    const lightboxCounter =
        document.getElementById(
            "lightboxCounter"
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


    let currentGalleryIndex = 0;


    /* -----------------------------------------------------
       GET GALLERY DATA
    ----------------------------------------------------- */

    const galleryItems =
        galleryCards.map(card => {

            return {

                image:
                    card.getAttribute(
                        "data-gallery-image"
                    ),

                title:
                    card.getAttribute(
                        "data-gallery-title"
                    ) ||
                    "C.A.F.E DE' CONTAINER",

                button:
                    card

            };

        });


    /* -----------------------------------------------------
       UPDATE LIGHTBOX
    ----------------------------------------------------- */

    function updateLightbox() {

        if (
            !galleryLightbox ||
            !lightboxImage ||
            !galleryItems.length
        ) {

            return;

        }


        const item =
            galleryItems[
                currentGalleryIndex
            ];


        lightboxImage.style.opacity =
            "0";


        const preloadedImage =
            new Image();


        preloadedImage.onload =
            () => {

                lightboxImage.src =
                    item.image;


                lightboxImage.alt =
                    item.title;


                if (lightboxCaption) {

                    lightboxCaption.textContent =
                        item.title;

                }


                if (lightboxCounter) {

                    lightboxCounter.textContent =
                        `${String(
                            currentGalleryIndex + 1
                        ).padStart(2, "0")} / ${String(
                            galleryItems.length
                        ).padStart(2, "0")}`;

                }


                requestAnimationFrame(
                    () => {

                        lightboxImage.style.opacity =
                            "1";

                    }
                );

            };


        preloadedImage.onerror =
            () => {

                lightboxImage.src =
                    item.image;


                lightboxImage.alt =
                    item.title;


                if (lightboxCaption) {

                    lightboxCaption.textContent =
                        item.title;

                }


                if (lightboxCounter) {

                    lightboxCounter.textContent =
                        `${String(
                            currentGalleryIndex + 1
                        ).padStart(2, "0")} / ${String(
                            galleryItems.length
                        ).padStart(2, "0")}`;

                }


                lightboxImage.style.opacity =
                    "1";

            };


        preloadedImage.src =
            item.image;

    }


    /* -----------------------------------------------------
       OPEN LIGHTBOX
    ----------------------------------------------------- */

    function openGallery(index) {

        if (
            !galleryLightbox ||
            !galleryItems.length
        ) {

            return;

        }


        currentGalleryIndex =
            index;


        updateLightbox();


        galleryLightbox.classList.add(
            "open"
        );


        galleryLightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "lightbox-open"
        );


        if (lightboxClose) {

            lightboxClose.focus();

        }

    }


    /* -----------------------------------------------------
       CLOSE LIGHTBOX
    ----------------------------------------------------- */

    function closeGallery() {

        if (!galleryLightbox) return;


        galleryLightbox.classList.remove(
            "open"
        );


        galleryLightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "lightbox-open"
        );


        if (lightboxImage) {

            lightboxImage.style.opacity =
                "0";

        }

    }


    /* -----------------------------------------------------
       PREVIOUS IMAGE
    ----------------------------------------------------- */

    function showPreviousGalleryImage() {

        if (!galleryItems.length) return;


        currentGalleryIndex =
            (
                currentGalleryIndex -
                1 +
                galleryItems.length
            ) %
            galleryItems.length;


        updateLightbox();

    }


    /* -----------------------------------------------------
       NEXT IMAGE
    ----------------------------------------------------- */

    function showNextGalleryImage() {

        if (!galleryItems.length) return;


        currentGalleryIndex =
            (
                currentGalleryIndex +
                1
            ) %
            galleryItems.length;


        updateLightbox();

    }


    /* -----------------------------------------------------
       GALLERY CARD EVENTS
    ----------------------------------------------------- */

    galleryCards.forEach(
        (card, index) => {

            card.addEventListener(
                "click",
                () => {

                    openGallery(index);

                }
            );

        }
    );


    /* -----------------------------------------------------
       LIGHTBOX CONTROLS
    ----------------------------------------------------- */

    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeGallery
        );

    }


    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            showPreviousGalleryImage
        );

    }


    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            showNextGalleryImage
        );

    }


    /* -----------------------------------------------------
       BACKDROP CLOSE
    ----------------------------------------------------- */

    if (galleryLightbox) {

        const backdrop =
            galleryLightbox.querySelector(
                ".lightbox-backdrop"
            );


        if (backdrop) {

            backdrop.addEventListener(
                "click",
                closeGallery
            );

        }

    }


    /* -----------------------------------------------------
       KEYBOARD CONTROLS
    ----------------------------------------------------- */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !galleryLightbox ||
                !galleryLightbox.classList.contains(
                    "open"
                )
            ) {

                return;

            }


            if (event.key === "Escape") {

                closeGallery();

            }


            if (event.key === "ArrowLeft") {

                showPreviousGalleryImage();

            }


            if (event.key === "ArrowRight") {

                showNextGalleryImage();

            }

        }
    );


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".desktop-nav a"
        );


    function updateActiveNavigation() {

        if (
            !sections.length ||
            !navLinks.length
        ) {

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


    /* =====================================================
       NAVBAR SHADOW
    ===================================================== */

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


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section, .info-strip, .menu-card, .final-cta"
        );


    if (
        "IntersectionObserver" in window
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


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear =
        document.getElementById(
            "currentYear"
        );


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

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


    /* =====================================================
       CAFÉ ATMOSPHERE VIDEO
    ===================================================== */

    const atmosphereVideo =
        document.querySelector(
            ".cafe-atmosphere-video"
        );


    if (atmosphereVideo) {

        atmosphereVideo.muted = true;


        const playVideo =
            () => {

                const playPromise =
                    atmosphereVideo.play();


                if (
                    playPromise &&
                    typeof playPromise.catch ===
                    "function"
                ) {

                    playPromise.catch(
                        () => {
                            /* Autoplay may be blocked */
                        }
                    );

                }

            };


        playVideo();


        document.addEventListener(
            "visibilitychange",
            () => {

                if (
                    document.visibilityState ===
                    "visible"
                ) {

                    playVideo();

                }

            }
        );

    }

});
