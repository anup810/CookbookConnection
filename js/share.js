document.addEventListener('DOMContentLoaded', () => {
    const sharedRecipeData = localStorage.getItem('sharedRecipe');
    
    if (sharedRecipeData) {
        const recipeData = JSON.parse(sharedRecipeData);
        
        const sharedRecipeContainer = document.getElementById('sharedRecipe');
        sharedRecipeContainer.innerHTML = `
            <div class="shared-card">
                <h3>${recipeData.title}</h3>
                <p>Prep Time: ${recipeData.prepTime}</p>
                <p>${recipeData.description}</p>
            </div>
        `;
        
        // Clear the shared recipe data from localStorage
        localStorage.removeItem('sharedRecipe');
    }
});
