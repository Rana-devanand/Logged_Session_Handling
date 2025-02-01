import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [formData , setFormData] = useState({
      Email: '',
      Password: ''
    })

    const HandleChange = (e) => {
      setFormData({...formData, [e.target.name]:e.target.value})
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response =  await  axios.post("http://localhost:3000/api/login", formData);
        console.log(response);
        if(response.data.token){
          Cookies.set('token', response.data.token, {expires: 1/24, secure: true });  // expires in 1 hours
        }
        navigate('/profile');
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="Email"
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                placeholder="Email address"
                onChange={HandleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="Password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                placeholder="Password"
                onChange={HandleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
          <div className="text-center">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-800">
              Forgot your password?
            </a>
          </div>
        </form>
        <div className="text-center">
            <a href="/signup"
               
                className="font-medium text-indigo-600 hover:text-indigo-800">
              Create new account
            </a>
            <p className="mt-2 text-sm text-gray-600">
              By continuing, you agree to the{' '}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-800">
                Terms & Conditions
              </a>
            </p>
          </div>    
      </div>
    </div>
  )
}

export default Login