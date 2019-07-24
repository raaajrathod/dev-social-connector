const express = require("express");
const router = express.Router();

// GET api/users
// TEST Router
// Public
router.get("/", (req, res) => {
  res.send("User Router");
});

module.exports = router;
