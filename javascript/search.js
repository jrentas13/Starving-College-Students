const recipeContainer = document.querySelector("#recipe-container-display");
const advButton = document.querySelector('#advancedSearch p');
const collapseArea = document.querySelector('#collapseArea');

function toggleAdv(){
    if (collapseArea.style.display != 'none'){
        collapseArea.style.display = 'none';
        advButton.innerHTML ='> Advanced <';
    }
    else{
        collapseArea.style.display = "grid";
        advButton.innerHTML ='v Advanced v';
    }
}

advButton.addEventListener('click', toggleAdv);



function formatCard(recipe){
    let minidesc = recipe.description;
    if (minidesc.length > 100){
        minidesc = minidesc.substring(0,98) + "..."
    }
    let htmlout = `<a href="recipe.html?id=${recipe.recipe_id}"><div class="recipe-container">
                <img src="images/chicken.png" height="100" alt="Sample recipe image">
                <h3 class="recipe-name">${recipe.name}</h3>
                <p class="description">${minidesc}</p>
            </div></a>`;
    return (htmlout);
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const recipeName = urlParams.get("search");
const order = urlParams.get("order");
const tags = urlParams.get("tags"); //Gonna be a string. Comma separated or space? Probably space
const page = urlParams.get("page");

let taglist = null;
if (tags != null){
    taglist = tags.split(" ");
}
async function getRecipes(page = 1, perPage = 10) {
    let response;
    // try{
    //     response = await fetch(`http://127.0.0.1:8080/recipes?page=${page}&per_page=${perPage}`);
    // } catch {
    //     response = await fetch(`/recipes?page=${page}&per_page=${perPage}`);
    // }
    // The following line should be uncommented when the endpoint is made.
    if(taglist != null){
        response = await fetch(`http://127.0.0.1:8080//recipes?page=${page}&per_page=${perPage}&name=${recipeName}&order=${order}&tags=${taglist}`);
    } else {
        response = await fetch(`/recipes?page=${page}&per_page=${perPage}&name=${recipeName}&order=${order}&tags=${taglist}`);
    }
    
    if (!response.ok) {
        // throw new Error("Failed to fetch recipes");
        errorJson = [{name: "I still love you Jonathan", description: "Please come back to me I'm sorry. I didn't mean to eat your Ritz crackers I thought they were mine!", recipe_id: 1},
        {name: "Ice cream", description: "The best gosh darn ice cream the world has ever known. Forged in the icy depths of Shigeuru Miyamoto's heart, and seasoned with a healthy hatred of his customers.", recipe_id: 2},
        {name: "Beanman's Beans", description: "I want to eat some beans if you please.", recipe_id: 3}]
        return errorJson;
    }

    const recipes = await response.json();
    return recipes;
}

async function loadRecipes(page) {
    let response = await getRecipes(page);
    let htmlout = ""
    response.forEach(wassup => {
        htmlout += formatCard(wassup);
    });
    recipeContainer.innerHTML = htmlout;
}
loadRecipes(page);