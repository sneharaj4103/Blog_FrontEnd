import React from "react";


const UserProfile = ({ user }) => {


    
  return (

  <div
  className="min-h-screen bg-cover bg-center bg-no-repeat py-10 px-4 relative"
  style={{
    backgroundImage:
      "url('https://png.pngtree.com/background/20250102/original/pngtree-blue-and-purple-gradient-background-picture-image_15472172.jpg')",
  }}
>
  {/* Light overlay for background */}
  <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-0"></div>

  {/* User Profile Card */}
  <div className="relative z-10 max-w-4xl mx-auto bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
    <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2 text-center">
      👤 User Profile
    </h2>

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
          {user.role ? user.role : "No role assigned yet."}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Bio</p>
        <p className="text-base italic">
          {user.bio ? user.bio : "No bio yet."}
        </p>
      </div>
    </div>
  </div>
</div>

  );
};

export default UserProfile;
