import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../commonComponents/Sidebar";
import MobileHeader from "../commonComponents/MobileHeader";
import toast from "react-hot-toast";

const Members = () => {
  const { teamId } = useParams();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const teamRes = await fetch(`${apiUrl}/teams/${teamId}/owners`);
        const teamData = await teamRes.json();
        setTeam(teamData.team);

        const memberRes = await fetch(`${apiUrl}/users?team=${teamId}`);
        const memberData = await memberRes.json();
        setMembers(memberData.userData || []);
      } catch (error) {
        toast.error("Failed to load team details");
      }
    };

    fetchTeamDetails();
  }, [teamId]);

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
        <MobileHeader onMenuClick={() => setSidebarOpen(prev => !prev)} />

        <div className="p-4 sm:p-6 lg:p-10">
          {/* Team Info */}
          {team && (
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">{team.name}</h1>
              <p className="text-gray-500 mt-1">{team.description}</p>
            </div>
          )}

          {/* Members */}
          <h2 className="text-lg font-semibold mb-4">Team Members</h2>

          {members.length === 0 ? (
            <p className="text-gray-500">No members assigned</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {members.map((member) => (
                <div
                  key={member._id}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-lg transform hover:scale-105 transition duration-300"
                >
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                    {member.name[0].toUpperCase()}
                  </div>

                  {/* Member Info */}
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                    {member.role && (
                      <span className="inline-block mt-1 text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                        {member.role}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Members;
