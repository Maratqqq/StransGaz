document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
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

    // Фиксированная шапка при скролле
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 100);
        });
    }

    // Кнопка "Наверх"
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
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
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

    // Маска для телефона
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            e.target.value = !x[2] ? x[1] : '+7 (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
        });
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

    // Анимации при скролле
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

    window.addEventListener('load', checkAnimation);
    window.addEventListener('scroll', checkAnimation);

    // Анимация счетчиков
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

    // Вызов анимации счетчиков при появлении секции в области видимости
    function checkCounters() {
        const aboutSection = document.querySelector('.about-section');
        if (aboutSection) {
            const aboutPosition = aboutSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (aboutPosition < screenPosition) {
                animateCounters();
            }
        }
    }

    window.addEventListener('scroll', checkCounters);
    window.addEventListener('load', checkCounters);
});
