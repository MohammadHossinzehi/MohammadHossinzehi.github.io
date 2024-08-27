const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static("public"));

// Endpoint to handle form submission
app.post("/add-product", (req, res) => {
  const { model, price } = req.body;
  const productInfo = `Model: ${model}, Price: $${price}\n`;

  // Append product info to products.txt
  fs.appendFile("products.txt", productInfo, (err) => {
    if (err) {
      return res.send("Error writing to file");
    }

    // Read the updated file content
    fs.readFile("products.txt", "utf8", (err, data) => {
      if (err) {
        return res.send("Error reading file");
      }

      // Send the updated file content back to the client
      res.send(`<h1>Product Tracker</h1>
                <p>New product added successfully!</p>
                <pre>${data}</pre>
                <a href="/">Go back</a>`);
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
