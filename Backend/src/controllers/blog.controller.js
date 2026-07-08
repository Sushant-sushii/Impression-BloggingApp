const blogModel=require('../models/Blog.model')
const jwt=require("jsonwebtoken")
const {uploadImage}=require('../services/storage.service')

async function createBlog(req,res) {

    const {title,description}=req.body;
    const file=req.file;

    if(!file){
        return res.status(400).json({message:"Image field is required and must be named 'image'"});
    }

    const imageUrl=await uploadImage(file.buffer.toString('base64'));

    const blog=await blogModel.create({  
        imageURL:imageUrl,
        title,
        description,
        createdBy: req.user.id,
    });
    
    res.status(201).json({message:"Blog created successfully",blog:{
        id:blog._id,
        title:blog.title,
        description:blog.description,
        imageURL:blog.imageURL,
        userId:blog.createdBy,
    }});

    
}

async function getAllBlogs(req,res){
    const blogs=await blogModel.find().populate('createdBy','username email role createdAt').sort({createdAt:-1});
    res.status(200).json({message:"Blogs fetched successfully",blogs});
}

async function getMyBlogs(req,res)
{
    try {
        const blogs=await blogModel.find({ createdBy: req.user.id })
            .populate('createdBy','username email role createdAt')
            .sort({createdAt:-1});

        res.status(200).json({message:"Blogs fetched successfully", blogs});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Failed to fetch your blogs"});
    }
}

async function deleteBlog(req,res){
    try {
        const blog=await blogModel.findOneAndDelete({
            _id:req.params.id,
            createdBy:req.user.id,
        });

        if(!blog){
            return res.status(404).json({message:"Blog not found or you do not have permission to delete it"});
        }

        res.status(200).json({message:"Blog deleted successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Failed to delete blog"});
    }
}

async function getOneBlogs(req,res){
    try {
        const blog=await blogModel.findById(req.params.id)
            .populate('createdBy','username email role createdAt');

        if(!blog){
            return res.status(404).json({message:"Blog not found"});
        }

        res.status(200).json({message:"Blog fetched successfully", blog});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Failed to fetch blog"});
    }
}

module.exports={createBlog, getAllBlogs, getMyBlogs, deleteBlog, getOneBlogs}