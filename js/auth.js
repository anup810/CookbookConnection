// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
// import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyDkLIgwVKpqdOpuhF1-26RsKaRQmjMWtaw",
//     authDomain: "map-pwa-ca20f.firebaseapp.com",
//     databaseURL: "https://map-pwa-ca20f-default-rtdb.firebaseio.com",
//     projectId: "map-pwa-ca20f",
//     storageBucket: "map-pwa-ca20f.appspot.com",
//     messagingSenderId: "134536483378",
//     appId: "1:134536483378:web:1eb239d2da1ce7fb35222b",
//     measurementId: "G-PMZXDZ5N71"
//   };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         // User is logged in
//         // You can save user data or perform other actions here
//         const userContainer = document.getElementById('user-container');
//         const logoutButton = document.getElementById('logout-button');
//         const userName = document.getElementById('user-name');

//         if (userContainer) {
//             userContainer.style.display = 'flex';
//         }
//         if (userName) {
//             userName.textContent = user.displayName;
//         }

//         // Handle logout
//         if (logoutButton) {
//             logoutButton.addEventListener('click', () => {
//                 signOut(auth)
//                     .then(() => {
//                         // Redirect to home page
//                         window.location.href = '/index.html';
//                     })
//                     .catch((error) => {
//                         console.error('Error logging out:', error);
//                     });
//             });
//         }
//     } else {
//         // User is not logged in
//         const userContainer = document.getElementById('user-container');
//         if (userContainer) {
//             userContainer.style.display = 'none';
//         }
//     }
// });
