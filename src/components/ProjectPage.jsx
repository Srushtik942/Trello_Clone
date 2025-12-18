import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from "../commonComponents/Sidebar";
import MobileHeader from "../commonComponents/MobileHeader";
import Card from "./Card";

const ProjectPage = () => {
  const location = useLocation();
  const { projects, search } = location.state || {};
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 min-h-screen bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
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

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <MobileHeader onMenuClick={() => setSidebarOpen(prev => !prev)} />

        <div className="p-4 sm:p-6 lg:p-10">
          {/* Page Title */}
          {/* <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
            {search ? `Search results for "${search}"` : "All Projects"}
          </h1> */}

          {/* Cards Grid */}
          {projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card projects={projects} />
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-10">No projects found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
