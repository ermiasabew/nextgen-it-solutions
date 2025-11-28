// Load website data from localStorage if available
let websiteData = null;
if (localStorage.getItem('websiteData')) {
    websiteData = JSON.parse(localStorage.getItem('websiteData'));
    updateWebsiteContent();
}

function updateWebsiteContent() {
    if (!websiteData) return;
    
    // Update Hero
    if (websiteData.hero) {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroBtn = document.querySelector('.hero .btn-primary');
        if (heroTitle) heroTitle.textContent = websiteData.hero.title;
        if (heroSubtitle) heroSubtitle.textContent = websiteData.hero.subtitle;
        if (heroBtn) {
            heroBtn.textContent = websiteData.hero.buttonText;
            heroBtn.href = websiteData.hero.buttonLink;
        }
    }
    
    // Update About
    if (websiteData.about) {
        const aboutTitle = document.querySelector('.about .section-header h2');
        const aboutSubtitle = document.querySelector('.about .section-header p');
        const aboutParas = document.querySelectorAll('.about-text p');
        if (aboutTitle) aboutTitle.textContent = websiteData.about.title;
        if (aboutSubtitle) aboutSubtitle.textContent = websiteData.about.subtitle;
        if (aboutParas[0]) aboutParas[0].textContent = websiteData.about.para1;
        if (aboutParas[1]) aboutParas[1].textContent = websiteData.about.para2;
    }
    
    // Update Contact
    if (websiteData.contact) {
        const contactItems = document.querySelectorAll('.contact-item p');
        if (contactItems[0]) contactItems[0].textContent = websiteData.contact.phone;
        if (contactItems[1]) contactItems[1].textContent = websiteData.contact.whatsapp;
        if (contactItems[2]) contactItems[2].textContent = websiteData.contact.email;
        if (contactItems[3]) contactItems[3].innerHTML = websiteData.contact.location.replace(/\n/g, '<br>');
    }
    
    // Update Settings
    if (websiteData.settings) {
        document.title = websiteData.settings.websiteTitle;
        const metaDesc = document.querySelector('meta[name="description"]');
        const metaKeys = document.querySelector('meta[name="keywords"]');
        if (metaDesc) metaDesc.content = websiteData.settings.metaDescription;
        if (metaKeys) metaKeys.content = websiteData.settings.metaKeywords;
        
        // Update company name in logo and footer
        const logoSpan = document.querySelector('.logo span');
        if (logoSpan) logoSpan.textContent = websiteData.settings.companyName;
        const footerH3 = document.querySelector('.footer-section h3');
        if (footerH3) footerH3.innerHTML = `<i class="fas fa-microchip"></i> ${websiteData.settings.companyName}`;
    }
}

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// File preview functionality
const fileInput = document.getElementById('attachments');
const filePreview = document.getElementById('filePreview');
let selectedFiles = [];

if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        selectedFiles = files;
        displayFilePreview(files);
    });
}

function displayFilePreview(files) {
    filePreview.innerHTML = '';
    
    files.forEach((file, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'file-preview-item';
        
        const fileType = file.type.split('/')[0];
        
        if (fileType === 'image') {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            previewItem.appendChild(img);
        } else if (fileType === 'video') {
            const video = document.createElement('video');
            video.src = URL.createObjectURL(file);
            video.controls = false;
            previewItem.appendChild(video);
        } else {
            const icon = document.createElement('i');
            icon.className = 'fas fa-file-alt';
            previewItem.appendChild(icon);
        }
        
        const fileName = document.createElement('div');
        fileName.className = 'file-name';
        fileName.textContent = file.name.length > 15 ? file.name.substring(0, 12) + '...' : file.name;
        previewItem.appendChild(fileName);
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-file';
        removeBtn.innerHTML = '×';
        removeBtn.onclick = (e) => {
            e.preventDefault();
            removeFile(index);
        };
        previewItem.appendChild(removeBtn);
        
        filePreview.appendChild(previewItem);
    });
}

function removeFile(index) {
    selectedFiles.splice(index, 1);
    
    // Update file input
    const dt = new DataTransfer();
    selectedFiles.forEach(file => dt.items.add(file));
    fileInput.files = dt.files;
    
    displayFilePreview(selectedFiles);
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    console.log('📤 Submitting contact form...');
    
    // Disable submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    try {
        // Create FormData object
        const formData = new FormData(contactForm);
        
        // Check if we're on localhost
        const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:3000/api/contact/submit'
            : '/api/contact/submit';
        
        console.log('🌐 Sending to:', apiUrl);
        
        // Send to server
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData
        });
        
        console.log('📡 Response status:', response.status);
        console.log('📡 Response headers:', response.headers.get('content-type'));
        
        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('❌ Non-JSON response:', text);
            throw new Error('Server returned non-JSON response. Check server logs.');
        }
        
        const data = await response.json();
        console.log('📦 Response data:', data);
        
        if (data.success) {
            console.log('✅ Message sent successfully! ID:', data.id);
            const name = formData.get('name');
            alert(`Thank you, ${name}! Your message has been received. We'll contact you soon!`);
            contactForm.reset();
            filePreview.innerHTML = '';
            selectedFiles = [];
        } else {
            console.error('❌ Server returned error:', data.message);
            alert('Error: ' + data.message);
        }
    } catch (error) {
        console.error('❌ Error submitting form:', error);
        alert(`Error: Could not send message. Please make sure you're accessing the site through http://localhost:3000\n\nError details: ${error.message}`);
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
});

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards, expertise items, and why items
document.querySelectorAll('.service-card, .expertise-item, .why-item, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Helper function to extract YouTube video ID
function getYouTubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Helper function to extract Vimeo video ID
function getVimeoVideoId(url) {
    const regExp = /vimeo.*\/(\d+)/i;
    const match = url.match(regExp);
    return match ? match[1] : null;
}

// Function to create video element for testimonial
function createTestimonialVideo(videoType, videoUrl) {
    if (!videoType || videoType === 'none' || !videoUrl) return '';
    
    let videoHTML = '';
    
    if (videoType === 'youtube') {
        const videoId = getYouTubeVideoId(videoUrl);
        if (videoId) {
            videoHTML = `
                <div class="testimonial-video">
                    <iframe src="https://www.youtube.com/embed/${videoId}" 
                            allowfullscreen 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                    </iframe>
                </div>
            `;
        }
    } else if (videoType === 'vimeo') {
        const videoId = getVimeoVideoId(videoUrl);
        if (videoId) {
            videoHTML = `
                <div class="testimonial-video">
                    <iframe src="https://player.vimeo.com/video/${videoId}" 
                            allowfullscreen 
                            allow="autoplay; fullscreen; picture-in-picture">
                    </iframe>
                </div>
            `;
        }
    } else if (videoType === 'direct') {
        videoHTML = `
            <div class="testimonial-video">
                <video controls>
                    <source src="${videoUrl}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        `;
    }
    
    return videoHTML;
}

// Load testimonials from API if available
async function loadTestimonials() {
    try {
        const response = await fetch('/api/testimonials');
        const data = await response.json();
        
        if (data.success && data.testimonials && data.testimonials.length > 0) {
            renderTestimonials(data.testimonials);
        }
    } catch (error) {
        console.log('Using default testimonials');
    }
}

// Render testimonials on the page
function renderTestimonials(testimonials) {
    const grid = document.getElementById('testimonialsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    testimonials.forEach(testimonial => {
        const card = document.createElement('div');
        card.className = 'testimonial-card' + (testimonial.video_url ? ' has-video' : '');
        
        const stars = '<i class="fas fa-star"></i>'.repeat(testimonial.rating || 5);
        const videoHTML = createTestimonialVideo(testimonial.video_type, testimonial.video_url);
        
        card.innerHTML = `
            ${videoHTML}
            <div class="stars">${stars}</div>
            <p>"${testimonial.text}"</p>
            <div class="testimonial-author">
                <h4>${testimonial.name}</h4>
                <span>${testimonial.position}</span>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Load social media links
async function loadSocialLinks() {
    try {
        const response = await fetch('/api/social-media');
        const data = await response.json();
        
        if (data.success && data.socials) {
            renderSocialLinks(data.socials);
        }
    } catch (error) {
        console.log('Using default social links');
    }
}

function renderSocialLinks(socials) {
    const container = document.getElementById('socialLinks');
    if (!container) return;
    
    const platformIcons = {
        facebook: 'fa-facebook',
        twitter: 'fa-twitter',
        linkedin: 'fa-linkedin',
        instagram: 'fa-instagram',
        telegram: 'fa-telegram',
        youtube: 'fa-youtube',
        tiktok: 'fa-tiktok',
        whatsapp: 'fa-whatsapp',
        github: 'fa-github'
    };
    
    container.innerHTML = '';
    
    socials.filter(s => s.enabled).forEach(social => {
        const icon = platformIcons[social.platform] || 'fa-link';
        const link = document.createElement('a');
        link.href = social.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.innerHTML = `<i class="fab ${icon}"></i>`;
        link.title = social.platform.charAt(0).toUpperCase() + social.platform.slice(1);
        container.appendChild(link);
    });
}

// Load testimonials when page loads
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    loadTestimonials();
    loadSocialLinks();
}
