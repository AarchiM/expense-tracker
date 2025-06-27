import React from "react";

import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className='m-auto flex justify-center items-center w-[400px] h-[600px]'>
    <div className="p-10 shadow-md flex gap-5 flex-col dark:border dark:border-gray-700 w-full">
      <h2 className="text-center font-bold">Login</h2>
      <div>
        <h1>Email</h1>
        <input type="text" className="border w-full" />
        <h1>Password</h1>
        <input type="text" className="border w-full" />

      </div>
      <div className="flex justify-center">
        <button className="px-3 py-1 bg-blue-800 text-white">Login</button>
      </div>
      <p>Dont have Account? <Link to='/signup' className="text-blue-700">Sign Up</Link></p>
    </div>
    </div>
  );
};

export default Login;
