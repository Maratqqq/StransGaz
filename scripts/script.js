document.addEventListener('DOMContentLoaded', function() {
    // ===== Мобильное меню =====
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('header nav');
    
    if (hamburger && nav) {
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
    }

    // ===== Фиксированная шапка при скролле =====
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 100);
        });
    }

    // ===== Кнопка "Наверх" =====
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            backToTop.classList.toggle('active', window.scrollY > 300);
        });

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth' 
            });
        });
    }

    // Плавная прокрутка 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#home') {
                // Если якорь равен #home, прокручиваем к верху страницы
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Для других якорей прокручиваем к соответствующему элементу
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===== Карусель отзывов =====
    const testimonialContainer = document.querySelector('.testimonials-container');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (testimonialContainer && testimonialCards.length > 0) {
        let currentIndex = 0;
        let autoScrollInterval;

        // Рассчитываем ширину карточки с учетом gap
        function getCardWidth() {
            const cardStyle = window.getComputedStyle(testimonialCards[0]);
            const cardWidth = testimonialCards[0].offsetWidth;
            const gap = parseInt(window.getComputedStyle(testimonialContainer).gap) || 30;
            return cardWidth + gap;
        }

        function updateTestimonials() {
            const cardWidth = getCardWidth();
            const scrollPosition = currentIndex * cardWidth;
            
            testimonialContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });

            // Обновляем активную точку
            testimonialDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        // Обработчики для точек
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateTestimonials();
                resetAutoScroll();
            });
        });

        // Кнопка "Назад"
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
                updateTestimonials();
                resetAutoScroll();
            });
        }

        // Кнопка "Вперед"
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % testimonialCards.length;
                updateTestimonials();
                resetAutoScroll();
            });
        }

        // Автопрокрутка
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonialCards.length;
                updateTestimonials();
            }, 5000);
        }

        function resetAutoScroll() {
            clearInterval(autoScrollInterval);
            startAutoScroll();
        }

        // Остановка автопрокрутки при наведении
        testimonialContainer.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });

        testimonialContainer.addEventListener('mouseleave', startAutoScroll);

        // Инициализация
        updateTestimonials();
        startAutoScroll();

        // Очистка интервала при закрытии страницы
        window.addEventListener('beforeunload', () => {
            clearInterval(autoScrollInterval);
        });
    }

    // ===== Анимации при скролле =====
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

    // ===== Маска для телефона =====
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            e.target.value = !x[2] ? x[1] : '+7 (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
        });
    }

    // ===== Обработка формы =====
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Валидация полей
            const nameInput = document.getElementById('name');
            const phoneInput = document.getElementById('phone');
            let isValid = true;

            if (!nameInput.value.trim()) {
                isValid = false;
                nameInput.style.borderColor = 'red';
            } else {
                nameInput.style.borderColor = '#ddd';
            }

            const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
            if (!phoneRegex.test(phoneInput.value)) {
                isValid = false;
                phoneInput.style.borderColor = 'red';
            } else {
                phoneInput.style.borderColor = '#ddd';
            }

            if (isValid) {
                // Здесь можно добавить AJAX-отправку формы
                alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
                this.reset();
            } else {
                alert('Пожалуйста, заполните все поля корректно.');
            }
        });
    }

    // ===== Обнаружение touch-устройств =====
    function detectTouchDevice() {
        try {
            document.createEvent('TouchEvent');
            document.body.classList.add('touch-device');
            return true;
        } catch (e) {
            document.body.classList.remove('touch-device');
            return false;
        }
    }

    detectTouchDevice();
    window.addEventListener('resize', detectTouchDevice);
});

// Добавьте этот код в script.js для анимации счетчиков
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Вызовите эту функцию при появлении секции в области видимости
function checkAnimation() {
    // ... (существующий код) ...
    
    // Добавьте проверку для секции "О нас"
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        const aboutPosition = aboutSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (aboutPosition < screenPosition) {
            animateCounters();
        }
    }
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
        
        // Закрываем другие открытые вопросы
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
    });
});

app.use('/textolite', express.static(path.join(__dirname, 'my-website/textolite')));