import { useState } from "react"
import React from 'react'
import type2 from "../assets/typewritter.jpg"
import logo from "../assets/logo.png"
import { Link,useNavigate } from "react-router-dom"
import axios from "axios"
import { UserDataContext } from "../context/UserContext"

const Signup = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("author")
  

  const navigate = useNavigate()
  const { user, setUser } = React.useContext(UserDataContext)

  const submitHandler =async (e) => {
    e.preventDefault()
    const newUser = {
      username,
      email,
      password,
      role,
    }
    const response =await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/register`,newUser)
    
try{
    if(response.status===201){
      const data=response.data

      setUser(data.user)
      navigate("/home")
    }
  }
  catch(err){
    alert(err)
    console.error('Signup error', err)
  }

   
    setUsername("")
    setEmail("")
    setPassword("")
    setRole("user")
  }

  return (
    <>
  
    
    <div
      className=" signup opacity-100 min-h-screen w-full relative flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-6 lg:flex-row lg:justify-around lg:px-8"
      style={{ backgroundImage: `url(${type2})` }}
    >
      {/* logo */}
    <div className="flex w-full max-w-[420px] flex-col items-center gap-4 text-center lg:flex-row lg:items-center lg:justify-around lg:text-left">
                  <img
                  className="h-14 lg:h-20"
                  src={logo} alt="" />
    
                  <h2 className="text-4xl font-bold text-white font-[impression] lg:text-5xl">Impression</h2>
                </div>
      {/* page */}
      <div className="mt-6 w-full max-w-[520px] rounded-3xl bg-white/20 p-6 shadow-lg shadow-black/20 backdrop-blur-2xl overflow-hidden lg:mt-8 lg:p-8">
        <h2 className="mb-6 text-3xl font-semibold text-white text-center lg:text-black">Sign Up</h2>
        <form
          action=""
          className="space-y-2 flex flex-col gap-2"
          onSubmit={(e) => {
            submitHandler(e)
          }}
        >
          <div>
            <p className="pl-3 font-normal text-amber-100 pb-0.5">Email</p>
            <input
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              value={email}
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              required
              className="w-full rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>
          <div>
            <p className="pl-3 font-normal text-amber-100 pb-0.5">Username</p>
            <input
              onChange={(e) => {
                setUsername(e.target.value)
              }}
              value={username}
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
              required
              className="w-full rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>
          <div>
            <p className="pl-3 font-normal text-amber-100 pb-0.5">Password</p>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              required
              className="w-full rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>


          <fieldset className="space-y-2">
            <legend className="pl-3 font-normal text-amber-100 pb-0.5">Role</legend>
            <span className="sr-only">Choose one role: author</span>

            <div className="flex flex-row flex-wrap gap-3">
              {['author'].map((roleName) => {
                const isSelected = role === roleName
                return (
                  <label
                      key={roleName}
                      className={`flex cursor-pointer items-center justify-center rounded-3xl border px-4 py-3 text-center text-sm font-medium transition focus-within:ring-2 focus-within:ring-white focus-within:border-[#3B4C58] ${
                        isSelected
                          ? 'border-[#3B4C58] bg-[#3B4C58] text-white'
                          : 'border-white/20 bg-[#0f172a] text-slate-100'
                      }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={roleName}
                      checked={isSelected}
                      onChange={() => setRole(roleName)}
                      className="peer absolute h-0 w-0 opacity-0"
                    />
                    <span className="capitalize text-white">{roleName}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
          <button
            type="submit"
            className="pt-4 pb-4 pr-8 pl-8 bg-[#3B4C58] rounded-4xl active:-translate-y-1 text-amber-50"
          >
            Create Account
          </button>
          <div className="flex items-center justify-start flex-col">
            <p className="pl-3 font-normal text-amber-100">Already have an account?</p>
            <Link to="/" className="cursor-pointer text-white pb-1 border-b-2">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Signup
