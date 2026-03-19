# Google Login Setup Guide

## Steps to Enable Google Login:

### 1. Create Google Cloud Project
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select existing one
- Enable Google+ API

### 2. Create OAuth 2.0 Credentials
- Go to "Credentials" in the left sidebar
- Click "Create Credentials" → "OAuth 2.0 Client IDs"
- Choose "Web application"
- Add your domain to "Authorized JavaScript origins":
  - For local development: `http://localhost:3000` or `http://127.0.0.1:5500`
  - For production: `https://yourdomain.com`

### 3. Update Your Code
Replace `YOUR_GOOGLE_CLIENT_ID` in both files with your actual Client ID:

**In project1.html:**
```html
<meta name="google-signin-client_id" content="YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com">
```

**In project1.js:**
```javascript
client_id: 'YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com',
```

### 4. Test the Login
- Open your website
- Click the "Login" button
- Google Sign-In popup should appear
- After successful login, user profile will be displayed

## Features Added:
- ✅ Professional navbar design
- ✅ Google Sign-In button with icon
- ✅ User profile display after login
- ✅ Logout functionality
- ✅ Responsive design for mobile
- ✅ Smooth animations and hover effects

## Security Note:
- Never expose your Client Secret in frontend code
- Only use Client ID in frontend applications
- Always validate tokens on your backend server for production apps