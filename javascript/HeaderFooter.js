const header = document.querySelector('header');
const footer = document.querySelector('footer');

header.innerHTML = `<a href="https://pngtree.com/freepng/cute-boy-chinese-chef-cooking-in-kitchen-cartoon-vector-icon-illustration-people-profession-concept-isolated-premium-flat-style-white-background_16713931.html">
<img src="images/Cartoon-ish_Chef.png" height="100" alt="SCS Logo" title="Chef Boyardee here.">
</a>
<nav>
    <a href="index.html">Home</a>
    <a href="search.html">Search</a>
    <a href="favorites.html">Favorites</a>
    <a href="upload.html">Upload</a>
<div class="searchbar">
    <input type="text" id="search-input" placeholder="Find a recipe" length="3">
    <button id="search-button"><img src="images/Pan_Search_Icon.PNG" height="15" alt="recipes icon"></button>
</div>
<div id="AccountArea">
    <!-- Use JS to replace this with an account button -->
    <button id="SignUpButton">Sign Up</button>
    <button id="LogInButton">Log in</button>
</div>`

footer.innerHTML = `<div class="footer-top">
<div class="footer-logo">
    <img src="images/Cartoon-ish_Chef.png" alt="SCS Logo">
</div>

<div class="footer-links">
    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Link one</a>
    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Link two</a>
    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Link three</a>
    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Link four</a>
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