const express = require("express");
const router = express.Router();

// GET api/profile
// TEST Router
// Public
router.get("/", (req, res) => {
  res.send("Profile Router");
});

module.exports = router;
