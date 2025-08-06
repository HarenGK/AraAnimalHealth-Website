// Gallery Slider Functionality
let slideIndex = 1;

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    showSlide(slideIndex);
    initializeNavigation();
    initializeScrollEffects();
});

// Gallery slider functions
function changeSlide(n) {
    showSlide(slideIndex += n);
}

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    const slides = document.getElementsByClassName('gallery-slide');
    const dots = document.getElementsByClassName('dot');
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    // Show current slide and activate corresponding dot
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

// Auto-play gallery (optional)
function autoSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

// Auto-play every 5 seconds
setInterval(autoSlide, 5000);

// Mobile Navigation Toggle
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
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

// Initialize scroll effects and animations
function initializeScrollEffects() {
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Initialize team bubble animations
    initializeTeamBubbles();
}

// Team bubble animation system
function initializeTeamBubbles() {
    const teamBubbles = document.querySelectorAll('.team-bubble');
    
    // Intersection Observer for team bubbles
    const bubbleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bubble = entry.target;
                const delay = parseInt(bubble.dataset.delay) || 0;
                
                setTimeout(() => {
                    bubble.classList.add('animate');
                    // Add a ripple effect
                    createRippleEffect(bubble);
                }, delay);
                
                bubbleObserver.unobserve(bubble);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    teamBubbles.forEach(bubble => {
        bubbleObserver.observe(bubble);
        
        // Add click interaction
        bubble.addEventListener('click', function() {
            createClickEffect(this);
        });
        
        // Add hover sound effect simulation
        bubble.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        bubble.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Create ripple effect for bubbles
function createRippleEffect(bubble) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%);
        transform: scale(0);
        animation: ripple 0.8s linear;
        pointer-events: none;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        margin-top: -50px;
        margin-left: -50px;
        z-index: 1;
    `;
    
    bubble.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 800);
}

// Create click effect for bubbles
function createClickEffect(bubble) {
    bubble.style.transform = 'translateY(-5px) scale(0.98)';
    
    setTimeout(() => {
        bubble.style.transform = 'translateY(-10px) scale(1.02)';
    }, 150);
    
    // Create multiple sparkles
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createSparkle(bubble);
        }, i * 100);
    }
}

// Create sparkle effects
function createSparkle(element) {
    const sparkle = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const x = Math.random() * rect.width;
    const y = Math.random() * rect.height;
    
    sparkle.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 6px;
        height: 6px;
        background: linear-gradient(45deg, #EC4899, #8B5CF6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10;
        animation: sparkleAnim 1s ease-out forwards;
    `;
    
    element.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add CSS animations via JavaScript
const teamAnimations = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

@keyframes sparkleAnim {
    0% {
        transform: translateY(0) scale(0) rotate(0deg);
        opacity: 1;
    }
    50% {
        transform: translateY(-30px) scale(1) rotate(180deg);
        opacity: 0.8;
    }
    100% {
        transform: translateY(-60px) scale(0) rotate(360deg);
        opacity: 0;
    }
}

.team-bubble {
    cursor: pointer;
}

.team-bubble:active {
    transform: translateY(-5px) scale(0.98) !important;
}
`;

// Inject team animations CSS
const teamStyle = document.createElement('style');
teamStyle.textContent = teamAnimations;
document.head.appendChild(teamStyle);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.service-card, .team-member, .review-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form validation and interaction (if forms are added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// WhatsApp button interaction
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add analytics tracking here if needed
            console.log('WhatsApp button clicked');
        });
    });
});

// Gallery touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.querySelector('.gallery-container');
    
    if (galleryContainer) {
        galleryContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        galleryContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe right - previous slide
            changeSlide(-1);
        } else {
            // Swipe left - next slide
            changeSlide(1);
        }
    }
}

// Keyboard navigation for gallery
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Performance optimization - Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Scroll to top functionality
function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 120px;
        right: 40px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #EC4899, #8B5CF6);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 99;
        box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
    `;

    document.body.appendChild(scrollButton);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });

    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Service card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Enhanced accessibility features
document.addEventListener('DOMContentLoaded', function() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #8B5CF6;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add ARIA labels and roles where needed
    const gallerySlider = document.querySelector('.gallery-slider');
    if (gallerySlider) {
        gallerySlider.setAttribute('role', 'region');
        gallerySlider.setAttribute('aria-label', 'Image gallery');
    }

    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.setAttribute('role', 'navigation');
        navMenu.setAttribute('aria-label', 'Main navigation');
    }
});

// Error handling for external resources
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.log('Image failed to load:', e.target.src);
        // Could implement fallback image here
    }
});

// Analytics and tracking (placeholder for future implementation)
function trackEvent(eventName, eventData) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, eventData);
    
    // Example: Google Analytics 4
    // gtag('event', eventName, eventData);
    
    // Example: Facebook Pixel
    // fbq('track', eventName, eventData);
}

// Track important user interactions
document.addEventListener('DOMContentLoaded', function() {
    // Track WhatsApp button clicks
    document.querySelectorAll('a[href*="wa.me"]').forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('whatsapp_click', {
                button_location: this.closest('section')?.id || 'unknown'
            });
        });
    });

    // Track social media link clicks
    document.querySelectorAll('a[href*="facebook.com"], a[href*="instagram.com"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('social_click', {
                platform: this.href.includes('facebook') ? 'facebook' : 'instagram',
                location: this.closest('section')?.id || 'footer'
            });
        });
    });

    // Enhanced review button interactions
    initializeReviewSection();
});

// Enhanced Review Section Functionality
function initializeReviewSection() {
    const reviewButtons = document.querySelectorAll('.primary-review-button, .secondary-review-button');
    
    reviewButtons.forEach(button => {
        // Add click tracking
        button.addEventListener('click', function(e) {
            const platform = this.classList.contains('primary-review-button') ? 'google' : 'facebook';
            trackEvent('review_button_click', {
                platform: platform,
                section: 'reviews'
            });

            // Add visual feedback
            this.style.transform = 'translateY(-3px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
            }, 150);
        });

        // Add hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Animate review stars on scroll
    const reviewSection = document.querySelector('.leave-review-section');
    if (reviewSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateReviewStars();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(reviewSection);
    }
}

// Animate stars in the review section
function animateReviewStars() {
    const stars = document.querySelectorAll('.review-icon i');
    stars.forEach((star, index) => {
        setTimeout(() => {
            star.style.animation = 'none';
            star.offsetHeight; // Trigger reflow
            star.style.animation = 'starBounce 0.6s ease-out';
        }, index * 100);
    });
}

// Add CSS animation for stars (this will be added via JavaScript)
const starAnimation = `
@keyframes starBounce {
    0% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.3) rotate(5deg); color: #FFD700; }
    100% { transform: scale(1) rotate(0deg); }
}
`;

// Inject the star animation CSS
const style = document.createElement('style');
style.textContent = starAnimation;
document.head.appendChild(style);

// Add review section entrance animation
document.addEventListener('DOMContentLoaded', function() {
    const reviewCta = document.querySelector('.review-cta-container');
    if (reviewCta) {
        reviewCta.style.opacity = '0';
        reviewCta.style.transform = 'translateY(50px)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });

        observer.observe(reviewCta);
    }
});

// Add floating particles effect to review section
function createFloatingParticles() {
    const reviewContainer = document.querySelector('.review-cta-container');
    if (!reviewContainer) return;

    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 4}px;
            height: ${Math.random() * 6 + 4}px;
            background: linear-gradient(45deg, #EC4899, #8B5CF6);
            border-radius: 50%;
            opacity: 0.6;
            animation: float ${Math.random() * 3 + 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            z-index: 1;
        `;
        reviewContainer.appendChild(particle);
    }
}

// CSS for floating particles
const particleAnimation = `
@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
    50% { transform: translateY(-20px) rotate(180deg); opacity: 0.3; }
}
`;

// Inject particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = particleAnimation;
document.head.appendChild(particleStyle);

// Initialize particles when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(createFloatingParticles, 1000);
    initializeServiceModals();
});

// Service Modal Functionality
function initializeServiceModals() {
    const serviceCards = document.querySelectorAll('.service-card[data-service]');
    const modal = document.getElementById('serviceModal');
    const modalClose = document.querySelector('.modal-close');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    
    // Service details data
    const serviceDetails = {
        checkups: {
            title: "General Check-ups",
            icon: "fas fa-stethoscope",
            description: "Comprehensive health examinations to maintain your pet's wellbeing and catch any potential issues early.",
            features: [
                "Complete physical examination",
                "Weight and vital signs monitoring",
                "Behavioral assessment",
                "Health record updates",
                "Preventive care recommendations",
                "Suitable for cats, dogs, rabbits, guinea pigs, hamsters, birds & more"
            ],
            duration: "Typical appointment duration: 30-45 minutes",
            pricing: "Contact us for current pricing information"
        },
        vaccinations: {
            title: "Vaccinations",
            icon: "fas fa-syringe",
            description: "Keep your pets protected with our comprehensive vaccination programs tailored to their specific needs and lifestyle.",
            features: [
                "Core vaccination packages",
                "Non-core vaccines based on lifestyle",
                "Puppy and kitten vaccination series",
                "Annual booster schedules",
                "Travel vaccination certificates",
                "Vaccination record maintenance"
            ],
            duration: "Typical appointment duration: 15-30 minutes",
            pricing: "Package deals available - contact for details"
        },
        surgery: {
            title: "Surgery",
            icon: "fas fa-user-md",
            description: "Advanced surgical procedures performed by experienced veterinarians using modern equipment and techniques.",
            features: [
                "Spaying and neutering",
                "Soft tissue surgery",
                "Dental surgery",
                "Emergency surgical procedures",
                "Pre-surgical consultation",
                "Post-operative care instructions"
            ],
            duration: "Duration varies by procedure",
            pricing: "Pricing varies by procedure complexity"
        },
        grooming: {
            title: "Grooming",
            icon: "fas fa-cut",
            description: "Professional grooming services to keep your cats and dogs looking and feeling their absolute best.",
            features: [
                "Full grooming packages",
                "Nail trimming",
                "Ear cleaning",
                "Bath and blow dry",
                "Coat trimming and styling",
                "Specialized shampoos for skin conditions"
            ],
            duration: "Typical session: 1-3 hours depending on service",
            pricing: "Packages starting from competitive rates"
        },
        diagnostics: {
            title: "Diagnostics",
            icon: "fas fa-x-ray",
            description: "State-of-the-art diagnostic equipment for accurate health assessments and early disease detection.",
            features: [
                "Digital X-ray imaging",
                "Blood chemistry panels",
                "Urinalysis",
                "Fecal examinations",
                "Skin scrapings",
                "Microscopic examinations"
            ],
            duration: "Results typically available within 24-48 hours",
            pricing: "Diagnostic packages available"
        },
        boarding: {
            title: "Pet Boarding",
            icon: "fas fa-paw",
            description: "Safe and comfortable boarding facilities for your pets when you need to travel or be away.",
            features: [
                "Climate-controlled facilities",
                "Individual accommodation",
                "Regular exercise and playtime",
                "Medication administration if needed",
                "Daily health monitoring",
                "Special dietary requirements accommodated"
            ],
            duration: "Daily, weekly, and extended stay options",
            pricing: "Competitive daily rates with package discounts"
        },
        housecalls: {
            title: "House Calls",
            icon: "fas fa-ambulance",
            description: "Bringing professional veterinary care to the comfort of your home for your pet's convenience and reduced stress.",
            features: [
                "In-home consultations",
                "Basic examinations",
                "Vaccination services",
                "Health checks for elderly or anxious pets",
                "Follow-up care",
                "Convenient scheduling"
            ],
            duration: "By appointment - typically 45-60 minutes",
            pricing: "Service fees include travel - contact for rates"
        },
        dental: {
            title: "Dental Scaling",
            icon: "fas fa-tooth",
            description: "Professional dental care to keep your pet's teeth healthy and clean, preventing dental disease and discomfort.",
            features: [
                "Complete dental examination",
                "Ultrasonic scaling",
                "Polishing",
                "Dental X-rays if needed",
                "Extraction of damaged teeth",
                "Post-procedure care instructions"
            ],
            duration: "Procedure time: 1-2 hours under anesthesia",
            pricing: "Includes pre-anesthetic blood work"
        },
        bloodscreening: {
            title: "Blood Screening",
            icon: "fas fa-vial",
            description: "Comprehensive blood tests to monitor your pet's health and detect potential issues before symptoms appear.",
            features: [
                "Complete blood count (CBC)",
                "Blood chemistry panel",
                "Liver and kidney function tests",
                "Thyroid function testing",
                "Pre-surgical screening",
                "Senior pet wellness panels"
            ],
            duration: "Results available within 24-48 hours",
            pricing: "Various panel options available"
        }
    };
    
    // Add click event listeners to service cards
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            const service = serviceDetails[serviceType];
            
            if (service) {
                showServiceModal(service);
            }
        });
    });
    
    // Close modal event listeners
    modalClose.addEventListener('click', closeServiceModal);
    modalCloseBtn.addEventListener('click', closeServiceModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeServiceModal();
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeServiceModal();
        }
    });
    
    function showServiceModal(service) {
        // Populate modal content
        document.getElementById('modalTitle').textContent = service.title;
        document.getElementById('modalIcon').className = service.icon;
        
        // Create description HTML
        const descriptionHTML = `<p>${service.description}</p>`;
        document.getElementById('modalDescription').innerHTML = descriptionHTML;
        
        // Create features list
        const featuresHTML = service.features.map(feature => `<li>${feature}</li>`).join('');
        document.getElementById('modalFeatures').innerHTML = featuresHTML;
        
        // Set pricing and duration
        document.getElementById('modalPricing').innerHTML = `
            <h4>Pricing</h4>
            <p>${service.pricing}</p>
        `;
        
        document.getElementById('modalDuration').textContent = service.duration;
        
        // Show modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    function closeServiceModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Re-enable background scrolling
    }
}
