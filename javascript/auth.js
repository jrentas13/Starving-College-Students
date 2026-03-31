function getStoredUser() {
    const user = localStorage.getItem("scsUser");
    return user ? JSON.parse(user) : null;
}

function setStoredUser(user) {
    localStorage.setItem("scsUser", JSON.stringify(user));
}

function getCurrentUser() {
    const user = localStorage.getItem("scsCurrentUser");
    return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
    localStorage.setItem("scsCurrentUser", JSON.stringify(user));
}

function logoutUser() {
    localStorage.removeItem("scsCurrentUser");
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector(".signup-form");
    const loginForm = document.querySelector(".login-form");
    const profilePage = document.querySelector(".profile-page");

    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = document.querySelector("#signup-username").value.trim();
            const email = document.querySelector("#signup-email").value.trim();
            const password = document.querySelector("#signup-password").value.trim();

            if (!username || !email || !password) {
                alert("Please fill in all fields.");
                return;
            }

            const user = {
                username,
                email,
                password,
                favoriteRecipe: "None yet",
                savedRecipes: 0,
                bio: "Welcome to SCS Cookbook!"
            };

            setStoredUser(user);
            setCurrentUser(user);

            alert("Account created successfully.");
            window.location.href = "profile.html";
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = document.querySelector("#login-username").value.trim();
            const password = document.querySelector("#login-password").value.trim();

            const storedUser = getStoredUser();

            if (!storedUser) {
                alert("No account found. Please sign up first.");
                return;
            }

            if (storedUser.username === username && storedUser.password === password) {
                setCurrentUser(storedUser);
                alert("Logged in successfully.");
                window.location.href = "profile.html";
            } else {
                alert("Invalid username or password.");
            }
        });
    }

    if (profilePage) {
        const currentUser = getCurrentUser();

        if (!currentUser) {
            window.location.href = "login.html";
            return;
        }

        const usernameEl = document.querySelector(".profile-username");
        const memberNameEl = document.querySelector(".info-username");
        const emailEl = document.querySelector(".info-email");
        const favoriteRecipeEl = document.querySelector(".info-favorite");
        const savedRecipesEl = document.querySelector(".info-saved");
        const bioEl = document.querySelector(".info-bio");

        if (usernameEl) usernameEl.textContent = currentUser.username;
        if (memberNameEl) memberNameEl.textContent = currentUser.username;
        if (emailEl) emailEl.textContent = currentUser.email;
        if (favoriteRecipeEl) favoriteRecipeEl.textContent = currentUser.favoriteRecipe;
        if (savedRecipesEl) savedRecipesEl.textContent = currentUser.savedRecipes;
        if (bioEl) bioEl.textContent = currentUser.bio;
    }
});