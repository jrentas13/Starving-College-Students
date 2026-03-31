const header = document.querySelector('header');
const footer = document.querySelector('footer');

header.innerHTML =`
<img src="images/SCS_Logo.png" height="100" alt="SCS Logo" title="Good Soup">
<nav>
    <a href="index.html">Home</a>
    <a href="search.html">Search</a>
    <a href="favorites.html">Favorites</a>
    <a href="upload.html">Upload</a>
<div id='nav2'>
    <form action="search.html" class="searchbar">
        <input type="text" id="search-input" name="search" placeholder="Find a recipe" length="3">
        <button id="search-button"><img src="images/Pan_Search_Icon.PNG" alt="recipes icon"></button>
    </form>
    <div id="AccountArea">
        <!-- Use JS to replace this with an account button -->
        <a href="signup.html"><button id="SignUpButton">Sign Up</button></a>
        <a href="login.html"><button id="LogInButton">Log in</button></a>
    </div>
<div>
<nav>`

footer.innerHTML = `<div class="footer-top">
<div class="footer-logo">
    <img src="images/SCS_Logo.png" alt="SCS Logo">
</div>

<div class="footer-links">
    <a href="index.html">Home</a>
    <a href="search.html">Search</a>
    <a href="favorites.html">Favorites</a>
    <a href="upload.html">Upload</a>
</div>

<div class="footer-social">
    <a href="https://www.instagram.com/studentscookbook555/">
        <img src="images/instalogo.png" alt="Instagram">
    </a>
    <a href="https://facebook.com">
        <img src="images/fblogo.png" alt="Facebook">
    </a>
    <a href="https://x.com/CollegeSta99909">
        <img src="images/xlogo.png" alt="X">
    </a>
</div>
</div>

<div class="footer-bottom">
<p>© 2026 Starving College Students Cookbook. All rights reserved.</p>
<div class="footer-legal">
    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Privacy Policy</a>
    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Terms of Service</a>
</div>
</div>`