const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Profile = require("../../model/Profile");
const User = require("../../model/User");
const {check, validationResult} = require("express-validator");

// POST api/profile/find-by-user-id/:id
// Get Profile By Id
// Public
router.get("/find-by-user-id/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const profile = await Profile.findOne({user: id}).populate("user", [
      "name",
      "avatar"
    ]);
    // If Not Profile For this User
    if (!profile) return res.status(400).send({msg: "Profile Not Found"});
    // Send Profile
    res.json(profile);
  } catch (error) {
    console.log(error.message);

    if (error.kind == "ObjectId")
      return res.status(400).send({msg: "Profile Not Found"});
    res.status(500).send("Something Went Wrong. Please Try Again");
  }
});

// POST api/profile/get-all
// Get All Profile
// Public
router.get("/get-all", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something Went Wrong. Please Try Again");
  }
});

// GET api/profile/get-me
// Get Current Users Profile
// Private
router.get("/get-me", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id}).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({msg: "There is no Profile for this User"});
    }
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something Went Wrong. Please Try Again");
  }
});

// POST api/profile/add
// Add Current Users Profile
// Private
router.post(
  "/add",
  [
    authMiddleware,
    [
      check("status", "Please Select Status")
        .not()
        .isEmpty(),
      check("skills", "Please Enter Skills")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills
    } = req.body;

    const {youtube, facebook, twitter, instagram, linkedin} = req.body.social;

    // Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      // skills = skills.split(",");
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }

    // Build Social Object

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({user: req.user.id});

      if (profile) {
        // Update

        profile = await Profile.findOneAndUpdate(
          {user: req.user.id},
          {$set: profileFields},
          {new: true}
        );

        return res.send({
          profile,
          msg: "Profile Updated Successfully"
        });
      }

      // Insert Profile If not Found
      profile = new Profile(profileFields);
      await profile.save();
      res.send({
        profile,
        msg: "Profile Added Successfully"
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Something Went Wrong. Please Try Again");
    }
  }
);

module.exports = router;
