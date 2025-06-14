document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    const successMessage = document.getElementById('success-message');
    
    // Form validation
    function validateForm() {
        let isValid = true;
        
        // Clear previous errors
        document.querySelectorAll('.error').forEach(el => el.textContent = '');
        
        // Validate name
        const name = document.getElementById('name');
        if (!name.value.trim()) {
            document.getElementById('name-error').textContent = 'Name is required';
            isValid = false;
        }
        
        // Validate email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            document.getElementById('email-error').textContent = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Validate subject
        const subject = document.getElementById('subject');
        if (!subject.value.trim()) {
            document.getElementById('subject-error').textContent = 'Subject is required';
            isValid = false;
        }
        
        // Validate message
        const message = document.getElementById('message');
        if (!message.value.trim()) {
            document.getElementById('message-error').textContent = 'Message is required';
            isValid = false;
        } else if (message.value.trim().length < 10) {
            document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
            isValid = false;
        }
        
        return isValid;
    }
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading"></span> Sending...';
        
        // Replace with your Formspree endpoint
        const formspreeEndpoint = 'https://formspree.io/f/your-formspree-id';
        
        // Prepare form data
        const formData = new FormData(form);
        
        // Send form data using fetch
        fetch(formspreeEndpoint, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            // Show success message
            form.reset();
            successMessage.style.display = 'block';
            submitButton.innerHTML = 'Send Message';
            submitButton.disabled = false;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem submitting your form. Please try again later.');
            submitButton.innerHTML = 'Send Message';
            submitButton.disabled = false;
        });
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateForm();
        });
    });
});