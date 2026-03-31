const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let recipeID = urlParams.get("id");
if (recipeID == null) {
    recipeID = 1;
}

async function getRecipe(id){
    const response = await fetch(`/recipes?recipe_id=${id}`);
    if (!response.ok) {
        return {name: "I still love you Jonathan",
            description: "Please come back to me I'm sorry. I didn't mean to eat your Ritz crackers I thought they were mine!",
            recipe_id: 1,
            cook_time: "4 Years of marriage",
            servings: "supposed to be 2 :("};
    }
    return response.json();
}

async function getTags(id){
    const response = await fetch(`/tags?recipe_id=${id}`);

    if (!response.ok) {
        return [{tag_id: 1,
            tag_name: "Yummy"
        }];
    }
        return response.json();
}
async function getInstructions(id){
    const response = await fetch(`/tags?recipe_id=${id}`);

    if (!response.ok) {
        return [{instruction_text: "Dodge"},
            {instruction_text: "Duck"},
            {instruction_text: "Dip"},
            {instruction_text: "Dive"},
            {instruction_text: "Dodge"}
        ];
    }
        return response.json();
}
async function getIngredients(id){
    const response = await fetch(`/tags?recipe_id=${id}`);
    
    if (!response.ok) {
        return [{ingredient_id: 1,
            ingredient_name: "Yummy",
            amount: 100,
            unit: "buckets"
        }];
    }
    return response.json();
}
async function formatRecipe(id){
    let response = await getRecipe(id);
    topContainer = `<section id="top-container">
        <div id="top-container-info">

            <div class="title-row">
                <h1>${response.name}</h1>
                <button class="like-btn" aria-label="Favorite recipe">🤍</button>
            </div>

            <div id="recipe-basic-info">
                <p><strong>Cook:</strong> ${response.cook_time}</p>
                <p><strong>Serves:</strong> ${response.servings}</p>
            </div>

            <div id="recipe-description">
                <p>${response.description}</p>
            </div>

            <div class="button-row">
                <button id="print-button" type="button">Print</button>
                <button id="save-button" type="button">Save</button>
            </div>

        </div>

        <div class="recipe-image-box">
            <img src="images/chicken.png" alt="Recipe Image">
        </div>
    </section>
    `;
    let tags = await getTags(id);
    let instructions = await getInstructions(id);
    let ingredients = await getIngredients(id);
    moreHTML = `<section id="ingredients-box">
        <h2>Ingredients</h2>
        <ul>
            ${ingredients.map(ing => `<li>${ing.ingredient_name} - ${ing.amount} ${ing.unit}</li>`).join('')}
        </ul>
    </section>

    <section id="instructions-box">
        <h2>Instructions</h2>
        <ol>
            ${instructions.map(inst => `<li>${inst.instruction_text}</li>`).join('')}
        </ol>
    </section>

    <section id="tags">
        <h2>Tags</h2>
        <div class="tag-list">
            ${tags.map(tag => `<li>${tag.tag_name}</li>`).join('')}
        </div>
    </section>`;

    return topContainer + moreHTML;
}

const recipeArea = document.querySelector("main");
async function loadRecipe() {
    console.log("await formatRecipe(recipeID)");
    console.log(await formatRecipe(recipeID));
    recipeArea.innerHTML = await formatRecipe(recipeID);
}

loadRecipe();