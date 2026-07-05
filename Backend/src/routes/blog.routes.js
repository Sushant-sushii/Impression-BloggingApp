const express=require('express')
const router=express.Router();
const authMiddleware=require('../middleware/auth.middleware')

const blogController=require("../controllers/blog.controller")
const multer=require('multer');

const upload=multer({ storage: multer.memoryStorage() });

router.post('/create', authMiddleware.authCreator, upload.single('image'), blogController.createBlog);

router.get('/getAll', blogController.getAllBlogs);
router.get('/myblogs', authMiddleware.authUser, blogController.getMyBlogs)
router.delete('/:id', authMiddleware.authUser, blogController.deleteBlog)

module.exports=router;