const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Post = require("../../model/Post");
const User = require("../../model/User");
const {check, validationResult} = require("express-validator");

// POST api/poost/add
// Add Post
// Private
router.post(
  "/add",
  [
    authMiddleware,
    [
      check("text", "Please Enter Title")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    try {
      const {text} = req.body;
      const {name, avatar} = await User.findById(req.user.id);

      const newPost = {
        user: req.user.id,
        text,
        name,
        avatar
      };

      const post = new Post(newPost);
      await post.save();
      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).send("Something Went Wrong. Please Try Again");
    }
  }
);

// GET api/poost/get-all
// Get All Post
// Private
router.get("/get-all", authMiddleware, async (req, res) => {
  try {
    const post = await Post.find().sort({date: -1});
    res.json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something Went Wrong. Please Try Again");
  }
});

// GET api/poost/get-by-id/:id
// Get Post bb Id
// Private
router.get("/get-by-id/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({msg: "Post Not Found"});
    res.json(post);
  } catch (error) {
    console.log(error.message);
    if (error.kind === "ObjectId")
      return res.status(404).json({msg: "Post Not Found"});

    res.status(500).send("Something Went Wrong. Please Try Again");
  }
});

// DELETE api/poost/delete/:id
// Delete Post
// Private
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({msg: "Post Not Found"});

    // Check if User Owns the Post
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({msg: "User not Authorized"});

    await Post.findByIdAndDelete(req.params.id);

    res.json({msg: "Post Deleted Successfully"});
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something Went Wrong. Please Try Again");
  }
});

// PPUT api/post/like
// Like Post
// Private
router.put("/like/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if Post has already Liked
    if (
      post.like.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({msg: "Post Already Liked"});
    }

    post.like.unshift({user: req.user.id});

    await post.save();

    res.json(post.like);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something Went Wrong. Please Try Again");
  }
});

// PPUT api/post/unlike
// Like Post
// Private
router.put("/unlike/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if Post has already Liked
    if (
      post.like.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({msg: "Post is Not Yet Liked"});
    }

    // Get The Index of User Id in Like Array
    const index = post.like.map(l => l.user.toString()).indexOf(req.user.id);

    // If User Found Remove User from Like Array
    if (index !== -1) post.like.splice(index, 1);

    await post.save();
    res.json(post.like);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something Went Wrong. Please Try Again");
  }
});

// PPUT api/post/comment/:post_id
// Add Comment
// Private
router.put(
  "/comment/:id",
  [
    authMiddleware,
    [
      check("text", "Please Add Comment")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({errors: errors.array()});

    const {text} = req.body;
    const {name, avatar} = await User.findById(req.user.id);

    const newComment = {
      user: req.user.id,
      name,
      avatar,
      text
    };

    try {
      const post = await Post.findById(req.params.id);

      // Check if Post Exist or Not
      if (!post) {
        return res
          .status(404)
          .json({msg: "Post You're Looking for is Either Removed or Deleted"});
      }

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Something Went Wrong. Please Try Again");
    }
  }
);

// PPUT api/post/remove-comment/:post_id/:comment_id
// Remove Comment
// Private
router.put("/remove-comment/:id/:comment", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const commentId = req.params.comment;

    // Check if Post Exist or Not
    if (!post) {
      return res
        .status(404)
        .json({msg: "Post You're Looking for is Either Removed or Deleted"});
    }

    // Comment Index
    const commentIndex = post.comments
      .map(comment => comment.id)
      .indexOf(commentId);

    if (commentIndex !== -1) {
      if (post.comments[commentIndex].user != req.user.id) {
        return res.status(400).json({msg: "User Not Authorized"});
      }

      post.comments.splice(commentIndex, 1);

      await post.save();

      res.json(post.comments);
    } else {
      res.status(404).json({msg: "Comment does not exist"});
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something Went Wrong. Please Try Again");
  }
});
module.exports = router;
