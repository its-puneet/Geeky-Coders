// Import express and the file containing our route definitions
const express = require("express");
const app = express();
const routes = require("./src/routes");
// To read and display the response in JSON format
const bodyParser = require("body-parser");


// Configure the express application with the port number
const port = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", routes);

// Start the server
app.listen(port, () => {
  console.log(`Your Express application is running on port ${port}`);
});
