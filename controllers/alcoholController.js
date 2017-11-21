const db = require("../models");

// Defining methods for the alcoholController

module.exports ={
	findAll: function(req, res) {
		db.Wines
		.find(req.query)
		.then(dbModel => res.json(dbModel))
		.catch(err => res.status(422).json(err));
	},
	findAllPairings: function(req, res) {
		console.log(req.params);
		console.log(req.query);
		db.Wines
		.find({"pairings" : req.params.pairings})
		.then(dbModel => res.json(dbModel))
		.catch(err => res.status(422).json(err));
	}

}