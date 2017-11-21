const router = require("express").Router();
const alcoholRoutes = require("./alcohol");

// Alc routes
router.use("/alcohol", alcoholRoutes);

module.exports = router;
