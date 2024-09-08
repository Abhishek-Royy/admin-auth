// src/components/Navbar.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const [userdata, setuserdata] = useState({});

  console.log("User Logged In:", userdata);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/login/success", {
        withCredentials: true,
      });

      setuserdata(response.data.user);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.log("User Unauthorized");
        } else {
          console.log(`Error: ${error.response.status}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received:", error.request);
      } else {
        console.log("Error:", error.message);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // Logout Function
  const handleLogout = () => {
    window.open("http://localhost:3000/logout", "_self");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <div>
        <h2 className="font-semibold text-blue-900 text-xl">
          {userdata.displayName}
        </h2>
      </div>

      <div className="flex gap-8">
        <div className="w-14 h-14  rounded-full border">
          {userdata.image ? (
            <img
              className="w-full h-full rounded-full"
              src={userdata.image}
              alt=""
            />
          ) : (
            <img
              className="w-full h-full rounded-full"
              src="https://i.pinimg.com/736x/bb/e3/02/bbe302ed8d905165577c638e908cec76.jpg"
              alt=""
            />
          )}
        </div>
        <button
          onClick={handleLogout}
          className="bg-blue-500 text-white px-8 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
