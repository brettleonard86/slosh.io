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
		db.Wines
		.find({"pairings" : `/${req.query.pairings}/i`})
		.then(dbModel => res.json(dbModel))
		.catch(err => res.status(422).json(err));
	}

}