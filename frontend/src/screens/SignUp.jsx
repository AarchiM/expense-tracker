import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGetUserSignupMutation } from '../store/transactionApi';

const SignUp = () =>
{
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [getUserSignup] = useGetUserSignupMutation();
    const navigate = useNavigate();
  
    const HandleSignupUser = async () =>
    {
      try {
        const response = await getUserSignup({
          name, email, password
        })
        localStorage.setItem('Authtoken',JSON.stringify(response?.data.Authtoken))
        localStorage.setItem('email', JSON.stringify(email));
        localStorage.setItem('name', JSON.stringify(name));
        navigate('/dashboard');
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div className='m-auto flex justify-center items-center w-[400px] h-[600px] text-gray-600 dark:text-gray-300'>
    <div className="p-10 shadow-md flex gap-5 flex-col dark:border dark:border-gray-700 w-full">
      <h2 className="text-center font-bold">Sign up</h2>
      <div>
        <h1>Name</h1>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="border w-full focus:outline-none py-1 px-3" />
        <h1>Email</h1>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="border w-full focus:outline-none py-1 px-3" />
        <h1>Password</h1>
        <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} className="border w-full focus:outline-none py-1 px-3" />
        <p className="text-blue-800 flex justify-end text-xs">forgot Password?</p>

      </div>
      <p>Already have Account? <Link to='/' className="text-blue-700">Login</Link></p>
      <div className="flex justify-center">
        <button className="px-3 py-1 bg-blue-800 text-white" onClick={HandleSignupUser}>Sign Up</button>
      </div>
    </div>
    </div>
  )
}

export default SignUp
