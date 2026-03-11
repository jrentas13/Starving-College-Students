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

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const name = urlParams.get("search");
const order = urlParams.get("order");
const tags = urlParams.get("tags"); //Gonna be a string, comma separated or space?
const page = urlParams.get("page"); //Gonna be a string, comma separated or space?

if (tags!= null){
    let taglist = tags.split(" ");
}
async function getRecipes(page = 1, perPage = 10) {
    const response = await fetch(`/recipes?page=${page}&per_page=${perPage}`);
    
    if (!response.ok) {
        throw new Error("Failed to fetch recipes");
    }

    const recipes = await response.json();
    return recipes;
}
const response = getRecipes(page);
await response;