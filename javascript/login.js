document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.auth-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Store the username in localStorage so the browser "remembers" who you are
            localStorage.setItem('currentUser', username);
            alert('Welcome back!');
            window.location.href = '/my-recipes.html'; 
        } else {
            alert(data.message);
        }
    });
});