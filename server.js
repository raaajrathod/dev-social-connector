const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

// Initialize Express
const app = express();
// Connect Database
connectDB();

// Init MiddleWare
app.use(express.json({extended: false}));

const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const post = require("./routes/api/post");

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/post", post);

// Serve Static assests in Production

if (process.env.NODE_ENV === "production") {
  // set static Folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Started on PORT : ${PORT}`);
});
