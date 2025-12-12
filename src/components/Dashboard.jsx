import React from 'react';
import Sidebar from "../commonComponents/Sidebar";
import Card from "../commonComponents/Card"
import { Car } from 'lucide-react';
const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      <div className="flex-1 bg-white p-6">
        <div className="border border-gray-400 text-gray-400 rounded-sm p-2">
          <input type="text" id="searchId" placeholder="Search..." className="w-full outline-none" />
        </div>
      <div className="flex items-center justify-content  mt-5">
  <h1 className="font-bold text-2xl text-black">Projects</h1>

  <select
    id="projectFilter"
    name="projectFilter"
    className="text-black border border-gray-400 rounded p-1 mx-5"
  >
    <option>Select Filter</option>
    <option value="1">1 year</option>
    <option value="2">2 years</option>
    <option value="3">3 years</option>
    <option value="4">4 years</option>
  </select>

  <div className="flex justify-end w-full">
  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
    + New Project
  </button>
</div>

</div>
<Card/>
</div>

</div>
  );
}

export default Dashboard;
