recipeContainer = document.querySelector("#recipe-container-display");

function formatCard(recipe){
    let minidesc = recipe.description;
    if (minidesc.length > 100){
        minidesc = minidesc.substring(0,98) + "..."
    }
    let htmlout = `<div class="recipe-container">
                <img src="images/chicken.png" height="100" alt="Sample recipe image">
                <h3 class="recipe-name">${recipe.name}</h3>
                <p class="description">${minidesc}</p>
                <a href="#">Read More</a>
            </div>`;
    return (htmlout);
}

async function fetchRecipes() {
    try {
        const response = await fetch('http://127.0.0.1:8080/recipes');

        if (!response.ok) throw new Error("Failed to fetch recipes.");

        const recipesFromDb = await response.json();

        let toBehtml = "";
        recipesFromDb.forEach(recipe => {
            toBehtml += formatCard(recipe);
        });

        recipeContainer.innerHTML = toBehtml;
    } catch (error) {
        console.error("Error connecting to backend:", error);
        recipeContainer.innerHTML = "<p>Error loading recipes. Please try again later.</p>";
    }
}

fetchRecipes();

// displayRecipes = [{name: "I still love you Jonathan", description: "Please come back to me I'm sorry. I didn't mean to eat your Ritz crackers I thought they were mine!"},
//     {name: "Ice cream", description: "The best gosh darn ice cream the world has ever known. Forged in the icy depths of Shigeuru Miyamoto's heart, and seasoned with a healthy hatred of his customers."},
//     {name: "Beanman's Beans", description: "I want to eat some beans if you please."}]; //Need to connect to the end point somehow...
// //SELECT * FROM starving_college_students.recipes ORDER BY RAND() LIMIT 3;

// toBehtml = ""

// displayRecipes.forEach(i => {
//     toBehtml += formatCard(i)
// });
// recipeContainer.innerHTML = toBehtml;