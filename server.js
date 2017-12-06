// Require our dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3000;
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
	"mongodb://heroku_sh5bhx7j:hujullrihc2ta0pbnms79mqqse@ds131826.mlab.com:31826/heroku_sh5bhx7j",
	//process.env.MONGODB_URI || "mongodb://localhost/sloshio",
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
