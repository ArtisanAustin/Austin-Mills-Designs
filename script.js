const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('is-open');
  navToggle.classList.toggle('is-open'); // <-- add this
});



function initCarousel(carouselId) {
  const container = document.getElementById(carouselId);
  if (!container) return; // Guard clause in case element isn't on the page

  const slides = container.querySelectorAll('.carousel-slide');
  const dots = container.querySelectorAll('.dot');
  const caption = container.querySelector('.carousel-caption');
  const prevBtn = container.querySelector('.prev-btn');
  const nextBtn = container.querySelector('.next-btn');

  let currentIndex = 0;

  function showSlide(index) {
    // Handle looping backwards or forwards
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    // 1. Hide all slides and deactivate all dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // 2. Activate the current slide and dot
    slides[currentIndex].classList.add('active');
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add('active');
    }

    // 3. Update caption text from the image's data-caption attribute
    const newCaption = slides[currentIndex].getAttribute('data-caption');
    if (caption && newCaption) {
      caption.textContent = newCaption;
    }
  }

  // Event Listeners for arrow buttons
  prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
}

// Initialize both carousels on page load
initCarousel('print-carousel');
initCarousel('digital-carousel');