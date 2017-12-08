const db = require("../models");

// Defining methods for the alcoholController

module.exports =
{
    addUser: function(req, res) {
        db.User
         .create(req.body)
         .then(dbModel => res.json(dbModel))
         .catch(err => res.status(422).json(err));

    },
    addFavorite: function(req, res) {
    	db.User
		.create(req.param())
		.then(dbModel => res.json(dbModel))
		.catch(err => res.status(422).json(err));
    },
    //not sure what to call
    showFavorite: function(req, res) {
    	db.User
    	//not sure why its calling everything
		.find(req.param("favorite"))
		.then(dbModel => res.json(dbModel))
		.catch(err => res.status(422).json(err));
    }

}