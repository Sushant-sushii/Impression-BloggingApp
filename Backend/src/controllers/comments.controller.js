const commentModel=require("../models/Comment.model")
const jwt=require('jsonwebtoken')

async function createComment(req,res){
    token=req.cookies.token;
    const {comment}=req.body;
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)
        if(decoded.role==="admin" || decoded.role==="author" || decoded.role==="user"){
        
        const commentData=await commentModel.create({
        comment,
        createdBy:decoded.id
        
        })
        return res.status(201).json({message:"Comment created successfully",comment:commentData})

        }
    }
    catch(err){
        console.log(err)
        return res.status(401).json({message:"Unauthorized"})
    }

  

    
}

module.exports={createComment}