const router = require("express").Router();
const alcoholController = require("../../controllers/alcoholController");

// Matches with "/api/alcohol + "my pairing"
router.route("/:name")
  .get(alcoholController.findAllPairings);

// Matches with "/api/alcohol"
router.route("/")
  .get(alcoholController.findAll)


module.exports = router;
