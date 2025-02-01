import React, { useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Signup = () =>{
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    {
      Name: '',
      Email: '',
      Password: '',
  })

  const handleChange = (e) => {
   setFormData({...formData , [e.target.name]:e.target.value})
  }
  
// localhost:3000/api/register
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log("formData: " , formData)
      const response = await axios.post('http://localhost:3000/api/register',formData);
      console.log(response)
      alert('User registered successfully!')
      formRef.current.reset();
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} ref={formRef} >
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                name="Name"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                // value={formData.Name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="Email"
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                // value={formData.Email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="Password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                // value={formData.Password}
                onChange={handleChange}
              />
            </div>
            
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="text-center text-sm">
          <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
            Already have an account? Log in
          </a>
        </div>
      </div>
    </div>
  )
}

export default Signup