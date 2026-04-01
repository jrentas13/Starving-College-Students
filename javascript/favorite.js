document.addEventListener("DOMContentLoaded", () => {

    const likedGrid = document.getElementById("liked-grid");
    const favoriteGrid = document.getElementById("favorite-grid");
    const priceInput = document.getElementById("price-filter");
    const priceValue = document.getElementById("price-value");
    const tagFilter = document.getElementById("tag-filter");
    const timeFilter = document.getElementById("time-filter");
    const resetBtn = document.getElementById("reset-filters");


    // LOAD RECIPES FROM STORAGE
    function loadRecipes() {

        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

        recipes.forEach(recipe => {

            const card = document.createElement("div");
            card.classList.add("favorite-card");

            card.setAttribute("data-tag", recipe.tag);
            card.setAttribute("data-time", recipe.time);
            card.setAttribute("data-price", "20"); // placeholder

            card.innerHTML = `
                <button class="like-btn">🤍</button>
                <button class="delete-btn">🗑️</button>
                <img src="${recipe.image}" alt="${recipe.name}">
                <h3>${recipe.name}</h3>
            `;

            favoriteGrid.appendChild(card);
        });
    }

    loadRecipes();


    // ❤️ Like/Unlike Logic
    document.addEventListener("click", function(event) {

        // LIKE BUTTON
        if (event.target.classList.contains("like-btn")) {

            const button = event.target;
            const card = button.closest(".favorite-card");

            if (!card) return;

            if (button.textContent === "🤍") {
                button.textContent = "❤️";
                likedGrid.prepend(card);
            } else {
                button.textContent = "🤍";
                favoriteGrid.prepend(card);
            }
        }



        // Delete button
        if (event.target.classList.contains("delete-btn")) {

            const card = event.target.closest(".favorite-card");
            if (!card) return;

            const name = card.querySelector("h3").textContent;

            let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

            // Remove matching recipe
            recipes = recipes.filter(r => r.name !== name);

            localStorage.setItem("recipes", JSON.stringify(recipes));

            // Remove from page
            card.remove();
        }

    });


    // Filter Logic
    function filterRecipes() {
        const selectedTag = tagFilter.value;
        const selectedTime = timeFilter.value;
        const maxPrice = parseInt(priceInput.value);
        
        const cards = document.querySelectorAll(".favorite-card");

        cards.forEach(card => {
            const cardTag = card.dataset.tag;
            const cardPrice = parseInt(card.dataset.price) || 0;
            const cardTime = parseInt(card.dataset.time) || 0;

            const matchesTag = (selectedTag === "all" || cardTag === selectedTag);
            const matchesPrice = (cardPrice <= maxPrice);

            let matchesTime = true;
            if (selectedTime !== "all") {
                matchesTime = (cardTime <= parseInt(selectedTime));
            }

            if (matchesTag && matchesPrice && matchesTime) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }


    // Filter Controls
    priceInput.addEventListener("input", (e) => {
        priceValue.textContent = `$${e.target.value}`;
        filterRecipes();
    });

    tagFilter.addEventListener("change", filterRecipes);
    timeFilter.addEventListener("change", filterRecipes);

    resetBtn.addEventListener("click", () => {
        tagFilter.value = "all";
        timeFilter.value = "all";
        priceInput.value = 50;
        priceValue.textContent = "$50";
        filterRecipes();
    });

});