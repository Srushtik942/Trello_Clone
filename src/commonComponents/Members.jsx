import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../commonComponents/Sidebar";
import toast from "react-hot-toast";

const Members = () => {
  const { teamId } = useParams();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [team, setTeam] = useState(null);
  const [members,setMembers] = useState("");

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {

        const teamRes = await fetch(`${apiUrl}/teams/${teamId}/owners`);
        const teamData = await teamRes.json();
        console.log(teamData);
        setTeam(teamData.team);

        const memberRes = await fetch(`${apiUrl}/users?team=${teamId}`);
        const memberData = await memberRes.json();
        console.log(memberData);
        setMembers(memberData.userData || []);
      } catch (error) {
        toast.error("Failed to load team details");
      }
    };

    fetchTeamDetails();
  }, [teamId]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-10">

        {/* Members */}
        <h2 className="text-lg font-semibold mb-3">Team Members</h2>

        {members.length === 0 ? (
          <p className="text-gray-500">No members assigned</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((member) => (
              <div
                key={member._id}
                className="border rounded-lg p-4 bg-white"
              >
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-gray-500">{member.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;
