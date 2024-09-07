// src/pages/Dashboard.js
import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-100 min-h-screen">
        <Navbar />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* Example widget, replace with actual content */}
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-bold mb-2">Widget 1</h2>
            <p>Content goes here</p>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-bold mb-2">Widget 2</h2>
            <p>Content goes here</p>
          </div>
          {/* Add more widgets as needed */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
