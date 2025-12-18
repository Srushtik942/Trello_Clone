import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader"; // Assuming you have this component
import PendingChart from "../Chart/PendingChart";
import MyBarchart from "../Chart/MyBarchart";
import GroupChart from "../Chart/GroupChart";

const Report = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ================= Desktop Sidebar ================= */}
      <div className="hidden md:block w-64 bg-white border-r shadow-lg">
        <Sidebar />
      </div>

      {/* ================= Mobile Sidebar ================= */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl">
            <Sidebar isMobile onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* ================= Main Content ================= */}
      <div className="flex-1 overflow-y-auto">

        {/* Mobile Header */}
        <MobileHeader onMenuClick={() => setSidebarOpen(prev => !prev)} />

        <div className="p-4 sm:p-6 lg:p-10">

          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-6">
            Report Overview
          </h1>

          {/* Pending Chart */}
          <div className="w-full mb-6">
            <div className="bg-white p-4 rounded-lg shadow w-full">
              <PendingChart />
            </div>
          </div>

          {/* Barchart and Group Chart */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* MyBarchart */}
            <div className="flex-1 bg-white p-4 rounded-lg shadow w-full">
              <MyBarchart />
            </div>

            {/* GroupChart */}
            <div className="flex-1 bg-white p-4 rounded-lg shadow w-full">
              <h2 className="font-bold text-xl mb-4 mt-2">Group By</h2>
              <GroupChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
