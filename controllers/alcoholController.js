const db = require("../models");

// Defining methods for the alcoholController

module.exports = {
	findbyId: function(req, res) {
		db.Wines
		.findById(req.params.pairings)
		.then()
	}
}