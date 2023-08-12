import CookBookDB from "./cookbook-db/cookbook-db.js";

// Get the overlay, form container, cancel button, and recipe cards container
const overlay = document.getElementById('overlay');
const formContainer = document.getElementById('formContainer');
const plusButton = document.querySelector('.plus-icon');
const cancelButton = document.getElementById('cancelButton');
const recipeCardsContainer = document.getElementById('recipeCards');

// Add a click event listener to the button
plusButton.addEventListener('click', () => {
    overlay.style.display = 'flex';
});

// Add a click event listener to the Cancel button
cancelButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// Function to create a recipe card with options
function createRecipeCardWithOptions(id, title, prepTime, description) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="./images/hero_image.jpg" alt="">
        <h3>${title}</h3>
        <p>Time: ${prepTime}</p>
        <p>${description}</p>
        <div class="card-options">
            <button class="update-button" data-id="${id}">Update</button>
            <button class="delete-button" data-id="${id}">Delete</button>
            <button class="share-button" data-id="${id}">Share</button>
        </div>
    `;
    return card;
}

// Define the showNotification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove the notification after a certain duration (e.g., 3 seconds)
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

//Function to close the form overlay
function closeFormOverlay() {
    overlay.style.display = 'none';
}

// Add existing recipe cards to the container when the page loads
async function addExistingRecipeCards() {
    try {
        // Get all recipes from the database
        const cookbookDbInstance = CookBookDB;
        await cookbookDbInstance.open();
        const recipes = await cookbookDbInstance.getAll();

        // Iterate over recipes and create cards with options
        recipes.forEach(recipe => {
            const newCard = createRecipeCardWithOptions(recipe.id, recipe.title, recipe.prepTime, recipe.description);
            recipeCardsContainer.appendChild(newCard);
        });
    } catch (error) {
        // Handle error here
        console.error(error);
    }
}

// Call the function to add existing recipe cards when the page loads
window.onload = addExistingRecipeCards;

// Add a submit event listener to the form
recipeForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const title = document.getElementById('title').value;
    const prepTime = document.getElementById('prepTime').value;
    const description = document.getElementById('description').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;

    const cookbookDbInstance = CookBookDB;

    try {
        // Open the database connection
        await cookbookDbInstance.open();

        // Add the new recipe to the database
        const addedRecipe = await cookbookDbInstance.add(title, prepTime, description, ingredients, instructions);

        // Create and add the new recipe card with options
        const newCard = createRecipeCardWithOptions( title, prepTime, description);
        recipeCardsContainer.appendChild(newCard);

        // Reset the form
        recipeForm.reset();

        // Display notification
        showNotification("Recipe added successfully");

        // Close the form overlay
        closeFormOverlay();
    } catch (error) {
        // Handle error here
        console.error(error);
    }
});

// Add click event listeners to update, delete, and share buttons
recipeCardsContainer.addEventListener('click', async (event) => {
    const target = event.target;

    if (target.classList.contains('update-button')) {
        const recipeId = target.getAttribute('data-id');
        // Handle update button click, e.g., open a modal with form to update recipe
        // You can use recipeId to identify which recipe to update
    } else if (target.classList.contains('delete-button')) {
        const recipeId = target.getAttribute('data-id');
        // Handle delete button click, e.g., delete the recipe from the database and remove the card
        // You can use recipeId to identify which recipe to delete
    } else if (target.classList.contains('share-button')) {
        const recipeId = target.getAttribute('data-id');
        // Handle share button click, e.g., open a modal with sharing options
        // You can use recipeId to identify which recipe to share
    }
});
