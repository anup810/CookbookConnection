import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Firebase configuration 
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Using DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('.register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent form submission

            // Get form values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                // Check if the email is already registered
                const signInMethods = await fetchSignInMethodsForEmail(auth, email);
                if (signInMethods.length > 0) {
                    // User already registered
                    alert('User with this email already registered. Please login.'); 
                    window.location.href = 'login.html'; // Redirect to login page
                } else {
                    // Create a user with the provided email and password
                    await createUserWithEmailAndPassword(auth, email, password);

                    // User successfully registered
                    alert('Registration successful!'); 
                }
            } catch (error) {
                // Handle error
                console.error('Error registering user:', error);
            }
        });
    }
});
