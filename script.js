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

function showVideoSlide(index) {
    const slides = document.querySelectorAll('.video-slide');
    const dots = document.querySelectorAll('.video-dot');
    
    // Hide all slides and remove active class from dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show selected slide and activate corresponding dot
    if (slides[index] && dots[index]) {
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
}
