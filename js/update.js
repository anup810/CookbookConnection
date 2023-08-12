document.addEventListener('DOMContentLoaded', () => {
    const sharedRecipeJson = localStorage.getItem('sharedRecipe');
    if (sharedRecipeJson) {
        const sharedRecipe = JSON.parse(sharedRecipeJson);
        // Display the shared recipe on the index.html page
        const recipeContainer = document.getElementById('sharedRecipeContainer');
        if (recipeContainer) {
            recipeContainer.innerHTML = `
                <h3>${sharedRecipe.title}</h3>
                <p>${sharedRecipe.prepTime}</p>
                <p>${sharedRecipe.description}</p>
            `;
        }

        // Clear the shared recipe data from localStorage
        localStorage.removeItem('sharedRecipe');
    }
});
