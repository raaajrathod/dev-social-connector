const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../../model/User");
const {check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// GET api/auth/get-user-details
// TEST Router
// Public
router.get("/get-user-details", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something Went Wrong. Please Try Again");
  }
});

// POST api/users/login
// Register User Router
// Public
router.post(
  "/login",
  [
    check("email", "Please Enter Valid Email").isEmail(),
    check("password", "Please Enter Password").exists()
  ],
  async (req, res) => {
    // Check for Validation
    const errors = validationResult(req);
    // If Errors Send
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
      // See If User Exist
      let user = await User.findOne({email});
      // Check If User is Registered
      if (!user) {
        return res.status(400).json({errors: [{msg: "Invalid Credentails"}]});
      }
      // Check if Password Match
      const match = await bcrypt.compare(password, user.password);
      // If Not Match
      if (!match) {
        return res.status(400).json({errors: [{msg: "Invalid Credentails"}]});
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {expiresIn: 360000},
        (error, token) => {
          if (error) throw error;

          // Return jsonwebtoken
          res.json({token});
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("Something Went Wrong. Please Try Again");
    }
  }
);

module.exports = router;
