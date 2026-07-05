import { useState,useContext } from "react"
import typewritter from "../assets/typewritter.jpg"
import logo from "../assets/logo.png"
import { Link,useNavigate } from "react-router-dom"
import axios from "axios"
import { UserDataContext } from "../context/UserContext"

const Login = () => {

const [loginCredintials,setLoginCredintials]=useState("")
const [password,setPassword]=useState("")


const {user,setUser}=useContext(UserDataContext)
const navigate=useNavigate();

const submitHandler=async(e)=>{
    e.preventDefault();

    const isEmail = typeof loginCredintials === 'string' && loginCredintials.includes('@');

    const payload = {
        email: isEmail ? loginCredintials : null,
        username: isEmail ? null : loginCredintials,
        password: password || null,
    }

    
    
    try{
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`,payload, {
        withCredentials: true,
    })
    if(response.status===200){
        const data=response.data
        setUser(data.user)
        navigate("/home")
    }
}
catch(err){
   alert("Invalid credentials")
}
    
    console.log(payload);

    setLoginCredintials("");
    setPassword("");
}




  return (
<>
       

        <div
            className="opacity-100 min-h-screen w-full relative flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-6 lg:flex-row lg:justify-around lg:px-8"
            style={{ backgroundImage: `url(${typewritter})` }}
        >
            {/* logo */}
      <div className="flex w-full max-w-[420px] flex-col items-center gap-2 text-center lg:flex-row lg:items-center lg:justify-around lg:text-left">
              <img
              className="h-14 lg:h-20"
              src={logo} alt="" />

              <h2 className="text-4xl font-bold text-amber-500 font-[impression] lg:text-5xl">Impression</h2>
            </div>
        {/* login */}



                <div className="mt-6 w-full max-w-[420px] rounded-3xl bg-white/20 p-6 shadow-lg shadow-black/20 backdrop-blur-2xl lg:mt-8 lg:p-8">
            <h2 className="mb-6 text-3xl font-semibold text-white text-center lg:text-black">Login</h2>
            <form
              action=""
              className="space-y-4 flex flex-col gap-2"
              onSubmit={(e) => {
                submitHandler(e)
              }}
            >

                <div>
                     <p className="pl-3 font-normal text-amber-100 pb-0.5 ">Login with email or username</p>
                <input
                onChange={(e)=>{
                    setLoginCredintials(e.target.value)
                }}
                value={loginCredintials}
                    type="text"
                    name="loginDetails"
                    id="loginDetails"
                    placeholder="Enter email or username"
                    required
                    className="w-full rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
                </div>
                <div>
                    <p className="pl-3 font-normal text-amber-100 pb-0.5 ">Password</p>
                <input
                    value={password}
                      onChange={(e)=>{
                    setPassword(e.target.value)
                    }}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    required
                    className="w-full rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
                </div>
                <button type="submit" 
                className="pt-4 pb-4 pr-8 pl-8  bg-orange-400 rounded-4xl active:-translate-y-1 ">Login</button>

                <div className="flex items-center justify-start flex-col">
                    <p className="pl-3 font-normal text-amber-100">Don't have an account?</p>
                    <Link
                    to="/signup"
                    className="cursor-pointer text-white pb-1 border-b-2">Create account</Link>
                </div>

            </form>
        </div>
      
    </div>
    </>
  )
}

export default Login
