import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='m-auto flex justify-center items-center h-[600px]'>
    <div className="p-10 shadow-md flex gap-5 flex-col dark:border dark:border-gray-700">
      <h2 className="text-center font-bold">Sign up</h2>
      <table>
        <tbody>
          <tr>
            <td>Name: </td>
            <td>
              <input type="text" className="border" />
            </td>
          </tr>
          <tr>
            <td>Email: </td>
            <td>
              <input type="text" className="border" />
            </td>
          </tr>
          <tr>
            <td>Password: </td>
            <td>
              <input type="text" className="border" />
            </td>
          </tr>
        </tbody>
      </table>
      <p>Already have Account? <Link to='/' className="text-blue-700">Login</Link></p>
      <div className="flex justify-center">
        <button className="px-3 py-1 bg-blue-800 text-white">Login</button>
      </div>
    </div>
    </div>
  )
}

export default SignUp
