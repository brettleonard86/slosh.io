const router = require("express").Router();
const booksController = require("../../controllers/alcoholController");

// Matches with "/api/ + "my pairing"
router.route("/:pairings")
  .get(booksController.findAllPairings);

// Matches with "/api/books/:id"
router
  .route("/")
  .get(booksController.findAll)


module.exports = router;
