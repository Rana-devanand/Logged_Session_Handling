import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  
  // Mock user data - replace with actual user data from your auth system
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "January 2024",
    avatar: "https://via.placeholder.com/150"
  }; 
  
  // Verify user authentication before rendering the profile page
  const verifyAutheUser = async () => {
    try {
        const token = Cookies.get('token');
        if(!token) {
            navigate('/');
            return;
        }
        const response = await axios.post('http://localhost:3000/api/profile', {}, {
           headers :{
            'Authorization': `Bearer ${token}`
           }
        } )
        console.log(response)
    } catch (error) {
        console.log(error);
    }
  }


  const handleLogout = async () => {
    try {
        const token = Cookies.get('token');
        const response = await axios.post('http://localhost:3000/api/profile', {}, {
            headers :{
             'Authorization': `Bearer ${token}`
            }
         } )
        console.log(response);
        Cookies.remove('token');
        alert("User Logout Successfully");
        navigate('/');
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    verifyAutheUser();
  },[])

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md">
        <div className="p-8">
          {/* Profile Header */}
          <div className="flex flex-col items-center pb-8 border-b border-gray-200">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>

          {/* Profile Details */}
          <div className="py-8 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Information</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Member since</p>
                  <p className="text-gray-900">{user.joinDate}</p>
                </div>
                {/* Add more profile information sections as needed */}
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
