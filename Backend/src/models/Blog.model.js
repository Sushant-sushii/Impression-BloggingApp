const mongoose=require('mongoose');

const blogSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            },
        description:{
            type:String,
            required:true,
        },
        imageURL:{
            type:String,
            default:""
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user',
            required:true,
        },
        comments:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'comments',  
        },
         createdAt:{
            type:Date,
            default:Date.now,
    },
    }

)

const blog =mongoose.model('blog',blogSchema);
module.exports=blog;