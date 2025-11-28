// Default admin credentials
let adminCredentials = {
    username: 'admin',
    password: 'admin123'
};

// Load credentials from localStorage if available
if (localStorage.getItem('adminCredentials')) {
    adminCredentials = JSON.parse(localStorage.getItem('adminCredentials'));
}

// Website data structure
let websiteData = {
    hero: {
        title: 'Empowering Businesses With Future-Ready IT Solutions',
        subtitle: 'Complete IT support, cybersecurity, AI solutions, and software services tailored for your business success',
        buttonText: 'Get Support Now',
        buttonLink: '#contact'
    },
    about: {
        title: 'About NextGen IT Solutions',
        subtitle: 'Your Trusted Partner in Digital Transformation',
        para1: 'NextGen IT Solutions is a modern IT support and consulting company dedicated to empowering businesses with cutting-edge technology solutions. We combine technical expertise with innovative approaches to deliver comprehensive IT services that drive growth and efficiency.',
        para2: 'Our team of certified professionals brings years of experience across multiple domains, ensuring your technology infrastructure operates at peak performance while staying secure and future-ready.'
    },
    services: [
        {
            icon: 'fa-laptop',
            title: 'Hardware Services',
            items: ['Device troubleshooting and repair', 'Server installation and configuration', 'Printer & peripheral support', 'Hardware upgrades and replacements']
        },
        {
            icon: 'fa-code',
            title: 'Software Services',
            items: ['Installation & configuration', 'System upgrades and patches', 'Enterprise application support', 'Software licensing management']
        },
        {
            icon: 'fa-network-wired',
            title: 'Network Solutions',
            items: ['LAN/WAN setup and optimization', 'Router & firewall configuration', 'Network monitoring and maintenance', 'Wireless network deployment']
        },
        {
            icon: 'fa-shield-alt',
            title: 'Cybersecurity',
            items: ['Threat detection & prevention', 'Vulnerability assessments', 'Endpoint security solutions', 'Security audits and compliance']
        },
        {
            icon: 'fa-brain',
            title: 'AI & Automation',
            items: ['Custom AI chatbot development', 'Workflow automation solutions', 'Data analysis and insights', 'Machine learning integration']
        },
        {
            icon: 'fa-users',
            title: 'IT Consultancy',
            items: ['IT infrastructure assessment', 'Digital transformation support', 'Technology roadmap planning', 'Cost optimization strategies']
        }
    ],
    why: [
        {
            icon: 'fa-award',
            title: 'Certified Experts',
            description: 'Our team holds industry-leading certifications and brings years of hands-on experience to every project'
        },
        {
            icon: 'fa-clock',
            title: 'Rapid Response Time',
            description: '24/7 availability with guaranteed response times to minimize downtime and keep your business running'
        },
        {
            icon: 'fa-chart-line',
            title: 'Scalable Solutions',
            description: 'Technology that grows with your business, from startups to enterprise-level organizations'
        },
        {
            icon: 'fa-handshake',
            title: 'Transparent Pricing',
            description: 'No hidden fees or surprises - clear, competitive pricing with flexible service packages'
        }
    ],
    testimonials: [
        {
            name: 'Abebe Tadesse',
            position: 'CEO, TechCorp Ethiopia',
            text: 'NextGen IT Solutions transformed our entire IT infrastructure. Their expertise in networking and cybersecurity gave us peace of mind. Highly professional team!',
            rating: 5
        },
        {
            name: 'Sara Mohammed',
            position: 'Operations Manager, RetailPlus',
            text: 'The AI automation solutions they implemented saved us countless hours. Their 24/7 support is exceptional - they\'re always there when we need them.',
            rating: 5
        },
        {
            name: 'Daniel Bekele',
            position: 'IT Director, FinanceHub',
            text: 'Outstanding service! From hardware repairs to software installations, they handle everything efficiently. Best IT support company in Addis Ababa.',
            rating: 5
        }
    ],
    faq: [
        {
            question: 'What areas do you provide IT support services?',
            answer: 'We provide comprehensive IT support services throughout Ethiopia, with our main office in Addis Ababa. We offer both on-site and remote support to ensure your business stays operational 24/7.'
        },
        {
            question: 'Do you offer 24/7 customer support?',
            answer: 'Yes! We provide round-the-clock support to ensure your business never experiences prolonged downtime. Our team is available via phone, WhatsApp, and email at any time.'
        },
        {
            question: 'What types of businesses do you work with?',
            answer: 'We work with businesses of all sizes - from small startups to large enterprises. Our scalable solutions are designed to meet the unique needs of each client, regardless of industry or company size.'
        },
        {
            question: 'How quickly can you respond to IT emergencies?',
            answer: 'For critical issues, we guarantee a response within 1 hour. Our rapid response team is equipped to handle emergencies remotely or on-site, minimizing downtime and business disruption.'
        },
        {
            question: 'Do you provide cybersecurity assessments?',
            answer: 'Absolutely! We offer comprehensive cybersecurity assessments including vulnerability scanning, penetration testing, and security audits to identify and address potential threats before they become problems.'
        },
        {
            question: 'Can you help with digital transformation initiatives?',
            answer: 'Yes! Our IT consultancy services include digital transformation support, helping you modernize your technology infrastructure, implement AI solutions, and optimize workflows for maximum efficiency.'
        }
    ],
    contact: {
        phone: '+251 911 234 567',
        whatsapp: '+251 911 234 567',
        email: 'info@nextgenit.et',
        location: 'Bole Road, Addis Ababa\nEthiopia'
    },
    settings: {
        companyName: 'NextGen IT Solutions',
        websiteTitle: 'NextGen IT Solutions - Future-Ready IT Support & Services',
        metaDescription: 'NextGen IT Solutions - Professional IT support, hardware repair, networking, cybersecurity, and AI solutions in Ethiopia. 24/7 expert support for businesses.',
        metaKeywords: 'IT support, hardware repair, networking, cybersecurity, AI solutions, Ethiopia IT services, software installation, network solutions'
    }
};

// Load data from localStorage
if (localStorage.getItem('websiteData')) {
    websiteData = JSON.parse(localStorage.getItem('websiteData'));
}

// Login functionality
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    if (username === adminCredentials.username && password === adminCredentials.password) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'flex';
        loadAllData();
    } else {
        document.getElementById('loginError').textContent = 'Invalid username or password!';
    }
});

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('adminUsername').value = '';
    document.getElementById('adminPassword').value = '';
    document.getElementById('loginError').textContent = '';
});

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.dataset.section;
        
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Update section title
        document.getElementById('sectionTitle').textContent = item.textContent.trim();
        
        // Show corresponding section
        document.querySelectorAll('.edit-section').forEach(sec => sec.classList.remove('active'));
        document.getElementById(section + 'Section').classList.add('active');
    });
});

// Load all data into forms
function loadAllData() {
    // Hero
    document.getElementById('heroTitle').value = websiteData.hero.title;
    document.getElementById('heroSubtitle').value = websiteData.hero.subtitle;
    document.getElementById('heroButton').value = websiteData.hero.buttonText;
    document.getElementById('heroButtonLink').value = websiteData.hero.buttonLink;
    
    // About
    document.getElementById('aboutTitle').value = websiteData.about.title;
    document.getElementById('aboutSubtitle').value = websiteData.about.subtitle;
    document.getElementById('aboutPara1').value = websiteData.about.para1;
    document.getElementById('aboutPara2').value = websiteData.about.para2;
    
    // Services
    renderServices();
    
    // Why Choose Us
    renderWhy();
    
    // Testimonials
    renderTestimonials();
    
    // FAQ
    renderFaq();
    
    // Contact
    document.getElementById('contactPhone').value = websiteData.contact.phone;
    document.getElementById('contactWhatsapp').value = websiteData.contact.whatsapp;
    document.getElementById('contactEmail').value = websiteData.contact.email;
    document.getElementById('contactLocation').value = websiteData.contact.location;
    
    // Settings
    document.getElementById('companyName').value = websiteData.settings.companyName;
    document.getElementById('websiteTitle').value = websiteData.settings.websiteTitle;
    document.getElementById('metaDescription').value = websiteData.settings.metaDescription;
    document.getElementById('metaKeywords').value = websiteData.settings.metaKeywords;
}

// Render Services
function renderServices() {
    const container = document.getElementById('servicesList');
    container.innerHTML = '';
    
    websiteData.services.forEach((service, index) => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'item-card';
        serviceCard.innerHTML = `
            <div class="item-header">
                <h4>${service.title}</h4>
                <button class="btn-delete" onclick="deleteService(${index})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
            <div class="form-group">
                <label>Icon Class (Font Awesome)</label>
                <input type="text" class="form-control" value="${service.icon}" onchange="updateService(${index}, 'icon', this.value)">
            </div>
            <div class="form-group">
                <label>Service Title</label>
                <input type="text" class="form-control" value="${service.title}" onchange="updateService(${index}, 'title', this.value)">
            </div>
            <div class="form-group">
                <label>Service Items (one per line)</label>
                <textarea class="form-control" rows="4" onchange="updateService(${index}, 'items', this.value.split('\\n'))">${service.items.join('\n')}</textarea>
            </div>
        `;
        container.appendChild(serviceCard);
    });
}

function updateService(index, field, value) {
    websiteData.services[index][field] = value;
}

function deleteService(index) {
    if (confirm('Are you sure you want to delete this service?')) {
        websiteData.services.splice(index, 1);
        renderServices();
    }
}

document.getElementById('addServiceBtn').addEventListener('click', () => {
    websiteData.services.push({
        icon: 'fa-cog',
        title: 'New Service',
        items: ['Item 1', 'Item 2', 'Item 3']
    });
    renderServices();
});

// Render Why Choose Us
function renderWhy() {
    const container = document.getElementById('whyList');
    container.innerHTML = '';
    
    websiteData.why.forEach((item, index) => {
        const whyCard = document.createElement('div');
        whyCard.className = 'item-card';
        whyCard.innerHTML = `
            <div class="item-header">
                <h4>${item.title}</h4>
                <button class="btn-delete" onclick="deleteWhy(${index})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
            <div class="form-group">
                <label>Icon Class</label>
                <input type="text" class="form-control" value="${item.icon}" onchange="updateWhy(${index}, 'icon', this.value)">
            </div>
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" value="${item.title}" onchange="updateWhy(${index}, 'title', this.value)">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="form-control" rows="3" onchange="updateWhy(${index}, 'description', this.value)">${item.description}</textarea>
            </div>
        `;
        container.appendChild(whyCard);
    });
}

function updateWhy(index, field, value) {
    websiteData.why[index][field] = value;
}

function deleteWhy(index) {
    if (confirm('Are you sure you want to delete this item?')) {
        websiteData.why.splice(index, 1);
        renderWhy();
    }
}

document.getElementById('addWhyBtn').addEventListener('click', () => {
    websiteData.why.push({
        icon: 'fa-star',
        title: 'New Reason',
        description: 'Description here'
    });
    renderWhy();
});

// Render Testimonials
function renderTestimonials() {
    const container = document.getElementById('testimonialsList');
    container.innerHTML = '';
    
    websiteData.testimonials.forEach((testimonial, index) => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'item-card';
        const videoType = testimonial.video_type || 'none';
        const videoUrl = testimonial.video_url || '';
        
        testimonialCard.innerHTML = `
            <div class="item-header">
                <h4>${testimonial.name}</h4>
                <button class="btn-delete" onclick="deleteTestimonial(${index})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" value="${testimonial.name}" onchange="updateTestimonial(${index}, 'name', this.value)">
            </div>
            <div class="form-group">
                <label>Position</label>
                <input type="text" class="form-control" value="${testimonial.position}" onchange="updateTestimonial(${index}, 'position', this.value)">
            </div>
            <div class="form-group">
                <label>Testimonial Text</label>
                <textarea class="form-control" rows="4" onchange="updateTestimonial(${index}, 'text', this.value)">${testimonial.text}</textarea>
            </div>
            <div class="form-group">
                <label>Rating (1-5)</label>
                <input type="number" class="form-control" min="1" max="5" value="${testimonial.rating}" onchange="updateTestimonial(${index}, 'rating', parseInt(this.value))">
            </div>
            <div class="form-group">
                <label>Video Type</label>
                <select class="form-control" onchange="updateTestimonial(${index}, 'video_type', this.value); renderTestimonials();">
                    <option value="none" ${videoType === 'none' ? 'selected' : ''}>No Video</option>
                    <option value="youtube" ${videoType === 'youtube' ? 'selected' : ''}>YouTube</option>
                    <option value="vimeo" ${videoType === 'vimeo' ? 'selected' : ''}>Vimeo</option>
                    <option value="direct" ${videoType === 'direct' ? 'selected' : ''}>Direct URL (MP4)</option>
                </select>
            </div>
            ${videoType !== 'none' ? `
                <div class="form-group">
                    <label>Video URL</label>
                    <input type="text" class="form-control" value="${videoUrl}" 
                           placeholder="${videoType === 'youtube' ? 'https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID' : 
                                       videoType === 'vimeo' ? 'https://vimeo.com/VIDEO_ID' : 
                                       'https://example.com/video.mp4'}"
                           onchange="updateTestimonial(${index}, 'video_url', this.value)">
                    <small style="color: #666; display: block; margin-top: 5px;">
                        ${videoType === 'youtube' ? '📺 Paste full YouTube URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)' : 
                          videoType === 'vimeo' ? '📺 Paste full Vimeo URL (e.g., https://vimeo.com/123456789)' : 
                          '📹 Paste direct video file URL (must be .mp4, .webm, or .ogg)'}
                    </small>
                </div>
            ` : ''}
        `;
        container.appendChild(testimonialCard);
    });
}

function updateTestimonial(index, field, value) {
    websiteData.testimonials[index][field] = value;
}

function deleteTestimonial(index) {
    if (confirm('Are you sure you want to delete this testimonial?')) {
        websiteData.testimonials.splice(index, 1);
        renderTestimonials();
    }
}

document.getElementById('addTestimonialBtn').addEventListener('click', () => {
    websiteData.testimonials.push({
        name: 'Client Name',
        position: 'Position, Company',
        text: 'Testimonial text here',
        rating: 5,
        video_type: 'none',
        video_url: ''
    });
    renderTestimonials();
});

// Render FAQ
function renderFaq() {
    const container = document.getElementById('faqList');
    container.innerHTML = '';
    
    websiteData.faq.forEach((item, index) => {
        const faqCard = document.createElement('div');
        faqCard.className = 'item-card';
        faqCard.innerHTML = `
            <div class="item-header">
                <h4>FAQ ${index + 1}</h4>
                <button class="btn-delete" onclick="deleteFaq(${index})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
            <div class="form-group">
                <label>Question</label>
                <input type="text" class="form-control" value="${item.question}" onchange="updateFaq(${index}, 'question', this.value)">
            </div>
            <div class="form-group">
                <label>Answer</label>
                <textarea class="form-control" rows="4" onchange="updateFaq(${index}, 'answer', this.value)">${item.answer}</textarea>
            </div>
        `;
        container.appendChild(faqCard);
    });
}

function updateFaq(index, field, value) {
    websiteData.faq[index][field] = value;
}

function deleteFaq(index) {
    if (confirm('Are you sure you want to delete this FAQ?')) {
        websiteData.faq.splice(index, 1);
        renderFaq();
    }
}

document.getElementById('addFaqBtn').addEventListener('click', () => {
    websiteData.faq.push({
        question: 'New Question?',
        answer: 'Answer here'
    });
    renderFaq();
});

// Save all changes
document.getElementById('saveBtn').addEventListener('click', () => {
    // Collect all data
    websiteData.hero.title = document.getElementById('heroTitle').value;
    websiteData.hero.subtitle = document.getElementById('heroSubtitle').value;
    websiteData.hero.buttonText = document.getElementById('heroButton').value;
    websiteData.hero.buttonLink = document.getElementById('heroButtonLink').value;
    
    websiteData.about.title = document.getElementById('aboutTitle').value;
    websiteData.about.subtitle = document.getElementById('aboutSubtitle').value;
    websiteData.about.para1 = document.getElementById('aboutPara1').value;
    websiteData.about.para2 = document.getElementById('aboutPara2').value;
    
    websiteData.contact.phone = document.getElementById('contactPhone').value;
    websiteData.contact.whatsapp = document.getElementById('contactWhatsapp').value;
    websiteData.contact.email = document.getElementById('contactEmail').value;
    websiteData.contact.location = document.getElementById('contactLocation').value;
    
    websiteData.settings.companyName = document.getElementById('companyName').value;
    websiteData.settings.websiteTitle = document.getElementById('websiteTitle').value;
    websiteData.settings.metaDescription = document.getElementById('metaDescription').value;
    websiteData.settings.metaKeywords = document.getElementById('metaKeywords').value;
    
    // Save to localStorage
    localStorage.setItem('websiteData', JSON.stringify(websiteData));
    
    // Generate updated HTML
    generateWebsite();
    
    // Show success toast
    showToast('Changes saved successfully!');
});

// Preview website
document.getElementById('previewBtn').addEventListener('click', () => {
    window.open('index.html', '_blank');
});

// Change password
document.getElementById('changePasswordBtn').addEventListener('click', () => {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    
    if (newUsername && newPassword) {
        adminCredentials.username = newUsername;
        adminCredentials.password = newPassword;
        localStorage.setItem('adminCredentials', JSON.stringify(adminCredentials));
        showToast('Credentials updated successfully!');
        document.getElementById('newUsername').value = '';
        document.getElementById('newPassword').value = '';
    } else {
        alert('Please enter both username and password');
    }
});

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMessage').textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Generate website HTML
function generateWebsite() {
    // This function would update the actual index.html file
    // For now, we'll just save to localStorage and the main site will read from it
    console.log('Website data saved to localStorage');
}

// Load and display contact submissions
async function loadSubmissions() {
    console.log('🔍 Loading submissions...');
    const listElement = document.getElementById('submissionsList');
    
    if (!listElement) {
        console.error('❌ submissionsList element not found!');
        return;
    }
    
    listElement.innerHTML = '<p style="text-align: center; color: #666;">Loading submissions...</p>';
    
    try {
        const response = await fetch('/api/contact/submissions');
        console.log('📡 Response status:', response.status);
        
        const data = await response.json();
        console.log('📦 Data received:', data);
        
        if (data.success && data.submissions) {
            console.log(`✅ Found ${data.submissions.length} submissions`);
            renderSubmissions(data.submissions);
        } else {
            console.log('⚠️ No submissions found');
            listElement.innerHTML = '<p style="text-align: center; color: #666;">No submissions yet.</p>';
        }
    } catch (error) {
        console.error('❌ Error loading submissions:', error);
        listElement.innerHTML = '<p style="text-align: center; color: #dc3545;">Error loading submissions. Make sure the server is running.</p>';
    }
}

function renderSubmissions(submissions) {
    console.log('🎨 Rendering submissions:', submissions.length);
    const container = document.getElementById('submissionsList');
    
    if (!container) {
        console.error('❌ Container not found!');
        return;
    }
    
    if (submissions.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">No submissions yet.</p>';
        return;
    }
    
    container.innerHTML = '';
    
    submissions.forEach((sub, index) => {
        console.log(`📝 Rendering submission #${sub.id}:`, sub.name);
        const submissionCard = document.createElement('div');
        submissionCard.className = 'item-card';
        submissionCard.style.marginBottom = '20px';
        
        const date = new Date(sub.submitted_at).toLocaleString();
        const statusColor = sub.status === 'new' ? '#28a745' : sub.status === 'read' ? '#ffc107' : '#6c757d';
        
        const attachments = sub.attachments ? JSON.parse(sub.attachments) : [];
        const attachmentsHTML = attachments.length > 0 ? `
            <p style="margin-bottom: 10px;"><strong><i class="fas fa-paperclip"></i> Attachments:</strong></p>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; margin-bottom: 15px;">
                ${attachments.map(att => {
                    const isImage = att.mimetype.startsWith('image/');
                    const isVideo = att.mimetype.startsWith('video/');
                    return `
                        <div style="background: #f5f5f5; padding: 10px; border-radius: 8px; text-align: center;">
                            ${isImage ? `<img src="/${att.path}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 5px; margin-bottom: 5px;">` : 
                              isVideo ? `<video src="/${att.path}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 5px; margin-bottom: 5px;" controls></video>` :
                              `<i class="fas fa-file-alt" style="font-size: 3rem; color: #0066cc; margin-bottom: 5px;"></i>`}
                            <div style="font-size: 0.75rem; color: #666; word-break: break-all;">
                                <a href="/${att.path}" target="_blank" style="color: #0066cc;">${att.originalname}</a>
                            </div>
                            <div style="font-size: 0.7rem; color: #999;">${(att.size / 1024).toFixed(1)} KB</div>
                        </div>
                    `;
                }).join('')}
            </div>
        ` : '';
        
        submissionCard.innerHTML = `
            <div class="item-header">
                <h4>#${sub.id} - ${sub.name}</h4>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <span style="background: ${statusColor}; color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">
                        ${sub.status.toUpperCase()}
                    </span>
                    <button class="btn-delete" onclick="deleteSubmission(${sub.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
            <div style="padding: 15px 0;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div>
                        <p style="margin-bottom: 10px;"><strong><i class="fas fa-phone"></i> Phone:</strong> ${sub.phone}</p>
                        <p style="margin-bottom: 10px;"><strong><i class="fas fa-envelope"></i> Email:</strong> ${sub.email}</p>
                        <p style="margin-bottom: 10px;"><strong><i class="fas fa-calendar"></i> Submitted:</strong> ${date}</p>
                    </div>
                    <div>
                        ${sub.service_type ? `<p style="margin-bottom: 10px;"><strong><i class="fas fa-cogs"></i> Service:</strong> ${sub.service_type}</p>` : ''}
                        ${sub.support_type ? `<p style="margin-bottom: 10px;"><strong><i class="fas fa-headset"></i> Support Type:</strong> ${sub.support_type}</p>` : ''}
                        ${sub.business_location ? `<p style="margin-bottom: 10px;"><strong><i class="fas fa-map-marker-alt"></i> Location:</strong> ${sub.business_location}</p>` : ''}
                    </div>
                </div>
                <p style="margin-bottom: 10px;"><strong><i class="fas fa-comment"></i> Message:</strong></p>
                <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; border-left: 4px solid #0066cc; margin-bottom: 15px;">
                    ${sub.message}
                </div>
                ${attachmentsHTML}
            </div>
            <div style="display: flex; gap: 10px; margin-top: 15px;">
                <button class="btn-primary" onclick="updateSubmissionStatus(${sub.id}, 'read')" style="flex: 1;">
                    <i class="fas fa-eye"></i> Mark as Read
                </button>
                <button class="btn-primary" onclick="updateSubmissionStatus(${sub.id}, 'responded')" style="flex: 1; background: #28a745;">
                    <i class="fas fa-check"></i> Mark as Responded
                </button>
            </div>
        `;
        
        container.appendChild(submissionCard);
    });
}

async function updateSubmissionStatus(id, status) {
    try {
        const response = await fetch(`/api/contact/submissions/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        
        const data = await response.json();
        if (data.success) {
            showToast('Status updated successfully!');
            loadSubmissions();
        }
    } catch (error) {
        alert('Error updating status');
    }
}

async function deleteSubmission(id) {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    
    try {
        const response = await fetch(`/api/contact/submissions/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        if (data.success) {
            showToast('Submission deleted successfully!');
            loadSubmissions();
        }
    } catch (error) {
        alert('Error deleting submission');
    }
}

// Social Media Management
let socialMediaData = [];

async function loadSocialMedia() {
    try {
        const response = await fetch('/api/social-media');
        const data = await response.json();
        
        if (data.success && data.socials) {
            socialMediaData = data.socials;
            renderSocialMedia();
        }
    } catch (error) {
        console.error('Error loading social media:', error);
    }
}

function renderSocialMedia() {
    const container = document.getElementById('socialMediaList');
    if (!container) return;
    
    container.innerHTML = '';
    
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
    
    socialMediaData.forEach((social, index) => {
        const socialCard = document.createElement('div');
        socialCard.className = 'item-card';
        const icon = platformIcons[social.platform] || 'fa-link';
        
        socialCard.innerHTML = `
            <div class="item-header">
                <h4>
                    <i class="fab ${icon}" style="color: #0066cc; margin-right: 10px;"></i>
                    ${social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}
                </h4>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <label style="display: flex; align-items: center; gap: 5px; margin: 0;">
                        <input type="checkbox" ${social.enabled ? 'checked' : ''} 
                               onchange="toggleSocial('${social.platform}', this.checked)"
                               style="width: auto; margin: 0;">
                        <span style="font-size: 0.9rem;">Enabled</span>
                    </label>
                    <button class="btn-delete" onclick="deleteSocial('${social.platform}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
            <div class="form-group">
                <label>Profile URL</label>
                <input type="url" class="form-control" value="${social.url}" 
                       placeholder="https://${social.platform}.com/yourprofile"
                       onchange="updateSocial('${social.platform}', this.value)">
                <small style="color: #666; display: block; margin-top: 5px;">
                    <i class="fas fa-info-circle"></i> Enter the full URL to your ${social.platform} profile
                </small>
            </div>
        `;
        
        container.appendChild(socialCard);
    });
}

async function updateSocial(platform, url) {
    try {
        const social = socialMediaData.find(s => s.platform === platform);
        const response = await fetch(`/api/social-media/${platform}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, enabled: social.enabled })
        });
        
        const data = await response.json();
        if (data.success) {
            showToast('Social media updated!');
            loadSocialMedia();
        }
    } catch (error) {
        alert('Error updating social media');
    }
}

async function toggleSocial(platform, enabled) {
    try {
        const social = socialMediaData.find(s => s.platform === platform);
        const response = await fetch(`/api/social-media/${platform}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: social.url, enabled })
        });
        
        const data = await response.json();
        if (data.success) {
            showToast(enabled ? 'Social media enabled!' : 'Social media disabled!');
            loadSocialMedia();
        }
    } catch (error) {
        alert('Error toggling social media');
    }
}

async function deleteSocial(platform) {
    if (!confirm(`Are you sure you want to delete ${platform}?`)) return;
    
    try {
        const response = await fetch(`/api/social-media/${platform}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        if (data.success) {
            showToast('Social media deleted!');
            loadSocialMedia();
        }
    } catch (error) {
        alert('Error deleting social media');
    }
}

async function addNewSocial() {
    const platform = prompt('Enter platform name (e.g., facebook, twitter, telegram):');
    if (!platform) return;
    
    const url = prompt(`Enter ${platform} profile URL:`);
    if (!url) return;
    
    try {
        const response = await fetch('/api/social-media', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                platform: platform.toLowerCase(), 
                url, 
                enabled: true 
            })
        });
        
        const data = await response.json();
        if (data.success) {
            showToast('Social media added!');
            loadSocialMedia();
        }
    } catch (error) {
        alert('Error adding social media');
    }
}

// Export to Excel function
async function exportToExcel() {
    try {
        showToast('Generating Excel file...');
        
        const response = await fetch('/api/contact/export-excel');
        
        if (!response.ok) {
            throw new Error('Failed to generate Excel file');
        }
        
        // Get the blob from response
        const blob = await response.blob();
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `NextGen-Contact-Submissions-${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        showToast('Excel file downloaded successfully!');
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        alert('Error exporting to Excel: ' + error.message);
    }
}

// Refresh submissions button - wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const refreshBtn = document.getElementById('refreshSubmissionsBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            loadSubmissions();
            showToast('Submissions refreshed!');
        });
    }
    
    // Export to Excel button
    const exportBtn = document.getElementById('exportExcelBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            exportToExcel();
        });
    }

    // Load submissions when submissions section is opened
    const submissionsNav = document.querySelector('[data-section="submissions"]');
    if (submissionsNav) {
        submissionsNav.addEventListener('click', () => {
            setTimeout(() => loadSubmissions(), 100);
        });
    }
    
    // Load social media when social section is opened
    const socialNav = document.querySelector('[data-section="social"]');
    if (socialNav) {
        socialNav.addEventListener('click', () => {
            setTimeout(() => loadSocialMedia(), 100);
        });
    }
    
    // Add social media button
    const addSocialBtn = document.getElementById('addSocialBtn');
    if (addSocialBtn) {
        addSocialBtn.addEventListener('click', () => {
            addNewSocial();
        });
    }
});
