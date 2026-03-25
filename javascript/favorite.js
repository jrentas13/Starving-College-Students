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