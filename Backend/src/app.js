const express=require('express')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const authRoutes=require('./routes/auth.routes')
const blogRoutes=require("./routes/blog.routes")
const commentsRoutes=require("./routes/comments.routes")

const app=express();
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use("/blog",blogRoutes)
app.use("/blog",commentsRoutes)

module.exports=app;