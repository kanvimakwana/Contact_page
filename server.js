const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ensure the 'views' directory is set correctly

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve CSS files

// Route to serve the form
app.get('/', (req, res) => {
    res.render('form'); // Ensure form.ejs exists in the 'views' folder
});

// Route to handle form submission
app.post('/submit', (req, res) => {
    console.log("Form submitted:", req.body);  // Debugging line

    const { name, message } = req.body;

    if (!name || !message) {
        console.log("Missing data!"); // Check if input is missing
        return res.status(400).send("All fields are required!");
    }

    console.log("Redirecting to thank-you...");
    res.redirect('/thank-you'); // Redirect after form submission
});


// Thank You Page Route
app.get('/thank-you', (req, res) => {
    res.render('thank-you'); 
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
