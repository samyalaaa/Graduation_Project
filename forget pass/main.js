document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Validate email on input
    emailInput.addEventListener('input', function() {
        if (emailInput.value.trim() === '') {
            emailError.style.display = 'none';
            emailInput.style.borderColor = '#ddd';
        } else if (!isValidEmail(emailInput.value)) {
            emailError.style.display = 'block';
            emailInput.style.borderColor = '#e53e3e';
        } else {
            emailError.style.display = 'none';
            emailInput.style.borderColor = '#4f46e5';
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Validate email
        if (!email || !isValidEmail(email)) {
            emailError.style.display = 'block';
            emailInput.style.borderColor = '#e53e3e';
            return;
        }
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Simulate API call with setTimeout
        setTimeout(function() {
            // Hide form and show success message
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // you would make an API call here

            // fetch('/api/forgot-password', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ email }),
            // })
            // .then(response => response.json())
            // .then(data => {
            //     form.style.display = 'none';
            //     successMessage.style.display = 'block';
            // })
            // .catch(error => {
            //     submitBtn.disabled = false;
            //     submitBtn.textContent = 'Reset Password';
            //     alert('An error occurred. Please try again.');
            // });
            
        }, 1500);
    });
});

function back(){
    window.location.href = "../login/login.html";
}