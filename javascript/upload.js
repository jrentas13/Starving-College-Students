document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const imageInput = document.getElementById("image");
    const preview = document.getElementById("image-preview");


    // Image preveiw
    imageInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        preview.src = URL.createObjectURL(file);
    });


    // Save recipe
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("fname").value;
        const servings = document.getElementById("servings").value;
        const time = document.getElementById("time").value;
        const tag = document.getElementById("tags").value;
        const description = document.getElementById("description").value;

        const file = imageInput.files[0];

        if (!file) {
            alert("Please upload an image");
            return;
        }

        const reader = new FileReader();

        reader.onload = function () {

            const recipe = {
                name,
                servings,
                time,
                tag,
                description,
                image: reader.result
            };

            let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

            recipes.push(recipe);

            localStorage.setItem("recipes", JSON.stringify(recipes));

            alert("Recipe saved!");

            form.reset();

            // Reset preview back to default
            preview.src = "images/chicken.png";
        };

        reader.readAsDataURL(file);
    });

});