console.log("upload.js is loaded");

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("recipe-form");

    if (!form) {
        console.error("Form not found");
        return;
    }
    
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("Form submitted");

        const data = {
            name: document.getElementById("fname").value,
            description: document.getElementById("description").value,
            tags: document.getElementById("tags").value.split(","),
            prep_time: parseInt(document.getElementById("preptime").value),
            cook_time: parseInt(document.getElementById("cooktime").value),
            servings: parseInt(document.getElementById("servings").value)
        };

        try {
            const response = await fetch("http://127.0.0.1:8080/recipes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Server error");
            }

            alert(result.message || "Recipe submitted!");
            form.reset();
        } catch (err) {
            console.error(err);
            alert("Error submitting recipe");
        }
    });
});