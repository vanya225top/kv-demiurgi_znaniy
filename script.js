// Основной JavaScript файл
document.addEventListener('DOMContentLoaded', function() {
    console.log('Основной JS загружен');

    // Инициализация после загрузки страницы
    setTimeout(initializePage, 100);
});

function initializePage() {
    // Анимация счетчиков
    initCounters();
    
    // Анимация графиков
    initCharts();
    
    // Интерактивные элементы
    initInteractiveElements();
    
    // Модальные окна
    initModals();
    
    // Формы
    initForms();
    
    // Дополнительные анимации
    initAnimations();
}

// Анимация счетчиков
function initCounters() {
    const counters = document.querySelectorAll('[data-count], [data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.classList.contains('stat-value')) {
                    const target = parseInt(element.getAttribute('data-count')) || 100;
                    animateCounter(element, target);
                } else if (element.classList.contains('metric-value')) {
                    const target = parseInt(element.getAttribute('data-target')) || 100;
                    animateCounter(element, target);
                } else if (element.classList.contains('chart-item')) {
                    const percent = element.getAttribute('data-percent');
                    const bar = element.querySelector('.chart-bar');
                    if (bar) {
                        setTimeout(() => {
                            bar.style.height = percent + '%';
                        }, 300);
                    }
                }
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
    
    // Также наблюдаем за графиками
    document.querySelectorAll('.chart-item').forEach(item => {
        observer.observe(item);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Анимация графиков
function initCharts() {
    // Инициализация графиков прогресса
    const progressElements = document.querySelectorAll('.progress-bar, .chart-bar');
    
    progressElements.forEach(bar => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = bar.style.width || bar.getAttribute('data-percent') + '%';
                    bar.style.width = '0';
                    bar.style.height = '0';
                    
                    setTimeout(() => {
                        if (bar.style.width !== undefined) {
                            bar.style.width = width;
                        }
                        if (bar.style.height !== undefined) {
                            bar.style.height = width;
                        }
                    }, 300);
                    
                    observer.unobserve(bar);
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(bar);
    });
}

// Интерактивные элементы
function initInteractiveElements() {
    // Интерактивные узлы в визуализации
    const vizNodes = document.querySelectorAll('.viz-node');
    
    vizNodes.forEach(node => {
        node.addEventListener('click', function() {
            const step = this.getAttribute('data-step');
            showStepInfo(step);
        });
        
        node.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'var(--shadow)';
        });
    });
    
    // Интерактивные карточки
    const interactiveCards = document.querySelectorAll('.problem-card, .step, .swot-card, .pest-card, .metric-card');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Эффект параллакса для KV/RaMIS секции
    const kvramisSection = document.querySelector('.kvramis-section');
    
    if (kvramisSection) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            kvramisSection.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
        });
    }
}

function showStepInfo(step) {
    const messages = {
        awareness: 'Первый этап — осознание проблемы цивилизационного разрыва',
        immersion: 'Второй этап — погружение в тему через доступный контент',
        application: 'Третий этап — применение знаний на практике',
        norm: 'Четвертый этап — агрограмотность становится социальной нормой'
    };
    
    showNotification(messages[step] || 'Этап процесса обучения');
}

// Модальные окна
function initModals() {
    const videoBtn = document.getElementById('watchVideo');
    const videoModal = document.getElementById('videoModal');
    const modalClose = videoModal?.querySelector('.modal-close');
    
    if (videoBtn && videoModal) {
        videoBtn.addEventListener('click', () => {
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        modalClose.addEventListener('click', () => {
            videoModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Эскейп для закрытия
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                videoModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Воспроизведение видео (заглушка)
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', () => {
            showNotification('Видео будет доступно после презентации проекта');
        });
    }
}

// Формы
function initForms() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Простая валидация
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#f44336';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Имитация отправки
                showNotification('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
                this.reset();
                
                // Анимация успешной отправки
                const submitBtn = this.querySelector('button[type="submit"]');
                if (submitBtn) {
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Отправлено';
                    submitBtn.disabled = true;
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                }
            } else {
                showNotification('Пожалуйста, заполните все поля');
            }
        });
    }
}

// Дополнительные анимации
function initAnimations() {
    // Анимация появления элементов при скролле
    const animatedElements = document.querySelectorAll('.problem-card, .step, .swot-card, .pest-card, .canvas-cell, .contribution-item, .link-card');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });
    
    // Добавляем CSS для анимации
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .animated {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .problem-card,
        .step,
        .swot-card,
        .pest-card,
        .canvas-cell,
        .contribution-item,
        .link-card {
            opacity: 0;
        }
    `;
    document.head.appendChild(animationStyle);
    
    // Анимация иконок при наведении
    const icons = document.querySelectorAll('.problem-icon, .contribution-icon, .link-icon');
    
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Эффект пульсации для CTA кнопок
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(btn => {
        setInterval(() => {
            btn.style.boxShadow = '0 0 0 0 rgba(46, 125, 50, 0.7)';
            setTimeout(() => {
                btn.style.boxShadow = '0 0 0 10px rgba(46, 125, 50, 0)';
            }, 600);
        }, 3000);
    });
}

// Вспомогательные функции
function showNotification(message) {
    // Удаляем старые уведомления
    const oldNotification = document.querySelector('.notification');
    if (oldNotification) {
        oldNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 15px 25px;
        border-radius: var(--radius);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
    
    // Добавляем CSS для анимации
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Обработка ошибок
window.addEventListener('error', function(e) {
    console.error('Ошибка:', e.message);
    
    // Показываем пользователю дружелюбное сообщение
    if (e.message.includes('Script error')) {
        showNotification('Произошла ошибка при загрузке скрипта. Пожалуйста, обновите страницу.');
    }
});

// Отслеживание производительности
window.addEventListener('load', function() {
    const timing = performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    
    console.log(`Время загрузки страницы: ${loadTime}ms`);
    
    if (loadTime > 3000) {
        console.warn('Время загрузки превышает 3 секунды. Рекомендуется оптимизация.');
    }
});

// Резервные функции для старых браузеров
if (!window.IntersectionObserver) {
    console.warn('IntersectionObserver не поддерживается. Используем резервные анимации.');
    
    // Простая анимация появления при скролле
    window.addEventListener('scroll', function() {
        const elements = document.querySelectorAll('.problem-card, .step, .swot-card');
        const windowHeight = window.innerHeight;
        
        elements.forEach((el, index) => {
            const position = el.getBoundingClientRect().top;
            
            if (position < windowHeight - 100) {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    });
    
    // Инициализация счетчиков без IntersectionObserver
    setTimeout(() => {
        document.querySelectorAll('.stat-value').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count')) || 100;
            animateCounter(counter, target);
        });
    }, 1000);
}
