// ПОЛНЫЙ JS ДЛЯ САЙТА

document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт "Новое сельское хозяйство как социальная норма" загружен');
    
    // ИНИЦИАЛИЗАЦИЯ
    initSite();
    
    // АНИМАЦИИ И ИНТЕРАКТИВ
    initAnimations();
    initInteractions();
    initCharts();
    
    // ОБРАБОТЧИКИ СОБЫТИЙ
    initEventListeners();
});

// ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ
function initSite() {
    // Скрываем загрузчик через 1.5 секунды (гарантированно)
    setTimeout(() => {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }
        
        // Показываем контент с анимацией
        document.querySelectorAll('.critical-hidden').forEach(el => {
            el.classList.add('critical-visible');
        });
        
        // Запускаем счетчики
        startCounters();
        
        console.log('Сайт инициализирован');
    }, 1500);
}

// АНИМАЦИИ
function initAnimations() {
    // Анимация появления при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Анимация прогресс-баров
                if (entry.target.classList.contains('progress')) {
                    const value = entry.target.dataset.value;
                    const bar = entry.target.querySelector('.progress-bar');
                    if (bar) {
                        bar.style.width = value + '%';
                    }
                }
                
                // Анимация столбцов графика
                if (entry.target.classList.contains('chart-bar')) {
                    const value = entry.target.dataset.value;
                    entry.target.style.height = value + '%';
                    entry.target.style.setProperty('--height', value + '%');
                }
            }
        });
    }, observerOptions);
    
    // Наблюдаем за всеми элементами с анимацией
    document.querySelectorAll('.audience-card, .channel, .process-step, .swot-card, .canvas-cell, .metric, .contribution, .link-card').forEach(el => {
        observer.observe(el);
    });
    
    // CSS для анимации появления
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .audience-card,
        .channel,
        .process-step,
        .swot-card,
        .canvas-cell,
        .metric,
        .contribution,
        .link-card {
            opacity: 0;
            transform: translateY(30px);
        }
    `;
    document.head.appendChild(animationStyles);
}

// ИНТЕРАКТИВНЫЕ ЭЛЕМЕНТЫ
function initInteractions() {
    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Кнопка "Наверх"
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });
    }
    
    // Интерактивные карточки
    document.querySelectorAll('.card-interactive').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(126, 87, 194, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow)';
        });
    });
    
    // Интерактивные элементы KV/RaMIS
    document.querySelectorAll('.link-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (this.href) {
                e.preventDefault();
                setTimeout(() => {
                    window.open(this.href, '_blank');
                }, 300);
                
                // Эффект клика
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            }
        });
    });
}

// ГРАФИКИ И СЧЕТЧИКИ
function initCharts() {
    // Анимация столбцов графика
    setTimeout(() => {
        document.querySelectorAll('.chart-bar').forEach(bar => {
            const value = bar.dataset.value;
            bar.style.height = value + '%';
            bar.style.setProperty('--height', value + '%');
        });
    }, 2000);
    
    // Интерактивность столбцов
    document.querySelectorAll('.chart-bar').forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            const value = this.dataset.value;
            const label = this.dataset.label;
            
            // Создаем подсказку
            const tooltip = document.createElement('div');
            tooltip.className = 'chart-tooltip';
            tooltip.textContent = `${label}: ${value}%`;
            tooltip.style.position = 'absolute';
            tooltip.style.top = '-40px';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.background = 'var(--secondary)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '8px 12px';
            tooltip.style.borderRadius = '6px';
            tooltip.style.fontSize = '0.9rem';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.style.zIndex = '100';
            
            this.appendChild(tooltip);
        });
        
        bar.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.chart-tooltip');
            if (tooltip) tooltip.remove();
        });
    });
}

// СЧЕТЧИКИ
function startCounters() {
    document.querySelectorAll('.stat-value[data-count], .metric-value[data-target]').forEach(counter => {
        const target = parseInt(counter.dataset.count || counter.dataset.target || 0);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
            } else {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            }
        };
        
        // Запускаем с задержкой
        setTimeout(() => {
            requestAnimationFrame(updateCounter);
        }, 500);
    });
}

// ОБРАБОТЧИКИ СОБЫТИЙ
function initEventListeners() {
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Анимация навигации при скролле
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = 'none';
            navbar.style.transform = 'translateY(0)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Прокрутка вниз
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Прокрутка вверх
            navbar.style.transform = 'translateY(0)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Копирование контактов
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', function() {
            const text = this.textContent.trim();
            copyToClipboard(text);
            showNotification('Контакт скопирован в буфер обмена');
        });
    });
    
    // Ресайз окна
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Обновляем графики при изменении размера
            document.querySelectorAll('.chart-bar').forEach(bar => {
                const value = bar.dataset.value;
                bar.style.height = value + '%';
            });
        }, 250);
    });
}

// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback для старых браузеров
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

function showNotification(message) {
    // Удаляем старые уведомления
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Добавляем стили для анимации
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
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
        document.head.appendChild(styles);
    }
}

// ЗАПУСК САЙТА ПРИ ПОЛНОЙ ЗАГРУЗКЕ
window.addEventListener('load', function() {
    console.log('Все ресурсы загружены');
    
    // Проверяем готовность
    const isReady = document.readyState === 'complete';
    if (isReady) {
        document.body.classList.add('loaded');
    }
    
    // Проверяем производительность
    const perfEntries = performance.getEntriesByType('navigation');
    if (perfEntries.length > 0) {
        const navTiming = perfEntries[0];
        console.log(`Время загрузки: ${navTiming.loadEventEnd - navTiming.loadEventStart}ms`);
    }
});

// РЕЗЕРВНЫЕ МЕХАНИЗМЫ
// Если IntersectionObserver не поддерживается
if (!('IntersectionObserver' in window)) {
    console.log('IntersectionObserver не поддерживается, используем fallback');
    
    document.querySelectorAll('.audience-card, .channel, .process-step, .swot-card, .canvas-cell, .metric, .contribution, .link-card').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}

// Резервная анимация счетчиков
setTimeout(() => {
    document.querySelectorAll('.stat-value[data-count], .metric-value[data-target]').forEach(counter => {
        if (counter.textContent === '0') {
            const target = parseInt(counter.dataset.count || counter.dataset.target || 100);
            counter.textContent = target;
        }
    });
}, 4000);
