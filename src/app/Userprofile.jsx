import React from "react";


const UserProfile = ({ user }) => {


    
  return (

    <div className="min-h-screen bg-transparent bg-cover bg-center bg-no-repeat py-10 px-4 backdrop-blur-sm" style={{ backgroundImage: "url('https://png.pngtree.com/background/20250102/original/pngtree-blue-and-purple-gradient-background-picture-image_15472172.jpg')" }}>
     
     
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
         <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2 text-center">
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
        </div></div>
      
      
 {/* <div
      className="min-h-screen py-10 px-4 flex items-center justify-center bg-no-repeat bg-cover bg-center backdrop-blur-sm"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/abstract-blue-light-pipe-speed-zoom-black-background-technology_1142-9980.jpg?semt=ais_hybrid&w=740')",
      }}
    >
      <div
        className="w-full max-w-xl bg-white/90 backdrop-blur-md border border-gray-300 shadow-2xl rounded-2xl p-8"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
        }}
      >
     
      </div>
      </div> */}
      </div>
  );
};

export default UserProfile;
