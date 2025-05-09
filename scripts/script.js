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
      // Отправка данных на Google Sheets
      const formData = {
        name: nameInput.value,
        phone: phoneInput.value,
        message: document.getElementById('message').value,
        spreadsheetId: '1uT_EFj7KPawcAWvSq7Vev7gAeFVPHFFlxW6fVCEcmf4' // ID вашей таблицы Google Sheets
      };

      fetch('https://script.google.com/macros/s/AKfycbxX6DFCa03UReOlqt3OtNenMp6muhkdOS3QqhbcG1o5eGdS6QyZW6WiQxe1Tlfy7gO/exec', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.text())
      .then(data => {
        if (data === 'Success') {
          alert('Спасибо! Ваша заявка отправлена.');
          contactForm.reset();
        } else {
          alert('Ошибка: ' + data);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Произошла ошибка. Пожалуйста, попробуйте снова.');
      });
    } else {
      alert('Пожалуйста, заполните все поля корректно.');
    }
  });
}
    // ===== FAQ Accordion =====
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
});

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
function checkAnimation() {
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        const aboutPosition = aboutSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (aboutPosition < screenPosition) {
            animateCounters();
        }
    }
}

window.addEventListener('scroll', checkAnimation);
window.addEventListener('load', checkAnimation);
