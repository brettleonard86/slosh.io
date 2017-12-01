const router = require("express").Router();
const alcoholRoutes = require("./alcohol");
const userRoutes = require("./user");

// Alc routes
router.use("/alcohol", alcoholRoutes);
router.use("/user", userRoutes);

module.exports = router;
