var express = require('express');
var router = require("express").Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost/slosh.io', ['wines']);

router.get('/food', function(req, res, next){
    db.wines.find(function(err, wines){
        if(err){
            res.send(err);
        }
        res.json(wines);
    });
});

//Save wines
router.post('/newfood', function(req, res, next){
    var wines = req.body;
    if(!wines.title || !(wines.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad bad Data"
        });
    } else {
        db.wines.save(wines, function(err, wines){
            if(err){
                res.send(err);
            }
            res.json(wines);
        });
    }
});

module.exports = router;
