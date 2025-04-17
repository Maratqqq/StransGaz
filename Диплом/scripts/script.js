document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('header nav');
    
    hamburger.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Фиксированная шапка при скролле
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Кнопка "Наверх"
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Карусель отзывов
    const testimonialContainer = document.querySelector('.testimonials-container');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentIndex = 0;
    const cardWidth = 350; // Ширина карточки + gap
    const totalCards = testimonialCards.length;

    function updateTestimonials() {
        const scrollPosition = currentIndex * cardWidth;
        testimonialContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });

        testimonialDots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateTestimonials();
        });
    });

    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateTestimonials();
    });

    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateTestimonials();
    });

    // Автопрокрутка отзывов
    let autoScrollInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateTestimonials();
    }, 5000);

    // Остановка автопрокрутки при наведении
    testimonialContainer.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });

    testimonialContainer.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalCards;
            updateTestimonials();
        }, 5000);
    });

    // Анимация при скролле
    const animateElements = document.querySelectorAll('.animate');
    
    function checkAnimation() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.animationPlayState = 'running';
            }
        });
    }

    // Запускаем проверку при загрузке и скролле
    window.addEventListener('load', checkAnimation);
    window.addEventListener('scroll', checkAnimation);

    // Маска для телефона
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            e.target.value = !x[2] ? x[1] : '+7 (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
        });
    }

    // Обработка формы
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь можно добавить AJAX-отправку формы
            alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }
});

