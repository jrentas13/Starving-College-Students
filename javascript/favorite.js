const likeButtons = document.querySelectorAll(".like-btn");
const likedGrid = document.getElementById("liked-grid");
const favoriteGrid = document.getElementById("favorite-grid");

likeButtons.forEach(button => {
    button.addEventListener("click", function () {

        const card = this.parentElement;

        if (this.innerText === "🤍") {
            this.innerText = "❤️";
            likedGrid.prepend(card);
        } else {
            this.innerText = "🤍";
            favoriteGrid.prepend(card);
        }

    });
});