



import CookBookDB from "./cookbook-db/cookbook-db-cloud.js";

const overlay = document.getElementById('overlay');
const formContainer = document.getElementById('formContainer');
const plusButton = document.querySelector('.plus-icon');
const cancelButton = document.getElementById('cancelButton');
const recipeCardsContainer = document.getElementById('recipeCards');
let isUpdating = false; // Flag to track updating state

// Add a click event listener to the plus button
plusButton.addEventListener('click', () => {
    if (!isUpdating) {
        overlay.style.display = 'flex';
    }
});

// Add a click event listener to the Cancel button
cancelButton.addEventListener('click', () => {
    overlay.style.display = 'none';
    isUpdating = false; // Reset updating state when cancelling
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

    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

function closeFormOverlay() {
    overlay.style.display = 'none';
    isUpdating = false; // Reset updating state when closing overlay
}

async function addExistingRecipeCards() {
    try {
        const cookbookDbInstance = CookBookDB;
        await cookbookDbInstance.open();
        const recipes = await cookbookDbInstance.getAll();

        recipes.forEach(recipe => {
            const newCard = createRecipeCardWithOptions(recipe.id, recipe.title, recipe.prepTime, recipe.description);
            recipeCardsContainer.appendChild(newCard);
        });
    } catch (error) {
        console.error(error);
    }
}

window.onload = addExistingRecipeCards;

recipeForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const prepTime = document.getElementById('prepTime').value;
    const description = document.getElementById('description').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;

    const cookbookDbInstance = CookBookDB;

    try {
        await cookbookDbInstance.open();
        const addedRecipe = await cookbookDbInstance.add(title, prepTime, description, ingredients, instructions);

        const newCard = createRecipeCardWithOptions(title, prepTime, description);
        recipeCardsContainer.appendChild(newCard);

        recipeForm.reset();

        showNotification("Recipe added successfully");
        closeFormOverlay();
    } catch (error) {
        console.error(error);
    }
});


recipeCardsContainer.addEventListener('click', async (event) => {
    const target = event.target;

    if (target.classList.contains('update-button')) {
        isUpdating = true; // Set updating state when opening update form
        const recipeId = target.getAttribute('data-id');
        const cookbookDbInstance = CookBookDB;
        try {
            await cookbookDbInstance.open();
            const recipe = await cookbookDbInstance.get(recipeId);
            if (recipe) {
                document.getElementById('title').value = recipe.title;
                document.getElementById('prepTime').value = recipe.prepTime;
                document.getElementById('description').value = recipe.description;
                document.getElementById('ingredients').value = recipe.ingredients;
                document.getElementById('instructions').value = recipe.instructions;

                overlay.style.display = 'flex';

                const updateForm = document.getElementById('recipeForm');
                updateForm.addEventListener('submit', async (event) => {
                    event.preventDefault();

                    const updatedTitle = document.getElementById('title').value;
                    const updatedPrepTime = document.getElementById('prepTime').value;
                    const updatedDescription = document.getElementById('description').value;
                    const updatedIngredients = document.getElementById('ingredients').value;
                    const updatedInstructions = document.getElementById('instructions').value;

                    try {
                        await cookbookDbInstance.update({
                            id: recipeId,
                            title: updatedTitle,
                            prepTime: updatedPrepTime,
                            description: updatedDescription,
                            ingredients: updatedIngredients,
                            instructions: updatedInstructions
                        });

                        // Update the existing card with the updated information
                        const existingCard = recipeCardsContainer.querySelector(`[data-id="${recipeId}"]`);
                        if (existingCard) {
                            existingCard.querySelector('h3').textContent = updatedTitle;
                            existingCard.querySelector('p:nth-child(3)').textContent = `Time: ${updatedPrepTime}`;
                            existingCard.querySelector('p:nth-child(4)').textContent = updatedDescription;
                        }

                        showNotification("Recipe updated successfully");
                        closeFormOverlay();
                    } catch (error) {
                        console.error(error);
                    }
                });
            }
        } catch (error) {
            console.error(error);
        }
    } else if (target.classList.contains('delete-button')) {
        const recipeId = target.getAttribute('data-id');
        const cookbookDbInstance = CookBookDB;

        try {
            await cookbookDbInstance.open();
            await cookbookDbInstance.delete(recipeId);

            // Remove the card from the UI
            const recipeCard = target.closest('.card');
            recipeCard.remove();

            showNotification("Recipe deleted successfully");
        } catch (error) {
            console.error(error);
        }
    }
    else if (target.classList.contains('share-button')) {
        const card = target.closest('.card');
        const titleElement = card.querySelector('h3');
        const prepTimeElement = card.querySelector('p:nth-child(3)');
        const descriptionElement = card.querySelector('p:nth-child(4)');

        if (titleElement && prepTimeElement && descriptionElement) {
            const title = titleElement.textContent;
            const prepTime = prepTimeElement.textContent.split(' ')[1];
            const description = descriptionElement.textContent;

            const recipeData = { title, prepTime, description };

            // Store the shared recipe data in localStorage
            localStorage.setItem('sharedRecipe', JSON.stringify(recipeData));

            showNotification("Recipe shared successfully");
        }
    }
});

