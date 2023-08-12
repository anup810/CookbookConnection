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

// Add a click event listener to the "Update" buttons
recipeCardsContainer.addEventListener('click', async (event) => {
    const updateButton = event.target.closest('.update-button');
    if (updateButton) {
        const recipeCard = updateButton.closest('.card');
        if (recipeCard) {
            // Get the recipe ID from the button's data-id attribute
            const recipeId = updateButton.getAttribute('data-id');

            // Fetch the existing recipe data from the database
            const cookbookDbInstance = CookBookDB;
            try {
                await cookbookDbInstance.open();
                const recipe = await cookbookDbInstance.get(recipeId);
                if (recipe) {
                    // Populate the form fields with existing recipe data
                    document.getElementById('title').value = recipe.title;
                    document.getElementById('prepTime').value = recipe.prepTime;
                    document.getElementById('description').value = recipe.description;
                    document.getElementById('ingredients').value = recipe.ingredients;
                    document.getElementById('instructions').value = recipe.instructions;

                    // Show the form overlay for updating
                    overlay.style.display = 'flex';

                    // Add a submit event listener to the form for updating
                    recipeForm.addEventListener('submit', async (event) => {
                        event.preventDefault(); // Prevent form submission

                        // Get updated form values
                        const updatedTitle = document.getElementById('title').value;
                        const updatedPrepTime = document.getElementById('prepTime').value;
                        const updatedDescription = document.getElementById('description').value;
                        const updatedIngredients = document.getElementById('ingredients').value;
                        const updatedInstructions = document.getElementById('instructions').value;

                        try {
                            // Update the recipe in the database
                            await cookbookDbInstance.update(recipeId, {
                                title: updatedTitle,
                                prepTime: updatedPrepTime,
                                description: updatedDescription,
                                ingredients: updatedIngredients,
                                instructions: updatedInstructions
                            });

                            // Display a notification
                            showNotification("Recipe updated successfully");

                            // Close the form overlay
                            closeFormOverlay();
                        } catch (error) {
                            // Handle error here
                            console.error(error);
                        }
                    });
                }
            } catch (error) {
                // Handle error here
                console.error(error);
            }
        }
    }
});




// Add a click event listener to the "Delete" buttons
recipeCardsContainer.addEventListener('click', async (event) => {
    const deleteButton = event.target.closest('.delete-button');
    if (deleteButton) {
        const recipeCard = deleteButton.closest('.card');
        if (recipeCard) {
            // Get the recipe ID from the button's data-id attribute
            const recipeId = deleteButton.getAttribute('data-id');

            // Delete the recipe from the database
            const cookbookDbInstance = CookBookDB;
            try {
                await cookbookDbInstance.open();
                await cookbookDbInstance.delete(recipeId);
                // Remove the recipe card from the container
                recipeCard.remove();
                // Display a notification
                showNotification("Recipe deleted successfully");
            } catch (error) {
                // Handle error here
                console.error(error);
            }
        }
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
    recipeCardsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('share-button')) {
            const card = event.target.closest('.card');
            const titleElement = card.querySelector('h3');
            const prepTimeElement = card.querySelector('p:nth-child(3)');
            const descriptionElement = card.querySelector('p:nth-child(4)');
    
            if (titleElement && prepTimeElement && descriptionElement) {
                const title = titleElement.textContent;
                const prepTime = prepTimeElement.textContent.split(' ')[1];
                const description = descriptionElement.textContent;
    
                const recipeData = { title, prepTime, description };
    
                localStorage.setItem('sharedRecipe', JSON.stringify(recipeData));
    
                showNotification("Recipe shared successfully");
            }
        }
    })

});
