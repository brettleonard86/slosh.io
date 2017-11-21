// Require our dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3000;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve up static assets
app.use(express.static("client/build"));

// Add routes, both API and view
app.use(routes);

//Set up promies awith mongoose
mongoose.Promise = Promise;

// Connect to the Mongo DB
mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost/slosh.io", 
	{
  	  useMongoClient: true
	}
);

// Listen on the port
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
