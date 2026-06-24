document.addEventListener("DOMContentLoaded", function() {
    let slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    let dotsContainer = document.querySelector(".slide-dots");

    // Only initialize slideshow if elements exist
    if (slides.length > 0) {
        // Build one dot per slide (position indicator + tap-to-jump). Dots are the
        // only on-screen control now; navigation is otherwise by swipe.
        let dots = [];
        if (dotsContainer) {
            slides.forEach((_, i) => {
                const dot = document.createElement("span");
                dot.className = "slide-dot";
                dot.setAttribute("role", "button");
                dot.setAttribute("tabindex", "0");
                dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
                dot.addEventListener("click", () => showSlide(i));
                dot.addEventListener("keydown", (event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        showSlide(i);
                    }
                });
                dotsContainer.appendChild(dot);
            });
            dots = Array.from(dotsContainer.querySelectorAll(".slide-dot"));
        }

        function syncDots() {
            dots.forEach((d, i) => {
                const isActive = i === currentSlide;
                d.classList.toggle("active", isActive);
                d.setAttribute("aria-current", isActive ? "true" : "false");
            });
        }

        function showSlide(index) {
            slides[currentSlide].classList.remove("active");
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add("active");
            syncDots();
        }

        // Swipe support (mirrors the message-board carousel).
        const swipeArea = document.querySelector(".slideshow");
        if (swipeArea) {
            let startX = null;
            swipeArea.addEventListener("touchstart", (e) => {
                startX = e.touches[0].clientX;
            }, { passive: true });
            swipeArea.addEventListener("touchend", (e) => {
                if (startX === null) return;
                const dx = e.changedTouches[0].clientX - startX;
                if (Math.abs(dx) > 40) showSlide(currentSlide + (dx < 0 ? 1 : -1));
                startX = null;
            }, { passive: true });
        }

        // Initial display
        slides[currentSlide].classList.add("active");
        syncDots();
    }
});

window.addEventListener('scroll', function() {
  var header = document.getElementById('header');
  var bookTrialButton = document.getElementById('book-trial');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scroll');
      header.classList.remove('top');
      if (bookTrialButton) {
        bookTrialButton.classList.add('scroll');
        bookTrialButton.classList.remove('top');
      }
    } else {
      header.classList.add('top');
      header.classList.remove('scroll');
      if (bookTrialButton) {
        bookTrialButton.classList.add('top');
        bookTrialButton.classList.remove('scroll');
      }
    }
  }
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.error(`Section with id "${sectionId}" not found.`);
    }
}

// Testimonial video switcher: dots toggle between the videos.
function showVideoSlide(index) {
    const slides = document.querySelectorAll('.video-slide');
    const dots = document.querySelectorAll('.video-dot');
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    if (slides[index] && dots[index]) {
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
}

function initMessageSlider() {
    const viewport = document.querySelector(".mb-viewport");
    if (!viewport) return;

    viewport.addEventListener("wheel", (event) => {
        const isVerticalScroll = Math.abs(event.deltaY) > Math.abs(event.deltaX);
        if (!isVerticalScroll || event.shiftKey) return;

        event.preventDefault();
        window.scrollBy({
            top: event.deltaY,
            behavior: "auto"
        });
    }, { passive: false });

    const resetScroll = () => {
        requestAnimationFrame(() => {
            viewport.scrollLeft = 0;
        });
    };

    resetScroll();
    window.addEventListener("resize", () => {
        resetScroll();
    });
}

document.addEventListener("DOMContentLoaded", initMessageSlider);

// Reveal animations:
//   .reveal            -> fades in on load (hero/laptop)
//   .reveal-heading / .reveal-left / .reveal-right -> reveal when scrolled into view
function initScrollReveal() {
    const onLoad = document.querySelectorAll(".reveal");
    const onScroll = document.querySelectorAll(".reveal-heading, .reveal-left, .reveal-right");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // On-load reveals: show after a paint so the fade still runs.
    requestAnimationFrame(() => requestAnimationFrame(() => {
        onLoad.forEach(el => el.classList.add("is-visible"));
    }));

    // .reveal-up (the laptop): it peeks above the fold of the full-height hero, so
    // instead of revealing on load it stays hidden until the user starts scrolling,
    // then fades in. Keeps the first screen as just the dark hero + text.
    const onScrollStart = document.querySelectorAll(".reveal-up");
    if (onScrollStart.length) {
        const revealUp = () => onScrollStart.forEach(el => el.classList.add("is-visible"));
        if (reduceMotion) {
            revealUp();
        } else {
            const onScrollCheck = () => {
                if (window.scrollY > 60) {
                    revealUp();
                    window.removeEventListener("scroll", onScrollCheck);
                }
            };
            window.addEventListener("scroll", onScrollCheck, { passive: true });
            onScrollCheck(); // in case the page loads already scrolled
        }
    }

    if (!onScroll.length) return;
    // No IntersectionObserver (or reduced motion): just show everything.
    if (reduceMotion || !("IntersectionObserver" in window)) {
        onScroll.forEach(el => el.classList.add("is-visible"));
        return;
    }

    // Trigger only once an element is comfortably scrolled into view (its top
    // past ~80% of the viewport), so content that's lower on a tall window
    // doesn't reveal on load alongside the hero.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0, rootMargin: "0px 0px -20% 0px" });

    onScroll.forEach(el => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", initScrollReveal);
