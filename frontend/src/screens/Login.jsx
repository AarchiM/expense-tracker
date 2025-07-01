import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useGetUserLoginMutation } from "../store/transactionApi";

const Login = () =>
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getUserLogin] = useGetUserLoginMutation();
  const navigate = useNavigate();

  const HandleLoginUser = async () =>
  {
    try {
      if(email == ""){
        alert("⚠ Please Enter Email!!")
        return;
      }else if(password == ""){
        alert("⚠ Please Enter Password!!")
        return;
      }
      const response = await getUserLogin({
        email, password
      })
            
      if(response.error){
        alert(`⚠ ${response.error.data.message} Please Sign Up`);
        return;
      }
      
      localStorage.setItem('Authtoken',JSON.stringify(response?.data.Authtoken))
      localStorage.setItem('email', JSON.stringify(email));
      localStorage.setItem('name', JSON.stringify(response?.data.name));
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='m-auto flex justify-center items-center w-[400px] h-[600px] text-gray-700'>
    <div className="p-10 shadow-md flex gap-5 flex-col dark:border dark:border-gray-700 w-full">
      <h2 className="text-center font-bold">Login</h2>
      <div>
        <h1>Email</h1>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="border w-full focus:outline-none py-1 px-3" />
        <h1>Password</h1>
        <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} className="border w-full focus:outline-none py-1 px-3" />
        <p className="text-blue-800 flex justify-end text-xs">forgot Password?</p>

      </div>
      <div className="flex justify-center">
        <button className="px-3 py-1 bg-blue-800 text-white" onClick={HandleLoginUser}>Login</button>
      </div>
      <p>Dont have Account? <Link to='/signup' className="text-blue-700">Sign Up</Link></p>
    </div>
    </div>
  );
};

export default Login;
