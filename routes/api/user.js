const router = require("express").Router();
const userController = require("../../controllers/userController");


// Matches with "/api/alcohol"
router.route("/")
  .post(userController.addUser)


module.exports = router;