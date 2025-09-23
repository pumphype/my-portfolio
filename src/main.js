import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    // Show loading screen
    showLoadingScreen();
    // Initialize all components
    await Promise.all([
        initializeParticles(),
        initializeSmoothScrolling(),
        initializeAnimations(),
        initializeContactForm(),
        initializeTypewriter(),
        initializeMouseEffects()
    ]);
    // Hide loading screen after everything is ready
    hideLoadingScreen();
    
    console.log('Portfolio initialized successfully!');
}

// Loading Screen
function showLoadingScreen() {
    gsap.set('#loading-screen', { display: 'flex', opacity: 1 });
}

function hideLoadingScreen() {
    gsap.to('#loading-screen', {
        opacity: 0,
        duration: 0.5,
        delay: 1,
        onComplete: () => {
            document.getElementById('loading-screen').style.display = 'none';
        }
    });
}

// Particles.js Background
function initializeParticles() {
    return new Promise((resolve) => {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: '#00e6ff' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#00e6ff',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'repulse' },
                        onclick: { enable: true, mode: 'push' },
                        resize: true
                    }
                },
                retina_detect: true
            });
        }
        resolve();
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: targetSection, offsetY: 80 },
                    ease: 'power2.inOut'
                });
            }
        });
    });
}

// Typewriter Effect
function initializeTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    const texts = ['Développeur Web & Mobile', 'Full Stack Developer', 'Software Engineer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeWriter, 500);
        } else {
            setTimeout(typeWriter, isDeleting ? 50 : 100);
        }
    }
    
    // Start typewriter after a delay
    setTimeout(typeWriter, 1000);
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
        submitButton.disabled = true;
        
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            showNotification('Message envoyé avec succès!', 'success');
            contactForm.reset();
            
        } catch (error) {
            showNotification('Erreur lors de l\'envoi du message.', 'error');
        } finally {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}"></i>
        <span>${message}</span>
    `;
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00ff88' : '#ff4444'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: bold;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notification);
    // Animate in
    gsap.fromTo(notification, 
        { x: 300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 }
    );
    // Remove after 3 seconds
    setTimeout(() => {
        gsap.to(notification, {
            x: 300,
            opacity: 0,
            duration: 0.5,
            onComplete: () => notification.remove()
        });
    }, 3000);
}

// Mouse Effects
function initializeMouseEffects() {
    const mouseTrail = document.getElementById('mouse-trail');
    // Mouse trail effect
    window.addEventListener('mousemove', (e) => {
        gsap.to(mouseTrail, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    // Mouse enter/leave effects on elements
    const interactiveElements = document.querySelectorAll('.project-card, .skill-card, .btn');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(mouseTrail, {
                scale: 2,
                backgroundColor: '#00ff88',
                duration: 0.3
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(mouseTrail, {
                scale: 1,
                backgroundColor: '#00e6ff',
                duration: 0.3
            });
        });
    });
}

// Animations
function initializeAnimations() {
    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out'
                });
            }
        });
    }, { threshold: 0.1 });
    // Set initial states
    gsap.set(sections, { opacity: 0, y: 50 });
    sections.forEach(section => {
        observer.observe(section);
    });
    // Hero section animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        gsap.from('.hero-content > *', {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.2,
            delay: 0.5
        });
    }
    
    // 3D hover effects
    const cards = document.querySelectorAll('.project-card, .skill-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 10;
            const rotateX = (centerY - y) / 10;
            
            gsap.to(card, {
                rotationY: rotateY,
                rotationX: rotateX,
                transformPerspective: 1000,
                ease: 'power2.out',
                duration: 0.5
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationY: 0,
                rotationX: 0,
                ease: 'elastic.out(1, 0.5)',
                duration: 1
            });
        });
    });
}

// Add CSS for notifications
const notificationStyles = `
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: bold;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        color: white;
    }
    
    .notification.success {
        background: #00ff88;
    }
    
    .notification.error {
        background: #ff4444;
    }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);