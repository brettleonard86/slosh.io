const router = require("express").Router();
const userController = require("../../controllers/userController");


// Matches with "/api/user"
router.post("/", userController.addUser)
  


module.exports = router;