// Add event listener to Login button
const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', () => {
  
     window.location.href = './pages/login.html';
});

// Add event listener to Signup button
const signupButton = document.getElementById('signupButton');
signupButton.addEventListener('click', () => {
    
     window.location.href = './pages/register.html';
});
