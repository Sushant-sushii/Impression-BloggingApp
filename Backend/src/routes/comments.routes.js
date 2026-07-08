const express = require('express')
const router = express.Router()
const commentController = require("../controllers/comments.controller")
const authMiddleware = require('../middleware/auth.middleware')

router.post('/comments', authMiddleware.authUser, commentController.createComment)
router.get('/comments/:blogId', commentController.getCommentsByBlog)

module.exports = router;