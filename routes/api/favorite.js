var router = require("express").Router();
var favoriteController = require("../../controllers/favorite");

router.get("/:id", favoriteController.findOne);
router.post("/", favoriteController.create);
router.delete("/:id", favoriteController.delete);

module.exports = router;