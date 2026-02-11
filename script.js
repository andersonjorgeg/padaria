document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // Data Sources (Easy to Maintain)
    // =========================================

    const menuItems = [
        {
            img: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600&auto=format&fit=crop",
            title: "Croissant Francês",
            desc: "Manteiga importada e massa folhada perfeitamente crocante.",
            price: "R$ 12,00",
            colClass: "col-4"
        },
        {
            img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop",
            title: "Sourdough Clássico",
            desc: "Fermentação natural de 48h, casca rústica e miolo aerado.",
            price: "R$ 25,00",
            colClass: "col-4"
        },
        {
            img: "./img/Donuts_Gourmet.jpg",
            title: "Donuts Gourmet",
            desc: "Recheios artesanais e coberturas exclusivas da casa.",
            price: "R$ 15,00",
            colClass: "col-4"
        },
        {
            img: "https://images.unsplash.com/photo-1623334044303-241021148842?q=80&w=600&auto=format&fit=crop",
            title: "Baguete Tradicional",
            desc: "A autêntica receita francesa, crocante e dourada.",
            price: "R$ 10,00",
            colClass: "col-6"
        },
        {
            img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=600&auto=format&fit=crop",
            title: "Bolo Belga",
            desc: "Chocolate 70% cacau, intenso e macio.",
            price: "R$ 18,00",
            colClass: "col-6"
        }
    ];

    const testimonials = [
        {
            text: "A melhor padaria da cidade! O pão de fermentação natural é simplesmente divino. Atendimento impecável.",
            img: "https://randomuser.me/api/portraits/women/44.jpg",
            name: "Maria Silva",
            role: "Cliente Fiel"
        },
        {
            text: "Ambiente super aconchegante e produtos de altíssima qualidade. O croissant me transportou de volta a Paris!",
            img: "https://randomuser.me/api/portraits/men/32.jpg",
            name: "João Santos",
            role: "Chef de Cozinha"
        },
        {
            text: "Encomendei o bolo de aniversário da minha filha aqui e foi um sucesso. Todos elogiaram o sabor e a apresentação.",
            img: "https://randomuser.me/api/portraits/women/68.jpg",
            name: "Ana Paula",
            role: "Mãe e Empresária"
        },
        {
            text: "O café da manhã aqui é a melhor forma de começar o dia. O pão de queijo é viciante!",
            img: "https://randomuser.me/api/portraits/men/85.jpg",
            name: "Carlos Eduardo",
            role: "Advogado"
        },
        {
            text: "Produtos frescos e saborosos. A baguete tradicional é crocante por fora e macia por dentro, perfeita.",
            img: "https://randomuser.me/api/portraits/women/22.jpg",
            name: "Fernanda Lima",
            role: "Designer"
        }
    ];

    // =========================================
    // Dynamic Rendering
    // =========================================

    const renderMenu = () => {
        const menuContainer = document.querySelector('.menu-grid');
        if (!menuContainer) return;

        menuContainer.innerHTML = menuItems.map((item, index) => `
            <div class="${item.colClass} menu-item fade-in-up" style="transition-delay: ${index * 0.1}s">
                <div class="menu-img">
                    <img src="${item.img}" alt="${item.title}">
                </div>
                <div class="menu-info">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                    <span class="price">${item.price}</span>
                </div>
            </div>
        `).join('');
    };

    const renderTestimonials = () => {
        const track = document.querySelector('.carousel-track');
        const dotsContainer = document.querySelector('.carousel-dots');
        if (!track || !dotsContainer) return;

        track.innerHTML = testimonials.map(t => `
            <div class="testimonial-slide">
                <div class="testimonial-content">
                    <p>"${t.text}"</p>
                    <div class="author">
                        <img src="${t.img}" alt="Cliente">
                        <div>
                            <span class="name">${t.name}</span>
                            <span class="role">${t.role}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        dotsContainer.innerHTML = testimonials.map((_, i) => `
            <span class="dot ${i === 0 ? 'active' : ''}" data-slide="${i}"></span>
        `).join('');
    };

    // Render content first
    renderMenu();
    renderTestimonials();

    // =========================================
    // Functionality (Logic)
    // =========================================

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.innerHTML = navMenu.classList.contains('active')
                ? '<i class="ph ph-x"></i>'
                : '<i class="ph ph-list"></i>';
        });

        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="ph ph-list"></i>';
        }));
    }

    // Sticky Navbar
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

    // Intersection Observer
    const observerOptions = { threshold: 0.15, rootMargin: "0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('stats-grid') || entry.target.querySelector('.counter')) {
                    startCounters();
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
    const statsSection = document.querySelector('.stats');
    if (statsSection) observer.observe(statsSection);

    // Number Counters
    let countersStarted = false;
    function startCounters() {
        if (countersStarted) return;
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const step = Math.ceil(target / (duration / 16));
            let current = 0;
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.innerText = current;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
        countersStarted = true;
    }

    // Carousel Logic
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.testimonial-slide'); // Re-select after render
    const dots = document.querySelectorAll('.dot'); // Re-select after render
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (track && slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        let slideInterval;

        const showSlide = (index) => {
            if (index >= totalSlides) currentSlide = 0;
            else if (index < 0) currentSlide = totalSlides - 1;
            else currentSlide = index;

            // Move track
            const amountToMove = -100 * currentSlide;
            track.style.transform = `translateX(${amountToMove}%)`;

            // Update dots
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        };

        const nextSlide = () => showSlide(currentSlide + 1);
        const prevSlide = () => showSlide(currentSlide - 1);

        const startSlideShow = () => {
            if (slideInterval) clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        };
        const stopSlideShow = () => clearInterval(slideInterval);

        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlideShow();
            startSlideShow();
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlideShow();
            startSlideShow();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                stopSlideShow();
                startSlideShow();
            });
        });

        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopSlideShow);
            carouselContainer.addEventListener('mouseleave', startSlideShow);
        }

        startSlideShow();
    }
});
