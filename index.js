<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Veterinary Web Application</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <img src="logo.png" alt="Veterinary Logo">
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#news">News</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main id="content">
        <!-- Content will be dynamically loaded here using JavaScript -->
    </main>

    <footer>
        <p>&copy; 2023 Veterinary Web Application</p>
    </footer>

    <script src="app.js"></script>
</body>
</html>

app.js:
document.addEventListener('DOMContentLoaded', function () {
    loadHomePage(); // Load home page content by default
});

function loadHomePage() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <section>
            <h1>Welcome to our Veterinary Services</h1>
            <
app.js (Continuation):
            <p>Learn about our capabilities and more.</p>
            <button onclick="loadContactPage()">Contact Us</button>
        </section>
    `;
}

function loadNewsPage() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <section>
            <h1>Latest News and Updates</h1>
            <ul>
                <li>News Article 1</li>
                <li>News Article 2</li>
                <li>News Article 3</li>
            </ul>
        </section>
    `;
}

function loadServicesPage() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <section>
            <h1>Our Veterinary Services</h1>
            <ul>
                <li>Service 1</li>
                <li>Service 2</li>
                <li>Service 3</li>
            </ul>
        </section>
    `;
}

function loadContactPage() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <section>
            <h1>Contact Us</h1>
            <form id="contactForm">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>

                <label for="message">Message:</label>
                <textarea id="message" name="message" rows="4" required></textarea>

                <button type="submit">Submit</button>
            </form>
        </section>
    `;

    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();
        // Handle form submission (you can add AJAX or other logic here)
        alert('Message submitted successfully!');
    });
}

styles.css:
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

header {
    background-color: #333;
    color: #fff;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

nav ul {
    list-style-type: none;
    display: flex;
}

nav a {
    text-decoration: none;
    color: #fff;
    margin: 0 1rem;
}

main {
    padding: 2rem;
}

footer {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 1rem;
    position: fixed;
    bottom: 0;
    width: 100%;
}
