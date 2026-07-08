const commentModel = require("../models/Comment.model")
const jwt = require('jsonwebtoken')

async function createComment(req, res) {
  const token = req.cookies.token
  const { comment, blogId } = req.body

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  if (!comment || !comment.trim() || !blogId) {
    return res.status(400).json({ message: "Comment text and blogId are required" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const commentData = await commentModel.create({
      comment: comment.trim(),
      createdBy: decoded.id,
      createdFor: blogId,
    })

    const populatedComment = await commentModel.findById(commentData._id)
      .populate('createdBy', 'username email')

    return res.status(201).json({ message: "Comment created successfully", comment: populatedComment })
  } catch (err) {
    console.error(err)
    return res.status(401).json({ message: "Unauthorized" })
  }
}

async function getCommentsByBlog(req, res) {
  try {
    const { blogId } = req.params
    const comments = await commentModel.find({ createdFor: blogId })
      .populate('createdBy', 'username email')
      .sort({ createdAt: 1 })

    return res.status(200).json({ message: "Comments fetched successfully", comments })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Failed to fetch comments" })
  }
}

module.exports = { createComment, getCommentsByBlog }