console.log("Homepage script is connected!");

async function fetchRecipes() {
    try {
        const response = await fetchRecipes('http://127.0.0.1:8080/recipes');

        if (!response || !response.ok) {
            throw new Error(`HTTP error! status: ${response?.status || 'no response'}`);
        }

        const recipes = await response.json();

        const container = document.getElementById('recipe-container-display');

        container.innerHTML = '';

        recipes.forEach(recipe => {
            container.innerHTML += `
                <div class="recipe-container">
                    <p class="category">${recipe.category || 'Recipe'}</p>
                    <h3 class="recipe-name">${recipe.name}</h3>
                    <p class="description">${recipe.description}</p>
                    <a href="recipe-details.html?id=${recipe.recipe_id}">Read More</a>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

window.addEventListener('DOMContentLoaded', fetchRecipes);