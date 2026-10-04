const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('is-open');
  navToggle.classList.toggle('is-open'); // <-- add this
});



function initCarousel(carouselId) {
  const container = document.getElementById(carouselId);
  if (!container) return;

  const slides = container.querySelectorAll('.carousel-slide');
  const dots = container.querySelectorAll('.dot');
  const caption = container.querySelector('.carousel-caption');
  const prevBtn = container.querySelector('.prev-btn');
  const nextBtn = container.querySelector('.next-btn');

  // Find the index of the slide that has the 'active' class set in HTML
  let currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
  
  // Default to 0 if no active class is found
  if (currentIndex === -1) {
    currentIndex = 0;
  }

  function showSlide(index) {
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentIndex].classList.add('active');
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add('active');
    }

    const newCaption = slides[currentIndex].getAttribute('data-caption');
    if (caption && newCaption) {
      caption.textContent = newCaption;
    }
  }

  // Force sync the caption and dots with the pre-active slide on page load
  showSlide(currentIndex);

  prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
  dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showSlide(index));
    });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.15 });

const card = document.querySelector('.ember-bean-card');
if (card) observer.observe(card);



// Initialize both carousels on page load
initCarousel('print-carousel');
initCarousel('digital-carousel');
initCarousel('ember-carousel');