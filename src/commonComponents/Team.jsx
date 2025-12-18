import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../commonComponents/Sidebar";
import MobileHeader from "../commonComponents/MobileHeader";
import toast from "react-hot-toast";
import CreateNewTeam from "./CreateNewTeam";

const Team = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchTeams = async () => {
    try {
      const response = await fetch(`${apiUrl}/team`);
      const data = await response.json();
      setTeams(data.response || []);
    } catch (error) {
      toast.error("Failed to fetch team data!");
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <>
      <div className="flex min-h-screen bg-gradient-to-r from-gray-100 to-gray-50">

        {/* ================= Desktop Sidebar ================= */}
        <div className="hidden md:block w-64 bg-white border-r shadow-lg">
          <Sidebar />
        </div>

        {/* ================= Mobile Sidebar ================= */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/40 transition-opacity"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300">
              <Sidebar isMobile onClose={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* ================= Main Content ================= */}
        <div className="flex-1 overflow-y-auto">
          <MobileHeader onMenuClick={() => setSidebarOpen(prev => !prev)} />

          <div className="p-6 lg:p-10">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h1 className="font-bold text-3xl text-gray-900">Teams</h1>

              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition duration-300"
              >
                + New Team
              </button>
            </div>

            {/* Team Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team) => (
                <div
                  key={team._id}
                  className="bg-white rounded-2xl shadow-md border p-6 hover:shadow-xl hover:scale-105 transition-transform duration-300 group"
                >
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {team.name}
                  </h2>

                  <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                    {team.description}
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    <Link
                      to={`/teams/${team._id}/owners`}
                      className="text-blue-600 font-medium text-sm hover:underline"
                    >
                      View Members
                    </Link>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <CreateNewTeam
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchTeams}
        />
      )}
    </>
  );
};

export default Team;
