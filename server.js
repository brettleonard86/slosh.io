// Require our dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 5000;
const alcohol = require("./scripts/alcohol");

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve up static assets
app.use(express.static("./client/build"));

// Add routes, both API and view
app.use(routes);

//Set up promies awith mongoose
mongoose.Promise = Promise;

// Connect to the Mongo DB
mongoose.connect(
	"mongodb://heroku_mcxflplg:7msh3mam12odglrsp7hacuosu7@ds133746.mlab.com:33746/heroku_mcxflplg",
	process.env.MONGODB_URI || "mongodb://localhost/sloshio",
	{
		useMongoClient: true
	}
);

mongoose.connection.on("connected", function(){
	console.log("mongo is connected");
})

alcohol.seedData();

// Listen on the port
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
