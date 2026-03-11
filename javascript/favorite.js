document.addEventListener("DOMContentLoaded", () => {

const likedGrid = document.getElementById("liked-grid")
const favoriteGrid = document.getElementById("favorite-grid")

document.addEventListener("click", function(event){

if(!event.target.classList.contains("like-btn")) return

const button = event.target
const card = button.parentElement

if(button.textContent === "🤍"){

button.textContent = "❤️"
likedGrid.prepend(card)

}
else{

button.textContent = "🤍"
favoriteGrid.prepend(card)

}

})

})