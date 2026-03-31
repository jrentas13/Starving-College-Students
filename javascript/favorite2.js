document.addEventListener("DOMContentLoaded", () => {

    const likedGrid = document.getElementById("liked-grid");
    const favoriteGrid = document.getElementById("favorite-grid");
    const priceInput = document.getElementById("price-filter");
    const priceValue = document.getElementById("price-value");
    const tagFilter = document.getElementById("tag-filter");
    const timeFilter = document.getElementById("time-filter");
    const resetBtn = document.getElementById("reset-filters");

    // --- LIKE / UNLIKE LOGIC ---
    document.addEventListener("click", function(event) {
        if (!event.target.classList.contains("like-btn")) return;

        const button = event.target;
        const card = button.parentElement;

        if (button.textContent === "🤍") {
            button.textContent = "❤️";
            likedGrid.prepend(card);
        } else {
            button.textContent = "🤍";
            favoriteGrid.prepend(card);
        }
    });

    // --- FILTER LOGIC ---
    function filterRecipes() {
        const selectedTag = tagFilter.value;
        const selectedTime = timeFilter.value;
        const maxPrice = parseInt(priceInput.value);
        
        const cards = document.querySelectorAll(".favorite-card");

        cards.forEach(card => {
            const cardTag = card.dataset.tag;
            const cardPrice = parseInt(card.dataset.price) || 0;
            const cardTime = parseInt(card.dataset.time) || 0;

            // Check Tag match
            const matchesTag = (selectedTag === "all" || cardTag === selectedTag);
            
            // Check Price match
            const matchesPrice = (cardPrice <= maxPrice);

            // Check Time match
            let matchesTime = true;
            if (selectedTime !== "all") {
                matchesTime = (cardTime <= parseInt(selectedTime));
            }

            // Apply visibility
            if (matchesTag && matchesPrice && matchesTime) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // --- EVENT LISTENERS FOR FILTERS ---

    // Update price label and filter when slider moves
    priceInput.addEventListener("input", (e) => {
        priceValue.textContent = `$${e.target.value}`;
        filterRecipes();
    });

    // Filter when dropdowns change
    tagFilter.addEventListener("change", filterRecipes);
    timeFilter.addEventListener("change", filterRecipes);

    // Reset button logic
    resetBtn.addEventListener("click", () => {
        tagFilter.value = "all";
        timeFilter.value = "all";
        priceInput.value = 50;
        priceValue.textContent = "$50";
        filterRecipes();
    });

});

//Ethan's area
const recipeContainer = document.querySelector("#favorite-grid");

function formatCard(recipe){
    let htmlout = `<div class="favorite-card" data-tag="dinner" data-price="10" data-time="30">
                    <button class="like-btn">🤍</button>
                    <img src="images/chicken.png" alt="Grilled Chicken">
                    <h3>${recipe.name}</h3>
                </div>`;
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
        response = await fetch(`http://127.0.0.1:8080//favorites?page=${page}&per_page=${perPage}&name=${recipeName}&order=${order}&tags=${taglist}`);
    } else {
        response = await fetch(`/favorites?page=${page}&per_page=${perPage}&name=${recipeName}&order=${order}&tags=${taglist}`);
    }
    
    if (!response.ok) {
        // throw new Error("Failed to fetch recipes");
        errorJson = [{name: "This", description: "Please come back to me I'm sorry. I didn't mean to eat your Ritz crackers I thought they were mine!", recipe_id: 1},
        {name: "Area", description: "The best gosh darn ice cream the world has ever known. Forged in the icy depths of Shigeuru Miyamoto's heart, and seasoned with a healthy hatred of his customers.", recipe_id: 2},
        {name: "Is", description: "I want to eat some beans if you please.", recipe_id: 3},
        {name: "Not", description: "I want to eat some beans if you please.", recipe_id: 4},
        {name: "Implmented", description: "I want to eat some beans if you please.", recipe_id: 5},
        {name: "Yet!", description: "I want to eat some beans if you please.", recipe_id: 6}]
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