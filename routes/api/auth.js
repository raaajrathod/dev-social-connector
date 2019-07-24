const express = require("express");
const router = express.Router();

// GET api/auth
// TEST Router
// Public
router.get("/", (req, res) => {
  res.send("Auth Router");
});

module.exports = router;
