// Password toggle functionality
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('togglePassword');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('bx-show');
        toggleIcon.classList.add('bx-hide');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('bx-hide');
        toggleIcon.classList.add('bx-show');
    }
});

// Form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Basic validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate login process
    const loginBtn = document.querySelector('.login-btn');
    const originalText = loginBtn.innerHTML;
    
    // Show loading state
    loginBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Signing In...';
    loginBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        loginBtn.innerHTML = originalText;
        loginBtn.disabled = false;
        
        // Show success modal
        showSuccessModal();
        
        // Store login state if remember me is checked
        if (remember) {
            localStorage.setItem('rememberLogin', 'true');
            localStorage.setItem('userEmail', email);
        }
        
        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = 'project1.html';
        }, 2000);
        
    }, 1500);
});

// Google Sign-In callback
function handleCredentialResponse(response) {
    // Decode the JWT token to get user info
    const responsePayload = decodeJwtResponse(response.credential);
    
    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Email: ' + responsePayload.email);
    console.log("Image URL: " + responsePayload.picture);
    
    // Store user info
    localStorage.setItem('googleUser', JSON.stringify({
        id: responsePayload.sub,
        name: responsePayload.name,
        email: responsePayload.email,
        picture: responsePayload.picture
    }));
    
    // Show success modal
    showSuccessModal();
    
    // Redirect after 2 seconds
    setTimeout(() => {
        window.location.href = 'project1.html';
    }, 2000);
}

// Decode JWT token
function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

// Show success modal
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('show');
}

// Auto-fill email if remembered
window.addEventListener('load', function() {
    if (localStorage.getItem('rememberLogin') === 'true') {
        const savedEmail = localStorage.getItem('userEmail');
        if (savedEmail) {
            document.getElementById('email').value = savedEmail;
            document.getElementById('remember').checked = true;
        }
    }
});

// Sign up link functionality
document.getElementById('signupLink').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Sign up functionality would be implemented here');
});

// Input animations
document.querySelectorAll('.input-wrapper input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Initialize Google Sign-In when page loads
window.onload = function() {
    if (typeof google !== 'undefined') {
        google.accounts.id.initialize({
            client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
            callback: handleCredentialResponse
        });
        
        google.accounts.id.renderButton(
            document.querySelector('.g_id_signin'),
            { 
                theme: 'outline', 
                size: 'large',
                type: 'standard',
                text: 'signin_with',
                shape: 'rectangular',
                logo_alignment: 'left'
            }
        );
    }
};