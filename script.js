// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeNavigation();
    initializeMobileMenu();
    initializePublicationExpansion();
    initializeTopicFilters();
    initializeContactButtons();
    initializeProfileImage();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page');
            
            // Update active nav link
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Update active page
            pages.forEach(page => page.classList.remove('active'));
            const targetPageElement = document.getElementById(targetPage);
            if (targetPageElement) {
                targetPageElement.classList.add('active');
            }
            
            // Update URL hash
            window.history.pushState(null, null, `#${targetPage}`);
            
            // Close mobile menu if open
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.remove('active');
        });
    });
    
    // Handle initial page load based on URL hash
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        const targetLink = document.querySelector(`[data-page="${hash}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
        }
    });
}

// Publication expansion functionality
function initializePublicationExpansion() {
    const publications = document.querySelectorAll('.publication-item.expandable');
    
    publications.forEach(publication => {
        publication.addEventListener('click', function(e) {
            // Don't expand if clicking on a link
            if (e.target.closest('.link-btn')) {
                return;
            }
            
            // Toggle expanded state
            this.classList.toggle('expanded');
            
            // Update expand icon
            const icon = this.querySelector('.expand-icon');
            if (this.classList.contains('expanded')) {
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            } else {
                icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            }
        });
    });
}

// Topic filters functionality
function initializeTopicFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const topicCards = document.querySelectorAll('.topic-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active category button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter topics
            topicCards.forEach(card => {
                const level = card.getAttribute('data-level');
                if (category === 'all' || level === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Contact button functionality
function initializeContactButtons() {
    const contactButtons = document.querySelectorAll('.contact-btn:not(:disabled)');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the topic title
            const topicCard = this.closest('.topic-card');
            const topicTitle = topicCard.querySelector('h3').textContent;
            
            // Create email subject and body
            const subject = encodeURIComponent(`Interest in: ${topicTitle}`);
            const body = encodeURIComponent(`Dear Johannes,

I am interested in the thesis topic "${topicTitle}" and would like to learn more about it.

Please find my CV and transcript attached. I am available for a discussion at your convenience.

Best regards,
[Your Name]`);
            
            // Open email client
            window.location.href = `mailto:kirmayrj@gmail.com?subject=${subject}&body=${body}`;
        });
    });
}

// Profile image functionality
function initializeProfileImage() {
    const profileImg = document.getElementById('profile-img');
    
    // Handle missing profile image
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            // Create a placeholder with initials
            const placeholder = document.createElement('div');
            placeholder.className = 'profile-placeholder';
            placeholder.innerHTML = 'JK';
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                font-weight: 700;
                color: white;
            `;
            
            this.parentNode.replaceChild(placeholder, this);
        });
    }
}

// Smooth scrolling utility
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Animation utilities
function fadeInElement(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
    
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 100);
}

// Intersection Observer for animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.card, .publication-item, .topic-card, .timeline-item').forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .card, .publication-item, .topic-card, .timeline-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize scroll animations after a short delay
    setTimeout(initializeScrollAnimations, 500);
});

// Print functionality
function printPage() {
    window.print();
}

// Export functionality for publications
function exportPublications() {
    const publications = document.querySelectorAll('.publication-item:not([style*="display: none"])');
    let exportText = 'Publications\n\n';
    
    publications.forEach((pub, index) => {
        const title = pub.querySelector('h3').textContent;
        const authors = pub.querySelector('.authors').textContent;
        const venue = pub.querySelector('.venue').textContent;
        const year = pub.querySelector('.publication-year').textContent;
        
        exportText += `${index + 1}. ${title}\n`;
        exportText += `   ${authors}\n`;
        exportText += `   ${venue} (${year})\n\n`;
    });
    
    // Create and download file
    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'johannes_kirmayr_publications.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.remove('active');
    }
    
    // Arrow keys for navigation
    if (e.altKey) {
        const currentActive = document.querySelector('.nav-link.active');
        const navLinks = Array.from(document.querySelectorAll('.nav-link'));
        const currentIndex = navLinks.indexOf(currentActive);
        
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            navLinks[currentIndex - 1].click();
        } else if (e.key === 'ArrowRight' && currentIndex < navLinks.length - 1) {
            navLinks[currentIndex + 1].click();
        }
    }
});

// Theme preference handling
function initializeTheme() {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (prefersDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // Listen for theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
}

// Performance optimization
function initializePerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializePerformanceOptimizations();
}); 