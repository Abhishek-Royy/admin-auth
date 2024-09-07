// src/components/Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <div>
        {/* Add profile or other options here */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
