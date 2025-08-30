// Contact Form Configuration
const CONFIG = {
    emailjs: {
        serviceId: 'service_tatq67s',
        templateId: '_ejs-test-mail-service_',
        publicKey: 'c6AuTeRHNVsft65IR'
    },
    contact: {
        recipientName: 'Mohammad Ahtisham',
        recipientEmail: 'ahtisham@phantasm.co.in'
    }
};

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim(),
        github: document.getElementById('githubCheck').checked,
        linkedin: document.getElementById('linkedinCheck').checked,
        twitter: document.getElementById('twitterCheck').checked,
        medium: document.getElementById('mediumCheck').checked
    };
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
        showMessage('error', 'Please fill in all required fields.');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showMessage('error', 'Please enter a valid email address.');
        return;
    }
    
    // Show loading state
    showLoading(true);
    
    // Prepare email template parameters
    const templateParams = {
        to_name: 'Mohammad Ahtisham',
        to_email: 'ahtisham@phantasm.co.in', // Add recipient email
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        social_links: getSocialLinksText(formData),
        reply_to: formData.email
    };
    
    // Send email using EmailJS
    console.log('Sending email with parameters:', templateParams);
    
    // Try EmailJS with proper recipient configuration
    const emailParams = {
        to_name: CONFIG.contact.recipientName,
        to_email: CONFIG.contact.recipientEmail,
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        social_links: getSocialLinksText(formData),
        reply_to: formData.email,
        // Add these fields that EmailJS might be looking for
        user_email: CONFIG.contact.recipientEmail,
        user_name: CONFIG.contact.recipientName
    };
    
    console.log('Sending email with enhanced parameters:', emailParams);
    
    // Try EmailJS first
    emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.templateId, emailParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showMessage('success', 'Message sent successfully! I will get back to you soon.');
            document.getElementById('contactForm').reset();
            showLoading(false);
        })
        .catch(function(error) {
            console.error('EmailJS failed:', error);
            
            // Handle different types of errors
            if (error.status === 400 && error.text.includes('template ID not found')) {
                console.log('Template ID not found. Using mailto fallback...');
                showMailtoFallback(formData);
            } else if (error.status === 422 && error.text.includes('recipients address is empty')) {
                console.log('Recipients address issue. Using mailto fallback...');
                showMailtoFallback(formData);
            } else {
                showMessage('error', `Failed to send message. Please try again or contact me directly at ${CONFIG.contact.recipientEmail}`);
            }
            showLoading(false);
        });
}

function showLoading(show) {
    const btnText = document.getElementById('btnText');
    const btnLoading = document.getElementById('btnLoading');
    const submitBtn = document.getElementById('submitBtn');
    
    if (show) {
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
    } else {
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }
}

function showMessage(type, message) {
    const formMessages = document.getElementById('formMessages');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    // Hide all messages first
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    formMessages.style.display = 'block';
    
    if (type === 'success') {
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
    } else {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'block';
        errorText.textContent = message;
    }
    
    // Auto-hide messages after 8 seconds
    setTimeout(() => {
        formMessages.style.display = 'none';
    }, 8000);
    
    // Scroll to message
    formMessages.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function getSocialLinksText(socialData) {
    const links = [];
    if (socialData.github) links.push('GitHub');
    if (socialData.linkedin) links.push('LinkedIn');
    if (socialData.twitter) links.push('Twitter');
    if (socialData.medium) links.push('Medium');
    
    return links.length > 0 ? links.join(', ') : 'None selected';
}

function showMailtoFallback(formData) {
    // Create a mailto link as fallback
    const mailtoSubject = encodeURIComponent('Portfolio Contact Form Message');
    const mailtoBody = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Message: ${formData.message}\n` +
        `Social Links: ${getSocialLinksText(formData)}`
    );
    
    const mailtoLink = `mailto:${CONFIG.contact.recipientEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
    
    // Show user the alternative
    showMessage('error', 
        'EmailJS configuration issue. Click here to send email directly: ' +
        '<a href="' + mailtoLink + '" style="display: block; margin-top: 10px; color: #14B789; text-decoration: underline; font-weight: bold;">Send Email</a>'
    );
    
    // Also open the mailto link automatically
    window.open(mailtoLink);
}

// Initialize EmailJS when the page loads
window.addEventListener('load', function() {
    // EmailJS is already initialized in the HTML head
    console.log('EmailJS initialized with key:', CONFIG.emailjs.publicKey);
    console.log('Service ID:', CONFIG.emailjs.serviceId);
    console.log('Template ID:', CONFIG.emailjs.templateId);
});
