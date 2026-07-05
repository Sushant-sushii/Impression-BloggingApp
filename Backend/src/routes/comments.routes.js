const express = require('express')
const router=express.Router();
const commentController=require("../controllers/comments.controller")


router.post("/comments",commentController.createComment)

module.exports=router;