const userModel=require('../models/user.model');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const { response } = require('../app');

// --------------Registration Logic----------------------

async function registerUser(req,res){

    const {username,email,password,role="user",bio,}=req.body;

    const userExist=await userModel.findOne({
        $or : [
            {email},
            {username}
        ]
        });
    if(userExist){
        return res.status(409).json({message:"User already exists"});
    }

    // hashing password
    const hash=await bcrypt.hash(password,10);

    const user=await userModel.create({
        username,
        email,
        password:hash,
        role,
        bio
    });

    const token=jwt.sign({
        id:user._id,
        role:user.role,
    },process.env.JWT_SECRET);

    res.cookie("token",token);

    res.status(201).json({
        message:"User registered succesfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
            bio:user.bio
        }
    });



   

}
// ------------Login Logic-----------------------------
async function loginUser(req,res){

    const {username,email,password}=req.body;

    const user=await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })
    console.log(user);
    

    // *****
    if(!user){
        return res.status(401).json({
            message:"invalid credentials"
        })
    }
    // *****
// **********************************
    const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(401).json({
            message:"invalid password"
        })
    }

    const token=jwt.sign({
        id:user._id,
        role:user.role,
    },process.env.JWT_SECRET)

    console.log(token);
    

    res.cookie("token",token);

    res.status(200).json({
        message:"Logged in sussesfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role
        }
    })


    // *********************************



}

async function getCurrentUser(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findById(decoded.id).select('-password')

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    return res.status(200).json({ user })
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" })
  }
}

async function logoutUser(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  })

  return res.status(200).json({ message: "Logged out successfully" })
}

module.exports={registerUser,loginUser,getCurrentUser,logoutUser};
