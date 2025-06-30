// Global variables
let currentOption = '';
const selectedOptions = {
    lens: '',
    frame: '',
    image: '',
    offers: ''
};

// Option data
const optionData = {
    lens: [
        'Single Vision',
        'Bifocal',
        'Progressive',
        'Reading Glasses',
        'Computer Glasses',
        'Sunglasses'
    ],
    frame: [
        'Round Frame',
        'Square Frame',
        'Cat Eye',
        'Aviator',
        'Wayfarer',
        'Rimless'
    ],
    offers: [
        'Buy 1 Get 1 Free',
        '20% Off Second Pair',
        'Free Eye Test',
        'Student Discount 15%',
        'Senior Citizen 10% Off',
        'No Offer'
    ]
};

// Back button functionality
function goBack() {
    if (confirm('Are you sure you want to go back? Your progress will be lost.')) {
        // In a real app, this would navigate to the previous page
        window.location.href = '../prods/cart.html'; 
    }
}

// Toggle option selection
function toggleOption(optionType) {
    if (optionType === 'image') {
        return; // Image upload is handled separately
    }
    
    currentOption = optionType;
    showModal(optionType);
}

// Show modal with options
function showModal(optionType) {
    const modal = document.getElementById('optionModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = `Choose ${optionType.charAt(0).toUpperCase() + optionType.slice(1)}`;
    
    // Create option list
    const optionList = document.createElement('ul');
    optionList.className = 'option-list';
    
    optionData[optionType].forEach(option => {
        const listItem = document.createElement('li');
        listItem.textContent = option;
        listItem.onclick = () => selectOption(optionType, option);
        
        // Highlight if already selected
        if (selectedOptions[optionType] === option) {
            listItem.style.backgroundColor = '#a8d5d8';
            listItem.style.fontWeight = 'bold';
        }
        
        optionList.appendChild(listItem);
    });
    
    modalBody.innerHTML = '';
    modalBody.appendChild(optionList);
    
    modal.style.display = 'block';
    
    // Add click outside to close
    modal.onclick = (e) => {
        if (e.target === modal) {
            closeModal();
        }
    };
}

// Select an option
function selectOption(optionType, option) {
    selectedOptions[optionType] = option;
    
    // Update the display
    const textElement = document.getElementById(`${optionType}-text`);
    textElement.textContent = option;
    textElement.style.fontWeight = 'bold';
    
    // Change field color to indicate selection
    const field = document.getElementById(`${optionType}-field`);
    field.style.backgroundColor = '#95c7ca';
    
    closeModal();
    
    // Add animation effect
    const addBtn = field.parentElement.querySelector('.add-btn');
    addBtn.style.backgroundColor = '#4CAF50';
    addBtn.style.color = 'white';
    addBtn.textContent = '✓';
    
    setTimeout(() => {
        addBtn.style.backgroundColor = 'white';
        addBtn.style.color = 'black';
        addBtn.textContent = '+';
    }, 1000);
}

// Close modal
function closeModal() {
    const modal = document.getElementById('optionModal');
    modal.style.display = 'none';
}

// Handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        selectedOptions.image = file.name;
        
        const textElement = document.getElementById('image-text');
        textElement.textContent = `Selected: ${file.name}`;
        textElement.style.fontWeight = 'bold';
        
        // Change field color to indicate selection
        const field = document.getElementById('image-field');
        field.style.backgroundColor = '#95c7ca';
        
        // Show success animation
        const addBtn = field.parentElement.querySelector('.add-btn');
        addBtn.style.backgroundColor = '#4CAF50';
        addBtn.style.color = 'white';
        addBtn.textContent = '✓';
        
        setTimeout(() => {
            addBtn.style.backgroundColor = 'white';
            addBtn.style.color = 'black';
            addBtn.textContent = '+';
        }, 1000);
        
        // Create preview (optional)
        const reader = new FileReader();
        reader.onload = function(e) {
            console.log('Image uploaded successfully');
            // You could show a preview here if needed
        };
        reader.readAsDataURL(file);
    }
}

// Submit order
function submitOrder() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Check if at least one option is selected
    const hasSelections = Object.values(selectedOptions).some(value => value !== '');
    
    if (!hasSelections) {
        alert('Please select at least one option before submitting');
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Order submitted successfully! You will receive a confirmation email shortly.');
        
        // Reset form
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        
        // Reset selections
        Object.keys(selectedOptions).forEach(key => {
            selectedOptions[key] = '';
            const textElement = document.getElementById(`${key}-text`);
            const field = document.getElementById(`${key}-field`);
            
            // Reset text based on option type
            switch(key) {
                case 'lens':
                    textElement.textContent = 'Select lens type';
                    break;
                case 'frame':
                    textElement.textContent = 'Select frame style';
                    break;
                case 'image':
                    textElement.textContent = 'Upload your photo';
                    break;
                case 'offers':
                    textElement.textContent = 'Select available offers';
                    break;
            }
            
            textElement.style.fontWeight = 'normal';
            field.style.backgroundColor = '#a8d5d8';
        });
        
        // Reset submit button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
    }, 2000);
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add focus styles for accessibility
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 0 3px rgba(45, 106, 107, 0.3)';
        });
        
        input.addEventListener('blur', function() {
            this.style.boxShadow = 'none';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);