import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const Signup = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();


    const handleSignUpButton = async (e)=>{
          e.preventDefault();
        try{
            const response = await  fetch(`${apiUrl}/auth/signup`,{
                method: "POST",
                headers: {
                   "Content-Type": "application/json",
                   },
                body: JSON.stringify({ name, email, password }),
            })

            const data = await response.json();
            console.log(data);

            if(response.ok){
               toast.success('Successfully Signup!')
                navigate("/login")
            }else{
               toast.error("Error during signup! check fields properly!")
            }
        }catch(error){
            alert("Error in Signup")
        }
    }

  return (
     <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-10 rounded-xl shadow-lg w-full max-w-md">
        <h3 className="text-4xl font-bold mb-4 text-center text-blue-500">Workasna</h3>
        <h1 className="text-3xl font-bold mb-8 text-center">Sign Up</h1>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSignUpButton}>

              {/* Name */}
               <div>
            <label htmlFor="nameId" className="block mb-2">Name:</label>
            <input
              type="text"
              id="nameId"
              placeholder="enter your name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full px-4 py-2 rounded border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="emailId" className="block mb-2" >Email:</label>
            <input
              type="text"
              id="emailId"
              placeholder="enter your email"
              required={true}
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
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
              required={true}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* signup Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors cursor-pointer"
          >
            Sign Up
          </button>
        </form>

      </div>
    </div>
  )
}

export default Signup
