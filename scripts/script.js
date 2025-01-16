document.addEventListener('DOMContentLoaded', () => {
    // Navigation and Burger Menu
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle navigation
        nav.classList.toggle('active');
        burger.classList.toggle('active');
        
        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            burger.classList.remove('active');
        }
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections for fade-in
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-out');
        observer.observe(section);
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-item h3');
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetNumber = parseFloat(target.textContent);
                let currentNumber = 0;
                const duration = 2000; // 2 seconds
                const steps = 60;
                const increment = targetNumber / steps;
                let currentStep = 0;

                const counter = setInterval(() => {
                    currentNumber += increment;
                    currentStep++;

                    if (currentStep === steps) {
                        currentNumber = targetNumber;
                        clearInterval(counter);
                    }

                    target.textContent = Math.round(currentNumber) + 
                        (target.textContent.includes('%') ? '%' : '+');
                }, duration / steps);

                observer.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Form validation and handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Form is already being handled by FormSubmit
            // Add any additional validation here if needed
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            let isValid = true;
            let errorMessage = '';

            if (name.length < 2) {
                isValid = false;
                errorMessage += 'Name must be at least 2 characters long.\n';
            }

            if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
            }

            if (message.length < 10) {
                isValid = false;
                errorMessage += 'Message must be at least 10 characters long.\n';
            }

            if (!isValid) {
                e.preventDefault();
                alert(errorMessage);
            }
        });
    }

    // Add active state to navigation based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.scrollY;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const currentId = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Handle floating phone button visibility
    const floatingPhone = document.querySelector('.floating-phone');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 500) {
            // Scrolling down & past 500px - hide button
            floatingPhone.style.transform = 'translateY(100px)';
        } else {
            // Scrolling up or near top - show button
            floatingPhone.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add CSS animation class
    const style = document.createElement('style');
    style.textContent = `
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .fade-out {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});