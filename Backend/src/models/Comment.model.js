const mongoose=require('mongoose');

const commentSchema=new mongoose.Schema(
    {
        comment:{
            type:String,
            default:'No comments',
        },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user', 
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    createdFor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blogs'
    }
   
    }
)

const comments=mongoose.model('comments',commentSchema);
module.exports=comments;