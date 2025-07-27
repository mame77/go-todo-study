// Utility functions for Modern Todo App

// Tailwind configuration
const tailwindConfig = {
    theme: {
        extend: {
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'slide-in': 'slideIn 0.3s ease-out',
                'bounce-in': 'bounceIn 0.5s ease-out',
                'pulse-slow': 'pulse 3s infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                slideIn: {
                    '0%': { transform: 'translateY(50px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                bounceIn: {
                    '0%': { transform: 'scale(0.3)', opacity: '0' },
                    '50%': { transform: 'scale(1.05)' },
                    '70%': { transform: 'scale(0.9)' },
                    '100%': { transform: 'scale(1)', opacity: '1' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' }
                }
            }
        }
    }
};

// Initialize Tailwind config if available
if (typeof tailwind !== 'undefined') {
    tailwind.config = tailwindConfig;
}

// Utility functions
const Utils = {
    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    // Generate unique ID
    generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Local storage helpers
    storage: {
        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (error) {
                console.error('Error reading from localStorage:', error);
                return defaultValue;
            }
        },

        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.error('Error writing to localStorage:', error);
                return false;
            }
        },

        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (error) {
                console.error('Error removing from localStorage:', error);
                return false;
            }
        },

        clear() {
            try {
                localStorage.clear();
                return true;
            } catch (error) {
                console.error('Error clearing localStorage:', error);
                return false;
            }
        }
    },

    // Animation helpers
    animation: {
        fadeIn(element, duration = 300) {
            element.style.opacity = '0';
            element.style.display = 'block';
            
            const fadeEffect = setInterval(() => {
                if (!element.style.opacity) {
                    element.style.opacity = 0;
                }
                if (element.style.opacity < 1) {
                    element.style.opacity = parseFloat(element.style.opacity) + 0.1;
                } else {
                    clearInterval(fadeEffect);
                }
            }, duration / 10);
        },

        fadeOut(element, duration = 300) {
            const fadeEffect = setInterval(() => {
                if (!element.style.opacity) {
                    element.style.opacity = 1;
                }
                if (element.style.opacity > 0) {
                    element.style.opacity = parseFloat(element.style.opacity) - 0.1;
                } else {
                    clearInterval(fadeEffect);
                    element.style.display = 'none';
                }
            }, duration / 10);
        },

        slideIn(element, direction = 'up', duration = 300) {
            const directions = {
                up: 'translateY(50px)',
                down: 'translateY(-50px)',
                left: 'translateX(50px)',
                right: 'translateX(-50px)'
            };

            element.style.transform = directions[direction];
            element.style.opacity = '0';
            element.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
            
            setTimeout(() => {
                element.style.transform = 'translate(0, 0)';
                element.style.opacity = '1';
            }, 10);
        }
    },

    // Validation helpers
    validation: {
        isEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },

        isEmpty(value) {
            return !value || value.trim().length === 0;
        },

        isValidTodo(text) {
            return !this.isEmpty(text) && text.trim().length >= 1 && text.trim().length <= 500;
        }
    },

    // URL helpers
    url: {
        getParams() {
            return new URLSearchParams(window.location.search);
        },

        getParam(name) {
            return this.getParams().get(name);
        },

        updateParam(name, value) {
            const url = new URL(window.location);
            url.searchParams.set(name, value);
            window.history.pushState({}, '', url);
        },

        removeParam(name) {
            const url = new URL(window.location);
            url.searchParams.delete(name);
            window.history.pushState({}, '', url);
        }
    },

    // Device detection
    device: {
        isMobile() {
            return window.innerWidth <= 768;
        },

        isTablet() {
            return window.innerWidth > 768 && window.innerWidth <= 1024;
        },

        isDesktop() {
            return window.innerWidth > 1024;
        },

        isTouchDevice() {
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        }
    },

    // Theme helpers
    theme: {
        isDarkMode() {
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        },

        setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            Utils.storage.set('theme', theme);
        },

        getTheme() {
            return Utils.storage.get('theme', 'auto');
        }
    },

    // Error handling
    error: {
        log(error, context = '') {
            console.error(`[${context}] Error:`, error);
            
            // In production, you might want to send errors to a logging service
            // this.sendToLoggingService(error, context);
        },

        handle(error, userMessage = 'エラーが発生しました') {
            this.log(error, 'Handler');
            
            // Show user-friendly message
            if (window.showNotification) {
                window.showNotification(userMessage, 'error');
            } else {
                alert(userMessage);
            }
        }
    },

    // Performance helpers
    performance: {
        measure(name, fn) {
            const start = performance.now();
            const result = fn();
            const end = performance.now();
            console.log(`${name} took ${end - start} milliseconds`);
            return result;
        },

        measureAsync(name, fn) {
            const start = performance.now();
            return fn().then(result => {
                const end = performance.now();
                console.log(`${name} took ${end - start} milliseconds`);
                return result;
            });
        }
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}

// Global assignment
window.Utils = Utils;