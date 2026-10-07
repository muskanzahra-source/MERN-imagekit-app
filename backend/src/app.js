const express = require("express");
require("dotenv").config();
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const uploadfile = require("../service/imgkit_storage_service");
const model = require("../models/model");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTML form render route (optional agar React use kar rahe hain)
const file = path.join(__dirname, "post.html");
app.get("/createpost", (req, res) => {
  res.status(200).sendFile(file);
});

// Multer memory storage
const upload = multer({ storage: multer.memoryStorage() });

// 1. Create Post Route
app.post("/createpost", upload.single("image"), async (req, res) => {
  try {
    const { caption } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "Please upload an image" });
    }

    // Upload file buffer to ImageKit
    const Data = await uploadfile(file.buffer);

    // Save to MongoDB
    const newPost = await model.create({
      image: Data.url, // ImageKit public image URL
      caption: caption,
    });

    // Return success response
    res.status(201).json({
      message: "Post created successfully!",
      post: newPost,
    });
  } catch (error) {
    console.error("Post creation error:", error);
    res.status(500).json({ error: error.message });
  }
});

// 2. Get All Posts Route 
app.get("/post", async (req, res) => {
  try {
    const posts = await model.find();

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("Fetch posts error:", error);
    res.status(500).json({
      success: false,
      message: "Could not fetch posts",
    });
  }
});

module.exports = app;