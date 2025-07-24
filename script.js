document.addEventListener("DOMContentLoaded", function() {
    let slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    let prevButton = document.querySelector(".prev");
    let nextButton = document.querySelector(".next");

    // Only initialize slideshow if elements exist
    if (slides.length > 0 && prevButton && nextButton) {
        function showSlide(index) {
            slides[currentSlide].classList.remove("active");
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add("active");
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        nextButton.addEventListener("click", nextSlide);
        prevButton.addEventListener("click", prevSlide);

        // Initial display
        slides[currentSlide].classList.add("active");
    }
});

window.addEventListener('scroll', function() {
  var header = document.getElementById('header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scroll');
      header.classList.remove('top');
    } else {
      header.classList.add('top');
      header.classList.remove('scroll');
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
