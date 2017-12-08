const router = require("express").Router();
const userController = require("../../controllers/userController");


// Matches with "/api/user"
router.post("/", userController.addUser)
// /api/user/favorite
router.post("/favorite", userController.addFavorite)
  
router.get("/favorite/user", userController.showFavorite)

module.exports = router;