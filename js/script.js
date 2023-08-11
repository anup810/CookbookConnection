// import CookBookDB from "./cookbook-db/cookbook-db";

// // Get the overlay, form container, cancel button, and recipe cards container
// const overlay = document.getElementById('overlay');
// const formContainer = document.getElementById('formContainer');
// const plusButton = document.querySelector('.plus-icon');
// const cancelButton = document.getElementById('cancelButton');
// const recipeCardsContainer = document.getElementById('recipeCards');

// // Add a click event listener to the button
// plusButton.addEventListener('click', () => {
//     overlay.style.display = 'flex';
// });

// // Add a click event listener to the Cancel button
// cancelButton.addEventListener('click', () => {
//     overlay.style.display = 'none';
// });

// // Function to create a recipe card
// function createRecipeCard(title, prepTime, description) {
//     const card = document.createElement('div');
//     card.className = 'card';
//     card.innerHTML = `
//         <img src="./images/hero_image.jpg" alt="">
//         <h3>${title}</h3>
//         <p>Time: ${prepTime}</p>
//         <p>${description}</p>
//     `;
//     return card;
// }
// // Define the showNotification function
// function showNotification(message) {
//     const notification = document.createElement('div');
//     notification.className = 'notification';
//     notification.textContent = message;
//     document.body.appendChild(notification);

//     // Remove the notification after a certain duration (e.g., 3 seconds)
//     setTimeout(() => {
//         document.body.removeChild(notification);
//     }, 3000);
// }

// // Function to add existing recipe cards to the container
// function addExistingRecipeCards() {
//     const existingCards = document.querySelectorAll('.card-container .card');
//     existingCards.forEach(card => {
//         const title = card.querySelector('h3')?.textContent;
//         const prepTime = card.querySelector('p:nth-child(2)')?.textContent?.replace('Time: ', '');
//         const description = card.querySelector('p:nth-child(3)')?.textContent;
//         const newCard = createRecipeCard(title, prepTime, description);
//         recipeCardsContainer.appendChild(newCard);
//     });
// }

// //Function to close the form overlay
// function closeFormOverlay() {
//     overlay.style.display = 'none';
// }

// // Add existing recipe cards to the container when the page loads
// window.onload = addExistingRecipeCards;

// // Add a submit event listener to the form
// recipeForm.addEventListener('submit', (event) => {
//     event.preventDefault(); // Prevent form submission

//     // Get form values
//     const title = document.getElementById('title').value;
//     const prepTime = document.getElementById('prepTime').value;
//     const description = document.getElementById('description').value;
//     const ingredients = document.getElementById('ingredients').value;
//     const instructions = document.getElementById('instructions').value;

//     const cookbookDbInstance = CookBookDB();

//     //Open the database connection
//     cookbookDbInstance.open()
//     .then(() => {
//         //Add the new recipe to the database
//         return cookbookDbInstance.add(title, prepTime, description, ingredients, instructions);
    
//     })
//     .then(() => {
//         //Create and add the new recipe card
//         const newCard = createRecipeCard(title, prepTime, description);
//         recipeCardsContainer.appendChild(newCard);

//         //Reset the form
//         recipeForm.reset();

//         //Display Notifications
//         showNotification("Recipe added successfully");

//         //Close the form overlay
//         closeFormOverlay();
//     })
//     .catch((error) => {
//         //Handle error here
//         console.error(error);
//     });
// });

// //Function to add existing recipe cards to the container
// async function addExistingRecipeCards(){
//     try {
//         //Get all recipes from the database
//         const recipes = await cookbookDb.getAll();

//         //Iterative over recipes and create cards
//         recipes.forEach(recipe => {
//             const newCard = createRecipeCard(recipe.title, recipe.prepTime, recipe.description);
//             recipeCardsContainer.appendChild(newCard);
//         });
//     } catch (error) {
//         //Handle error here
//         console.error(error)
//     }
// }

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

// Function to create a recipe card
function createRecipeCard(title, prepTime, description) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="./images/hero_image.jpg" alt="">
        <h3>${title}</h3>
        <p>Time: ${prepTime}</p>
        <p>${description}</p>
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

        // Iterate over recipes and create cards
        recipes.forEach(recipe => {
            const newCard = createRecipeCard(recipe.title, recipe.prepTime, recipe.description);
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
        await cookbookDbInstance.add(title, prepTime, description, ingredients, instructions);

        // Create and add the new recipe card
        const newCard = createRecipeCard(title, prepTime, description);
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
