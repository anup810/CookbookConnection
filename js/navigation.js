// navigation.js
import { setupAuthStateListener } from "./auth.js";

document.addEventListener('DOMContentLoaded', () => {
    setupAuthStateListener(updateUI);
    loadPage(window.location.pathname);
});

function loadPage(path) {
    // Fetch and display page content based on path
}

function updateUI(user) {
    const userContainer = document.getElementById('user-container');
    const userIcon = document.getElementById('user-icon');
    const logoutButton = document.getElementById('logout-button');

    if (user) {
        userContainer.style.display = 'flex';
        // Update user icon and logout button visibility
        // Attach logout functionality to the logout button
    } else {
        userContainer.style.display = 'none';
    }
}
