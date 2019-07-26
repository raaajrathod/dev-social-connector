const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Profile = require("../../model/Profile");
const User = require("../../model/User");
const {check, validationResult} = require("express-validator");
const request = require("request");
const config = require("config");

// POST api/profile/delete-profile
// Delete Profile & User & Post
// Private
router.delete("/delete", authMiddleware, async (req, res) => {
  try {
    // Remove Profile
    await Profile.findOneAndRemove({user: req.user.id});
    // Remove Users Post

    // Remove User
    await User.findByIdAndRemove({_id: req.user.id});

    res.json({msg: "User Deleted Successfully"});
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something Went Wrong. Please Try Again");
  }
});

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

// PUT api/profile/add-expriance
// Add User Expeiance
// Private
router.put(
  "/add-experiance",
  [
    authMiddleware,
    [
      check("title", "Please Enter Title")
        .not()
        .isEmpty(),
      check("company", "Please Add Company")
        .not()
        .isEmpty(),
      check("location", "Please Add Location")
        .not()
        .isEmpty(),
      check("from", "Please Add From Date")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {title, company, location, from, to, current, description} = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({user: req.user.id});

      if (!profile) {
        return res.status(400).json({
          errors: [
            {
              msg: "Please Add Profile"
            }
          ]
        });
      }
      // console.log(profile);
      profile.experiances.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Something Went Wrong. Please Try Again");
    }
  }
);

// DELETE api/profile/delete-expriance
// Add User Expeiance
// Private
router.delete("/delete-experiance/:id", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id});

    // Get Remove Index
    const removeIndex = profile.experiances
      .map(item => item.id)
      .indexOf(req.params.id);

    if (removeIndex != -1) profile.experiances.splice(removeIndex, 1);

    // profile.experiances.filter(item => item._id != req.params.id);

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something Went Wrong. Please Try Again");
  }
});

// [
//   authMiddleware,
//   [
//     check("school", "Please Enter School")
//       .not()
//       .isEmpty(),
//     check("degree", "Please Add Degree")
//       .not()
//       .isEmpty(),
//     check("fieldofstudy", "Please Add Field of Study")
//       .not()
//       .isEmpty(),
//     check("from", "Please Add From Date")
//       .not()
//       .isEmpty()
//   ]
// ];

// PUT api/profile/add-education
// Add User Education
// Private
router.put(
  "/add-education",
  [
    authMiddleware,
    [
      check("school", "Please Enter School")
        .not()
        .isEmpty(),
      check("degree", "Please Add Degree")
        .not()
        .isEmpty(),
      check("fieldofstudy", "Please Add Field of Study")
        .not()
        .isEmpty(),
      check("from", "Please Add From Date")
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
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({user: req.user.id});

      if (!profile) {
        return res.status(400).json({
          errors: [
            {
              msg: "Please Add Profile"
            }
          ]
        });
      }
      // console.log(profile);
      profile.education.unshift(newEducation);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Something Went Wrong. Please Try Again");
    }
  }
);

// DELETE api/profile/delete-education
// Add User Educaation
// Private
router.delete("/delete-education/:id", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id});

    // Get Remove Index
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.id);

    if (removeIndex != -1) profile.education.splice(removeIndex, 1);

    // profile.experiances.filter(item => item._id != req.params.id);

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something Went Wrong. Please Try Again");
  }
});

// GET api/profile/get-guthub-repos/:username
// Get Github Repos
// Public
router.get("/get-github-repos/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret==${config.get("githubClientSecret")}`,
      method: "GET",
      headers: {
        "user-agent": "node.js"
      }
    };
    request(options, (error, response, body) => {
      if (error) console.log(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({msg: "No Github Profile Found"});
      }
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something Went Wrong. Please Try Again");
  }
});




module.exports = router;
