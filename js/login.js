import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Firebase configuration (replace with your actual Firebase configuration)
const firebaseConfig = {
    apiKey: "AIzaSyDkLIgwVKpqdOpuhF1-26RsKaRQmjMWtaw",
    authDomain: "map-pwa-ca20f.firebaseapp.com",
    databaseURL: "https://map-pwa-ca20f-default-rtdb.firebaseio.com",
    projectId: "map-pwa-ca20f",
    storageBucket: "map-pwa-ca20f.appspot.com",
    messagingSenderId: "134536483378",
    appId: "1:134536483378:web:1eb239d2da1ce7fb35222b",
    measurementId: "G-PMZXDZ5N71"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  // Add a submit event listener to the login form
  // document.addEventListener('DOMContentLoaded', () => {
  //   const loginForm = document.querySelector('.login-form');
  //   loginForm.addEventListener('submit', async (event) => {
  //     event.preventDefault(); // Prevent form submission
  
  //     // Get form values
  //     const email = document.getElementById('email').value;
  //     const password = document.getElementById('password').value;
  
  //     try {
  //       // Sign in the user with the provided email and password
  //       await signInWithEmailAndPassword(auth, email, password);
        
  //       // User successfully logged in
  //       alert('Login successful!');
  
  //       // Redirect to recipe.html
  //       window.location.href = 'recipe.html';
  //     } catch (error) {
  //       // Handle error
  //       alert('Invalid email or password');
  //       console.error('Error logging in:', error);
  //     }
  //   });
  // });
// Using DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form submission
  
        // Get form values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        try {
          // Sign in the user with the provided email and password
          await signInWithEmailAndPassword(auth, email, password);
          
          // User successfully logged in
          alert('Login successful!');
    
          // Redirect to recipe.html
          window.location.href = 'recipe.html';
        } catch (error) {
          // Handle error
          alert('Invalid email or password');
          console.error('Error logging in:', error);
        }
      });
  }
});
