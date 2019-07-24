const express = require("express");
const router = express.Router();

// GET api/poost
// TEST Router
// Public
router.get("/", (req, res) => {
  res.send("Post Router");
});

module.exports = router;
