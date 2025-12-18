import React from 'react'
import { useState } from 'react'
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();


    const handleClickLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`${apiUrl}/auth/login`,{
                method: "Post",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email,password})
            })

            const data = await response.json();
            console.log(data);

            if(response.ok){
                localStorage.setItem("token",data.token);
                toast.success('Successfully Login!');
                navigate("/dashboard");
            }else{
                toast.error('Unable to login, Check your credentials!');
            }


        }catch(error){
          toast.error("Error in Login! Check your password!");
        }

    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-10 rounded-xl shadow-lg w-full max-w-md">
       <h3 className="text-4xl font-bold mb-4 text-center text-blue-500">Workly</h3>
        <h1 className="text-2xl font-bold mb-8 text-center">Login to your account</h1>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleClickLogin}>
          {/* Email */}
          <div>
            <label htmlFor="emailId" className="block mb-2">Email:</label>
            <input
              type="text"
              id="emailId"
              placeholder="enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-2">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="enter your password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors cursor-pointer"
          >
            Login
          </button>
        </form>
        <div className="my-3 text-center">
            <p>Don't have account? <Link to="/signup" className="text-green-200">Sign up</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login
