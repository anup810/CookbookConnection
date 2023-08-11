import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDkLIgwVKpqdOpuhF1-26RsKaRQmjMWtaw",
    authDomain: "map-pwa-ca20f.firebaseapp.com",
    databaseURL: "https://map-pwa-ca20f-default-rtdb.firebaseio.com",
    projectId: "map-pwa-ca20f",
    storageBucket: "map-pwa-ca20f.appspot.com",
    messagingSenderId: "134536483378",
    appId: "1:134536483378:web:1eb239d2da1ce7fb35222b",
    measurementId: "G-PMZXDZ5N71"
  }

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const inquiriesCollection = collection(firestore, 'inquiries');

document.addEventListener('DOMContentLoaded', () => {
    const inquiryForm = document.querySelector('.inquiry-form');
    
    inquiryForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form submission

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        try {
            await addDoc(inquiriesCollection, {
                name: name,
                email: email,
                message: message,
                timestamp: new Date()
            });

            inquiryForm.reset();
            alert('Inquiry submitted successfully!');
        } catch (error) {
            console.error('Error submitting inquiry:', error);
        }
    });
});
