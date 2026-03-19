let search = document.querySelector('.search-box');
document.querySelector('#search-icon').onclick = () =>{
search.classList.toggle('active');
menu.classList.remove('active');
}
let menu = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = () =>{
    menu.classList.toggle('active');
search.classList.remove('active');
}
//hide menu and search box on scroll
window.onscroll =() =>{
    search.classList.remove('active');
    menu.classList.remove('active');
}

//header
let header= document.querySelector('header');
window.addEventListener('scroll' , ()=>{
    header.classList.toggle('shadow',window.scrollY > 0);
});

// Google Sign-In functionality
let isLoggedIn = false;

// Initialize Google Sign-In
window.onload = function() {
    google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
        callback: handleCredentialResponse
    });
}

// Handle Google Sign-In response
function handleCredentialResponse(response) {
    // Decode the JWT token to get user info
    const responsePayload = decodeJwtResponse(response.credential);
    
    // Update UI with user info
    showUserProfile(responsePayload);
    isLoggedIn = true;
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

// Show user profile
function showUserProfile(userInfo) {
    document.getElementById('login-btn').style.display = 'none';
    document.getElementById('user-profile').style.display = 'flex';
    document.getElementById('profile-img').src = userInfo.picture;
    document.getElementById('user-name').textContent = userInfo.name;
}

// Hide user profile
function hideUserProfile() {
    document.getElementById('login-btn').style.display = 'flex';
    document.getElementById('user-profile').style.display = 'none';
}

// Check login state on page load
window.addEventListener('load', function() {
    checkLoginState();
});

function checkLoginState() {
    const googleUser = localStorage.getItem('googleUser');
    const rememberLogin = localStorage.getItem('rememberLogin');
    
    if (googleUser) {
        const user = JSON.parse(googleUser);
        showUserProfile(user);
    } else if (rememberLogin === 'true') {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            // Show logged in state for remembered user
            showUserProfile({
                name: userEmail.split('@')[0],
                email: userEmail,
                picture: 'https://via.placeholder.com/32x32/d90429/ffffff?text=' + userEmail.charAt(0).toUpperCase()
            });
        }
    }
}

// Login button click handler - now redirects to login page
document.getElementById('login-btn').onclick = (e) => {
    // Let the default link behavior work
    return true;
}

// Logout button click handler
document.getElementById('logout-btn').onclick = () => {
    google.accounts.id.disableAutoSelect();
    hideUserProfile();
    isLoggedIn = false;
    // You can also revoke the token here if needed
}

// Image gallery functionality
var fullImageBox=document.getElementById('fullImageBox');
var fullImage=document.getElementById('fullImag');

function showImage(src){
    fullImageBox.style.display='flex';
    fullImage.src=src;
}

function closeImg(){
    fullImageBox.style.display='none';
}




// Change Hero Car Image with Animation
function changeHeroCarImage(carElement, imageSrc, carName, price) {
    const heroImage = document.getElementById('heroCarImage');
    const priceElement = document.getElementById('carPrice');
    const heroSection = document.querySelector('.hero-image');
    
    // Pause marquee animation temporarily
    const marqueeContent = document.querySelector('.marquee-content');
    marqueeContent.style.animationPlayState = 'paused';
    
    // Add click effect to the clicked car
    carElement.style.transform = 'scale(1.2)';
    carElement.style.transition = 'transform 0.3s ease';
    
    // Add loading effect to hero section
    heroSection.style.transform = 'scale(0.95)';
    heroSection.style.opacity = '0.7';
    heroSection.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        // Change the hero image
        heroImage.src = imageSrc;
        heroImage.alt = carName;
        
        // Update price
        priceElement.textContent = price;
        
        // Add flash effect
        heroSection.style.filter = 'brightness(1.3)';
        
        setTimeout(() => {
            // Remove flash and restore hero section
            heroSection.style.filter = 'brightness(1)';
            heroSection.style.transform = 'scale(1)';
            heroSection.style.opacity = '1';
            
            // Add success glow effect
            heroSection.style.boxShadow = '0 0 30px rgba(217, 4, 41, 0.4)';
            
            setTimeout(() => {
                heroSection.style.boxShadow = '0 20px 60px rgba(0,0,0,0.1)';
            }, 1000);
            
        }, 200);
        
        // Reset clicked car
        setTimeout(() => {
            carElement.style.transform = 'scale(1)';
            
            // Resume marquee animation
            marqueeContent.style.animationPlayState = 'running';
        }, 500);
        
    }, 300);
    
    // Scroll to hero section smoothly
    document.querySelector('.home').scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
    });
}

// Hero Image Slider functionality
let currentSlideIndex = 1;

// Function to manually change slides using dots
function currentSlide(n) {
    showSlide(currentSlideIndex = n);
}

// Function to show specific slide
function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (n > slides.length) currentSlideIndex = 1;
    if (n < 1) currentSlideIndex = slides.length;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[currentSlideIndex - 1]) {
        slides[currentSlideIndex - 1].classList.add('active');
    }
    if (dots[currentSlideIndex - 1]) {
        dots[currentSlideIndex - 1].classList.add('active');
    }
}
// New Chat Widget Functions
function startNewConversation() {
    const chatStartScreen = document.getElementById('chatStartScreen');
    const chatConversationScreen = document.getElementById('chatConversationScreen');
    const chatInput = document.getElementById('chatInput');
    
    chatStartScreen.style.display = 'none';
    chatConversationScreen.style.display = 'flex';
    setTimeout(() => {
        if (chatInput) chatInput.focus();
    }, 300);
}

function goBackToStart() {
    const chatStartScreen = document.getElementById('chatStartScreen');
    const chatConversationScreen = document.getElementById('chatConversationScreen');
    
    chatConversationScreen.style.display = 'none';
    chatStartScreen.style.display = 'flex';
}

function goHome() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.remove('active');
}

function toggleChatMenu() {
    alert('Chat menu options:\n- Change Name\n- Email transcript\n- Sound On/Off\n- Pop out widget');
}
// Simple Chat Toggle Test
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up chat');
    
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    
    if (chatToggle && chatWindow) {
        console.log('Chat elements found');
        
        chatToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Chat icon clicked');
            
            if (chatWindow.classList.contains('active')) {
                chatWindow.classList.remove('active');
                console.log('Chat closed');
            } else {
                chatWindow.classList.add('active');
                console.log('Chat opened');
            }
        });
    } else {
        console.log('Chat elements not found:', {
            chatToggle: !!chatToggle,
            chatWindow: !!chatWindow
        });
    }
});