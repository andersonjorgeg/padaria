document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // Mobile Menu Toggle
    // =========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.innerHTML = navMenu.classList.contains('active')
                ? '<i class="ph ph-x"></i>'
                : '<i class="ph ph-list"></i>';
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="ph ph-list"></i>';
        }));
    }

    // =========================================
    // Sticky Navbar Styling
    // =========================================
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // =========================================
    // Scroll Animations (Intersection Observer)
    // =========================================
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // If the entry is a counter section, triggers the counter animation
                if (entry.target.classList.contains('stats-grid') || entry.target.querySelector('.counter')) {
                    startCounters();
                }

                // Optional: Stop observing after it appears once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });

    // Also observe stats grid specifically for counters if not already observed
    const statsSection = document.querySelector('.stats');
    if (statsSection) observer.observe(statsSection);


    // =========================================
    // Number Counters Animation
    // =========================================
    let countersStarted = false;

    function startCounters() {
        if (countersStarted) return;

        const counters = document.querySelectorAll('.counter');

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // Animation duration in ms
            const step = Math.ceil(target / (duration / 16)); // 60fps

            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.innerText = current;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                    // Add '+' symbol if needed manually or via CSS
                }
            };

            updateCounter();
        });

        countersStarted = true;
    }

    // =========================================
    // Testimonial Carousel
    // =========================================
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (track && slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        let slideInterval;

        // Function to show specific slide
        const showSlide = (index) => {
            // Handle index bounds (circular)
            if (index >= totalSlides) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = totalSlides - 1;
            } else {
                currentSlide = index;
            }

            // Move the track
            const amountToMove = -100 * currentSlide;
            track.style.transform = `translateX(${amountToMove}%)`;

            // Update dots
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        };

        // Next Slide
        const nextSlide = () => {
            showSlide(currentSlide + 1);
        };

        // Prev Slide
        const prevSlide = () => {
            showSlide(currentSlide - 1);
        };

        // Auto Play
        const startSlideShow = () => {
            // Clear any existing interval to avoid multiple intervals
            if (slideInterval) clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000); // Change every 5 seconds
        };

        const stopSlideShow = () => {
            clearInterval(slideInterval);
        };

        // Event Listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopSlideShow();
                startSlideShow();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopSlideShow();
                startSlideShow();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                stopSlideShow();
                startSlideShow();
            });
        });

        // Pause on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopSlideShow);
            carouselContainer.addEventListener('mouseleave', startSlideShow);
        }

        // Initialize
        startSlideShow();
    }

});
