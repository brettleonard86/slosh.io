const router = require("express").Router();
const alcoholController = require("../../controllers/alcoholController");

// Matches with "/api/ + "my pairing"
router.route("/:pairings")
  .get(alcoholController.findAllPairings);

// Matches with "/api/books/:id"
router
  .route("/")
  .get(alcoholController.findAll)


module.exports = router;
