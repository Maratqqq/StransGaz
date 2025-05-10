document.addEventListener('DOMContentLoaded', function() {
  // 1. Мобильное меню (главный интерактивный элемент)
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('header nav');
  
  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      nav.classList.toggle('active');
      this.innerHTML = nav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });
  }

  // 2. Плавная прокрутка (базовый UX)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // 3. FAQ аккордеон (простой интерактив)
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      question.parentElement.classList.toggle('active');
    });
  });

  // 4. Анимация при скролле (декоративный элемент)
  function checkAnimation() {
    document.querySelectorAll('.animate').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight / 1.2) {
        el.style.opacity = 1;
      }
    });
  }
  window.addEventListener('scroll', checkAnimation);
  checkAnimation();
});
