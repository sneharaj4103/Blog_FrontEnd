import React from "react";


const UserProfile = ({ user }) => {


    
  return (
   <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">👤 User Profile</h2>

      <div className="space-y-4 text-gray-700">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="text-lg font-medium">{user.name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-lg font-medium">{user.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Role</p>
          <p className="text-base italic">
            {user.bio ? user.role : 'No bio yet.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
