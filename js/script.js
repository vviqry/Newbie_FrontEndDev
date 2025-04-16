/**
 * JavaScript for Strategi Mendapatkan 35 Juta Rupiah sebagai Front End Developer Pemula
 * Adds interactivity to the website
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initNavigation();
    initTimelineTabs();
    initBackToTop();
    initSectionAnimation();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            
            // Update active state
            navItems.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Update active navigation based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

/**
 * Timeline Tabs Functionality
 */
function initTimelineTabs() {
    const timelineTabs = document.querySelectorAll('.timeline-tab');
    const timelineScenarios = document.querySelectorAll('.timeline-scenario');
    
    if (timelineTabs.length && timelineScenarios.length) {
        timelineTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs and scenarios
                timelineTabs.forEach(t => t.classList.remove('active'));
                timelineScenarios.forEach(s => s.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show corresponding scenario
                const targetScenario = this.getAttribute('data-timeline');
                document.getElementById(`${targetScenario}-timeline`).classList.add('active');
            });
        });
    }
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Section Animation on Scroll
 */
function initSectionAnimation() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const sections = document.querySelectorAll('.section');
        const cards = document.querySelectorAll('.card');
        
        // Create observer for sections
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Create observer for cards
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 200); // Small delay for staggered effect
                    cardObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Set initial styles and observe sections
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            sectionObserver.observe(section);
        });
        
        // Set initial styles and observe cards
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            cardObserver.observe(card);
        });
    }
}

/**
 * Smooth Scrolling for Anchor Links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Code Highlighting (Simple Version)
 */
function highlightCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        let content = block.textContent;
        
        // Highlight keywords
        const keywords = ['function', 'return', 'if', 'else', 'for', 'while', 'var', 'let', 'const'];
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            content = content.replace(regex, `<span class="keyword">${keyword}</span>`);
        });
        
        // Highlight strings
        content = content.replace(/(["'])(.*?)\1/g, '<span class="string">$&</span>');
        
        // Highlight comments
        content = content.replace(/(\/\/.*)/g, '<span class="comment">$1</span>');
        
        // Apply highlighting
        block.innerHTML = content;
    });
}

/**
 * Add custom styles for code highlighting
 */
function addCodeHighlightStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .code-block .keyword { color: #569CD6; }
        .code-block .string { color: #CE9178; }
        .code-block .comment { color: #6A9955; }
    `;
    document.head.appendChild(style);
}

// Initialize code highlighting if needed
// highlightCodeBlocks();
// addCodeHighlightStyles();

/**
 * Form Validation (if forms are added later)
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Check required fields
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showError(field, 'Field ini wajib diisi');
                } else {
                    clearError(field);
                }
            });
            
            // Check email format
            const emailFields = form.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                if (field.value.trim() && !isValidEmail(field.value)) {
                    isValid = false;
                    showError(field, 'Format email tidak valid');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });
}

/**
 * Helper function to validate email format
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Helper function to show error message
 */
function showError(field, message) {
    // Clear any existing error
    clearError(field);
    
    // Add error class to field
    field.classList.add('error');
    
    // Create and append error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

/**
 * Helper function to clear error message
 */
function clearError(field) {
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * Dark Mode Toggle (can be implemented if needed)
 */
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (darkModeToggle) {
        // Check for saved theme preference or use OS preference
        const currentTheme = localStorage.getItem('theme') || 
                            (prefersDarkScheme.matches ? 'dark' : 'light');
        
        // Set initial theme
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            darkModeToggle.checked = true;
        }
        
        // Toggle theme when button is clicked
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

/**
 * Print Functionality
 */
function initPrintButton() {
    const printButton = document.getElementById('print-button');
    
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }
}

/**
 * Search Functionality (if needed)
 */
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const contentSections = document.querySelectorAll('.section');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (searchTerm.length < 2) {
                alert('Masukkan minimal 2 karakter untuk pencarian');
                return;
            }
            
            let resultsFound = false;
            
            // Remove existing highlights
            document.querySelectorAll('.search-highlight').forEach(el => {
                el.outerHTML = el.innerHTML;
            });
            
            // Search in content and highlight matches
            contentSections.forEach(section => {
                const textNodes = getTextNodes(section);
                
                textNodes.forEach(node => {
                    const text = node.nodeValue;
                    if (text.toLowerCase().includes(searchTerm)) {
                        resultsFound = true;
                        
                        // Highlight matching text
                        const regex = new RegExp(searchTerm, 'gi');
                        const highlightedText = text.replace(regex, match => 
                            `<span class="search-highlight">${match}</span>`);
                        
                        const tempElement = document.createElement('span');
                        tempElement.innerHTML = highlightedText;
                        
                        node.parentNode.replaceChild(tempElement, node);
                    }
                });
            });
            
            if (!resultsFound) {
                alert('Tidak ditemukan hasil untuk pencarian: ' + searchTerm);
            } else {
                // Scroll to first result
                const firstResult = document.querySelector('.search-highlight');
                if (firstResult) {
                    firstResult.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        }
    }
}

/**
 * Helper function to get all text nodes within an element
 */
function getTextNodes(element) {
    const textNodes = [];
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    let node;
    while (node = walker.nextNode()) {
        if (node.nodeValue.trim() !== '') {
            textNodes.push(node);
        }
    }
    
    return textNodes;
}

/**
 * Add custom styles for search highlighting
 */
function addSearchHighlightStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .search-highlight {
            background-color: #FFEB3B;
            color: #000;
            padding: 2px 0;
        }
    `;
    document.head.appendChild(style);
}

// Initialize additional features if needed
// initFormValidation();
// initDarkMode();
// initPrintButton();
// initSearch();
// addSearchHighlightStyles();
