// src/components/Sidebar.js
import React from 'react';

const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <ul>
        <li className="mb-4">
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
            Dashboard
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
            Users
          </a>
        </li>
        {/* Add more navigation links here */}
      </ul>
    </div>
  );
};

export default Sidebar;
